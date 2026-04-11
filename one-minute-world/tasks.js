const TASKS = [
  {
    id: "oldest-object",
    type: "visual",
    locations: ["all"],
    text: "Find the oldest thing within arm's reach. Hold it for a moment and think about where it was before it was yours.",
    closing: "Most things around us have a history we never think to ask about."
  },
  {
    id: "window-light",
    type: "observe",
    locations: ["all"],
    text: "Look at where the light is coming from right now. Find the exact edge where the shadow begins.",
    closing: "Light shifts so slowly that you can only ever catch it still."
  },
  {
    id: "slow-breath",
    type: "observe",
    locations: ["all"],
    text: "Breathe in for four counts, hold for two, breathe out for six. Keep going until the minute ends.",
    closing: "Your body just shifted, even if you can't feel it yet."
  },
  {
    id: "background-sounds",
    type: "observe",
    locations: ["all"],
    text: "Close your eyes. Name every sound you can hear without turning your head. Keep going until you find one you nearly missed.",
    closing: "The world is louder than we ever let ourselves notice."
  },
  {
    id: "texture-scan",
    type: "observe",
    locations: ["all"],
    text: "Run one fingertip very slowly across the nearest surface. Go slowly enough to feel every change in texture.",
    closing: "Touch is the sense we forget we're always using."
  },
  {
    id: "same-color",
    type: "visual",
    locations: ["all"],
    text: "Find five things you can see that are almost — but not exactly — the same color. Take your time.",
    closing: "Color is a spectrum we have been trained to flatten into categories."
  },
  {
    id: "word-hold",
    type: "reflect",
    locations: ["all"],
    text: "Think of one word that describes how you feel right now — not good or bad, something more specific. Hold it quietly.",
    closing: "Naming a feeling doesn't fix it, but it makes it more yours."
  },
  {
    id: "room-corner",
    type: "observe",
    locations: ["room"],
    text: "Look at the corner where the ceiling meets the two walls. Really look at it. Let your eyes stop moving.",
    closing: "You have been in this room hundreds of times. There are parts of it you have never seen."
  },
  {
    id: "ceiling-stranger",
    type: "observe",
    locations: ["room"],
    text: "Lie on your back and look at the ceiling as if you woke up here with no memory of whose room this was.",
    closing: "Familiarity is a kind of blindness."
  },
  {
    id: "cup-warmth",
    type: "observe",
    locations: ["cafe", "room", "library", "office"],
    text: "Wrap both hands around whatever you're drinking. Notice the temperature move through the cup into your palms.",
    closing: "Warmth is something we stop noticing almost immediately. You noticed it."
  },
  {
    id: "stranger-story",
    type: "reflect",
    locations: ["cafe", "transit", "outside"],
    text: "Look at one person nearby. Invent one specific, kind thing that happened to them before noon today.",
    closing: "Everyone around you is mid-story."
  },
  {
    id: "book-spine",
    type: "visual",
    locations: ["library"],
    text: "Walk to any shelf. Pull out a book you would never choose. Read only the first sentence. Put it back exactly as you found it.",
    closing: "Someone wrote that sentence hoping a stranger would read it someday."
  },
  {
    id: "quality-of-silence",
    type: "reflect",
    locations: ["library", "room"],
    text: "Notice the specific quality of the silence here. Is it thick, thin, dense, or held? Try to find one word for it.",
    closing: "Silence has texture. Most people never slow down enough to feel it."
  },
  {
    id: "tree-age",
    type: "visual",
    locations: ["outside"],
    text: "Find a tree. Guess how old it is. Picture what the world looked like the year it was a seed.",
    closing: "It was standing here before any of this existed."
  },
  {
    id: "ground-texture",
    type: "visual",
    locations: ["outside"],
    text: "Look at the ground directly beneath your feet as if you have never seen this surface before. What is actually there?",
    closing: "The ground is everywhere and almost no one ever really sees it."
  },
  {
    id: "sky-minute",
    type: "observe",
    locations: ["outside"],
    text: "Look at the sky for the full minute. Watch it without blinking more than you need to. Something is always moving.",
    closing: "This particular sky will never exist again."
  },
  {
    id: "desk-shift",
    type: "observe",
    locations: ["office"],
    text: "Move one object on your surface two inches in any direction. Leave it there. Notice if anyone mentions it today.",
    closing: "Small displacements are harder to detect than large ones."
  },
  {
    id: "unasked-question",
    type: "reflect",
    locations: ["office"],
    text: "Think of one question you have been meaning to ask someone nearby but haven't. Sit with it. Don't ask it yet.",
    closing: "The questions we carry say more than the ones we ask out loud."
  },
  {
    id: "window-reflection",
    type: "observe",
    locations: ["transit"],
    text: "Find your reflection in the window or a dark screen. Hold eye contact with yourself for thirty seconds. Don't look away.",
    closing: "You are also somewhere mid-journey."
  },
  {
    id: "next-stop",
    type: "reflect",
    locations: ["transit"],
    text: "Think about the next stop. Imagine one complete life being lived by someone getting on or off there right now.",
    closing: "Every stop is someone's entire world."
  }
];
