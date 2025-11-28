#!/bin/bash

echo "🚑 Fixing Imports in App Directory..."

# Define the target directory where the errors are happening
TARGET_DIR="src/app/(app)"

# Function to replace broken relative paths with absolute aliases
fix_imports() {
    local file="$1"
    
    # Check if file exists to avoid errors
    if [ ! -f "$file" ]; then
        return
    fi

    echo "Processing $file..."

    # 1. Fix Library Imports (helpers, supabase, video, payment)
    # Replaces ../../lib, ../../../lib, etc. with @/lib
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|from '\.\./\.\./\.\./lib|from '@/lib|g" "$file"
        sed -i '' "s|from '\.\./\.\./lib|from '@/lib|g" "$file"
        sed -i '' "s|from '\.\./lib|from '@/lib|g" "$file"
        
        # 2. Fix Context Imports
        sed -i '' "s|from '\.\./\.\./\.\./context|from '@/context|g" "$file"
        sed -i '' "s|from '\.\./\.\./context|from '@/context|g" "$file"
        sed -i '' "s|from '\.\./context|from '@/context|g" "$file"

        # 3. Fix Component Imports
        sed -i '' "s|from '\.\./\.\./\.\./components|from '@/components|g" "$file"
        sed -i '' "s|from '\.\./\.\./components|from '@/components|g" "$file"
        sed -i '' "s|from '\.\./components|from '@/components|g" "$file"
    else
        sed -i "s|from '\.\./\.\./\.\./lib|from '@/lib|g" "$file"
        sed -i "s|from '\.\./\.\./lib|from '@/lib|g" "$file"
        sed -i "s|from '\.\./lib|from '@/lib|g" "$file"
        
        sed -i "s|from '\.\./\.\./\.\./context|from '@/context|g" "$file"
        sed -i "s|from '\.\./\.\./context|from '@/context|g" "$file"
        sed -i "s|from '\.\./context|from '@/context|g" "$file"

        sed -i "s|from '\.\./\.\./\.\./components|from '@/components|g" "$file"
        sed -i "s|from '\.\./\.\./components|from '@/components|g" "$file"
        sed -i "s|from '\.\./components|from '@/components|g" "$file"
    fi
}

# Run fix on all JSX files in the (app) directory
find "$TARGET_DIR" -name "*.jsx" | while read file; do
    fix_imports "$file"
done

echo "----------------------------------------------------------------"
echo "✅ App Imports Fixed."
echo "👉 Run: npm run build"
echo "----------------------------------------------------------------"