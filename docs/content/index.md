---
title: Introduction
seoTitle: Streaming React chat widget and headless hooks
description: Add ask-widget to a React application, connect your own backend and customize the interface.
---

ask-widget provides a floating chat interface, a streaming response adapter and
headless hooks. Use the supplied widget or compose your own interface around
`useChat`, `useSSEStream` and `useSession`.

## Start with a working example

Follow [Getting started](getting-started.md) to install the scoped package and
render a demo. Then connect a backend using the [SSE contract](backend.md), or
supply a custom response handler from the [API reference](api.mdx).

## Choose your integration

- [Next.js and Vite](integrations.md): client boundaries and stylesheet imports.
- [Theming](theming.md): light/dark presets and custom colors.
- [Standalone hooks](hooks.md): custom UI and browser-local persistence.
- [Troubleshooting](troubleshooting.md): missing styles, network failures and history.

## Read with an agent

Use Copy Page for a guide’s Markdown, `/ask-widget/llms.txt` to discover pages,
and `/ask-widget/llms-full.txt` for the full published documentation. Examples
are reference material; verify commands against your installed package version.

## Contribute

Read [Architecture](architecture.md), [Development](development.md) and
[Maintenance](maintenance.md) before changing the package. Release history is
available in [Changelog](changelog.md).
