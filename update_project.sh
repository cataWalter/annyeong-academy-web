#!/bin/bash

echo "🚀 Fixing Vercel Build Configuration..."

# 1. Update vercel.json to use legacy-peer-deps
# This tells Vercel to ignore the version mismatch between React 19/ESLint 9 and older plugins
echo "⚙️  Configuring Vercel install command..."
cat > vercel.json << 'EOF'
{
  "installCommand": "npm install --legacy-peer-deps",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
EOF

# 2. Remove conflicting explicit dependencies
# eslint-config-next includes necessary react-hooks logic, so we don't need the explicit plugin version conflict.
echo "🧹 Removing conflicting ESLint plugins..."
# We use '|| true' so the script doesn't stop if these packages aren't found
npm uninstall eslint-plugin-react-hooks eslint-plugin-react --no-save || true

# 3. Manually remove them from package.json if npm uninstall didn't catch them due to lockfile issues
# (Using a temporary node script for JSON safety)
node -e "
const fs = require('fs');
try {
  const pkg = require('./package.json');
  if (pkg.devDependencies) {
    if (pkg.devDependencies['eslint-plugin-react-hooks']) {
        console.log(' - Removing eslint-plugin-react-hooks from package.json');
        delete pkg.devDependencies['eslint-plugin-react-hooks'];
    }
    if (pkg.devDependencies['eslint-plugin-react']) {
        console.log(' - Removing eslint-plugin-react from package.json');
        delete pkg.devDependencies['eslint-plugin-react'];
    }
  }
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
} catch (e) {
  console.error('Error updating package.json', e);
}
"

echo "----------------------------------------------------------------"
echo "✅ Vercel Configuration Updated."
echo "👉 You can now run: vercel build"
echo "----------------------------------------------------------------"