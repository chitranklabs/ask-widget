#!/bin/bash
set -euo pipefail

# Source the logger utility
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/utils/logger.sh"
cd "$SCRIPT_DIR/.."

log_header "🏗️  ask-widget Build Process"

TOTAL_STEPS=3

# Step 1: Pre-flight check
log_step 1 $TOTAL_STEPS "Preparing environment..."
rm -rf dist
log_success "Environment ready."

# Step 2: Run the build
log_step 2 $TOTAL_STEPS "Building library and website..."
pnpm run build
log_success "Library and website build successful."

# Step 3: Finalize
log_step 3 $TOTAL_STEPS "Build complete!"
log_info "Output: dist/ (library), website/.next/ (website)"
log_success "Project is ready for deployment."

log_header "✅ Build Successful"
