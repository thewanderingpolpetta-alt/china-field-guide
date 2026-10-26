# China Field Guide

A personal, **history-first travel guide to China**: short histories, facts, sights, food and phrases — and no hotels.

- **Live site:** https://thewanderingpolpetta-alt.github.io/china-field-guide/
- **Repository:** https://github.com/thewanderingpolpetta-alt/china-field-guide (public, served by GitHub Pages from `main` /)
- **Owner:** GitHub account `thewanderingpolpetta-alt`
- **Sister project:** personal homepage / learnings page → https://github.com/thewanderingpolpetta-alt/thewanderingpolpetta-alt.github.io

> This README is the full handoff. A new Claude (or person) should be able to continue from here without any earlier chat history.

---

## 1. Who this is for and how they like to work

- The owner is **not a developer**. Explain things in plain language, avoid jargon, and don't make them type in a terminal. If something interactive is needed (e.g. a GitHub sign-in), run it yourself and just give them the code/link.
- **Content style:** National Geographic-like. Short history, interesting facts, the story behind each place. **Food tips: yes. Hotels: never.** Not crowded or list-heavy.
- **Always preview and verify** changes in the browser (desktop + phone width, images load, no console errors) before saying something works.
- **Nothing goes live without asking.** Review locally first; publish (commit + push) only when the owner says "publish it".
- Facts were written from model knowledge and **have not been verified against live sources**. Visa rules, ticket booking, opening days and restaurants change — flag these and verify before relying on them.

## 2. What exists today

