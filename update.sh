#!/bin/bash

echo "🛠️ Fixing Build Warnings and Errors..."

# 1. Fix [baseline-browser-mapping] warning
# This updates the browser compatibility database used by Autoprefixer/Tailwind
echo "📦 Updating baseline-browser-mapping..."
npm install baseline-browser-mapping@latest -D

# 2. Fix Middleware Deprecation Warning
# The warning "middleware file convention is deprecated" usually appears if:
# a) You have nested middleware (e.g., inside src/app/middleware.js) - Next.js only allows ONE global middleware.
# b) You have legacy _middleware.js files.
# c) You have both root middleware.js and src/middleware.js.

echo "🧹 Cleaning up legacy/duplicate middleware files..."

# Remove legacy _middleware files (Next.js 12 era)
find . -name "_middleware.js" -type f -delete
find . -name "_middleware.jsx" -type f -delete
find . -name "_middleware.ts" -type f -delete
find . -name "_middleware.tsx" -type f -delete

# Ensure only ONE global middleware exists (prefer src/middleware.js)
if [ -f "src/middleware.js" ] && [ -f "middleware.js" ]; then
    echo "⚠️ Found duplicate middleware in root. Removing root middleware.js (keeping src/middleware.js)..."
    rm middleware.js
fi

# Check for misplaced middleware inside app/ directory (Must be in src/ root, not src/app/)
if [ -f "src/app/middleware.js" ]; then
    echo "⚠️ Found middleware inside app directory. Moving to src/..."
    if [ -f "src/middleware.js" ]; then
        echo "   src/middleware.js already exists. Deleting src/app/middleware.js..."
        rm src/app/middleware.js
    else
        mv src/app/middleware.js src/middleware.js
    fi
fi

# 3. Clean Install (Optional but recommended to clear cached warnings)
echo "♻️ Refreshing dependencies..."
rm -rf .next
rm -rf node_modules
npm install

echo "----------------------------------------------------------------"
echo "✅ Fixes applied."
echo "👉 Run: npm run build"
echo "----------------------------------------------------------------"