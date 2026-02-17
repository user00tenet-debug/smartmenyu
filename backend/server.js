console.log("Starting server file")
require("dotenv/config")

const express = require("express")
const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")

// Connect to Supabase PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Menyu backend is alive")
})

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy" })
})

app.post("/admin/restaurants", async (req, res) => {
    const { name } = req.body

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
        res.status(400).json({ message: "Restaurant already exists" })
    }
})

app.get("/:slug", async (req, res) => {
    const { slug } = req.params

    const restaurant = await prisma.restaurant.findUnique({
        where: { slug }
    })

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" })
    }

    res.json(restaurant)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})