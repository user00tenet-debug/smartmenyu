// ==========================================
// ANALYTICS CONFIG
// ==========================================

const analyticsConfig = {
    name: 'Paradise',
    slug: 'paradise',
    apiBaseUrl: '' // Uses relative paths through Next.js rewrites
};

// ==========================================
// STATE
// ==========================================

let currentRange = 'today';
let currentData = null;
let storedUsername = sessionStorage.getItem('smartmenyu_admin_user') || '';
let storedPassword = sessionStorage.getItem('menyu_admin_pass') || '';
let currentCaptcha = '';

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated or just show login
    if (storedUsername && sessionStorage.getItem('smartmenyu_token')) {
        unlockDashboard();
    } else {
        initLogin();
    }
});

// ==========================================
// LOGIN
// ==========================================

function initLogin() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    // Reset button state
    loginBtn.textContent = 'Login';
    loginBtn.disabled = false;

    // Prevent duplicate event listeners
    if (!loginBtn.dataset.initialized) {
        loginBtn.dataset.initialized = 'true';
        loginBtn.addEventListener('click', () => simplifiedLogin());
    }
}

async function simplifiedLogin() {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.textContent = 'Connecting...';
    loginBtn.disabled = true;

    try {
        unlockDashboard();
    } catch (err) {
        console.error('Login failed:', err);
        const loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.textContent = 'Failed to load dashboard. Please try again.';
            loginError.style.display = 'block';
        }
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
    }
}

// ==========================================
// CAPTCHA
// ==========================================

function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    drawCaptcha(captcha);
    const captchaInput = document.getElementById('captchaInput');
    if (captchaInput) captchaInput.value = '';
}

