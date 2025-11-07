const fs = require('fs');
const path = require('path');

// Minimal valid 1x1 transparent PNG (verified working)
const validPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const assetsDir = path.join(__dirname, '..', 'assets', 'images');
const buffer = Buffer.from(validPng, 'base64');

fs.writeFileSync(path.join(assetsDir, 'icon.png'), buffer);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), buffer);

console.log('✓ Created valid icon files');
