# One Minute World — Project Review

## What the app is

A single-page web app that gives the user one small observational task — something quiet and grounding to do wherever they are right now. No account. No tracking. No score. The name refers to a feeling, not a countdown.

---

## File structure

```
one-minute-world/
├── index.html   — markup and screen structure
├── style.css    — all visual styling
├── tasks.js     — the task content (TASKS array)
└── app.js       — all logic
```

Four files. No build step, no framework, no dependencies. Opens directly in a browser.

---

## How it works

### Three screens

**Screen 1 — Location picker**
The user picks where they are: My room, Café, Library, Outside, Class/office, Transit. Or they hit "Surprise me" to skip location entirely.

**Screen 2 — Task**
A task is shown in large serif text, centred, with breathing room. The header shows the location badge (if one was chosen) and an × to start over. At the bottom: a "Take a photo" button and an "I'm done" button. Photo is captured locally — nothing is uploaded anywhere.

**Screen 3 — Done**
"One minute done." followed by a short closing line from the task — a quiet observation or reflection on what the user just did.

### Task selection

Tasks are picked deterministically by hour. The algorithm:

```js
function getHourSlot() {
  var now = new Date();
  var startOfYear = new Date(now.getFullYear(), 0, 0);
  var dayOfYear = Math.floor((now - startOfYear) / 86400000);
  return dayOfYear * 24 + now.getHours();
}
```

`pool[getHourSlot() % pool.length]` — same hour always returns the same task. New hour, new task. Same hour tomorrow gives a different task because `dayOfYear` is included. No backend, no API, no storage. The device clock is the only input.

Location filtering narrows the pool before the slot is applied — tasks tagged `"all"` are eligible everywhere; location-specific tasks only appear for their location. "Surprise me" uses only `"all"` tasks.

---

## Task content

20 tasks across 6 locations. Each task has:

| Field | Description |
|---|---|
| `id` | Unique string identifier |
| `locations` | Array — `"all"` or specific location keys |
| `text` | The instruction shown to the user |
| `closing` | A one-line reflection shown on the done screen |

Location breakdown:

| Tag | Tasks |
|---|---|
| `all` | 7 |
| `room` | 2 |
| `cafe` | 1 (+ 1 shared) |
| `library` | 1 (+ 1 shared) |
| `outside` | 3 |
| `office` | 2 (+ 1 shared) |
| `transit` | 2 (+ 1 shared) |

Tasks marked with `"all"` appear in every pool including Surprise.

---

## Design

- Off-white background (`#FAFAF8`), near-black text (`#1a1a18`)
- Serif (Georgia) for task text, heading, and done screen. Sans-serif for UI chrome.
- Max width 390px, centred — designed for mobile, works fine on desktop
- `100dvh` for full viewport height on mobile browsers
- No animations, no transitions on content — only subtle `background` transitions on button tap states
- Photo preview appears as a small fixed thumbnail (bottom-right, 68×68px) — unobtrusive

---

## What was deliberately removed

**Countdown timer** — the original build had a 60-second SVG ring that the user tapped to start, which auto-advanced to the done screen at zero. This was removed entirely. The app has no pressure. The user takes as long as they need. The done button is always visible.

**Random task selection** — originally `Math.random()`. Replaced with the hour-slot algorithm so the app behaves consistently — opening it twice in the same hour gives the same task.

---

## What is not there yet / open questions

- **Task type differentiation** — tasks.js has a `type` field hinted at in the original design (visual, reflect, observe) which would control whether the camera button, a textarea, or nothing appears alongside the task text. Currently all tasks show the camera button regardless of type. This conditional interaction is not yet implemented.

- **Thin location pools** — some locations have only 1–2 location-specific tasks. At certain hour slots the same task will repeat on consecutive days for users in the same location. More tasks per location would help.

- **No "Surprise me" variety** — Surprise me draws from 7 `"all"` tasks only. A heavy daily user will cycle through these quickly.

- **Photo button always visible** — the "Take a photo" button shows for every task. For purely observational or breathing tasks it is a mild mismatch. Conditional rendering by task type would clean this up.

- **No persistence** — closing and reopening the app brings you back to the location screen. There is no memory of what you picked, what you did, or whether you came back today. Whether this is a feature or a gap is an open design question.

- **No manifest / PWA shell** — the app works in a browser but has no `manifest.json`, no service worker, no install prompt. Adding these would let it live on a home screen and work fully offline.
