export const categories = [
  "Classic",
  "Shrug",
  "Table Flip",
  "Cute",
  "Angry",
  "Celebration",
  "Weird",
];

export const faces = [
  { id: "lenny", face: "( ͡° ͜ʖ ͡°)", label: "Lenny", category: "Classic", tags: ["smirk", "meme", "knowing"] },
  { id: "shrug", face: "¯\\_(ツ)_/¯", label: "Shrug", category: "Shrug", tags: ["whatever", "dunno", "neutral"] },
  { id: "disapproval", face: "ಠ_ಠ", label: "Look of disapproval", category: "Classic", tags: ["stare", "judgment", "serious"] },
  { id: "bear", face: "ʕ•ᴥ•ʔ", label: "Bear", category: "Cute", tags: ["soft", "animal", "hello"] },
  { id: "give-energy", face: "༼ つ ◕_◕ ༽つ", label: "Take my energy", category: "Celebration", tags: ["ritual", "support", "energy"] },
  { id: "table-flip", face: "(╯°□°)╯︵ ┻━┻", label: "Table flip", category: "Table Flip", tags: ["rage", "done", "flip"] },
  { id: "table-fix", face: "┬─┬ ノ( ゜-゜ノ)", label: "Table reset", category: "Table Flip", tags: ["calm", "restore", "fix"] },
  { id: "fight", face: "(ง'̀-'́)ง", label: "Square up", category: "Angry", tags: ["fight", "ready", "spicy"] },
  { id: "cry", face: "(ಥ﹏ಥ)", label: "Big sad", category: "Cute", tags: ["sad", "cry", "soft"] },
  { id: "sparkle-toss", face: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", label: "Sparkle toss", category: "Celebration", tags: ["magic", "party", "sparkle"] },
  { id: "finger-guns", face: "(☞ﾟヮﾟ)☞", label: "Finger guns", category: "Celebration", tags: ["nice", "you", "point"] },
  { id: "sunglasses", face: "(•_•) ( •_•)>⌐■-■ (⌐■_■)", label: "CSI shades", category: "Classic", tags: ["cool", "dramatic", "sunglasses"] },
  { id: "peek", face: "┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴", label: "Wall peek", category: "Weird", tags: ["sneak", "watching", "lenny"] },
  { id: "flex", face: "ᕙ(⇀‸↼‶)ᕗ", label: "Tiny flex", category: "Angry", tags: ["strong", "workout", "focus"] },
  { id: "dance", face: "♪~ ᕕ(ᐛ)ᕗ", label: "Happy run", category: "Celebration", tags: ["dance", "music", "escape"] },
  { id: "hug", face: "(づ｡◕‿‿◕｡)づ", label: "Soft hug", category: "Cute", tags: ["hug", "comfort", "sweet"] },
  { id: "side-eye", face: "(¬_¬)", label: "Side eye", category: "Classic", tags: ["suspicious", "dry", "nope"] },
  { id: "confused", face: "¯\\(°_o)/¯", label: "Confused shrug", category: "Shrug", tags: ["confused", "question", "lost"] },
  { id: "wizard", face: "༼ つ ͡° ͜ʖ ͡° ༽つ", label: "Lenny spell", category: "Weird", tags: ["summon", "magic", "lenny"] },
  { id: "rage", face: "(ノಠ益ಠ)ノ彡┻━┻", label: "Maximum flip", category: "Angry", tags: ["rage", "table", "furious"] },
  { id: "flower", face: "(◕‿◕✿)", label: "Flower smile", category: "Cute", tags: ["sweet", "gentle", "happy"] },
  { id: "suspicious", face: "ಠ⌣ಠ", label: "Suspicious grin", category: "Weird", tags: ["odd", "watching", "grin"] },
  { id: "proud", face: "(￣^￣)ゞ", label: "Reporting in", category: "Classic", tags: ["salute", "ready", "proud"] },
  { id: "happy", face: "(｡◕‿◕｡)", label: "Gentle happy", category: "Cute", tags: ["smile", "nice", "kind"] },
];

export const gagTemplates = [
  { id: "status", label: "Status report", template: "current mood: {face}", supportsCorruption: true },
  { id: "summon", label: "Summon circle", template: "{face} summon the vibes {face}", supportsCorruption: true },
  { id: "review", label: "Code review", template: "{face} ship it, probably", supportsCorruption: true },
  { id: "dramatic", label: "Dramatic entrance", template: "{face} has entered the chat", supportsCorruption: false },
];
