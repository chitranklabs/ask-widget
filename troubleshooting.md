## The widget is unstyled

Import `@chitrank2050/ask-widget/styles.css` once in your application. Ensure your
build includes CSS assets; importing only headless hooks does not provide your
custom interface with styles.

## Demo responses appear instead of real responses

Without a custom `streamResponse` or a non-empty `apiUrl`, the component selects
the built-in demo. See [Backend and SSE](/backend) for same-origin requests.

## Requests fail or responses stay empty

Inspect your browser’s network panel. Check the final URL, response status,
CORS headers and your backend’s authentication requirements. The default adapter
expects JSON data lines with `choices[0].delta.content`; change `extractChunk`
for a different payload. Never include credentials when sharing diagnostics.

## History is shared or does not survive a reload

Set a distinct `persistenceKey` per conversation. Browser storage may be disabled
or unavailable in private browsing. Saved history is local to the browser and
origin; it is not server synchronization or secure storage.

## A custom response continues after closing the panel

Close, Escape and reset cancel the active chat request and ignore late results.
Pass the handler's optional `context.signal` to fetch to stop its network work too.
See [Cancellation](/backend#cancel-a-response). Existing handlers that ignore the
signal cannot have their remote work forcibly stopped by the widget.
