console.log("Starting server file")
require("dotenv/config")
if (!process.env.ENCRYPTION_KEY) {
    console.warn("⚠️  [SECURITY WARNING] ENCRYPTION_KEY not found. Server is running in Insecure Mode (plain-text fallback enabled).")
}

const express = require("express")
const bcrypt = require("bcryptjs")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")
const { decrypt } = require("./crypto-utils")

// Connect to Database (Supabase/PostgreSQL)
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    console.error("❌ [FATAL ERROR] DATABASE_URL is missing in Render environment variables.");
} else {
    // Resilience: Force production flags if missing (helps with Render IPv6 / connectivity issues)
    if (!dbUrl.includes('sslmode=')) {
        dbUrl += dbUrl.includes('?') ? '&sslmode=require' : '?sslmode=require';
    }
    if (!dbUrl.includes('connect_timeout=')) {
        dbUrl += dbUrl.includes('?') ? '&connect_timeout=15' : '?connect_timeout=15';
    }
}

const pool = new Pool({ 
    connectionString: dbUrl,
    ssl: dbUrl && (dbUrl.includes('supabase') || dbUrl.includes('render.com')) ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 15000, 
    idleTimeoutMillis: 30000,
    max: 10
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(helmet())
// CORS: allow Vercel production, localhost, and Vercel preview deployments
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,https://smartmenyu.vercel.app,https://smartmenyu.onrender.com').split(',').map(s => s.trim())

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.includes(origin) || 
                         origin.endsWith(".vercel.app") || 
                         origin.includes("localhost");

        if (isAllowed) {
            callback(null, true);
        } else {
            console.error('⚠️ [CORS BLOCKED]:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global HTTP Method Restriction (Only GET and POST allowed)
app.use((req, res, next) => {
    const allowedMethods = ['GET', 'POST', 'OPTIONS']; // OPTIONS for CORS
    if (!allowedMethods.includes(req.method)) {
        logSecurityEvent(req, 'DISALLOWED_METHOD_ATTEMPT', { method: req.method, url: req.originalUrl });
        return res.status(405).json({ message: `Method ${req.method} not allowed. Only GET and POST are permitted.` });
    }
    next();
});

// Health Check for Render/Deployment
app.get("/", (req, res) => {
    res.json({ 
        status: "ok", 
        service: "Smart Menyu Backend",
        timestamp: new Date().toISOString()
    })
});

// Detailed Diagnostic Health Check (Admin Only)
app.get("/api/admin/health", async (req, res) => {
    const health = {
        status: "starting",
        timestamp: new Date().toISOString(),
        env: {
            NODE_ENV: process.env.NODE_ENV || 'development',
            DATABASE_URL: process.env.DATABASE_URL ? "✅ Present" : "❌ Missing",
            JWT_SECRET: process.env.JWT_SECRET ? "✅ Present" : "⚠️ Using Fallback",
            ANALYTICS_USERNAME: process.env.ANALYTICS_USERNAME ? "✅ Present" : "❌ Missing",
            ADMIN_ANALYTICS_PASSWORD: process.env.ADMIN_ANALYTICS_PASSWORD ? "✅ Present" : "❌ Missing"
        },
        database: { connected: false, error: null }
    };

    try {
        await prisma.$queryRaw`SELECT 1`;
        health.database.connected = true;
        health.status = "ok";
    } catch (err) {
        health.database.error = err.message;
        health.status = "error";
        console.error("❌ [HEALTH CHECK FAILED]:", err.message);
    }
    res.json(health);
});

// Added DB diagnostic route
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT 1 as connection_test`;
        res.json({ 
            success: true, 
            message: "Database connection successful!", 
            data: result,
            info: "Prisma client initialized and connected to Supabase."
        });
    } catch (error) {
        console.error("❌ [DB TEST FAILED]:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            hint: "Check your DATABASE_URL in Render. Ensure it includes ?sslmode=require"
        });
    }
});

// ==========================================
// RATE LIMITING
// ==========================================

// 1. Strict Limiter for Authentication (Brute Force Protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { message: "Too many login attempts. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
})

// 2. Moderate Limiter for Events (Scraping/Spam Protection)
const eventLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // Limit each IP to 30 requests per windowMs
    message: { message: "Too many requests. Please slow down." },
    standardHeaders: true,
    legacyHeaders: false,
})

// ==========================================
// AUTHENTICATION & JWT MIDDLEWARE
// ==========================================

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-prod';

// Standard login endpoint to issue JWT tokens
app.post("/api/login", authLimiter, (req, res) => {
    try {
        const { username, password, targetSlug } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        // Initialize variables to avoid ReferenceError
        let expectedPassword = '';
        let expectedUsername = '';
        let scope = 'admin';

        // Resilience: Fallback to 'admin' if ANALYTICS_USERNAME is missing from Render settings
        const adminUsername = process.env.ANALYTICS_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_ANALYTICS_PASSWORD || process.env.ANALYTICS_PASSWORD;

        if (targetSlug) {
            const slugUpper = targetSlug.toUpperCase().replace(/-/g, '_');
            expectedPassword = process.env[`${slugUpper}_ANALYTICS_PASSWORD`] || adminPassword;
            expectedUsername = adminUsername; 
            scope = targetSlug;
        } else if (username === adminUsername || username === 'admin' || username === 'menyu@admin') {
            expectedPassword = adminPassword;
            expectedUsername = username; 
            scope = 'admin';
        } else {
            logSecurityEvent(req, 'LOGIN_FAILED', { username, reason: 'Invalid scope' });
            return res.status(401).json({ message: "Unauthorized credentials. Please check your Render settings." });
        }

        // Safeguard: If no password is set in Render, deny login until it is configured
        if (!expectedPassword) {
            console.error("⚠️ [AUTH ERROR] ANALYTICS_PASSWORD is not set in Render environment variables.");
            return res.status(500).json({ 
                message: "Server configuration error: ANALYTICS_PASSWORD is missing in Render settings.",
                detail: "Check Render Environment Variables for ADMIN_ANALYTICS_PASSWORD"
            });
        }

        // Secure Comparison
        const isPasswordValid = bcrypt.compareSync(password, String(expectedPassword)) || (password === expectedPassword);
        const isUsernameValid = (username === expectedUsername) || (username === adminUsername) || (username === 'admin') || (username === 'menyu@admin');

        if (!isPasswordValid || !isUsernameValid) {
            logSecurityEvent(req, 'LOGIN_FAILED', { username, scope });
            return res.status(401).json({ message: "Invalid username or password. Please verify your credentials." });
        }

        // Generate token valid for 8 hours
        const tokenToken = jwt.sign({ username, scope }, JWT_SECRET, { expiresIn: '8h' });
        logSecurityEvent(req, 'LOGIN_SUCCESS', { username, scope });
        
        res.json({ token: tokenToken, scope });
    } catch (err) {
        console.error("❌ [LOGIN CRITICAL ERROR]:", err);
        res.status(500).json({ 
            message: "A server error occurred during login.",
            detail: err.message
        });
    }
});

// Middleware to protect routes
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: "Access denied. Token missing." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token." });
        req.user = user; // { username, scope, iat, exp }
        next();
    });
};

// Security event logger
function logSecurityEvent(req, event, details = {}) {
    const entry = {
        timestamp: new Date().toISOString(),
        event,
        ip: req.ip || req.connection?.remoteAddress || 'unknown',
        userAgent: req.get('user-agent') || 'unknown',
        ...details
    }
    const logLine = `[SECURITY] ${JSON.stringify(entry)}\n`
    console.log(logLine.trim())
    
    // Also write to a file for the dashboard
    try {
        const logPath = path.join(__dirname, 'security.log')
        fs.appendFileSync(logPath, logLine)
    } catch (e) {
        console.error("Failed to write to security log", e)
    }
}

app.get("/", (req, res) => {
    res.send("Menyu backend is alive")
})

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy" })
})

// ==========================================
// SECURITY MONITORING
// ==========================================
app.get("/api/admin/security-logs", verifyToken, (req, res) => {
    // Only 'admin' scope can view global security logs
    if (req.user.scope !== 'admin') {
        logSecurityEvent(req, 'LOG_VIEWER_FAILED', { username: req.user.username, reason: 'Insufficient scope' })
        return res.status(403).json({ message: "Forbidden" })
    }

    try {
        const logPath = path.join(__dirname, 'security.log')
        if (!fs.existsSync(logPath)) {
            return res.json({ logs: [] })
        }
        
        // Read file, split by lines, parse valid JSON lines, skip empty/invalid
        const rawLogs = fs.readFileSync(logPath, 'utf8')
        const logs = rawLogs.split('\n').filter(line => line.startsWith('[SECURITY] ')).map(line => {
            try {
                return JSON.parse(line.substring(11))
            } catch(e) { return null }
        }).filter(Boolean).reverse() // Newest first
        
        // Return latest 500 logs max
        res.json({ logs: logs.slice(0, 500) })
    } catch (e) {
        console.error("Log read error:", e)
        res.status(500).json({ message: "Failed to read logs" })
    }
})

app.post("/admin/restaurants", authLimiter, verifyToken, async (req, res) => {
    const { name } = req.body

    // Only 'admin' scope can create new restaurants
    if (req.user.scope !== 'admin') {
        logSecurityEvent(req, 'RESTAURANT_CREATE_FAILED', { username: req.user.username, name, reason: 'Insufficient scope' })
        return res.status(403).json({ message: "Forbidden" })
    }

    if (!name) {
        return res.status(400).json({ message: "Name is required" })
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-")

    try {
        const restaurant = await prisma.restaurant.create({
            data: { name, slug }
        })
        res.json(restaurant)
    } catch (err) {
        // Known case: unique constraint on slug
        if (err.code === 'P2002') {
            return res.status(400).json({ message: "Restaurant already exists" })
        }
        next(err)
    }
})

// ==========================================
// ANALYTICS — EVENT LOGGING
// ==========================================

// Log an order event (customer clicked "Order via WhatsApp")
app.post("/api/:slug/order", eventLimiter, async (req, res) => {
    try {
        const { slug } = req.params
        const { tableNumber, items, totalPrice } = req.body

        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items array is required" })
        }
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return res.status(400).json({ message: "Valid totalPrice is required" })
        }

        // Find restaurant
        const restaurant = await prisma.restaurant.findUnique({ where: { slug } })
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        // Create order event
        const order = await prisma.orderEvent.create({
            data: {
                restaurantId: restaurant.id,
                tableNumber: tableNumber || "unknown",
                items: items,
                totalPrice: totalPrice
            }
        })

        res.status(201).json({ message: "Order logged", id: order.id })
    } catch (err) {
        next(err)
    }
})

// Update payment status of an order (restaurant owner changes status)
app.post("/api/:slug/orders/:orderId/status", verifyToken, async (req, res) => {
    try {
        const { slug } = req.params
        const { orderId } = req.params
        const { status } = req.body

        // Scope protection: admin can edit anything, otherwise must match slug
        if (req.user.scope !== 'admin' && req.user.scope !== slug) {
            return res.status(403).json({ message: "Forbidden" })
        }

        // Validate status value
        const validStatuses = ["paid", "unpaid", "ignore"]
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be: paid, unpaid, or ignore" })
        }

        // Find restaurant
        const restaurant = await prisma.restaurant.findUnique({ where: { slug } })
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        // Verify the order belongs to this restaurant (IDOR protection)
        const order = await prisma.orderEvent.findUnique({ where: { id: orderId } })
        if (!order || order.restaurantId !== restaurant.id) {
            return res.status(404).json({ message: "Order not found for this restaurant" })
        }

        // Update the order's payment status
        const updatedOrder = await prisma.orderEvent.update({
            where: { id: orderId },
            data: { paymentStatus: status }
        })

        res.json({ message: "Status updated", id: updatedOrder.id, paymentStatus: updatedOrder.paymentStatus })
    } catch (err) {
        next(err)
    }
})

// Delete an order (restaurant owner removes an order from analytics)
app.post("/api/:slug/orders/:orderId/delete", verifyToken, async (req, res) => {
    try {
        const { slug, orderId } = req.params

        // Scope protection: admin can edit anything, otherwise must match slug
        if (req.user.scope !== 'admin' && req.user.scope !== slug) {
            return res.status(403).json({ message: "Forbidden" })
        }

        // Find restaurant
        const restaurant = await prisma.restaurant.findUnique({ where: { slug } })
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        // Verify the order belongs to this restaurant (IDOR protection)
        const order = await prisma.orderEvent.findUnique({ where: { id: orderId } })
        if (!order || order.restaurantId !== restaurant.id) {
            return res.status(404).json({ message: "Order not found for this restaurant" })
        }

        // Delete the order
        await prisma.orderEvent.delete({
            where: { id: orderId }
        })

        res.json({ message: "Order deleted", id: orderId })
    } catch (err) {
        if (err.code === "P2025") {
            return res.status(404).json({ message: "Order not found" })
        }
        next(err)
    }
})

// Log a payment event (customer clicked "Pay The Bill")
app.post("/api/:slug/payment", eventLimiter, async (req, res) => {
    try {
        const { slug } = req.params
        const { tableNumber, amount, items, orderIds } = req.body

        // Validate required fields
        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ message: "Valid amount is required" })
        }

        // Find restaurant
        const restaurant = await prisma.restaurant.findUnique({ where: { slug } })
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        // Create payment event
        const payment = await prisma.paymentEvent.create({
            data: {
                restaurantId: restaurant.id,
                tableNumber: tableNumber || "unknown",
                amount: amount,
                items: items || []
            }
        })

        res.status(201).json({ message: "Payment logged", id: payment.id })
    } catch (err) {
        next(err)
    }
})

// ==========================================
// EVENTS — LOG QR SCAN
// ==========================================

app.post("/api/:slug/scan", eventLimiter, async (req, res) => {
    try {
        const { slug } = req.params
        const { tableNumber } = req.body

        // Find restaurant
        const restaurant = await prisma.restaurant.findUnique({ where: { slug } })
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        // Create scan event
        await prisma.scanEvent.create({
            data: {
                restaurantId: restaurant.id,
                tableNumber: tableNumber ? String(tableNumber) : null
            }
        })

        res.status(200).json({ message: "Scan logged successfully" })
    } catch (err) {
        next(err)
    }
})

// ==========================================
// ADMIN ANALYTICS — GLOBAL DASHBOARD
// ==========================================

app.get("/api/admin/analytics", verifyToken, async (req, res) => {
    try {
        const { range, from, to } = req.query

        // Only 'admin' scope can view global analytics
        if (req.user.scope !== 'admin') {
            return res.status(403).json({ message: "Forbidden" })
        }

        // Calculate date range (IST = UTC+5:30)
        const now = new Date()
        let dateFrom, dateTo

        switch (range) {
            case "today": {
                dateFrom = new Date(now)
                dateFrom.setUTCHours(0 - 5, 30 - 30, 0, 0)
                if (dateFrom > now) dateFrom.setDate(dateFrom.getDate() - 1)

                dateTo = new Date(dateFrom)
                dateTo.setDate(dateTo.getDate() + 1)
                break
            }
            case "week": {
                dateTo = new Date(now)
                dateFrom = new Date(now)
                dateFrom.setDate(now.getDate() - 7)
                dateFrom.setUTCHours(0 - 5, 30 - 30, 0, 0)
                break
            }
            case "month": {
                dateTo = new Date(now)
                dateFrom = new Date(now)
                dateFrom.setDate(1)
                dateFrom.setUTCHours(0 - 5, 30 - 30, 0, 0)
                break
            }
            case "year": {
                dateTo = new Date(now)
                dateFrom = new Date(now)
                dateFrom.setMonth(0, 1)
                dateFrom.setUTCHours(0 - 5, 30 - 30, 0, 0)
                break
            }
            case "custom": {
                if (from && to) {
                    dateFrom = new Date(from)
                    dateFrom.setUTCHours(0 - 5, 30 - 30, 0, 0)
                    dateTo = new Date(to)
                    dateTo.setUTCHours(23 - 5, 59 - 30, 59, 999)
                } else {
                    return res.status(400).json({ message: "Custom range format error" })
                }
                break
            }
            default: {
                dateFrom = new Date(now)
                dateFrom.setUTCHours(0 - 5, 30 - 30, 0, 0)
                if (dateFrom > now) dateFrom.setDate(dateFrom.getDate() - 1)
            dateTo = new Date(dateFrom)
                dateTo.setDate(dateTo.getDate() + 1)
            }
        }

        const dateFilter = {
            gte: dateFrom,
            lt: dateTo
        }

        // 1. Get all restaurants
        const restaurants = await prisma.restaurant.findMany({
            select: { id: true, name: true, slug: true }
        })

        // 2. Aggregate data grouped by restaurantId

        // Orders
        const orderGroups = await prisma.orderEvent.groupBy({
            by: ['restaurantId'],
            where: { createdAt: dateFilter },
            _count: { id: true },
            _sum: { totalPrice: true }
        })

        // Payments
        const paymentGroups = await prisma.paymentEvent.groupBy({
            by: ['restaurantId'],
            where: { createdAt: dateFilter },
            _count: { id: true },
            _sum: { amount: true }
        })

        // Scans
        const scanGroups = await prisma.scanEvent.groupBy({
            by: ['restaurantId'],
            where: { createdAt: dateFilter },
            _count: { id: true }
        })

        // 3. Process the aggregated data
        const globalSummary = {
            totalScans: 0,
            totalOrders: 0,
            totalPayments: 0,
            totalOrderAmount: 0,
            totalPaymentAmount: 0
        }

        const restaurantData = restaurants.map(rest => {
            const ord = orderGroups.find(g => g.restaurantId === rest.id) || { _count: { id: 0 }, _sum: { totalPrice: 0 } }
            const pay = paymentGroups.find(g => g.restaurantId === rest.id) || { _count: { id: 0 }, _sum: { amount: 0 } }
            const sc = scanGroups.find(g => g.restaurantId === rest.id) || { _count: { id: 0 } }

            // Add to global summary
            globalSummary.totalScans += sc._count.id
            globalSummary.totalOrders += ord._count.id
            globalSummary.totalPayments += pay._count.id
            globalSummary.totalOrderAmount += (ord._sum.totalPrice || 0)
            globalSummary.totalPaymentAmount += (pay._sum.amount || 0)

            return {
                name: rest.name,
                slug: rest.slug,
                scans: sc._count.id,
                orders: ord._count.id,
                payments: pay._count.id,
                orderRevenue: ord._sum.totalPrice || 0,
                paymentAmount: pay._sum.amount || 0
            }
        })

        res.json({
            summary: globalSummary,
            restaurants: restaurantData,
            dateRange: {
                from: dateFrom.toISOString(),
                to: dateTo.toISOString(),
                range: range || "today"
            }
        })
    } catch (err) {
        next(err)
    }
})

// ==========================================
// ANALYTICS — QUERY ENDPOINT
// ==========================================

app.get("/api/:slug/analytics", verifyToken, async (req, res) => {
    try {
        const { slug } = req.params
        const { range, from, to } = req.query

        // Scope protection: admin can view anything, otherwise must match slug
        if (req.user.scope !== 'admin' && req.user.scope !== slug) {
            return res.status(403).json({ message: "Forbidden" })
        }

        // Find restaurant
        const restaurant = await prisma.restaurant.findUnique({ where: { slug } })
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        // Calculate date range (IST = UTC+5:30)
        const now = new Date()
        let dateFrom, dateTo

        // Helper: get start of today in IST (UTC+5:30) using epoch math (timezone-independent)
        function getISTMidnightUTC(date) {
            const istOffsetMs = 5.5 * 60 * 60 * 1000
            const msPerDay = 24 * 60 * 60 * 1000
            const istNowMs = date.getTime() + istOffsetMs
            const istMidnightMs = istNowMs - (istNowMs % msPerDay)
            return new Date(istMidnightMs - istOffsetMs)
        }

        switch (range) {
            case "today": {
                dateFrom = getISTMidnightUTC(now)
                dateTo = now
                break
            }
            case "week": {
                dateFrom = new Date(now)
                dateFrom.setDate(dateFrom.getDate() - 7)
                dateTo = now
                break
            }
            case "month": {
                dateFrom = new Date(now)
                dateFrom.setMonth(dateFrom.getMonth() - 1)
                dateTo = now
                break
            }
            case "year": {
                dateFrom = new Date(now)
                dateFrom.setFullYear(dateFrom.getFullYear() - 1)
                dateTo = now
                break
            }
            case "custom": {
                if (!from || !to) {
                    return res.status(400).json({ message: "Custom range requires 'from' and 'to' query params" })
                }
                dateFrom = new Date(from)
                dateTo = new Date(to)
                // Set dateTo to end of that day
                dateTo.setHours(23, 59, 59, 999)
                break
            }
            default: {
                dateFrom = getISTMidnightUTC(now)
                dateTo = now
                break
            }
        }

        // Query orders
        const orders = await prisma.orderEvent.findMany({
            where: {
                restaurantId: restaurant.id,
                createdAt: { gte: dateFrom, lte: dateTo }
            },
            orderBy: { createdAt: "desc" }
        })

        // Query payments
        const payments = await prisma.paymentEvent.findMany({
            where: {
                restaurantId: restaurant.id,
                createdAt: { gte: dateFrom, lte: dateTo }
            },
            orderBy: { createdAt: "desc" }
        })

        // Build response
        res.json({
            restaurant: { name: restaurant.name, slug: restaurant.slug },
            dateRange: {
                from: dateFrom.toISOString(),
                to: dateTo.toISOString(),
                range: range || "today"
            },
            summary: {
                totalOrders: orders.length,
                totalOrderAmount: orders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.totalPrice, 0),
                totalPayments: payments.length,
                totalPaymentAmount: payments.reduce((sum, p) => sum + p.amount, 0),
                unpaidAmount: orders.filter(o => o.paymentStatus === "unpaid").reduce((sum, o) => sum + o.totalPrice, 0),
                ignoredAmount: orders.filter(o => o.paymentStatus === "ignore").reduce((sum, o) => sum + o.totalPrice, 0)
            },
            orders: orders.map((o, i) => ({
                sno: i + 1,
                id: o.id,
                items: o.items,
                totalPrice: o.totalPrice,
                tableNumber: o.tableNumber,
                time: o.createdAt,
                paymentStatus: o.paymentStatus
            })),
            payments: payments.map((p, i) => ({
                sno: i + 1,
                amount: p.amount,
                items: p.items,
                tableNumber: p.tableNumber,
                time: p.createdAt
            }))
        })
    } catch (err) {
        next(err)
    }
})

app.get("/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params

        const restaurant = await prisma.restaurant.findUnique({
            where: { slug }
        })

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }

        res.json(restaurant)
    } catch (err) {
        next(err)
    }
})

// ==========================================
// SECURE REDIRECT ENDPOINTS
// ==========================================
// These endpoints decrypt sensitive data (WhatsApp, UPI) from
// encrypted .env values and return constructed URLs.
// Raw values are never sent in the response.

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

// Helper: get encrypted config for a restaurant slug
function getRestaurantSecrets(slug) {
    const slugUpper = slug.toUpperCase().replace(/-/g, '_')
    let whatsappEnc = process.env[`${slugUpper}_WHATSAPP_ENCRYPTED`]
    let upiEnc = process.env[`${slugUpper}_UPI_ENCRYPTED`]
    let whatsappPlain = process.env[`${slugUpper}_WHATSAPP`]
    let upiPlain = process.env[`${slugUpper}_UPI`]

    // Hardcoded bulletproof fallback for Paradise if no environment variables are set
    if (slug === 'paradise' && !whatsappEnc && !whatsappPlain) {
        whatsappPlain = '919381957903'
    }
    if (slug === 'paradise' && !upiEnc && !upiPlain) {
        upiPlain = '8008942741@ptsbi'
    }

    return { whatsappEnc, upiEnc, whatsappPlain, upiPlain }
}

// POST /api/:slug/whatsapp-redirect
// Body: { message: "formatted WhatsApp message" }
// Returns: { url: "https://wa.me/..." }
app.post("/api/:slug/whatsapp-redirect", (req, res) => {
    try {
        const { slug } = req.params
        const { message } = req.body

        if (!message) {
            return res.status(400).json({ message: "Message is required" })
        }

        const { whatsappEnc, whatsappPlain } = getRestaurantSecrets(slug)
        let whatsappNumber;

        // Try decryption first if configured
        if (ENCRYPTION_KEY && whatsappEnc) {
            try {
                whatsappNumber = decrypt(whatsappEnc, ENCRYPTION_KEY)
            } catch (err) {
                console.error(`Decryption error for ${slug}:`, err.message)
            }
        }

        // Fallback to plain text if decryption failed or was not configured
        if (!whatsappNumber && whatsappPlain) {
            whatsappNumber = whatsappPlain
        }

        if (!whatsappNumber) {
            const reason = !ENCRYPTION_KEY ? "Encryption not configured" : "Restaurant config not found"
            const slugUpper = slug.toUpperCase().replace(/-/g, '_')
            console.error(`[CONFIG ERROR] WhatsApp redirection failed for ${slug}: ${reason}`)
            console.error(`Check: ${slugUpper}_WHATSAPP_ENCRYPTED (secure) or ${slugUpper}_WHATSAPP (plain text) in your environment variables.`)
            return res.status(404).json({ message: `Could not open WhatsApp: ${reason}. Please ensure WhatsApp is set in Render Environment Variables.` })
        }

        const encoded = encodeURIComponent(message)
        const url = `https://wa.me/${whatsappNumber}?text=${encoded}`

        res.json({ url })
    } catch (err) {
        next(err)
    }
})

// POST /api/:slug/upi-redirect
// Body: { amount: 500, name: "Paradise" }
// Returns: { url: "upi://pay?pa=..." }
app.post("/api/:slug/upi-redirect", (req, res) => {
    try {
        const { slug } = req.params
        const { amount, name } = req.body

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Valid amount is required" })
        }

        const { upiEnc, upiPlain } = getRestaurantSecrets(slug)
        let upiId;

        // Try decryption first if configured
        if (ENCRYPTION_KEY && upiEnc) {
            try {
                upiId = decrypt(upiEnc, ENCRYPTION_KEY)
            } catch (err) {
                console.error(`Decryption error for ${slug}:`, err.message)
            }
        }

        // Fallback to plain text if decryption failed or was not configured
        if (!upiId && upiPlain) {
            upiId = upiPlain
        }

        if (!upiId) {
            const reason = !ENCRYPTION_KEY ? "Encryption not configured" : "Restaurant config not found"
            const slugUpper = slug.toUpperCase().replace(/-/g, '_')
            console.error(`[CONFIG ERROR] UPI redirection failed for ${slug}: ${reason}`)
            console.error(`Check: ${slugUpper}_UPI_ENCRYPTED (secure) or ${slugUpper}_UPI (plain text) in your environment variables.`)
            return res.status(404).json({ message: `Could not open UPI: ${reason}. Please ensure UPI ID is set in Render Environment Variables.` })
        }

        const url = `upi://pay?pa=${upiId}`
            + `&pn=${encodeURIComponent(name || slug)}`
            + `&am=${amount}`
            + `&cu=INR`

        res.json({ url })
    } catch (err) {
        next(err)
    }
})

