#!/bin/bash

# ==========================================
# CONSTANTS (From Python Script)
# ==========================================

IGNORED_DIRS=(
    ".git" ".vs" ".vscode" ".idea" "__pycache__" "node_modules" "vendor"
    ".develocity" ".mvn" "target" "bin" "obj" "dist" "build" ".next" "out"
    "coverage" "ext" ".gradle"
)

IGNORED_EXTENSIONS=(
    ".exe" ".dll" ".so" ".o" ".a" ".lib" ".jar" ".class" ".war"
    ".png" ".jpg" ".jpeg" ".gif" ".bmp" ".svg" ".ico" ".tif" ".tiff"
    ".zip" ".rar" ".7z" ".tar" ".gz" ".lz"
    ".pdf" ".docx" ".xlsx" ".pptx"
    ".db" ".sqlite" ".map" ".lock" ".pcap"
    ".log" ".tmp" ".bak" ".swp" ".ds_store" ".suo" ".ntvs" ".njsproj" ".sln"
)

# ==========================================
# SETUP
# ==========================================

# 1. Get Project Name (Current Folder Name)
PROJECT_NAME=$(basename "$(pwd)")

# 2. Get Git Branch
GIT_BRANCH=""
if command -v git &> /dev/null; then
    GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
fi

SUFFIX=""
if [[ -n "$GIT_BRANCH" ]]; then
    SUFFIX="_${GIT_BRANCH}"
fi

# 3. Setup Output
OUTPUT_DIR="out"
FILENAME="out_${PROJECT_NAME}${SUFFIX}.txt"
OUTPUT_FILE="$OUTPUT_DIR/$FILENAME"
THIS_SCRIPT=$(basename "$0")

mkdir -p "$OUTPUT_DIR"

# ==========================================
# HELPERS
# ==========================================

# Function to check if array contains element (case insensitive)
contains_element() {
    local e match="$1"
    shift
    for e; do [[ "${e,,}" == "${match,,}" ]] && return 0; done
    return 1
}

# ==========================================
# EXECUTION
# ==========================================

echo "============================================================"
echo " ANALYZING PROJECT: $PROJECT_NAME"
echo " LOCATION:          $(pwd)"
echo " OUTPUT:            $OUTPUT_FILE"
echo "============================================================"

# Clear/Create output file
: > "$OUTPUT_FILE"

# Prepare find ignore arguments for directories
# This creates a structure like: \( -name ".git" -o -name "node_modules" \) -prune
FIND_IGNORE_ARGS=()
first=true
for dir in "${IGNORED_DIRS[@]}"; do
    if [ "$first" = true ]; then
        first=false
    else
        FIND_IGNORE_ARGS+=("-o")
    fi
    FIND_IGNORE_ARGS+=("-name" "$dir")
done

COUNT=0

# Start Scan
# 1. Find all files
# 2. Prune ignored directories
# 3. Print null-terminated filenames for safe handling
# 4. Sort
while IFS= read -r -d $'\0' FILE; do
    
    # Skip the output file itself if it gets found (though 'out' dir is usually ignored)
    if [[ "$(realpath "$FILE")" == "$(realpath "$OUTPUT_FILE")" ]]; then continue; fi
    # Skip this script itself
    if [[ "$(basename "$FILE")" == "$THIS_SCRIPT" ]]; then continue; fi

    BASENAME=$(basename "$FILE")
    
    # Extract extension
    if [[ "$BASENAME" == *.* ]]; then
        EXTENSION=".${BASENAME##*.}"
    else
        EXTENSION=""
    fi

    # Check against Blacklist
    if contains_element "$EXTENSION" "${IGNORED_EXTENSIONS[@]}"; then
        continue
    fi

    # Write to output
    {
        echo "================================================================================"
        echo "PATH: $FILE"
        echo "--------------------------------------------------------------------------------"
        echo ""
        # Read file, ignore errors (like binary data if extension filter missed something)
        cat "$FILE" 2>/dev/null
        echo ""
        echo ""
    } >> "$OUTPUT_FILE"

    ((COUNT++))

done < <(find . \( "${FIND_IGNORE_ARGS[@]}" \) -prune -o -type f -print0 | sort -z)

echo
echo "Done! $COUNT files processed."
echo "File saved to: $OUTPUT_FILE"