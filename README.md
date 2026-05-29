# ALBS Website-Generator

Genereert in één commando een complete, moderne vakman-website uit publieke
bedrijfsdata en zet hem live op Vercel. Gebouwd voor lokale dienstverleners
(loodgieters, schilders, hoveniers, installateurs, etc.).

## Wat het doet

Per lead draait een pipeline van 8 stappen:

1. **Scrape** — bedrijfsgegevens uit Google Maps (naam, telefoon, adres, reviews)
2. **Score** — bestaande site beoordeeld op 9 factoren (snelheid, mobiel, SEO, ...)
3. **KvK** — bedrijfsverificatie via de gratis openkvk-API
4. **Kleuren** — primaire + accentkleur uit het logo (node-vibrant)
5. **Verify** — telefoon (libphonenumber), e-mail (MX-check), postcode, KvK-format
6. **Smart-render** — template-variant gekozen op niche (10 hero-varianten, 8 secties)
7. **Render** — Next.js 15 site gebouwd met de bedrijfsdata
8. **Deploy** — eigen Vercel-project per klant, live URL terug

Output: een live preview-URL + `bellijst.csv` voor sales.

## Snelstart

```bash
pnpm install                                  # of npm install
cp .env.example .env.local                    # vul Vercel-gegevens in (of `vercel login`)
node scripts/realrun-v2.mjs loodgieter Utrecht
```

Zie **[INSTALL.md](./INSTALL.md)** voor de volledige installatie + vereisten.

## Stack

- Node.js 20+ · pnpm (of npm)
- Next.js 15 + Tailwind v4 (template)
- Playwright (Maps-scrape) · Lighthouse (audit) · node-vibrant (kleuren)
- Vercel CLI (deploy) · AI Gateway (optioneel, voor slimme template-keuze)

## Mappenstructuur

```
scripts/
  realrun-v2.mjs        Hoofd-pipeline (1 lead → live site)
  run-batch.mjs         Meerdere leads achter elkaar
  lib/                  14 modules (scrape, score, render, deploy, ...)
templates/
  vakman-basis-v1/      Next.js-template met 8 secties × 10 varianten
```

## Licentie

Privé — alleen voor ALBS-partners. Niet doorverspreiden.
