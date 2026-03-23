# AdFinder

AdFinder is a **user-driven ad marketplace** where visitors intentionally discover deals, promotions, and product offers through a content-like browsing experience.

## MVP Features

### User Experience
- Card-style ad feed on homepage
- Search by keyword
- Category filters (Tech, Fitness, Gaming, Beauty, Lifestyle)
- Ad detail page with impression and click stats
- External redirect with click tracking

### Advertiser Experience
- Simple dashboard (`/dashboard`)
- Create ad form with title, description, image URL, destination link, category
- Instant publish into the feed

### Tracking + Differentiation
- Impression and click tracking
- **Smart ranking implemented**: homepage ranks ads by click count (popularity)

## Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- PostgreSQL schema provided (`lib/schema.sql`)

> Note: For fast MVP iteration this repo currently uses an in-memory store (`lib/db.ts`) that mirrors the PostgreSQL schema shape. Replace with PostgreSQL queries using the provided schema when wiring production persistence.

## Project Structure

- `app/` – pages + route handlers
- `components/` – reusable UI blocks
- `lib/` – types, data layer, SQL schema
- `api/` – API docs placeholder
- `app/dashboard` – advertiser flow

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open:
   - `http://localhost:3000` for the consumer feed
   - `http://localhost:3000/dashboard` for advertiser dashboard

## PostgreSQL Setup (recommended next step)

1. Create a PostgreSQL database.
2. Execute SQL in `lib/schema.sql`.
3. Replace in-memory functions in `lib/db.ts` with SQL-based CRUD/tracking calls.
4. Keep API contracts unchanged (`app/api/ads/*`) for minimal frontend changes.
