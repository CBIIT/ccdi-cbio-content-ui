/* Generates public/version.json after build */
const fs = require('fs');
const path = require('path');

// // Read version from package.json
// const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

const pathToEnv = path.join(__dirname, '..', '.env');
const pathToEnvExample = path.join(__dirname, '..', '.env.EXAMPLE');
let envContent = '';

try {
  if (fs.existsSync(pathToEnv)) {
    envContent = fs.readFileSync(pathToEnv, 'utf8');
  } else if (fs.existsSync(pathToEnvExample)) {
    envContent = fs.readFileSync(pathToEnvExample, 'utf8');
  } else {
    throw new Error('No .env or .env.EXAMPLE file found');
  }
  // Extract NEXT_PUBLIC_VERSION value
  const versionLine = envContent.split('\n').find(line => line.startsWith('NEXT_PUBLIC_VERSION='));

  if (versionLine) {
    const version = versionLine.split('=')[1].trim().replace(/['"]/g, '');
    // Write version to public/version.json
    const outDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'version.json');
    fs.writeFileSync(outFile, JSON.stringify({ version: version || 'unknown' }, null, 2));
  } else {
    throw new Error('NEXT_PUBLIC_VERSION not found in .env or .env.EXAMPLE');
  }
} catch (error) {
  console.error('Error finding .env or .env.EXAMPLE file:', error);
}