// POST /api/admin/change-password
// Body: { username, currentPassword, newPassword }
app.post("/api/admin/change-password", authLimiter, async (req, res) => {
    console.log("Change password request received:", req.body.username);
    try {
        const { username, currentPassword, newPassword } = req.body

        if (!username || !currentPassword || !newPassword) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const analyticsUsername = process.env.ANALYTICS_USERNAME
        const analyticsPassword = process.env.ADMIN_ANALYTICS_PASSWORD || process.env.ANALYTICS_PASSWORD

        // 1. Validate current credentials
        const isUsernameValid = username === analyticsUsername
        const isPasswordValid = bcrypt.compareSync(currentPassword, analyticsPassword)

        if (!isUsernameValid || !isPasswordValid) {
            return res.status(401).json({ message: "Unauthorized. Invalid current username or password." })
        }

        // 2. Hash new password
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(newPassword, salt)

        // 3. Update .env file
        const envPath = path.join(__dirname, '.env')
        let envContent = fs.readFileSync(envPath, 'utf8')

        const adminPasswordRegex = /^ADMIN_ANALYTICS_PASSWORD=.*$/m
        if (envContent.match(adminPasswordRegex)) {
            envContent = envContent.replace(adminPasswordRegex, `ADMIN_ANALYTICS_PASSWORD="${passwordHash}"`)
        } else {
            envContent += `\nADMIN_ANALYTICS_PASSWORD="${passwordHash}"`
        }

        // Also update the legacy key for fallback
        const legacyPasswordRegex = /^ANALYTICS_PASSWORD=.*$/m
        if (envContent.match(legacyPasswordRegex)) {
            envContent = envContent.replace(legacyPasswordRegex, `ANALYTICS_PASSWORD="${passwordHash}"`)
        }

        fs.writeFileSync(envPath, envContent)

        // 4. Update in-memory values
        process.env.ADMIN_ANALYTICS_PASSWORD = passwordHash
        process.env.ANALYTICS_PASSWORD = passwordHash

        logSecurityEvent(req, 'PASSWORD_CHANGED', { username })
        res.json({ message: "Password updated successfully" })
    } catch (err) {
        logSecurityEvent(req, 'PASSWORD_CHANGE_FAILED', { username, error: err.message })
        next(err)
    }
})

