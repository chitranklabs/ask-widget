#!/bin/bash
set -euo pipefail

# Source the logger utility
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/utils/logger.sh"
cd "$SCRIPT_DIR/.."

log_header "🪄  ask-widget Obliviate Protocols"

TOTAL_STEPS=4

# Step 1: Build artifacts
log_step 1 $TOTAL_STEPS "Removing build artifacts (dist, .next, out, coverage)..."
rm -rf dist dist-app dist-ssr website/.next website/out storybook-static coverage release-artifacts
rm -f *.tsbuildinfo website/*.tsbuildinfo next-env.d.ts website/next-env.d.ts
log_success "Build artifacts cleared."

# Step 2: Dependencies
log_step 2 $TOTAL_STEPS "Removing dependencies (root and website node_modules)..."
rm -rf node_modules website/node_modules
log_success "Dependencies removed."

# Step 3: Lockfiles
log_step 3 $TOTAL_STEPS "Removing lockfiles..."
rm -f pnpm-lock.yaml package-lock.json yarn.lock bun.lockb
log_success "Lockfiles purged."

# Step 4: Caches
log_step 4 $TOTAL_STEPS "Clearing internal caches (.turbo, .eslintcache)..."
rm -rf .eslintcache .turbo website/.turbo
log_success "Caches cleared."

log_header "✨  Obliviate Complete (Blank Slate)"