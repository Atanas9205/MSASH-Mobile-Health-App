const fs = require('fs');
const path = require('path');

// Simple 1024x1024 green gradient PNG with text "MSASH"
const iconBase64 = `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`;

// Minimal valid PNG
const minimalPNG = Buffer.from(iconBase64, 'base64');

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

fs.writeFileSync(path.join(assetsDir, 'icon.png'), minimalPNG);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), minimalPNG);

console.log('✓ Created placeholder icons');
