const fs = require('fs');
const path = require('path');

const { createCanvas } = require('canvas');

function drawTree(ctx, centerX, centerY, scale) {
    const s = scale;

    ctx.save();
    ctx.translate(centerX, centerY);

    ctx.fillStyle = '#6D4C41';
    ctx.fillRect(-8 * s, 50 * s, 16 * s, 80 * s);

    ctx.fillStyle = '#2E7D32';
    ctx.beginPath();
    ctx.arc(0, 20 * s, 60 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#388E3C';
    ctx.beginPath();
    ctx.arc(-20 * s, 40 * s, 50 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(20 * s, 40 * s, 50 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(0, 0, 45 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#66BB6A';
    ctx.beginPath();
    ctx.arc(-15 * s, 10 * s, 35 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(15 * s, 10 * s, 35 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#81C784';
    ctx.beginPath();
    ctx.arc(-10 * s, -15 * s, 20 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#6D4C41';
    ctx.lineWidth = 6 * s;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(-8 * s, 130 * s);
    ctx.quadraticCurveTo(-30 * s, 140 * s, -40 * s, 150 * s);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(8 * s, 130 * s);
    ctx.quadraticCurveTo(30 * s, 140 * s, 40 * s, 150 * s);
    ctx.stroke();

    ctx.restore();
}

function generateIcon(size, outputPath) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, '#1B5E20');
    gradient.addColorStop(0.5, '#2E7D32');
    gradient.addColorStop(1, '#4CAF50');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const scale = size / 400;
    drawTree(ctx, size / 2, size / 2 - 30 * scale, scale);

    ctx.fillStyle = 'white';
    ctx.font = `bold ${60 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MSASH', size / 2, size * 0.85);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Generated: ${outputPath}`);
}

function generateSplash(width, height, outputPath) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1B5E20');
    gradient.addColorStop(0.5, '#2E7D32');
    gradient.addColorStop(1, '#4CAF50');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const scale = width / 300;
    drawTree(ctx, width / 2, height / 2 - 80 * scale, scale * 1.5);

    ctx.fillStyle = 'white';
    ctx.font = `bold ${48 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MSASH', width / 2, height * 0.7);

    ctx.font = `${18 * scale}px Arial`;
    ctx.fillText('Multiple Sclerosis', width / 2, height * 0.75);
    ctx.fillText('Atanas Shopov Health', width / 2, height * 0.78);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Generated: ${outputPath}`);
}

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('🌳 MSASH - Generating app icons...\n');

generateIcon(1024, path.join(assetsDir, 'icon.png'));
generateIcon(512, path.join(assetsDir, 'favicon.png'));
generateSplash(1284, 2778, path.join(assetsDir, 'splash.png'));

console.log('\n✅ All icons generated successfully!');
console.log('\nFiles saved in: assets/images/');
console.log('  - icon.png (1024x1024)');
console.log('  - favicon.png (512x512)');
console.log('  - splash.png (1284x2778)');
