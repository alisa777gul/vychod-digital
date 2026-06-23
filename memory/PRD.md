# Východ Digital — Predajná landing page

## Original Problem Statement
"i need a make perfect sailing page out of this" — user provided 5 screenshots of the existing Východ Digital landing page (Slovak digital agency) and asked it to be turned into a perfect selling / conversion-focused landing page.

## Tech Stack
- Vite 8 + React 19
- React Router DOM 7
- Framer Motion for page transitions
- CSS Modules with hand-drawn typewriter aesthetic
- Courier New monospace, cream (#faf9f5) bg, black + red (#df0014) accent

## Architecture
- Single-page landing at `/` (Home) + project brief form at `/brief`
- All sections are independent components under `/app/src/components/<Name>/`
- Data lives in `/app/src/data/*.js` (services, reasons, projects, process, testimonials, packages, faq)
- Form submissions POST to `/api/contact` (Vercel serverless function — existing)

## What's Been Implemented (Jan 2026)
- Hand-drawn / typewriter visual system (existing baseline)
- Hero, Services (4 cards), WhyUs, Projects, Contact form, Footer, Project brief page (existing)
- **NEW conversion-focused additions:**
  - Hero badge "Prijímame nové projekty Q1/Q2" + trust microcopy (Bez záväzku · Odpoveď do 24h · Cena vopred)
  - SocialProof stats strip (24h · 100% · 7 dní · 0 €) + animated black ticker
  - Process timeline (4 steps with red dashed arrows, time chips)
  - Testimonials (3 cards with quotes, stars, avatars)
  - Pricing (3 packages: Štart, Biznis highlighted, Premium) with CTA buttons
  - FAQ accordion (6 items)
  - StickyCTA bottom bar visible on mobile only
- Updated nav (header + footer): Služby · Proces · Projekty · Cenník · FAQ · Kontakt
- All interactive elements have `data-testid` attributes

## Layout / Section Order
Hero → SocialProof → Services → Process → WhyUs → Projects → Testimonials → Pricing → FAQ → Contact → Footer

## Prioritized Backlog (P0/P1/P2)
- P1: Hook Resend / SendGrid to the `/api/contact` endpoint (currently shapes-only)
- P1: Add real client logos strip / press mentions for stronger social proof
- P2: Add case-study deep-dive pages per project with measurable results
- P2: A/B test pricing card copy and CTA labels
- P2: Add cookie consent + GDPR banner for EU compliance
- P2: Add OG image + JSON-LD Organization schema for SEO/sharing

## Next Tasks
- Test the contact + brief forms end-to-end with a real email provider
- Add real testimonial photos + permission notes
- Consider replacing stock copy in Pricing with real client packages
