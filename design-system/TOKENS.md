# Design system v6 — Clinic Lead Recovery

**Architecture:** Blade-inspired primitives → semantic themes → components.

## Themes

| Theme | Scope | Canvas |
|-------|--------|--------|
| `marketing` | Landing pages, forms, pricing | Cream `#f5f1ec` |
| `product` | Product chapter band | Dark `#111111` |
| `mock` | Browser board, inbox, phone | WA dark `#0b141a` |

## Contrast rules (mock UI)

- **Board cards:** Always white tiles on dark canvas. Overdue/due = colored left stripe + light tint bg, **dark text**.
- **Tags on white cards:** Dark amber/green/orange text on pastel pills — never yellow-on-white.
- **Inbox sidebar:** Light grey text on dark sidebar; active thread = white card.
- **WhatsApp bubbles:** Incoming `#2a3942`, outgoing `#005c4b`, text `#e9edef`.
- **Digest phone:** WA wallpaper `#0b141a`, body text `#e9edef`, alerts `#fca5a5`.

## Files

```
design-system/
  index.css
  tokens.html          ← visual swatch page
  tokens/
    primitives.css
    spacing.css
    elevation.css
    motion.css
    semantic-marketing.css
    semantic-product.css
    semantic-mock.css
tokens.css             ← imports + legacy aliases
```

## Spacing scale

4pt base: `--space-1` (4px) through `--space-12` (72px).

## Elevation

`--elevation-0` flat → `--elevation-4` floating phone.
