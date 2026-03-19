const http = require('http');

async function testAuth() {
    try {
        console.log("Testing POST /api/login...");
        const loginOptions = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const loginReq = http.request(loginOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const response = JSON.parse(data);
                if (response.token) {
                    console.log("[SUCCESS] JWT Token received.");
                    testProtectedEndpoint(response.token);
                } else {
                    console.error("[FAILURE] No token received.", response);
                }
            });
        });

        loginReq.on('error', e => console.error(e));
        loginReq.write(JSON.stringify({ username: 'arun@paradise', password: 'password123', targetSlug: 'paradise' }));
        loginReq.end();
    } catch (err) {
        console.error("Test script failed:", err);
    }
}

function testProtectedEndpoint(token) {
    console.log("Testing GET /api/paradise/analytics with Bearer token...");
    const opts = {
        hostname: 'localhost',
        port: 3001,
        path: '/api/paradise/analytics?range=today',
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    };

    const req = http.request(opts, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log("[SUCCESS] Protected endpoint returned data:", data.slice(0, 100) + "...");
            } else {
                console.error(`[FAILURE] Protected endpoint failed with status ${res.statusCode}:`, data);
            }
        });
    });

    req.on('error', e => console.error(e));
    req.end();
}

testAuth();
