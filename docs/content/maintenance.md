---
title: Maintenance and releases
description: Maintainer workflow for versioning, publishing and repository checks.
---

This document describes the technical process for maintaining and releasing `@chitrank2050/ask-widget`.

## Release Workflow

We use **[git-hygiene](https://github.com/chitranklabs/git-hygiene)** to automate versioning, changelog generation, and npm releases.

### 1. Development (The "Commit")

Every commit must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. This is enforced locally via **Lefthook** and in CI. The commit message determines the next version bump (major, minor, or patch).

### 2. Phase 1: Prepare (Release PR)

To start a release, manually trigger the **`Release 1 - Prepare PR`** workflow from the GitHub Actions tab.

- It calculates the recommended version bump using `git-hygiene`.
- It updates `package.json` and `CHANGELOG.md`.
- It opens a Pull Request for review.

### 3. Phase 2: Finalize (Publishing)

When the Release PR is merged into `main`:

1. The **`Release 2 - Finalize Tag`** workflow triggers automatically.
2. It tags the commit with the new version (e.g., `v0.6.0`).
3. It creates a GitHub Release with the changelog.
4. It builds the library and publishes it to **NPM**.
5. It generates SLSA Build Provenance for security.
6. It redeploys the Documentation site.

---

## Infrastructure

- **CI/CD:** `.github/workflows/`
- **Bot Setup:** `.github/actions/setup-bot/`
- **Hook Manager:** `lefthook.yml`
- **Changelog Config:** `cliff.toml`
