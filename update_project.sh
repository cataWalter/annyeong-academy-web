#!/bin/bash

echo "🔧 Fixing Middleware/Proxy Configuration..."

# 1. Update next.config.js
# We move the rewrites logic here (Single Source of Truth)
# This replaces the logic previously held in vercel.json
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from specific domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lkqbkhaklhenhlahgvhj.supabase.co' }
    ],
  },
  // Handle SPA-style fallbacks if necessary (though App Router handles this natively)
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ]
  },
}

export default nextConfig
EOF

# 2. Remove vercel.json
# Vercel will now use next.config.js automatically.
# Keeping vercel.json with "rewrites" causes the conflict/warning.
if [ -f "vercel.json" ]; then
    echo "🗑️ Removing conflicting vercel.json..."
    rm vercel.json
fi

# 3. Create a clean Vercel config (Optional, only if needed for install command)
# We keep the legacy-peer-deps instruction but remove the routing logic
cat > vercel.json << 'EOF'
{
  "installCommand": "npm install --legacy-peer-deps"
}
EOF

# 4. Clean up any potential duplicate middleware files
# Next.js only allows one middleware file. If you have one in root and one in src, it causes issues.
if [ -f "middleware.js" ] && [ -f "src/middleware.js" ]; then
    echo "⚠️ Found duplicate middleware. Removing root middleware.js (keeping src/middleware.js)..."
    rm middleware.js
fi

# 5. Remove any legacy _middleware files (from Next.js 12 era)
find . -name "_middleware.js" -type f -delete
find . -name "_middleware.jsx" -type f -delete

echo "----------------------------------------------------------------"
echo "✅ Configuration consolidated."
echo "👉 Run: npm run build"
echo "----------------------------------------------------------------"