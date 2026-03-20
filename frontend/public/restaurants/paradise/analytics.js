// ==========================================
// ANALYTICS CONFIG
// ==========================================

const analyticsConfig = {
    name: 'Paradise',
    slug: 'paradise',
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
// LOGIN AND FORGOT PASSWORD LOGIC REMOVED FOR DIRECT ACCESS
// ==========================================

function unlockDashboard(initialData) {
    // Hide login, show dashboard
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';

    // Initialize dashboard (Auth-related UI like Logout/ChangePW removed)
    initFilterButtons();
    initCustomDatePicker();
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
        sessionStorage.removeItem('menyu_admin_user');
        sessionStorage.removeItem('menyu_token');
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

    let url = `${analyticsConfig.apiBaseUrl}/${analyticsConfig.slug}/analytics?range=${range}`;
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
        const token = sessionStorage.getItem('menyu_token');
        const response = await fetch(
            `${analyticsConfig.apiBaseUrl}/api/${analyticsConfig.slug}/orders/${orderId}/status`,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
        const token = sessionStorage.getItem('menyu_token');
        const response = await fetch(
            `${analyticsConfig.apiBaseUrl}/api/${analyticsConfig.slug}/orders/${orderId}/delete`,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
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
    console.error("Frontend Error Handler:", err);
    const technicalKeywords = ['prisma', 'sql', 'database', 'stack', 'unexpected token', 'json', 'http'];
    const msg = (err.message || "").toLowerCase();
    
    if (technicalKeywords.some(kw => msg.includes(kw))) {
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
