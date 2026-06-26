# DESIGN.md — Clinic Lead Recovery (Landing v4)

**Version:** 1.0  
**Sources:** [Intercom](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/intercom) + [Linear](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/linear) + [Supabase](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/supabase) via [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

**Philosophy:** Product screenshots sell clinic owners — not feature cards. Every section either shows UI or maps to a deliverable category. Light “paper” bands alternate with dark product chrome.

---

## 1. Visual theme & atmosphere

| Attribute | Value |
|-----------|-------|
| Mood | Premium ops SaaS — accountable, calm, not “hospital” or “startup neon” |
| Density | Product sections **dense** (real inbox/board UI); marketing sections **airy** |
| Photography | **None** on marketing pages — CSS/HTML mocks only until real portal screenshots |
| Decorative | Subtle grid + low-opacity mesh gradient on dark hero only |
| Trust signals | Meta WhatsApp API · Exotel · named staff in digest · Hyderabad belt |

---

## 2. Color palette & roles

| Semantic name | Hex | Role |
|---------------|-----|------|
| `canvas-dark` | `#09090b` | Hero, product chapters, footer |
| `canvas-paper` | `#f4f0ea` | Deliverables grid, pricing, audit form band |
| `surface-dark` | `#141416` | Cards on dark |
| `surface-light` | `#ffffff` | Cards on paper |
| `ink` | `#fafafa` | Headlines on dark |
| `ink-muted` | `#a1a1aa` | Body on dark |
| `ink-on-paper` | `#18181b` | Headlines on light |
| `ink-muted-paper` | `#52525b` | Body on light |
| `hairline-dark` | `#27272a` | Borders on dark |
| `hairline-light` | `#ddd8d0` | Borders on paper |
| `accent-cta` | `#e04a3a` | Primary buttons, links, overdue emphasis |
| `accent-cta-hover` | `#c73d2f` | Button hover |
| `recovery` | `#2dd4a8` | Booked, recovered, success tags |
| `warn-sla` | `#f5a623` | Due soon, SLA warning |
| `alert-sla` | `#ef4444` | Overdue, digest breach lines |
| `mesh-cyan` | `#50e3c2` | Hero gradient orb (8% opacity) |
| `mesh-magenta` | `#eb367f` | Hero gradient orb (6% opacity) |

**Rule:** One chromatic CTA color (`accent-cta`). Success/warn/alert only inside product UI.

---

## 3. Typography

| Role | Family | Size | Weight | Tracking |
|------|--------|------|--------|----------|
| Display H1 | Instrument Serif | clamp(2.5rem, 5vw, 3.75rem) | 400 | -0.02em |
| Display H2 | Instrument Serif | clamp(1.75rem, 3vw, 2.5rem) | 400 | -0.01em |
| Heading H3 | DM Sans | 1.25rem | 600 | -0.01em |
| Body | DM Sans | 1rem | 400 | 0 |
| Body small | DM Sans | 0.875rem | 400 | 0 |
| Eyebrow | IBM Plex Mono | 0.75rem | 500 | 0.08em uppercase |
| UI label | IBM Plex Mono | 0.6875rem | 400 | 0.04em |
| Phone/time | IBM Plex Mono | 0.8125rem | 400 | 0 |

**Load:** Instrument Serif + DM Sans + IBM Plex Mono from Google Fonts, `display=swap`.

---

## 4. Component stylings

### Primary button
- Background `accent-cta`, text white, padding 0.75rem 1.5rem
- Radius 8px, font DM Sans 600 0.9375rem
- Hover: `accent-cta-hover`, translateY(-1px)
- One primary per viewport section max

### Secondary button
- Transparent, 1px `hairline-dark` or `hairline-light`, text ink
- Same padding/radius as primary

### Browser frame (product mock wrapper)
- Radius 12px, border 1px hairline, shadow `0 24px 80px rgba(0,0,0,0.45)`
- Top bar: 40px height, three 10px traffic lights, centered URL pill (mono 11px)
- Content area: min-height 420px, `surface-dark` background

### Callback board column
- Header: mono eyebrow + count badge
- Card: 1px hairline, 8px radius, padding 12px, assignee initial circle
- States: default / `is-due` (warn border) / `is-overdue` (alert border)

### Inbox mock
- 280px thread list + flex message pane
- Thread row: name, preview, tag pill, SLA timer right-aligned
- Bubble: incoming `#27272a`, outgoing `#1e3a2f` with recovery accent border

### Digest phone
- 320px width frame, notch, status bar mono
- Message blocks mimic WhatsApp — numbered sections, **staff names in alert color**

### Category deliverable card (paper section)
- White tile on paper canvas, 1px hairline-light, 16px radius
- Icon 40px stroke SVG, title, one-line outcome, “See in product ↓” link

### Pricing card
- Centered, max-width 480px, checklist with recovery-colored checkmarks
- 8 rows = 8 deliverable categories from plan §6

---

## 5. Layout principles

| Token | Value |
|-------|-------|
| Container max | 1120px |
| Section padding | 5rem 1.5rem (desktop), 3rem 1rem (mobile) |
| Grid gap | 1.5rem cards, 3rem section heads |
| Product mock min width | 600px desktop (scroll snap OK on mobile) |

**Rhythm:** dark → paper → dark → paper. Never more than 2 dark sections back-to-back without a product mock.

---

## 6. Depth & elevation

| Level | Treatment |
|-------|-----------|
| Flat | Marketing copy on paper |
| Raised | Deliverable cards — shadow `0 2px 8px rgba(0,0,0,0.06)` |
| Floating | Browser frames — shadow `0 24px 80px rgba(0,0,0,0.45)` |
| Inset | Input fields — inset shadow on paper sections |

---

## 7. Do's and don'ts

**Do**
- Show **callback board + inbox + digest** as separate full-width chapters
- Use real clinic copy: laser, PRP, Jubilee Hills, staff names
- Keep four-line funnel visible near hero
- Pulse overdue SLA rows subtly (respect `prefers-reduced-motion`)

**Don't**
- Red square + “EC” letter logo
- 4-line list pretending to be product UI
- All-dark single-tone page
- Stock photos, AI clinic renders, medical crosses
- More than 2 CTAs above fold
- “Recovery OS” without product proof

---

## 8. Responsive behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Hero: copy 45% + composite mock 55% overlapping phone |
| 768–1023px | Stack hero; mock full width below copy |
| <768px | Horizontal scroll for board columns; sticky audit CTA bottom |

Touch targets ≥ 44px. Monospace timestamps remain readable at 13px min.

---

## 9. Agent prompt guide

**Quick prompt:**  
> Build Clinic Lead Recovery landing v4 using `landing/DESIGN.md`. Intercom-style paper bands, Supabase-style browser product mocks, Linear hairlines. Hero shows callback board + phone digest composite. Include 8 category deliverable cards from plan.md §6. Coral CTA `#e04a3a` only. No photos.

**Color reference:** dark `#09090b`, paper `#f4f0ea`, CTA `#e04a3a`, recovery `#2dd4a8`

**Files to edit:** `tokens.css`, `components.css`, `styles.css`, `index.html`, `site.js`
