## Prepare a release

Use Conventional Commits; Lefthook and git-hygiene validate commit messages.
Run **Release 1 - Prepare PR** to calculate the next version and open a
`release/v<version>` branch. The PR updates `package.json`, `jsr.json` and the
generated `CHANGELOG.md` together.

## Finalize

Merging a labeled release PR starts **Release 2 - Finalize Tag**. The workflow
verifies matching versions, runs library tests and types, builds the package and
checks its packed contents before creating the tag. A conflicting existing tag
fails explicitly; it is never overwritten.

npm, JSR and the GitHub release run independently against the verified source
commit. npm publishes only the root library, with provenance. JSR publishes its
source package using OIDC. GitHub release notes come from git-cliff for that tag.
Documentation deployment remains a separate main-branch workflow.

## Recover a failed destination

Dispatch **Release 2 - Finalize Tag** with the exact version and a `target`:
`npm`, `jsr`, `github` or `all`. Manual recovery requires an existing tag and selects its immutable source
commit. If tag creation failed, rerun the original merged-PR build/tag job rather
than creating a recovery tag from the current main branch. Published npm versions and existing GitHub releases are retained;
JSR skips versions already published. Registry or authentication errors remain
visible failures.

For a new npm publication, run the workflow from the release tag so the workflow
commit and package source match the provenance statement. Recovery from another
workflow ref can restore GitHub or JSR, or skip an already published npm version,
but cannot publish a new npm version with mismatched provenance.

The separate JSR recovery workflow also requires an existing version tag and
checks both version files. Do not edit a released version or move a published tag;
make a new release for source changes. Publishing still requires npm credentials
or its configured trusted publisher, and the JSR repository/OIDC association.

## Verify locally

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build:lib
npm pack --dry-run
```

Use `deno publish --dry-run --allow-dirty` to validate unpublished JSR changes
without publishing them. The dirty-tree flag is for this local dry run; CI
publishes a clean, verified source checkout.

Operational configuration lives in `.github/workflows/`, the bot action in
`.github/actions/setup-bot/`, `lefthook.yml` and `cliff.toml`.
