# Image Asset Bible — Missed Enquiry Control

**Brand:** Missed Enquiry Control (derma / aesthetic clinics · Hyderabad)  
**Visual language:** Ferrari marketing-site editorial — cinematic, near-black, sparse Rosso accent, full-bleed photography, zero stock-smile energy  
**Design tokens:** [`design.md`](./design.md) · [`tokens.css`](./tokens.css)  
**Landing:** [`index.html`](./index.html)

---

## Visual direction (read before generating anything)

### Ferrari principles → our context

| Ferrari automotive | Our derma / WhatsApp ops |
|--------------------|---------------------------|
| Full-bleed car on track at dusk | Full-bleed **luxury clinic interior** or **reception desk at golden hour** |
| Rosso Corsa on livery / CTAs only | Rosso `#da291c` in UI only — **avoid red walls/uniforms in photos** |
| Near-black canvas `#181818` | Grade photos **warm dark shadows**, not orange, not pure black |
| Display type over photo bottom | Headlines sit over **lower third gradient** — keep subject upper/center clear |
| Sharp precision, no clutter | **Minimal props** — one phone, one desk, one laser device silhouette |
| Photography carries depth | **No drop shadows in frame** — depth from light falloff |

### Mood keywords (use in every prompt)

`cinematic editorial` · `luxury medical aesthetic` · `Hyderabad upscale clinic` · `warm tungsten accent light` · `deep charcoal shadows` · `shallow depth of field` · `35mm film grain subtle` · `no text` · `no logo` · `no watermark`

### Avoid (AI clichés)

- Smiling doctor thumbs-up  
- Blue-teal hospital corridor stock  
- Over-saturated skin clinic marketing  
- Visible patient faces (privacy + uncanny valley)  
- Generic “WhatsApp green” dominating frame  
- Busy collage / infographics baked into image  

### Color grade (post-process all assets)

