const crypto = require('crypto');

const sithHash = {
    encrypt: (text, key) => {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    },
    decrypt: (encryptedText, key) => {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedTextBuffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    },
    hashPassword: (password) => {
        return crypto.createHash('sha256').update(password).digest('hex');
    },
    generateRandomValue: () => {
        return crypto.randomBytes(32).toString('hex');
    }
};

module.exports = sithHash;
