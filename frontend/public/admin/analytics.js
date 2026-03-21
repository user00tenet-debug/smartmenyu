// ==========================================
// ADMIN ANALYTICS CONFIG
// ==========================================

const analyticsConfig = {
    apiBaseUrl: 'https://smartmenyu.onrender.com/api'
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
    // Check if already authenticated in this session
    if (storedUsername && storedPassword) {
        unlockDashboard();
    } else {
        initLogin();
        initForgotPassword();
    }
});

// ==========================================
// LOGIN
// ==========================================

function initLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const captchaInput = document.getElementById('captchaInput');
    const loginError = document.getElementById('loginError');

    // Reset button state
    loginBtn.textContent = 'Unlock Dashboard';
    loginBtn.disabled = false;

    // Prevent duplicate event listeners on re-init (after logout)
    if (!loginBtn.dataset.initialized) {
        loginBtn.dataset.initialized = 'true';
        loginBtn.addEventListener('click', () => attemptLogin());

        // Allow Enter key to submit
        [usernameInput, passwordInput, captchaInput].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') attemptLogin();
            });
        });

        // Refresh captcha button
        const refreshBtn = document.getElementById('refreshCaptcha');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => generateCaptcha());
        }
    }

    // Generate initial captcha
    generateCaptcha();

    // Focus the first empty field
    if (!usernameInput.value) {
        usernameInput.focus();
    } else {
        passwordInput.focus();
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

async function attemptLogin() {
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const captchaInput = document.getElementById('captchaInput');
    const captchaValue = captchaInput ? captchaInput.value.trim() : '';

    if (!username) {
        usernameInput.focus();
        return;
    }
    if (!password) {
        passwordInput.focus();
        return;
    }
    if (captchaValue !== currentCaptcha) {
        loginError.textContent = 'Invalid captcha. Please try again.';
        loginError.style.display = 'block';
        if (captchaInput) {
            captchaInput.classList.add('shake');
            setTimeout(() => captchaInput.classList.remove('shake'), 400);
            captchaInput.value = '';
            captchaInput.focus();
        }
        generateCaptcha();
        loginBtn.textContent = 'Unlock Dashboard';
        loginBtn.disabled = false;
        return;
    }

    // Disable button while checking
    loginBtn.textContent = 'Checking...';
    loginBtn.disabled = true;

    try {
        // Step 1: Login to get JWT Token
        const loginUrl = `${analyticsConfig.apiBaseUrl}/api/login`;
        const loginResponse = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (loginResponse.status === 401 || loginResponse.status === 403) {
            // Wrong password
            loginError.style.display = 'block';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 400);
            passwordInput.value = '';
            passwordInput.focus();
            generateCaptcha();
            loginBtn.textContent = 'Unlock Dashboard';
            loginBtn.disabled = false;
            return;
        }

        if (!loginResponse.ok) {
            throw new Error(`HTTP ${loginResponse.status}`);
        }

        const loginData = await loginResponse.json();
        const token = loginData.token;

        // Credentials correct — save token and unlock
        storedUsername = username; // Keep username for UI purposes
        sessionStorage.setItem('smartmenyu_admin_user', username);
        sessionStorage.setItem('smartmenyu_token', token);

        // Step 2: Fetch the analytics data using the new token
        const dataUrl = `${analyticsConfig.apiBaseUrl}/api/admin/analytics?range=today`;
        const dataResponse = await fetch(dataUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!dataResponse.ok) throw new Error('Failed to fetch data');

        const data = await dataResponse.json();
        currentData = data;

        unlockDashboard(data);
    } catch (err) {
        console.error('Login failed:', err);
        
        // Try to get JSON error message if available
        let displayMsg = 'Connection error. Try again.';
        if (err.response && err.response.headers.get('content-type')?.includes('application/json')) {
            try {
                const errorData = await err.response.json();
                displayMsg = errorData.message || displayMsg;
            } catch (jsonErr) {}
        }

        loginError.textContent = getErrorMessage(err, displayMsg);
        loginError.style.display = 'block';
        loginBtn.textContent = 'Unlock Dashboard';
        loginBtn.disabled = false;
    }
}

// ==========================================
// PASSWORD STRENGTH CHECKER (shared)
// ==========================================

function checkPasswordStrength(pw, prefix) {
    const rules = {
        '8': pw.length >= 8,
        'Upper': /[A-Z]/.test(pw),
        'Lower': /[a-z]/.test(pw),
        'Num': /[0-9]/.test(pw),
        'Special': /[^A-Za-z0-9]/.test(pw)
    };

    let passed = 0;
    for (const [key, ok] of Object.entries(rules)) {
        const li = document.getElementById(prefix + 'Rule' + key);
        if (li) {
            li.textContent = (ok ? '✓ ' : '✗ ') + li.textContent.replace(/^[✓✗]\s*/, '');
            li.classList.toggle('pass', ok);
        }
        if (ok) passed++;
    }

    // Determine strength level
    let level = 'weak';
    if (passed >= 5) level = 'strong';
    else if (passed >= 3) level = 'medium';

    // Update strength bar fill
    const fill = document.getElementById(prefix + 'PwStrengthFill');
    if (fill) {
        fill.className = 'pw-strength-fill ' + level;
    }

    // Update strength label
    const label = document.getElementById(prefix + 'PwStrengthLabel');
    if (label) {
        label.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        label.className = 'pw-strength-label ' + level;
    }

    // Show/hide the strength container
    const container = document.getElementById(prefix + 'PwStrength');
    if (container) {
        container.style.display = pw.length > 0 ? 'block' : 'none';
    }

    return passed === 5;
}

