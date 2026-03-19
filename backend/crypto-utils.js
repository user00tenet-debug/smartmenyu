// ==========================================
// AES-256 ENCRYPTION UTILITY
// ==========================================
// Uses AES-256-CBC with Node.js built-in crypto module.
// Sensitive values (WhatsApp numbers, UPI IDs) are stored
// encrypted in .env and decrypted only in server memory.

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypt a plaintext string using AES-256-CBC.
 * Returns a combined string: iv:encryptedData (both hex-encoded).
 */
function encrypt(plaintext, encryptionKey) {
    const key = crypto.scryptSync(encryptionKey, 'menyu-salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt an AES-256-CBC encrypted string.
 * Expects the format: iv:encryptedData (both hex-encoded).
 */
function decrypt(encryptedText, encryptionKey) {
    const key = crypto.scryptSync(encryptionKey, 'menyu-salt', 32);
    const [ivHex, encryptedHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };

// ==========================================
// CLI: Generate encrypted values
// ==========================================
// Run: node crypto-utils.js
// This will output the encrypted values to paste into .env

if (require.main === module) {
    // The encryption key — set this as ENCRYPTION_KEY in .env
    const ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex');

    console.log('\n🔐 MENYU Encryption Utility');
    console.log('===========================\n');

    const sensitiveData = {
        PARADISE_WHATSAPP: '919381957903',
        PARADISE_UPI: '8008942741@ptsbi',

    };

    console.log('Generated ENCRYPTION_KEY (add to .env):');
    console.log(`ENCRYPTION_KEY="${ENCRYPTION_KEY}"\n`);

    console.log('Encrypted values (add to .env):');
    for (const [name, value] of Object.entries(sensitiveData)) {
        const encrypted = encrypt(value, ENCRYPTION_KEY);
        console.log(`${name}_ENCRYPTED="${encrypted}"`);
    }

    console.log('\n✅ Copy all lines above into your .env file.');
    console.log('⚠️  Delete this output from your terminal history for security.\n');

    // Verify decryption works
    console.log('--- Verification ---');
    for (const [name, value] of Object.entries(sensitiveData)) {
        const encrypted = encrypt(value, ENCRYPTION_KEY);
        const decrypted = decrypt(encrypted, ENCRYPTION_KEY);
        console.log(`${name}: ${value} → encrypted → decrypted = ${decrypted} ✅`);
    }
}
