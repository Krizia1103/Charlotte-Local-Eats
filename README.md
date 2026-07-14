# CLT Dining Guide

**Uptown recommendations for traveling colleagues.**

A fast, mobile-first restaurant guide for Uptown Charlotte, built for consultants on the road. Browse 20+ restaurants and bars by occasion (brunch, client dinner, rooftop drinks, late night, and more), filter and search, and save favorites locally. Designed to be opened from a QR code on a phone.

> **Note:** The seed data in `data/restaurants.ts` is **sample data**. Verify names, addresses, phone numbers, hours, and policies before sharing this guide externally.

---

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for subtle animation
- No backend — all content lives in a single local data file
- Deployable to [Vercel](https://vercel.com)

---

## 1. Install dependencies

Requires **Node.js 18.18+** (Node 20 or 22 LTS recommended).

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For the best experience, use your browser's device toolbar (mobile view) or open it on your phone over your local network.

## 3. Build for production

```bash
npm run build
npm run start
```

---

## 4. Deploy to Vercel

The app is zero-config on Vercel.

**Option A — Git (recommended)**

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep the defaults (Framework preset: **Next.js**) and click **Deploy**.
4. Vercel gives you a public URL like `https://clt-dining-guide.vercel.app`.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel        # follow the prompts for a preview deployment
vercel --prod # promote to production
```

---

## 5. Update restaurant data (non-engineers)

All content lives in **`data/restaurants.ts`**. You do not need to touch any other file.

1. Open `data/restaurants.ts`.
2. Copy an existing block that starts with `{` and ends with `},`.
3. Paste it and edit the values. Keep text inside `"quotes"`.
4. For list fields (`mealTypes`, `occasions`, `nearbyLandmarks`) keep the square brackets and separate items with commas, e.g. `["Lunch", "Dinner"]`.
5. Save the file. Locally the page refreshes automatically; on Vercel, push the change (or redeploy) to publish.

Field reference:

| Field | Meaning |
| --- | --- |
| `id` | Unique key (lowercase, no spaces). Must be unique. |
| `name` | Restaurant name |
| `neighborhood` | One of the allowed neighborhoods (see `types/restaurant.ts`) |
| `address` | Street address |
| `cuisine` | e.g. "Italian", "Steakhouse" |
| `mealTypes` | Any of: `Brunch`, `Lunch`, `Dinner`, `Late Night` |
| `occasions` | Any of: `Client dinner`, `Team dinner`, `Casual`, `Drinks`, `Rooftop`, `Happy hour`, `Upscale`, `Walkable` |
| `priceRange` | `$`, `$$`, `$$$`, or `$$$$` |
| `vibe` | Short atmosphere description |
| `description` | One to two sentences |
| `whyGo` | Why colleagues like it |
| `bestFor` | Short "best for" line |
| `is21PlusFriendly` / `hasHappyHour` / `hasRooftop` / `reservationRecommended` / `featured` | `true` or `false` |
| `mapsUrl` / `websiteUrl` / `phone` | Links and contact |
| `walkingMinutes`, `bestTimes`, `dressCode`, `nearbyLandmarks`, `reservationNotes` | Optional extras shown on the detail view |

The allowed values for `mealTypes`, `occasions`, `priceRange`, and `neighborhood` are defined in **`types/restaurant.ts`**. To add a new option, add it there first.

---

## 6. Generate a QR code for the deployed URL

Once deployed, turn the Vercel URL into a QR code so colleagues can scan it from a printout or slide.

- **Easiest:** Search "QR code generator", paste your `https://...vercel.app` URL, and download the PNG/SVG.
- **Command line (Node):**

  ```bash
  npx qrcode "https://your-app.vercel.app" -o clt-dining-guide-qr.png
  ```

- **Command line (Python):**

  ```bash
  pip install "qrcode[pil]"
  qr "https://your-app.vercel.app" > clt-dining-guide-qr.png
  ```

Print the QR code on a one-pager or drop it on a welcome slide for visiting colleagues.

---

## Project structure

```
app/
  layout.tsx          Root layout: header, bottom nav, fonts, metadata
  page.tsx            Home (hero, chips, search, featured, collections)
  explore/page.tsx    Directory: filters, sort, search
  map/page.tsx        Map placeholder + neighborhoods
  saved/page.tsx      Saved restaurants (localStorage)
  globals.css         Tailwind + design tokens
components/           Reusable UI (cards, nav, drawer, etc.)
data/restaurants.ts   EDIT ME: all restaurant content
lib/                  Hooks + helpers (filters, saved, formatting)
types/restaurant.ts   TypeScript types + allowed values
```

---

## Branding

This guide uses a generic "consulting firm travel guide" visual style (deep navy, charcoal, off-white, electric-blue accent). It intentionally does **not** include any McKinsey logos, marks, or proprietary assets. Add your own approved branding if desired.