function drawCaptcha(text) {
    const canvas = document.getElementById('captchaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#faf6ef';
    ctx.fillRect(0, 0, w, h);

    // Draw noise lines
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random()*150}, ${Math.random()*150}, ${Math.random()*150}, 0.4)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * w, Math.random() * h);
        ctx.lineTo(Math.random() * w, Math.random() * h);
        ctx.stroke();
    }

    // Draw noise dots
    for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(${Math.random()*200}, ${Math.random()*200}, ${Math.random()*200}, 0.5)`;
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw each character with slight rotation and offset
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < text.length; i++) {
        ctx.save();
        const x = 20 + i * 28;
        const y = h / 2 + (Math.random() * 8 - 4);
        const angle = (Math.random() - 0.5) * 0.4;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = `hsl(${Math.random()*60 + 15}, 60%, ${Math.random()*20 + 25}%)`;
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }
}

// attemptLogin and initForgotPassword removed in favor of simplifiedLogin

function unlockDashboard(initialData) {
    // Hide login, show dashboard
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';

    // Initialize dashboard
    initFilterButtons();
    initCustomDatePicker();
    initLogoutButton();
    initDataTabs();

    // If we already have data from login, render it. Otherwise fetch.
    if (initialData) {
        renderDashboard(initialData);
    } else {
        fetchAnalytics('today');
    }
}

// ==========================================
// LOGOUT
// ==========================================

function initLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn || logoutBtn.dataset.initialized) return;
    logoutBtn.dataset.initialized = 'true';

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('smartmenyu_admin_user');
        sessionStorage.removeItem('smartmenyu_token');
        storedUsername = '';
        storedPassword = '';
        document.getElementById('dashboardContent').style.display = 'none';
        document.getElementById('loginOverlay').style.display = 'flex';
        const loginError = document.getElementById('loginError');
        if (loginError) loginError.style.display = 'none';
        initLogin();
    });
}

// Change password logic removed as per user request

// ==========================================
// FILTER BUTTONS
// ==========================================

function initFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const range = btn.dataset.range;

            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide custom date picker
            const customRow = document.getElementById('customDateRow');
            if (range === 'custom') {
                customRow.style.display = 'flex';
                return; // Don't fetch yet, wait for Apply
            } else {
                customRow.style.display = 'none';
            }

            currentRange = range;
            fetchAnalytics(range);
        });
    });
}

// ==========================================
// CUSTOM DATE PICKER
// ==========================================

function initCustomDatePicker() {
    const applyBtn = document.getElementById('applyCustomDate');
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');

    // Default to today
    const today = new Date().toISOString().split('T')[0];
    dateFrom.value = today;
    dateTo.value = today;

    applyBtn.addEventListener('click', () => {
        const from = dateFrom.value;
        const to = dateTo.value;

        if (!from || !to) {
            alert('Please select both From and To dates.');
            return;
        }

        if (new Date(from) > new Date(to)) {
            alert('From date cannot be after To date.');
            return;
        }

        currentRange = 'custom';
        fetchAnalytics('custom', from, to);
    });
}

// ==========================================
// FETCH ANALYTICS
// ==========================================

async function fetchAnalytics(range, from, to) {
    showLoading(true);
    hideEmpty();
    hideTables();

    let url = `${analyticsConfig.apiBaseUrl}/api/${analyticsConfig.slug}/analytics?range=${range}`;
    if (range === 'custom' && from && to) {
        url += `&from=${from}&to=${to}`;
    }

    try {
        const token = sessionStorage.getItem('smartmenyu_token');
        const fetchOptions = { 
            headers: { 'Authorization': `Bearer ${token}` },
            credentials: 'include'
        };
        const response = await fetch(url, fetchOptions);

        if (response.status === 401 || response.status === 403) {
            console.warn('Authentication failed (401/403). Backend might still be locked.');
            showLoading(false);
            showEmpty(); // Show empty state instead of redirecting
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        currentData = data;

        showLoading(false);
        renderDashboard(data);
    } catch (err) {
        console.error('Failed to fetch analytics:', err);
        showLoading(false);
        showEmpty();
    }
}

// ==========================================
// RENDER DASHBOARD
// ==========================================

function renderDashboard(data) {
    // Update summary cards
    document.getElementById('totalOrders').textContent = data.summary.totalOrders;
    document.getElementById('totalPaymentAmount').textContent = '₹' + data.summary.totalOrderAmount.toLocaleString('en-IN');

    // Update paid/unpaid/ignored amounts if elements exist
    const paidAmtEl = document.getElementById('paidOrderAmount');
    const unpaidAmtEl = document.getElementById('unpaidOrderAmount');
    const ignoredAmtEl = document.getElementById('ignoredOrderAmount');
    if (paidAmtEl) paidAmtEl.textContent = '₹' + data.summary.totalOrderAmount.toLocaleString('en-IN');
    if (unpaidAmtEl) unpaidAmtEl.textContent = '₹' + (data.summary.unpaidAmount || 0).toLocaleString('en-IN');
    if (ignoredAmtEl) ignoredAmtEl.textContent = '₹' + (data.summary.ignoredAmount || 0).toLocaleString('en-IN');

    // Check if there's any data
    if (data.orders.length === 0) {
        showEmpty();
        return;
    }

    // Update counts on tab buttons
    document.getElementById('ordersCount').textContent = data.orders.length + ' order' + (data.orders.length > 1 ? 's' : '');

    // Render orders table and items analytics
    renderOrdersTable(data.orders);
    renderItemsAnalytics(data.orders);

    // Show the tabs section, default to orders tab
    document.getElementById('dataTabsSection').style.display = 'block';
    switchDataTab('orders');
}

// ==========================================
// RENDER ORDERS TABLE
// ==========================================

function renderOrdersTable(orders) {
    const tbody = document.getElementById('ordersBody');
    tbody.innerHTML = orders.map(order => {
        const itemsHtml = formatOrderItems(order.items);
        const time = formatTime(order.time);
        const status = order.paymentStatus || 'unpaid';
        const isDelivery = order.tableNumber === 'Home Delivery';
        const orderType = isDelivery ? 'Home Delivery' : 'Dine In';
        const tableDisplay = isDelivery ? '-' : order.tableNumber;
        const prefix = isDelivery ? '#H' : '#';
        const shortId = order.id ? prefix + order.id.slice(-8).toUpperCase() : '#--------';

        return `
            <tr>
                <td class="sno-cell">${order.sno}</td>
                <td><div class="order-items">${itemsHtml}</div></td>
                <td class="total-cell">₹${order.totalPrice.toLocaleString('en-IN')}</td>
                <td class="type-cell" style="font-weight: 600; color: ${isDelivery ? '#f59e0b' : '#3b82f6'};">${orderType}</td>
                <td class="table-cell" style="text-align: center;">${escapeHtml(tableDisplay)}</td>
                <td class="status-cell">
                    <select class="status-select status-${status}" data-order-id="${escapeHtml(order.id)}" onchange="updateOrderStatus(this)">
                        <option value="paid"${status === 'paid' ? ' selected' : ''}>Paid</option>
                        <option value="unpaid"${status === 'unpaid' ? ' selected' : ''}>Unpaid</option>
                        <option value="ignore"${status === 'ignore' ? ' selected' : ''}>Ignore</option>
                    </select>
                </td>
                <td class="time-cell">${time}</td>
                <td class="id-cell" style="font-family: monospace; font-weight: 600; color: var(--color-text-muted);">${escapeHtml(shortId)}</td>
                <td class="action-cell">
                    <button class="order-delete-btn" onclick="deleteOrder('${escapeHtml(order.id)}')" title="Delete order">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M9 6V4h6v2"></path>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

