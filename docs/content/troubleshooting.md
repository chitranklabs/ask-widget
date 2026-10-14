---
title: Troubleshooting
description: Diagnose stylesheet, streaming, persistence and backend integration problems.
---

## The widget is unstyled

Import `@chitrank2050/ask-widget/styles.css` once in your application. Ensure your
build includes CSS assets; importing only headless hooks does not provide your
custom interface with styles.

## Demo responses appear instead of real responses

Without a custom `streamResponse` or a non-empty `apiUrl`, the component selects
the built-in demo. See [Backend and SSE](backend.md) for same-origin requests.

## Requests fail or responses stay empty

Inspect your browser’s network panel. Check the final URL, response status,
CORS headers and your backend’s authentication requirements. The default adapter
expects JSON data lines with `choices[0].delta.content`; change `extractChunk`
for a different payload. Never include credentials when sharing diagnostics.

## History is shared or does not survive a reload

Set a distinct `persistenceKey` per conversation. Browser storage may be disabled
or unavailable in private browsing. Saved history is local to the browser and
origin; it is not server synchronization or secure storage.

## The close/reset button is unavailable while streaming

The current widget disables these actions during a response. Cancellation is
not exposed by the current adapter. A custom response handler can own its request
lifecycle; do not rely on collapsing the panel to abort a network request.