// ==========================================
// FORGOT PASSWORD
// ==========================================

function initForgotPassword() {
    const forgotPwLink = document.getElementById('forgotPwLink');
    const resetPwBtn = document.getElementById('resetPwBtn');

    const loginCard = document.querySelector('#loginOverlay .login-card:not([id])') || document.querySelector('#loginOverlay .login-card:first-child');
    const step2Card = document.getElementById('forgotStep2');

    let resetTarget = 'admin'; // Default fallback

    if (!forgotPwLink) return;

    // 1. Show Step 2 Directly (Bypass Step 1)
    forgotPwLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.style.display = 'none';
        step2Card.style.display = 'block';
        document.getElementById('forgotSecretCode').focus();
    });

    // 2. Back to Login (From Step 2)
    const backFromStep2Btn = document.createElement('button');
    backFromStep2Btn.className = 'login-btn btn-secondary';
    backFromStep2Btn.style.background = '#e5e7eb';
    backFromStep2Btn.style.color = '#374151';
    backFromStep2Btn.style.marginTop = '10px';
    backFromStep2Btn.textContent = 'Back';
    backFromStep2Btn.onclick = () => {
        step2Card.style.display = 'none';
        loginCard.style.display = 'block';
    };
    
    // Insert back button before the Change Password button or after the form
    resetPwBtn.parentNode.insertBefore(backFromStep2Btn, resetPwBtn.nextSibling);

    // 3. Password strength checker for forgot password
    resetPwBtn.disabled = true;
    const forgotNewPwInput = document.getElementById('forgotNewPw');
    if (forgotNewPwInput) {
        forgotNewPwInput.addEventListener('input', () => {
            const allPassed = checkPasswordStrength(forgotNewPwInput.value, 'forgot');
            resetPwBtn.disabled = !allPassed;
        });
    }

    // 4. Reset Password
    resetPwBtn.addEventListener('click', async () => {
        const secretCode = document.getElementById('forgotSecretCode').value.trim();
        const newPassword = document.getElementById('forgotNewPw').value.trim();
        const confirmPw = document.getElementById('forgotConfirmPw').value.trim();
        const errorEl = document.getElementById('forgotError2');
        const successEl = document.getElementById('forgotSuccess');

        if (!secretCode || !newPassword || !confirmPw) {
            errorEl.textContent = 'Please fill in all fields.';
            errorEl.style.display = 'block';
            return;
        }

        if (newPassword !== confirmPw) {
            errorEl.textContent = 'Passwords do not match.';
            errorEl.style.display = 'block';
            return;
        }

        if (!checkPasswordStrength(newPassword, 'forgot')) {
            errorEl.textContent = 'Password does not meet the policy requirements.';
            errorEl.style.display = 'block';
            return;
        }

        resetPwBtn.disabled = true;
        resetPwBtn.textContent = 'Changing...';
        errorEl.style.display = 'none';

        try {
            const response = await fetch(`${analyticsConfig.apiBaseUrl}/api/forgot-password/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secretCode, newPassword, target: resetTarget })
            });

            const result = await response.json();

            if (!response.ok) {
                errorEl.textContent = result.message || 'Reset failed.';
                errorEl.style.display = 'block';
                return;
            }

            // Success
            successEl.style.display = 'block';
            setTimeout(() => {
                window.location.reload(); // Reload to start fresh
            }, 2000);

        } catch (err) {
            console.error('Reset error:', err);
            errorEl.textContent = getErrorMessage(err, 'Connection error. Try again.');
            errorEl.style.display = 'block';
        } finally {
            resetPwBtn.disabled = false;
            resetPwBtn.textContent = 'Change Password';
        }
    });
}

function unlockDashboard(initialData) {
    // Hide login, show dashboard
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';

    // Initialize dashboard
    initFilterButtons();
    initCustomDatePicker();
    initLogoutButton();
    initChangePasswordModal();

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

    let url = `${analyticsConfig.apiBaseUrl}/api/admin/analytics?range=${range}`;
    if (range === 'custom' && from && to) {
        url += `&from=${from}&to=${to}`;
    }

    try {
        const token = sessionStorage.getItem('smartmenyu_token');
        const fetchOptions = { headers: { 'Authorization': `Bearer ${token}` } };
        const response = await fetch(url, fetchOptions);

        if (response.status === 401 || response.status === 403) {
            // Credentials expired or changed — force re-login
            sessionStorage.removeItem('smartmenyu_admin_user');
            sessionStorage.removeItem('smartmenyu_token');
            storedUsername = '';
            document.getElementById('dashboardContent').style.display = 'none';
            document.getElementById('loginOverlay').style.display = 'flex';
            document.getElementById('loginError').textContent = 'Session expired. Please log in again.';
            document.getElementById('loginError').style.display = 'block';
            showLoading(false);
            initLogin();
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
