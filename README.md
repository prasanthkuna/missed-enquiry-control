# Clinic Lead Recovery — Landing Site

Marketing site for **Clinic Lead Recovery OS** — missed calls + WhatsApp accountability for Hyderabad aesthetic clinics.

**Live:** [https://prasanthkuna.github.io/missed-enquiry-control/](https://prasanthkuna.github.io/missed-enquiry-control/)

## v3 design

Code-first UI — no raster photography. Typography (Instrument Serif + DM Sans), CSS gradient mesh hero, live digest mock, product tab demo.

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `audit.html` | Free audit booking |
| `digest.html` | Owner digest demo |
| `report.html` | WhatsApp export analyzer + clinic demo |
| `tokens.css` | Design tokens |
| `styles.css` | Layout + global |
| `components.css` | Product UI components |
| `site.js` | Nav, forms, tabs, reveal |
| `js/clinic-data.js` | Demo clinic data hydration |
| `data/clinics.json` | Demo/report data source |

## Local preview

```powershell
cd landing
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

## Deploy

Push to `missed-enquiry-control` repo → GitHub Pages (Actions).
