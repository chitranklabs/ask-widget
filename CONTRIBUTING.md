# Contributing

Thanks for your interest in contributing to ask-widget.

---

## Getting Started

```bash
git clone https://github.com/chitranklabs/ask-widget.git
cd ask-widget
pnpm install
pnpm dev
```

---

## Workflow

1. [Open an issue](https://github.com/chitranklabs/ask-widget/issues/new/choose) before starting work
2. Fork the repo and create a branch: `git checkout -b 42-fix-sse-reconnect`
3. Make your changes
4. Describe the change and validation in your PR; releases use git-hygiene and git-cliff
5. Run `pnpm build` - must pass before opening a PR
6. Open a pull request against `main`

---

## Versioning and documentation

Release preparation uses git-hygiene and git-cliff, not Changesets. Follow the
[maintenance guide](docs/content/maintenance.md) for the current workflow.

Run `pnpm docs:dev` for documentation at `http://localhost:4181/ask-widget/`.
Read [Development](docs/content/development.md) for independent website/docs
commands and required checks.

## Commit Messages

Follow conventional commits:

```text
feat: add configurable position prop
fix: resolve SSE reconnect on mobile
chore: update dependencies
docs: add usage examples to README
```

---

## Code Style

- TypeScript strict mode - no `any`
- Scoped Vanilla CSS - no global style pollution
- Google-style JSDoc on all exported functions and components

### Storybook

Develop new components in isolation:

```bash
pnpm storybook
```

```bash
pnpm lint
pnpm format
```

---

## Reporting Security Issues

Do NOT open a public issue. See [SECURITY.md](SECURITY.md).
