/* Generates public/version.json after build */
const fs = require('fs');
const path = require('path');

// // Read version from package.json
// const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
// Read version from .env file
const version = fs.readFileSync(path.join(__dirname, '..', '.env'));

const data = { version: version.toString().split('\n').filter(line => line.startsWith('NEXT_PUBLIC_VERSION='))[0].split('=')[1] || '' };

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, 'version.json');
fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
