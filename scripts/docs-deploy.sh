#!/bin/bash
set -euo pipefail

# Hardened Owner Guard: Verifies active GitHub CLI session identity
GH_USER=$(gh api user --jq '.login' 2>/dev/null || echo "anonymous")
if [ "$GH_USER" != "chitrank2050" ]; then
  echo "❌ Error: Unauthorized. Active GitHub session must be 'chitrank2050'."
  exit 1
fi

# Source the logger utility
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/utils/logger.sh"
cd "$SCRIPT_DIR/.."

log_header "📖 ask-widget Docs Deployment"

TOTAL_STEPS=2

# Step 1: Build Docs
log_step 1 $TOTAL_STEPS "Building Documentation (Monoline Docs)..."
pnpm run docs:build
log_success "Docs build complete."

# Step 2: Deploy
log_step 2 $TOTAL_STEPS "Deploying site to GitHub Pages..."
npx --yes gh-pages@6.3.0 -d docs/dist --nojekyll --cname docs.askwidget.chitrankagnihotri.com -m "docs: deploy v$(node -p "require('./package.json').version")"
log_success "Deployment complete."

log_header "✅ Documentation site is now Live"
log_info "URL: https://docs.askwidget.chitrankagnihotri.com/"