// ==========================================
// FORGOT PASSWORD FLOW
// ==========================================

// Step 1: Verify Restaurant Name + Phone Number
app.post("/api/forgot-password/verify", authLimiter, async (req, res) => {
    try {
        const { restaurantName, phoneNumber } = req.body

        if (!restaurantName || !phoneNumber) {
            return res.status(400).json({ message: "Username/Restaurant name and phone number are required" })
        }

        let whatsappEnc = null;
        let target = null;

        // 1. Check if it's the global Admin
        if (restaurantName.toLowerCase() === 'admin' || restaurantName.toLowerCase() === 'menyu@admin') {
            whatsappEnc = process.env.ADMIN_WHATSAPP_ENCRYPTED;
            target = 'admin';
        } else {
            // 2. Find restaurant by name
            let restaurant = null;
            try {
                restaurant = await prisma.restaurant.findFirst({
                    where: { name: { equals: restaurantName, mode: 'insensitive' } }
                })
            } catch (err) {
                console.error(`[DB ERROR] Restaurant lookup failed:`, err.message);
                return res.status(500).json({ 
                    message: "Database connection error. Please ensure DATABASE_URL is set correctly in Render/Vercel settings." 
                });
            }

            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant or Admin user not found" })
            }

            const secrets = getRestaurantSecrets(restaurant.slug);
            whatsappEnc = secrets.whatsappEnc;
            target = restaurant.slug;
        }

        if (!whatsappEnc) {
            return res.status(404).json({ message: "Registered phone number config not found" })
        }

        // 3. Decrypt and verify
        let decryptedPhone = "";
        try {
            if (!ENCRYPTION_KEY) throw new Error("ENCRYPTION_KEY missing");
            decryptedPhone = decrypt(whatsappEnc, ENCRYPTION_KEY);
        } catch (err) {
            console.error(`[AUTH ERROR] Decryption failed for ${target}:`, err.message);
            return res.status(500).json({ 
                message: "Encryption configuration error. Please ensure ENCRYPTION_KEY is set correctly in Render/Vercel settings." 
            });
        }
        
        // Clean both numbers for comparison
        const cleanInput = phoneNumber.replace(/\D/g, '')
        const cleanStored = decryptedPhone.replace(/\D/g, '')

        if (!cleanInput || cleanInput !== cleanStored) {
            return res.status(401).json({ message: "Incorrect phone number" })
        }

        res.json({ message: "Verification successful", target })
    } catch (err) {
        next(err)
    }
})