| Area | Status |
|---|---|
| Home page | Green banner, China intro, map of all provinces, 7 regions with 33 province cards, "Good to know" facts |
| Regions | North, Northeast, East, Central, South, Southwest, Northwest (China's traditional 7) |
| Provinces | All 33 mainland provinces/municipalities/autonomous regions + Hong Kong & Macau. **Taiwan deliberately left out** (separate trip, different entry rules) — add only if the owner asks |
| Province pages | Banner with photo, type + capital, teaser, guides, highlights, other provinces in the region |
| Destination guides | **Beijing only** (full): history timeline, facts, map + 6 sights, 5 dishes, phrases, practical info |
| Planned guides | Xi'an (Shaanxi), Shanghai, Guilin & Yangshuo (Guangxi), Chengdu (Sichuan), Hangzhou (Zhejiang) — shown as "Guide coming" |
| Other pages | History (dynasty timeline), Phrases (with ▶ listen via browser speech), Essentials (visas, payments, internet, apps, trains, seasons), My Trip (saved sights) |

## 3. Design

Inspired by the **lonelyplanet.com website** look (the owner likes the site, not the guidebooks), but with **our own name and logo** — never copy their brand.

- Deep forest-green banner (`--band: #2a3a17`) with pale-green, condensed uppercase headline (`--band-head: #cfe2a8`)
- Fonts (Google Fonts): **Anton** (headlines), **Archivo** (body), **IBM Plex Mono** (small uppercase labels)
- White pages, thin dividers, pill-shaped buttons, orange accent for map pins/numbers (`--pin`)
- **Images kept small** (owner request): banner photo max ~280px tall, sight photos 240px wide beside the text, dish photos 96px squares
- Dark mode via `prefers-color-scheme`; mobile layout below 760px

## 4. How it's built

Plain **HTML + CSS + JavaScript**, no build step, no frameworks, no installs. Opens by double-click.

```
index.html        page shell: header/nav, footer, <script> tags for data + app
styles.css        all styling (design tokens at the top)
app.js            hash router + all views (home, region, province, destination, history, phrases, essentials, trip) + maps
data/china.js     country-wide: hero photo, intro, facts, dynasty timeline, phrasebook, essentials. Defines WM (Wikimedia thumb base URL)
data/regions.js   7 regions → provinces (id, name, zh, type, capital, coords, teaser, highlights, guides[], planned[], photo)
data/beijing.js   the Beijing destination guide (template for new destinations)
serve.ps1         tiny PowerShell web server → http://localhost:8080
Open Guide.cmd    double-click: starts serve.ps1 and opens the browser
```

**Routes** (hash-based, no server needed): `#/` home · `#/r/<region>` home scrolled to region · `#/p/<province>` province · `#/d/<destination>` guide · `#/d/<destination>/<section>` jump to section · `#/history` · `#/phrases` · `#/essentials` · `#/trip`

**Important technical decisions**
- Content is stored as **`.js` files that assign to `window.GUIDE`**, not `.json`: browsers block `fetch()` of local files when the page is opened via `file://`.
- Script order matters: `china.js` (defines `WM`) → `regions.js` → destination files → `app.js`.
- **My Trip** saves sight keys (`"<destId>/<sightId>"`) in `localStorage` under `china-guide-trip`.

## 5. Adding a destination guide

1. Copy `data/beijing.js` to `data/<id>.js` and rewrite it. Fields:
   - `id`, `name`, `zh`, `pinyin`, `region` (label), `province` (id from `regions.js`), `coords` `[lat, lng]`, `tagline`, `intro`, `photo`
   - `history[]` `{ when, name?, text }` · `facts[]` `{ label?, text }`
   - `sights[]` `{ id, name, zh, coords, dayTrip?, photo, meta, story, tip }` — `meta` is "Duration · notes"; `dayTrip: true` keeps far-away sights out of the initial map view
   - `food[]` `{ name, zh, about, where?, photo? }` · `phrases[]` `{ zh, pinyin, en }` · `practical[]` `{ label, text }`
2. Add `<script src="data/<id>.js"></script>` in `index.html` (after `regions.js`, before `app.js`).
3. In `data/regions.js`, add the id to that province's `guides: [...]` and remove it from `planned`.
4. Preview, verify, then publish when asked.

## 6. Photos (Wikimedia Commons)

- All photos are **hotlinked from Wikimedia Commons** with a credit line (author · licence · link to the file page). Every photo object: `{ src, by, license, page, caption? }`.
- Use **standard thumbnail widths** only: 500 (cards/dishes), 960 (sights), 1920 (banners). URL pattern: `https://thumb.wikimedia.org/wikipedia/commons/thumb/<a>/<ab>/<File>/<width>px-<File>`.
- How we found them: Wikipedia `prop=pageimages` for the landmark's article (lead image), then Commons `prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=<w>` for URL + `Artist` + `LicenseShortName`.
- **Batch titles into ONE request** (`titles=A|B|C`, POST) — 13 separate requests triggered Wikimedia's "too many requests" limit.
- Check the lead image is suitable: some were a map, a cruise ship or a satellite view. Known to replace: **Qinghai** (currently a NASA satellite image).

## 7. Maps (Leaflet)

- Leaflet 1.9.4 from cdnjs. Divicon pins: numbered orange pins for sights, small dots for provinces (orange = has a guide).
- **Tile provider logic in `app.js`:**
  - Served over http(s) (live site / local server) → **OpenStreetMap** tiles (full street detail).
  - Opened as `file://` (double-click) → **Esri World Topo** (OSM blocks requests without a Referer). Esri has no street detail in China past zoom 13, so maxZoom is capped there.
  - CARTO tiles now require an API key — don't use them.
- Coordinates must be **checked against Wikipedia** (`prop=coordinates`) — guessed ones were up to ~500 m off.

## 8. Running and previewing locally

- Double-click **`Open Guide.cmd`** (keep its window open), or run `powershell -ExecutionPolicy Bypass -File serve.ps1` and open http://localhost:8080.
- Double-clicking `index.html` also works (maps less detailed).
- For Claude Code's browser preview, create `.claude/launch.json` (it's git-ignored, so it's not in the repo):

```json
{ "version": "0.0.1", "configurations": [
  { "name": "guide", "runtimeExecutable": "powershell", "runtimeArgs": ["-ExecutionPolicy", "Bypass", "-File", "serve.ps1"], "port": 8080 }
] }
```

## 9. Publishing (GitHub Pages)

Environment on the owner's PC: **Windows 11, Windows PowerShell 5.1**. No Node or Python. Git and GitHub CLI were installed with winget:
- Git: `C:\Program Files\Git\cmd\git.exe`
- GitHub CLI: `C:\Program Files\GitHub CLI\gh.exe`
- If a shell doesn't find them, prepend to PATH: `$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path`

Publish = commit + push; Pages rebuilds in ~1 minute:

```powershell
git add -A
git commit -m "Describe the change"
git push
gh api repos/thewanderingpolpetta-alt/china-field-guide/pages/builds/latest --jq .status   # "built" = live
```

- Commit identity (repo-local): `user.name thewanderingpolpetta-alt`, `user.email 348097017+thewanderingpolpetta-alt@users.noreply.github.com` (GitHub noreply — keeps the owner's real email private).
- **GitHub login:** if `gh auth status` says not logged in (e.g. new machine/account), run `gh auth login --hostname github.com --git-protocol https --web` **in the background**, read the one-time code from its output, and give the owner the code + https://github.com/login/device. Then `gh auth setup-git`. (Running it in a visible terminal stalled on a yes/no prompt the owner couldn't see.)
- The owner may tell the browser to hard-refresh (Ctrl+F5) if the live site looks old.

## 10. Roadmap / ideas

1. Write the planned guides: **Xi'an**, Shanghai, Guilin & Yangshuo, Chengdu, Hangzhou (and Guizhou was mentioned as interesting).
2. Replace Qinghai's satellite photo with a ground-level one.
3. Fact-check existing content (Beijing practical info, Essentials) against current sources.
4. Optionally download photos into the repo so they never disappear.
5. **Future direction (owner's plan):** new interactive apps should use a **private GitHub repo deployed on Vercel** (free Hobby plan, non-commercial) with **Google sign-in** (via Auth.js or Clerk + a Google OAuth client), a **free database** from the Vercel Marketplace (e.g. Neon Postgres, Supabase), secrets in Vercel environment variables, and access limited to chosen accounts. Vercel's site-wide password protection is a paid add-on, so on the free plan restrict access via sign-in.
