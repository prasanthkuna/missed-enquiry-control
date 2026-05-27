# Missed Enquiry Control

Landing site for **Missed Enquiry Control** — done-for-you WhatsApp revenue ops for derma and aesthetic clinics in Hyderabad.

**Live site:** [https://prasanthkuna.github.io/missed-enquiry-control/](https://prasanthkuna.github.io/missed-enquiry-control/)

## GitHub Pages

This repo deploys via **GitHub Actions** on every push to `main`.

**One-time setup:**

1. Open [Settings → Pages](https://github.com/prasanthkuna/missed-enquiry-control/settings/pages)
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. After the first workflow run, the site is live at the URL below

Alternatively, use **Deploy from branch** → `main` → `/ (root)` if you prefer branch-based hosting.

## Local preview

```powershell
cd landing
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

## Contact

WhatsApp: [+91 90083 93030](https://wa.me/919008393030)

## Structure

| Path | Purpose |
|------|---------|
| `index.html` | Landing page |
| `tokens.css` / `styles.css` | Design system + layout |
| `assets/` | Images (hero, bands, social meta, etc.) |
| `design.md` | Design notes |
| `image-assets.md` | Asset spec and prompts |
