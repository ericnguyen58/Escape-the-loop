# Escape the Loop — One Minute World

A single-page mobile web app that gives you one mindful task to do right now, wherever you are. No accounts, no uploads, no server calls. Everything stays on your device.

## What it does

Pick your location (or let the app surprise you) and receive a one-minute task drawn from the present moment around you. When you're done, a closing line wraps up the minute.

## Screens

| Screen | Description |
|--------|-------------|
| Location | Choose where you are from 6 options, or tap Surprise me |
| Task | The task for your minute, with type-specific UI |
| Camera | In-app viewfinder — never leaves the browser |
| After photo | Review your shot before deciding what to do with it |
| Done | A single closing line |

## Task types

**visual** — opens the in-app camera. Hollow viewfinder frame with corner brackets. Photo is captured to canvas (`toDataURL`, JPEG 0.85). An optional save-to-device button triggers a local download. Nothing is uploaded anywhere.

**reflect** — shows a textarea for freeform writing. Text is never sent anywhere.

**observe** — no interactive UI. Just the task text.

## In-app camera flow

1. Tap **open camera** on a visual task
2. Viewfinder opens fullscreen — dark surround with a clear cutout, live HH:MM clock badge, and task text overlay
3. **flip** toggles front/back camera (`facingMode: environment / user`)
4. Tap the shutter to capture — the frame is drawn to a hidden canvas
5. After-photo screen shows the captured image with a vibrant colour treatment (`saturate` + `contrast` CSS filter)
6. **save to device** downloads the original JPEG and changes to "saved"
7. **retake** goes back to the viewfinder; **keep** goes to the done screen
8. **cancel** at any point returns to the task screen

If `getUserMedia` is unavailable or denied, the app falls back to the native file picker.

## Locations and task pool

Tasks are filtered by location tag (`all`, `room`, `cafe`, `library`, `outside`, `office`, `transit`). The active task rotates by hour-of-year slot so it feels intentional but doesn't require a backend.

## Running it

Open `one-minute-world/index.html` directly in a browser.

Camera requires HTTPS or `localhost` (browser restriction for `getUserMedia`). Everything else works over plain `file://`.

## Stack

- Vanilla HTML / CSS / JS — no frameworks, no build step
- `getUserMedia` + Canvas API for in-app camera capture
- No dependencies, no network requests
