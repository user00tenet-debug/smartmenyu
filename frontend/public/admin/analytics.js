// ==========================================
// ADMIN ANALYTICS CONFIG
// ==========================================

const analyticsConfig = {
    apiBaseUrl: '/api'
};

// ==========================================
// STATE
// ==========================================

let currentRange = 'today';
let currentData = null;
let currentCaptcha = '';

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Bypass login check for direct access
    unlockDashboard();
});

// ==========================================

function unlockDashboard(initialData) {
    // Hide login, show dashboard
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';

    // Initialize dashboard (Auth-related UI like Logout/ChangePW removed)
    initFilterButtons();
    initCustomDatePicker();

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
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginError').style.display = 'none';
        document.getElementById('captchaInput').value = '';
        initLogin();
    });
}

// ==========================================
// CHANGE PASSWORD
// ==========================================

function initChangePasswordModal() {
    const changePwBtn = document.getElementById('changePwBtn');
    const modal = document.getElementById('changePasswordModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const saveBtn = document.getElementById('savePasswordBtn');
    
    const currentPwInput = document.getElementById('currentPassword');
    const newPwInput = document.getElementById('newPassword');
    const confirmPwInput = document.getElementById('confirmPassword');
    
    const errorMsg = document.getElementById('modalError');
    const successMsg = document.getElementById('modalSuccess');

    if (!changePwBtn) return;

    // Password strength checker for change password modal
    saveBtn.disabled = true;
    newPwInput.addEventListener('input', () => {
        const allPassed = checkPasswordStrength(newPwInput.value, 'modal');
        saveBtn.disabled = !allPassed;
    });

    changePwBtn.addEventListener('click', () => {
        errorMsg.style.display = 'none';
        successMsg.style.display = 'none';
        currentPwInput.value = '';
        newPwInput.value = '';
        confirmPwInput.value = '';
        // Reset strength UI
        const strengthEl = document.getElementById('modalPwStrength');
        if (strengthEl) strengthEl.style.display = 'none';
        saveBtn.disabled = true;
        modal.style.display = 'flex';
        currentPwInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    saveBtn.addEventListener('click', () => saveNewPassword());
}

async function saveNewPassword() {
    const currentPwInput = document.getElementById('currentPassword');
    const newPwInput = document.getElementById('newPassword');
    const confirmPwInput = document.getElementById('confirmPassword');
    const saveBtn = document.getElementById('savePasswordBtn');
    const errorMsg = document.getElementById('modalError');
    const successMsg = document.getElementById('modalSuccess');

    const currentPw = currentPwInput.value.trim();
    const newPw = newPwInput.value.trim();
    const confirmPw = confirmPwInput.value.trim();

    // 1. Validation
    if (!currentPw || !newPw || !confirmPw) {
        errorMsg.textContent = 'Please fill in all fields.';
        errorMsg.style.display = 'block';
        return;
    }

    if (newPw !== confirmPw) {
        errorMsg.textContent = 'New passwords do not match.';
        errorMsg.style.display = 'block';
        return;
    }

    if (!checkPasswordStrength(newPw, 'modal')) {
        errorMsg.textContent = 'Password does not meet the policy requirements.';
        errorMsg.style.display = 'block';
        return;
    }

    // 2. API Call
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    errorMsg.style.display = 'none';

    try {
        const token = sessionStorage.getItem('menyu_token');
        const response = await fetch(`${analyticsConfig.apiBaseUrl}/api/admin/change-password`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: storedUsername,
                currentPassword: currentPw,
                newPassword: newPw
            })
        });

        const result = await response.json();

        if (!response.ok) {
            errorMsg.textContent = result.message || `Error ${response.status}: Failed to update password.`;
            errorMsg.style.display = 'block';
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Changes';
            return;
        }

        // 3. Success
        successMsg.style.display = 'block';

        setTimeout(() => {
            document.getElementById('changePasswordModal').style.display = 'none';
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save Changes';
        }, 1500);

    } catch (err) {
        console.error('Change password error:', err);
        errorMsg.textContent = getErrorMessage(err, 'Network error or server unreachable. Please check your connection and try again.');
        errorMsg.style.display = 'block';
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
    }
}

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

    let url = `${analyticsConfig.apiBaseUrl}/admin/analytics?range=${range}`;
    if (range === 'custom' && from && to) {
        url += `&from=${from}&to=${to}`;
    }

    try {
        const response = await fetch(url);

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
                    const pollRes = await fetch(url);
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
    console.error("Frontend Error Handler:", err);
    
    // If the error message already looks user-friendly (like our specific DB error), return it
    const friendlyPhrases = ['database connection error', 'render environment variables', 'missing in render'];
    const lowerMsg = (err.message || "").toLowerCase();
    const lowerDefault = (defaultMsg || "").toLowerCase();

    if (friendlyPhrases.some(p => lowerMsg.includes(p) || lowerDefault.includes(p))) {
        return err.message || defaultMsg;
    }

    // Mask technical details: if message contains keywords like 'Prisma', 'SQL', etc.
    const technicalKeywords = ['prisma', 'sql', 'stack', 'unexpected token', 'json', 'http'];
    
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
