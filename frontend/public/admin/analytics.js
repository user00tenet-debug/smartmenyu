// ==========================================
// ADMIN ANALYTICS CONFIG
// ==========================================

const analyticsConfig = {
    apiBaseUrl: '', // Uses relative paths through Next.js rewrites
};

// ==========================================
// STATE
// ==========================================

let currentRange = 'today';
let currentData = null;
let storedUsername = sessionStorage.getItem('smartmenyu_admin_user') || '';
let storedPassword = sessionStorage.getItem('smartmenyu_admin_pass') || '';
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

    // For now, we just unlock. In a real scenario, we might still 
    // want to fetch initial data if the backend is unlocked.
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

// Forgot password logic removed as per user request

function unlockDashboard(initialData) {
    // Hide login, show dashboard
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';

    // Initialize dashboard
    initFilterButtons();
    initCustomDatePicker();
    initLogoutButton();

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

    let url = `${analyticsConfig.apiBaseUrl}/api/admin/analytics?range=${range}`;
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

        // Auto-refresh: Poll backend every 10s for live payments/orders updates.
        // We only start polling if we aren't currently custom ranging (for simplicity).
        if (window.analyticsPollInterval) clearInterval(window.analyticsPollInterval);

        if (range !== 'custom') {
            window.analyticsPollInterval = setInterval(async () => {
                try {
                    const pollRes = await fetch(url, fetchOptions);
                    if (pollRes.ok) {
                        const pollData = await pollRes.json();
                        currentData = pollData;
                        renderDashboard(pollData); // Silent update (no loading spinner)
                    }
                } catch (e) {
                    console.error('Background polling failed:', e);
                }
            }, 10000);
        }

    } catch (err) {
        console.error('Failed to fetch admin analytics:', err);
        showLoading(false);
        // Show empty or custom error UI if needed, but keep it user-friendly
        showEmpty();
    }
}

// ==========================================
// RENDER DASHBOARD
// ==========================================

function renderDashboard(data) {
    const { summary, restaurants } = data;

    // Update global summary cards
    document.getElementById('totalScans').textContent = summary.totalScans.toLocaleString('en-IN');
    document.getElementById('totalOrders').textContent = summary.totalOrders.toLocaleString('en-IN');
    document.getElementById('totalPayments').textContent = summary.totalPayments.toLocaleString('en-IN');

    // Check if there's any data
    if (summary.totalScans === 0 && summary.totalOrders === 0 && summary.totalPayments === 0) {
        showEmpty();
        return;
    }

    // Render restaurant breakdown table
    if (restaurants && restaurants.length > 0) {

        // Filter out specific demo restaurants
        const filteredRestaurants = restaurants.filter(rest => {
            const name = rest.name.toLowerCase();
            return name !== 'chicken biryani' && name !== 'chicken bhiryani' && name !== 'kfc';
        });

        if (filteredRestaurants.length > 0) {
            document.getElementById('restaurantSection').style.display = 'block';
            document.getElementById('restaurantCount').textContent = filteredRestaurants.length + ' active';
            document.getElementById('totalVenues').textContent = filteredRestaurants.length.toLocaleString('en-IN');

            // Sort restaurants by order revenue descending
            const sortedRestaurants = [...filteredRestaurants].sort((a, b) => b.orderRevenue - a.orderRevenue);
            renderRestaurantTable(sortedRestaurants);
        } else {
            document.getElementById('restaurantSection').style.display = 'none';
        }
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
// RENDER RESTAURANT TABLE
// ==========================================

function renderRestaurantTable(restaurants) {
    const tbody = document.getElementById('restaurantBody');
    tbody.innerHTML = restaurants.map((rest, index) => {
        return `
            <tr>
                <td style="font-weight: 500;">${index + 1}</td>
                <td style="font-weight: 600; color: var(--color-primary-dark);">${escapeHtml(rest.name)}</td>
                <td>${rest.scans.toLocaleString('en-IN')}</td>
                <td>${rest.orders.toLocaleString('en-IN')}</td>
            </tr>
        `;
    }).join('');
}

// ==========================================
// UI STATE HELPERS
// ==========================================

function showLoading(show) {
    document.getElementById('loadingState').style.display = show ? 'flex' : 'none';
    if (show) {
        document.getElementById('summarySection').style.opacity = '0.5';
    } else {
        document.getElementById('summarySection').style.opacity = '1';
    }
}

function showEmpty() {
    document.getElementById('emptyState').style.display = 'flex';
    document.getElementById('summarySection').style.display = 'none';
}

function hideEmpty() {
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('summarySection').style.display = 'block';
}

function hideTables() {
    document.getElementById('restaurantSection').style.display = 'none';
}