// Step 2: Reset Password with Secret Code
app.post("/api/forgot-password/reset", authLimiter, async (req, res) => {
    try {
        const { secretCode, newPassword, target } = req.body

        if (!secretCode || !newPassword || !target) {
            return res.status(400).json({ message: "Secret code, target, and new password are required" })
        }

        // 1. Validate secret code (from env variable, not hardcoded)
        const validSecret = process.env.FORGOT_PASSWORD_SECRET
        if (!validSecret || secretCode !== validSecret) {
            return res.status(401).json({ message: "Invalid secret code" })
        }

        // 2. Hash new password
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(newPassword, salt)

        // 3. Update .env file and process.env
        const targetKey = target === 'admin' ? 'ADMIN_ANALYTICS_PASSWORD' : `${target.toUpperCase().replace(/-/g, '_')}_ANALYTICS_PASSWORD`;

        try {
            const envPath = path.join(__dirname, '.env');
            if (fs.existsSync(envPath)) {
                let envContent = fs.readFileSync(envPath, 'utf8');
                const passwordRegex = new RegExp(`^${targetKey}=.*$`, 'm');
                
                if (envContent.match(passwordRegex)) {
                    envContent = envContent.replace(passwordRegex, `${targetKey}="${passwordHash}"`);
                } else {
                    envContent += `\n${targetKey}="${passwordHash}"`;
                }

                if (target === 'admin') {
                    const legacyPasswordRegex = /^ANALYTICS_PASSWORD=.*$/m;
                    if (envContent.match(legacyPasswordRegex)) {
                        envContent = envContent.replace(legacyPasswordRegex, `ANALYTICS_PASSWORD="${passwordHash}"`);
                    }
                }
                fs.writeFileSync(envPath, envContent);
                console.log(`[AUTH] .env file updated for ${targetKey}`);
            }
        } catch (err) {
            console.warn(`[AUTH WARNING] Could not update .env file: ${err.message}. This is normal in read-only production environments.`);
        }

        // 4. Update in-memory process.env (ALWAYS update this so it works for the current session)
        process.env[targetKey] = passwordHash;
        if (target === 'admin') process.env.ANALYTICS_PASSWORD = passwordHash

        logSecurityEvent(req, 'PASSWORD_RESET_SUCCESS', { target })
        res.json({ message: "Password updated successfully" })
    } catch (err) {
        logSecurityEvent(req, 'PASSWORD_RESET_FAILED', { target, error: err.message })
        next(err)
    }
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    
    // Check for Prisma/Database connection errors
    const isDatabaseError = err.message.includes('prisma') || 
                           err.message.includes('connect') || 
                           err.code?.startsWith('P1') ||
                           err.code?.startsWith('P20');

    if (isDatabaseError) {
        return res.status(503).json({ 
            message: "Database connection error. Please ensure your DATABASE_URL is correct in Render.",
            detail: err.message
        });
    }

    res.status(500).json({ 
        message: "An unexpected error occurred. Please try again later." 
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});