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
source package using OIDC. GitHub release notes come from the exact version section in the tagged
`CHANGELOG.md`. The release PR generates that changelog with git-cliff; publication
does not regenerate its content from a different commit range. Missing or empty
version sections fail explicitly.
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

## Automation credentials

PR labeling uses the bot App with Contents read and Pull requests write
permissions, matching the other project repositories. It does not request a
separate Issues grant. Weekly maintenance uses the bot App only when it needs
to open a PR, so that PR can trigger CI; it needs Contents and Pull requests
write permissions. If token creation reports that requested permissions
are not granted, check the App's configured permissions and the installation's
accepted grants for this repository. Repeated retries cannot add missing grants.

A package build also compiles a TypeScript consumer through the package's public
export map. This checks the declaration entry as well as runtime exports. Do not
publish an old `dist/` directory: build from the verified release source before
packing. Already published versions cannot be repaired in place; release a new
version when their artifact is defective.

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

## Correct release notes only

From an up-to-date main checkout, fetch the tags and generate notes for the
existing release:

```bash
git fetch origin --tags
node scripts/release-notes.mjs --tag v<version> --output /tmp/ask-widget-release-notes.md
```

Review the generated file, then update only the GitHub release description:

```bash
gh release edit v<version> --repo chitranklabs/ask-widget --notes-file /tmp/ask-widget-release-notes.md
```

The generator reads the package manifest and changelog from the requested tag,
not the working tree. It includes the versioned install command, runtime
requirements and documentation links, and normalizes legacy commit links in the
output. It never changes the tagged files. This operation does not move tags,
replace release assets or republish npm/JSR packages. Existing releases remain
untouched during ordinary recovery; description repair is an explicit operation.
