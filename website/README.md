# Bread Line — Website UI Kit

A high-fidelity, click-through recreation of the **Bread Line** marketing website, built from the original React codebase (`Dynamic Restaurant Website/`). These are cosmetic recreations — simplified, modular, reusable — not production code.

## Run
Open `index.html`. It mounts React + Babel in-browser and loads each component file. The app is a single-page, in-memory router (Home · Menu · Reviews · Visit) with a scroll-aware sticky nav.

## Files
| File | Exports | What it is |
|------|---------|-----------|
| `components.jsx` | `C`, `serif`, `sans`, `Icon`, `Eyebrow`, `PrimaryBtn`, `OutlineBtn`, `UberBtn`, `TextLink`, `Stars` | Brand tokens, Lucide icon wrapper, and reusable primitives |
| `chrome.jsx` | `Nav`, `Footer` | Sticky nav (transparent→blurred on scroll, mobile drawer) + footer |
| `HomePage.jsx` | `HomePage` | Hero, freshness strip, featured cards, story split, reviews teaser |
| `MenuPage.jsx` | `MenuPage` | Header + Uber CTA, sticky category filter tabs, menu rows with diet tags |
| `ReviewsPage.jsx` | `ReviewsPage` | Platform score cards, featured testimonial, review grid, Uber screenshot |
| `VisitPage.jsx` | `VisitPage` | Open/closed status, map placeholder, hours table, service options |

All components are plain functions exported onto `window` (Babel scripts don't share scope) — see the project root design-system rules.

## Interactions covered
- Navigate between all four pages (nav + in-page CTAs); scroll resets on change
- Nav goes transparent→`rgba(18,13,6,0.97)`+blur after 30px scroll (always solid off-home)
- Mobile hamburger drawer (≤768px)
- Menu category filtering (All / Manoush / Sweets / Hot / Cold)
- Hover states: button lift + shadow, image zoom, link/nav color shifts, menu-row name highlight

## Notes
- **Buttons** use ~8px rounded corners + a colored hover drop-shadow (per latest brand direction). Everything else stays square (radius 0).
- Food/venue imagery uses the same Unsplash placeholders as the source codebase — swap for real photography.
- Icons via **Lucide** (UMD CDN). The Uber CTA, menu/service glyphs use the brand's functional emoji set.
- The real **logo** (Archivo-italic wordmark + heartbeat pulse) is documented in the root README; the website itself renders display headings in Playfair Display.
