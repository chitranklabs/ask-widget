#!/bin/bash
set -euo pipefail

# Source the logger utility
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/utils/logger.sh"
cd "$SCRIPT_DIR/.."

log_header "🚀 ask-widget Installation Process"

TOTAL_STEPS=4

# Step 1: Check environment & package manager
log_step 1 $TOTAL_STEPS "Checking environment & package manager..."
if ! command -v pnpm &> /dev/null; then
    log_error "pnpm is not installed. Please install it first."
    exit 1
fi
if [ ! -f pnpm-workspace.yaml ] || [ ! -f website/package.json ]; then
    log_error "Workspace structure validation failed. Missing pnpm-workspace.yaml or website/package.json."
    exit 1
fi
log_success "pnpm and workspace configuration detected."

# Step 2: Install dependencies across workspace
log_step 2 $TOTAL_STEPS "Installing dependencies across workspace..."
if [ -f pnpm-lock.yaml ]; then
    log_info "Lockfile detected. Running frozen install..."
    pnpm install --frozen-lockfile
else
    log_warn "No lockfile found. Running standard install..."
    pnpm install
fi

# Step 3: Sync identity & pre-build assets
log_step 3 $TOTAL_STEPS "Syncing identity for website..."
if [ -f "website/scripts/sync-identity.mjs" ]; then
    node website/scripts/sync-identity.mjs
    log_success "Website identity synced."
fi

# Step 4: Verify
log_step 4 $TOTAL_STEPS "Verifying installation..."
if [ -d "node_modules" ] && [ -d "website/node_modules" ]; then
    log_success "Dependencies and workspace links are ready."
else
    log_error "node_modules folder missing after install."
    exit 1
fi

log_header "✅ Installation Complete"