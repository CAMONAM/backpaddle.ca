#!/bin/sh
# Auto-increment version in index.html
FILE="$(dirname "$0")/index.html"
CURRENT=$(grep -oP 'v0\.\K[0-9]+' "$FILE" | head -1)
NEXT=$((CURRENT + 1))
sed -i "s/v0\.$CURRENT/v0.$NEXT/" "$FILE"
echo "Bumped to v0.$NEXT"