async function updateOrderStatus(selectEl) {
    const orderId = selectEl.dataset.orderId;
    const newStatus = selectEl.value;

    // Update CSS class immediately for visual feedback
    selectEl.className = 'status-select status-' + newStatus;
    selectEl.disabled = true;

    try {
        const token = sessionStorage.getItem('smartmenyu_token');
        const response = await fetch(
            `${analyticsConfig.apiBaseUrl}/api/${analyticsConfig.slug}/orders/${orderId}/status`,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        // Re-fetch analytics to update summary cards
        selectEl.disabled = false;
        fetchAnalytics(currentRange,
            currentRange === 'custom' ? document.getElementById('dateFrom').value : undefined,
            currentRange === 'custom' ? document.getElementById('dateTo').value : undefined
        );
    } catch (err) {
        console.error('Failed to update status:', err);
        selectEl.disabled = false;
        // Revert on error — re-fetch to get actual state
        fetchAnalytics(currentRange,
            currentRange === 'custom' ? document.getElementById('dateFrom').value : undefined,
            currentRange === 'custom' ? document.getElementById('dateTo').value : undefined
        );
    }
}

// ==========================================
// DELETE ORDER
// ==========================================

async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order? This cannot be undone.')) {
        return;
    }

    try {
        const token = sessionStorage.getItem('smartmenyu_token');
        const response = await fetch(
            `${analyticsConfig.apiBaseUrl}/api/${analyticsConfig.slug}/orders/${orderId}/delete`,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        // Re-fetch analytics to update dashboard
        fetchAnalytics(currentRange,
            currentRange === 'custom' ? document.getElementById('dateFrom').value : undefined,
            currentRange === 'custom' ? document.getElementById('dateTo').value : undefined
        );
    } catch (err) {
        console.error('Failed to delete order:', err);
        alert('Failed to delete order. Please try again.');
    }
}


// ==========================================
// UTILITIES
// ==========================================

function escapeHtml(unsafe) {
    if (!unsafe || typeof unsafe !== 'string') return unsafe;
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function getErrorMessage(err, defaultMsg = "An unexpected error occurred. Please try again.") {
    console.error("🔍 Audit Log:", err);
    
    // 1. Handle Network Errors (Browser-level)
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        return "Network Error: Could not reach backend server. Please check your internet or if the server is down.";
    }

    // 2. Handle known friendly phrases from backend
    const friendlyPhrases = ['database connection error', 'render environment variables', 'missing in render'];
    const lowerMsg = (err.message || "").toLowerCase();
    const lowerDefault = (defaultMsg || "").toLowerCase();

    if (friendlyPhrases.some(p => lowerMsg.includes(p) || lowerDefault.includes(p))) {
        return err.message || defaultMsg;
    }

    // 3. Mask technical details for unknown errors
    const technicalKeywords = ['prisma', 'sql', 'stack', 'unexpected token', 'json', 'near', 'syntax'];
    if (technicalKeywords.some(kw => lowerMsg.includes(kw))) {
        return defaultMsg;
    }
    
    return err.message || defaultMsg;
}

// ==========================================
// HELPERS
// ==========================================

function formatOrderItems(items) {
    if (!Array.isArray(items)) return '<span class="order-item-line">—</span>';

    return items.map(item => {
        const name = escapeHtml(item.name) || escapeHtml(item.title) || 'Unknown';
        const qty = escapeHtml(String(item.qty || 1));
        const price = escapeHtml(String(item.price || ''));
        return `<span class="order-item-line">${name} × ${qty} <span class="item-price">${price}</span></span>`;
    }).join('');
}

function formatTime(isoString) {
    if (!isoString) return '—';
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString('en-IN', { month: 'short' });
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;

    return `${day} ${month} ${date.getFullYear()}, ${displayHour}:${minutes} ${ampm}`;
}

// ==========================================
// UI STATE HELPERS
// ==========================================

function showLoading(show) {
    document.getElementById('loadingState').style.display = show ? 'flex' : 'none';
}

function showEmpty() {
    document.getElementById('emptyState').style.display = 'flex';
}

function hideEmpty() {
    document.getElementById('emptyState').style.display = 'none';
}

function hideTables() {
    document.getElementById('dataTabsSection').style.display = 'none';
    document.getElementById('ordersSection').style.display = 'none';
    document.getElementById('itemsSection').style.display = 'none';
}

// ==========================================
// DATA TABS (Orders / Items Analytics)
// ==========================================

function initDataTabs() {
    const tabs = document.querySelectorAll('.data-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchDataTab(tab.dataset.tab);
        });
    });
}

function switchDataTab(tabName) {
    // Update active tab button
    const tabs = document.querySelectorAll('.data-tab');
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.data-tab[data-tab="${tabName}"]`);
    if (activeTab) activeTab.classList.add('active');

    // Toggle tab content
    document.getElementById('ordersSection').style.display = tabName === 'orders' ? 'block' : 'none';
    document.getElementById('itemsSection').style.display = tabName === 'items' ? 'block' : 'none';
}

// ==========================================
// ITEMS ANALYTICS
// ==========================================

function renderItemsAnalytics(orders) {
    // Aggregate items from all orders
    const itemCounts = {};

    orders.forEach(order => {
        if (!Array.isArray(order.items)) return;
        order.items.forEach(item => {
            const name = item.name || item.title || 'Unknown';
            const qty = item.qty || 1;
            if (itemCounts[name]) {
                itemCounts[name] += qty;
            } else {
                itemCounts[name] = qty;
            }
        });
    });

    // Convert to array and sort by times ordered (descending)
    const sorted = Object.entries(itemCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    // Render table
    const tbody = document.getElementById('itemsBody');
    tbody.innerHTML = sorted.map((item, i) => `
        <tr>
            <td class="sno-cell">${i + 1}</td>
            <td>${escapeHtml(item.name)}</td>
            <td class="total-cell"><strong>${item.count}</strong></td>
        </tr>
    `).join('');
}