- Crush blacks toward `#181818` (not #000)  
- Desaturate backgrounds ~10–15%  
- Skin tones natural, not plastic  
- Optional: faint vignette  
- Export hero as **WebP + JPG fallback**  

---

## Folder structure

```
assets/
├── web/
│   ├── hero/
│   ├── features/
│   ├── bands/
│   ├── product/
│   └── social-meta/
├── instagram/
│   ├── feed/
│   ├── carousel/
│   ├── stories/
│   └── highlights/
├── sales/
├── brand/
└── _masters/          ← highest-res masters before export
```

**Naming:** `ec-{category}-{slug}-{breakpoint}.{webp}`  
Example: `ec-hero-home-cinema-desktop.webp`

---

## Master prompt suffix (append to every generation)

```
Cinematic luxury editorial photograph, Ferrari marketing website aesthetic, warm near-black shadows #181818, shallow depth of field, 35mm lens, subtle film grain, high-end dermatology clinic Hyderabad India, no visible text, no logos, no watermarks, no smiling stock poses, photorealistic, 8k detail, professional color grading
```

---

## Priority order (what to generate first)

| Phase | Count | Goal |
|-------|------:|------|
| **P0** | 18 | Ship landing + first 2 weeks Instagram |
| **P1** | 22 | Full IG campaign + walk-in print |
| **P2** | 12 | Case study, ads, demo clinic brand |
| **Total** | **52** | Complete visual system |

---

# P0 — Landing page (website)

Replace Unsplash placeholders in `index.html` with local paths under `assets/web/`.

## 1. Hero — full-bleed cinema (CRITICAL)

| ID | Filename | Size | Ratio | Where used |
|----|----------|------|-------|------------|
| **WEB-01** | `ec-hero-home-cinema-desktop.webp` | 2560×1440 min (3840×2160 master) | 16:9 | Homepage hero full-bleed |
| **WEB-02** | `ec-hero-home-cinema-mobile.webp` | 1080×1920 | 9:16 | Mobile hero crop (optional separate gen) |

**Subject:** Upscale derma clinic reception — marble desk, soft downlight, **WhatsApp notification glow on phone** (screen unreadable/bokeh), laser device blurred background, empty chair — **no people** or silhouette only.

**Prompt (WEB-01):**
```
Wide cinematic establishing shot of a premium dermatology clinic reception at dusk, empty luxury waiting area, marble and dark wood, single smartphone on reception desk with soft green notification glow bokeh, aesthetic laser equipment softly blurred in background, warm tungsten pool of light, deep charcoal shadows, Ferrari automotive campaign lighting style, wide 16:9 composition with negative space in lower third for headline overlay
```

**Mobile crop note:** Reframe tighter on desk + phone; keep lower third darker for type.

---

## 2. Feature cards — image-first (×3)

| ID | Filename | Size | Ratio | Section |
|----|----------|------|-------|---------|
| **WEB-03** | `ec-feature-same-number.webp` | 1600×1200 | 4:3 | “Same WhatsApp number” |
| **WEB-04** | `ec-feature-team-inbox.webp` | 1600×1200 | 4:3 | “Team inbox for reception” |
| **WEB-05** | `ec-feature-owner-digest.webp` | 1600×1200 | 4:3 | “Owner never opens CRM” |

**WEB-03 prompt:**
```
Close-up cinematic shot of premium smartphone showing WhatsApp chat list interface heavily bokeh and unreadable, on dark marble clinic desk, dual SIM business phone context, warm side light, luxury aesthetic clinic, same number continuity concept, 4:3 editorial crop
```

**WEB-04 prompt:**
```
Cinematic over-shoulder view of clinic receptionist hands typing on modern desktop monitor, dark UI inbox reflected, minimal desk, tablet beside keyboard, premium dermatology clinic interior blurred, warm practical lighting, no readable screen text, 4:3
```

**WEB-05 prompt:**
```
Early morning cinematic shot, clinic owner hand holding smartphone with bright screen in soft focus, coffee cup and clinic keys on dark table, golden hour window light, daily report ritual mood, WhatsApp notification atmosphere without readable text, 4:3 luxury editorial
```

---

## 3. Product — digest mockup (rich landing)

| ID | Filename | Size | Ratio | Where |
|----|----------|------|-------|-------|
| **WEB-06** | `ec-product-digest-phone-hero.webp` | 1400×1800 | 4:5 | Digest section — replace monospace block or sit beside it |
| **WEB-07** | `ec-product-digest-phone-dark.webp` | 1200×1200 | 1:1 | Optional alternate |

**Prompt (WEB-06):**
```
Floating premium smartphone mockup angled 15 degrees, dark mode messaging app layout heavily blurred unreadable, subtle red accent notification dot, pure near-black background #181818, studio product photography Ferrari configurator style, soft rim light, no readable text, 4:5
```

*Add digest copy in HTML/CSS overlay — do not bake text into image.*

---

## 4. Editorial bands — Ferrari-style section breathers (P0 optional but recommended for “rich” feel)

| ID | Filename | Size | Ratio | Where |
|----|----------|------|-------|-------|
| **WEB-08** | `ec-band-clinic-corridor.webp` | 2560×900 | ~21:9 | Between Proof → How (full-width band) |
| **WEB-09** | `ec-band-laser-suite.webp` | 2560×900 | 21:9 | Between How → Digest |
| **WEB-10** | `ec-band-light-reception.webp` | 2560×900 | 21:9 | Above pricing light section |

**WEB-08 prompt:**
```
Ultra-wide cinematic clinic corridor, dark luxury interior, single vanishing point, recessed lighting, no people, atmospheric haze, Ferrari museum hallway aesthetic applied to medical aesthetic clinic, 21:9 panoramic
```

**WEB-10 prompt:**
```
Bright editorial white-band contrast shot, same clinic reception from different angle, high-key luxury spa dermatology, clean white surfaces, minimal, 21:9 — for transition to light pricing section
```

---

## 5. Social meta & favicon

| ID | Filename | Size | Ratio | Where |
|----|----------|------|-------|-------|
| **WEB-11** | `ec-social-og-share.jpg` | 1200×630 | 1.91:1 | `og:image` · WhatsApp link preview |
| **WEB-12** | `ec-social-twitter.jpg` | 1200×600 | 2:1 | Twitter/X card |
| **WEB-13** | `ec-brand-favicon-512.png` | 512×512 | 1:1 | Favicon source (can be designed, not photo) |
| **WEB-14** | `ec-brand-apple-touch.png` | 180×180 | 1:1 | iOS bookmark |

**WEB-11 prompt:**
```
Cinematic split composition for social share card: left third dark clinic reception bokeh, right two-thirds clean near-black negative space for title overlay later, subtle red accent line #da291c horizontal, luxury editorial, 1200x630 safe zone center-left for subject
```

*Overlay in Figma/Canva:* logo + “Missed enquiries cost more than ads” + “Free audit · Hyderabad derma clinics”

---

# P0 — Instagram (first 2 weeks)

**Handle suggestion:** `@enquirycontrol.hyd` or your brand  
**Grid aesthetic:** 3-column — alternate **dark cinematic** + **light stat typography slides** (stats designed in Canva, photos as backgrounds)

## 6. Profile & highlights

| ID | Filename | Size | Where |
|----|----------|------|-------|
| **IG-01** | `ec-ig-profile.webp` | 320×320 (display) / 1080 master | Profile photo |
| **IG-02** | `ec-ig-highlight-audit.webp` | 1080×1920 (crop center 1:1) | Highlight: Free audit |
| **IG-03** | `ec-ig-highlight-digest.webp` | 1080×1920 | Highlight: Daily digest |
| **IG-04** | `ec-ig-highlight-pilot.webp` | 1080×1920 | Highlight: Pilot |
| **IG-05** | `ec-ig-highlight-proof.webp` | 1080×1920 | Highlight: Proof |
| **IG-06** | `ec-ig-highlight-faq.webp` | 1080×1920 | Highlight: FAQ |

**IG-01:** Red square mark `#da291c` + white “EC” monogram on `#181818` — **design asset**, not AI photo.

**Highlight covers (IG-02–06):** Dark cinematic macro — phone, desk, laser bokeh — each slightly different crop; icon + label added in Canva.

---

## 7. Carousel A — “The leakage problem” (5 slides)

| ID | Filename | Size | Slide |
|----|----------|------|-------|
| **IG-07** | `ec-ig-carousel-leak-01-hook.webp` | 1080×1350 | 1 — Hook |
| **IG-08** | `ec-ig-carousel-leak-02-problem.webp` | 1080×1350 | 2 |
| **IG-09** | `ec-ig-carousel-leak-03-price.webp` | 1080×1350 | 3 |
| **IG-10** | `ec-ig-carousel-leak-04-owner.webp` | 1080×1350 | 4 |
| **IG-11** | `ec-ig-carousel-leak-05-cta.webp` | 1080×1350 | 5 — CTA |

| Slide | Image subject | Text overlay (Canva, not AI) |
|-------|---------------|------------------------------|
| 1 | Dark reception, phone lighting up | “Your clinic didn't lose the lead on ads.” |
| 2 | Empty chair + waiting | “It lost them on WhatsApp — after the enquiry.” |
| 3 | Price list blurred on desk | “Price asked. No follow-up in 24 hours.” |
| 4 | Owner silhouette at window | “Owner finds out never.” |
| 5 | Rosso gradient band | “Free 7-day audit · DM AUDIT” |

---

## 8. Carousel B — “Sample digest” (5 slides)

| ID | Filename | Size | Slide |
|----|----------|------|-------|
| **IG-12** | `ec-ig-carousel-digest-01.webp` | 1080×1350 | What owner receives |
| **IG-13** | `ec-ig-carousel-digest-02.webp` | 1080×1350 | 12 enquiries |
| **IG-14** | `ec-ig-carousel-digest-03.webp` | 1080×1350 | 2 SLA breaches |
| **IG-15** | `ec-ig-carousel-digest-04.webp` | 1080×1350 | Call these 3 |
| **IG-16** | `ec-ig-carousel-digest-05.webp` | 1080×1350 | 8 AM daily |

**Image approach:** Slides 1–4 use **WEB-06 phone mockup** on dark bg; slide 5 = **livery red gradient** (`#da291c`) — match landing `livery-band`.

---

## 9. Single feed posts (P0)

| ID | Filename | Size | Post concept |
|----|----------|------|--------------|
| **IG-17** | `ec-ig-post-stat-32to8.webp` | 1080×1350 | “32 min → 8 min” spec poster (photo bg + type) |
| **IG-18** | `ec-ig-post-audit-free.webp` | 1080×1350 | Free audit CTA — clinic desk cinematic |
| **IG-19** | `ec-ig-post-not-wappbiz.webp` | 1080×1350 | “Not another CRM” — dark inbox mood |
| **IG-20** | `ec-ig-post-jubilee-hills.webp` | 1080×1350 | Local trust — upscale HY street/clinic exterior bokeh |

**IG-17 bg prompt:**
```
Abstract dark texture background for typography overlay, subtle clinic bokeh lights, near-black #181818, red accent light streak minimal Ferrari livery inspired, 4:5 vertical
```

---

## 10. Stories / Reels backgrounds (P0)

| ID | Filename | Size | Use |
|----|----------|------|-----|
| **IG-21** | `ec-ig-story-bg-dark-01.webp` | 1080×1920 | Poll / question sticker |
| **IG-22** | `ec-ig-story-bg-dark-02.webp` | 1080×1920 | “DM AUDIT” |
| **IG-23** | `ec-ig-story-bg-red-gradient.webp` | 1080×1920 | CTA swipe |
| **IG-24** | `ec-ig-reels-cover-audit.webp` | 1080×1920 | Reels cover — “Free audit” |

---

# P1 — Landing enrichment + sales collateral

## 11. Additional landing cinematics

| ID | Filename | Size | Where |
|----|----------|------|-------|
| **WEB-15** | `ec-hero-audit-offer.webp` | 2560×1440 | Future `/audit` subpage hero |
| **WEB-16** | `ec-split-before-after.webp` | 2000×1200 | Proof section — split screen mood |
| **WEB-17** | `ec-owner-weekly-call.webp` | 1600×1200 | Process / trust band |
| **WEB-18** | `ec-staff-training.webp` | 1600×1200 | Staff one-pager companion |
| **WEB-19** | `ec-meta-official-badge.webp` | 1200×800 | Compliance trust strip (abstract) |

**WEB-16 prompt:**
```
Diptych cinematic composition single image split tone: left side chaotic multiple phones and papers dark and delayed mood, right side single clean desk one monitor ordered calm warm light, dermatology clinic context, editorial, wide
```

---

## 12. Print & PDF

| ID | Filename | Size | Use |
|----|----------|------|-----|
| **SALES-01** | `ec-print-walkin-header.webp` | 2480×600 @300dpi | Walk-in one-pager top banner |
| **SALES-02** | `ec-print-walkin-full.webp` | 2480×3508 | Designed A4 with photo + copy |
| **SALES-03** | `ec-pdf-audit-cover.webp` | 1920×1080 | Shadow audit PDF cover |
| **SALES-04** | `ec-pdf-case-study-hero.webp` | 1920×800 | Case study header |

**SALES-01 subject:** Wide crop of WEB-01 hero — works at print width.

---

## 13. Instagram P1 — expansion

| ID | Filename | Size | Post concept |
|----|----------|------|--------------|
| **IG-25** | `ec-ig-carousel-pilot-01.webp` | 1080×1350 | Carousel C — 30-day pilot slide 1 |
| **IG-26** | `ec-ig-carousel-pilot-02.webp` | 1080×1350 | slide 2 — same number |
| **IG-27** | `ec-ig-carousel-pilot-03.webp` | 1080×1350 | slide 3 — ₹19,999 |
| **IG-28** | `ec-ig-post-coexistence.webp` | 1080×1350 | “Keep your number” explainer bg |
| **IG-29** | `ec-ig-post-sla-15min.webp` | 1080×1350 | 15-minute SLA |
| **IG-30** | `ec-ig-post-reviews.webp` | 1080×1350 | Google review automation |
| **IG-31** | `ec-ig-post-hyderabad-map.webp` | 1080×1350 | Jubilee → Kukatpally map aesthetic dark |
| **IG-32** | `ec-ig-post-founder-you.webp` | 1080×1350 | Founder trust — **real photo**, not AI |
| **IG-33–36** | `ec-ig-story-template-*.webp` | 1080×1920 | 4 weekly story templates |

---

# P2 — Ads, demo, motion

## 14. Paid / WhatsApp ads (optional)

| ID | Filename | Size | Platform |
|----|----------|------|----------|
| **ADS-01** | `ec-ad-meta-square.webp` | 1080×1080 | Meta feed |
| **ADS-02** | `ec-ad-meta-vertical.webp` | 1080×1920 | Meta Stories |
| **ADS-03** | `ec-ad-google-landscape.webp` | 1200×628 | Google display |

Reuse WEB-01 + WEB-11 compositions; add copy in ads manager.

---

## 15. wacrm demo clinic brand (fake dataset)

| ID | Filename | Size | Use |
|----|----------|------|-----|
| **DEMO-01** | `ec-demo-clinic-logo.svg` | vector | “Radiance Derma Studio” demo |
| **DEMO-02** | `ec-demo-clinic-hero.webp` | 1920×1080 | Demo login background |
| **DEMO-03** | `ec-demo-staff-avatars.webp` | 400×400 ×4 | Priya, Kumar, etc. — **abstract silhouettes**, not real faces |

---

## 16. Motion (not static — brief for editor / Runway)

| ID | Asset | Duration | Use |
|----|-------|----------|-----|
| **VID-01** | Hero loop — slow dolly reception | 8–12s | Landing hero video replace still |
| **VID-02** | Phone notification pulse | 6s | IG Reels |
| **VID-03** | 32→8 counter animation | 10s | Proof Reels |

*Generate keyframes as WEB-01 + WEB-06; animate in CapCut/After Effects.*

---

# Text-on-image rules (Canva / Figma — not AI)

Keep **all marketing copy off generated photos** for flexibility and localization.

| Element | Font | Style |
|---------|------|-------|
| Headlines on photos | Inter 500 | White, negative tracking on large sizes |
| CTAs on photos | Inter 700 uppercase | 1.4px tracking · Rosso button separate |
| IG carousel body | Inter 400/500 | `#181818` on light slides · white on dark |
| Stat numbers | Inter 700 80px | Rosso for accent stats only |

---

# Export checklist (per image)

- [ ] Master saved to `assets/_masters/` (PNG or TIFF)  
- [ ] Web export WebP quality ~82  
- [ ] JPG fallback for OG/email  
- [ ] Filename matches table ID  
- [ ] Lower third tested with headline mock (hero only)  
- [ ] No readable PHI, no real clinic logos, no real phone numbers in screen  

---

# Landing page swap map

When assets ready, update `index.html`:

| Current (Unsplash) | Replace with |
|--------------------|--------------|
| Hero line 70 | `assets/web/hero/ec-hero-home-cinema-desktop.webp` |
| Feature 1 line 133 | `assets/web/features/ec-feature-same-number.webp` |
| Feature 2 line 151 | `assets/web/features/ec-feature-team-inbox.webp` |
| Feature 3 line 169 | `assets/web/features/ec-feature-owner-digest.webp` |
| *(new)* Digest section | `assets/web/product/ec-product-digest-phone-hero.webp` |
| `<head>` og:image | `assets/web/social-meta/ec-social-og-share.jpg` |

Optional rich upgrade: add `<section class="band-cinema-wide">` between existing bands using WEB-08, WEB-09, WEB-10.

---

# Generation batch plan (efficient)

| Batch | IDs | ~Count | Time estimate |
|-------|-----|-------:|---------------|
| **Day 1** | WEB-01, 03–06, WEB-11 | 6 | Core landing |
| **Day 2** | WEB-08–10, IG-07–11 | 8 | Rich bands + carousel A bgs |
| **Day 3** | IG-12–24 | 13 | Instagram launch kit |
| **Day 4** | WEB-15–19, SALES-01–03 | 8 | Sales + subpages |
| **Day 5** | IG-25–36, ADS, DEMO | 17 | Scale content |

---

# Quick reference — total asset count

| Category | P0 | P1 | P2 | Total |
|----------|---:|---:|---:|------:|
| Website | 14 | 5 | 3 | 22 |
| Instagram | 24 | 12 | — | 36 |
| Sales / print | — | 4 | — | 4 |
| Brand / meta | 2 | — | 1 | 3 |
| Demo | — | — | 3 | 3 |
| Video briefs | — | — | 3 | 3 |
| **Total static images** | **40** | **21** | **10** | **~52** |

---

# Related docs

- [`../v2/samples/sample-digest-filled.txt`](../v2/samples/sample-digest-filled.txt) — copy for IG carousel B  
- [`../v2/sales/walk-in-one-pager.md`](../v2/sales/walk-in-one-pager.md) — pairs with SALES-01  
- [`../v2plan.md`](../v2plan.md) — GTM master plan  

**Next step:** Generate **WEB-01, WEB-03, WEB-04, WEB-05, WEB-06, WEB-11** first — swap into landing — then batch Instagram carousel A.
