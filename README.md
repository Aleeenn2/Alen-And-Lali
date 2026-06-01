# Alen & Lali — How to edit the text

This site has three pages: **For Lali** (home), **Our Story**, and **Letter**.
Almost everything you'd want to change is plain text inside a few files. This
guide shows you exactly where each piece lives.

Live site: **https://aleeenn2.github.io/Alen-And-Lali/**

---

## Two easy ways to edit

**1. Right on GitHub (no tools needed):**
Open the file on GitHub → click the ✏️ **pencil** icon at the top-right of the
file → change the text → click **Commit changes**. The site rebuilds itself and
updates in about **1–2 minutes**.

**2. On your computer:**
Edit the file in a code editor (like VS Code), then upload the changed file back
to GitHub the same way you first uploaded everything.

> ✏️ **Rule of thumb:** only change the words **inside** the quotes `"..."` or
> backticks `` `...` ``. Don't delete the quotes, commas, or brackets around
> them — just the words themselves.

---

## Names & dates (used across the whole site)

**File: `src/lib/dates.ts`**

- **The names** — change `him` and `her`:
  ```ts
  export const NAMES = { him: "Alen", her: "Lali" };
  ```
- **The dates** (format is `YYYY-MM-DD`):
  - `MET_DATE` — "The day we met"
  - `THOUGHTS_DATE` — "The first spark"
  - `TOGETHER_DATE` — the "Together since" date **and** the live counter on Our Story

---

## Page 1 — "For Lali" (home)

**File: `src/routes/index.tsx`**

- **Big heading** ("my whole heart, in one girl.") — search for `my whole heart`
- **The love message** — search for `const MESSAGE =` and edit the text between
  the backticks `` ` ` ``

---

## Page 2 — "Our Story"

**File: `src/routes/our-story.tsx`**

- **Section heading** "The days that made us" — search for `The days that made us`
- **The three milestone cards** — each has a `title` and a `text`. Search for the
  one you want to change:
  - `The day we met`
  - `The first spark`
  - `The day we became us`
- The **dates** shown on this page come from `src/lib/dates.ts` (see above).

---

## Page 3 — "Letter"

**File: `src/routes/letter.tsx`**

- **The Georgian letter** — search for `const GEORGIAN =` and edit the text
  between the backticks.
- **The English letter** — search for `const ENGLISH =`
- **Greetings** — `ჩემო ლალის,` (Georgian) and `Hey my girl,` (English)
- **Heading** "With all my heart"

---

## Music

**File: `src/components/MusicPlayer.tsx`** — the `TRACKS` list controls which song
plays on each page and the title shown in the player:

- `/` → For Lali
- `/our-story` → Our Story
- `/letter` → Letter

The song files live in the **`public/audio/`** folder. To swap a song: drop a new
`.mp3` into `public/audio/`, then point the matching `file:` line in `TRACKS` at it.

---

## Menu labels & browser tab

- **Top menu labels** ("For Lali", "Our Story", "Letter") — `src/routes/__root.tsx`
  (in the `Nav` section)
- **Browser tab title & link preview text** — `index.html`

## Colors & fonts (optional)

The pink palette and fonts live in **`src/styles.css`**.

---

After any change, just commit it on GitHub — the live site updates by itself in a
minute or two.
