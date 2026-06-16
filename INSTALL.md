# Installatie — ALBS Website-Generator

Volledige gids om de generator op je eigen server te draaien.

## 1. Vereisten

| Tool | Versie | Check |
|---|---|---|
| Node.js | 20 of hoger | `node -v` |
| pnpm (aanbevolen) of npm | recent | `pnpm -v` |
| Vercel CLI | recent | `vercel --version` |
| Git | recent | `git --version` |

Installeer ontbrekende tools:
```bash
# Node via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 20

# pnpm
npm install -g pnpm

# Vercel CLI
npm install -g vercel
```

## 2. Project ophalen

```bash
git clone <repo-url> albs-generator
cd albs-generator
pnpm install            # installeert script-dependencies
```

## 3. Playwright browser installeren (voor Maps-scrape)

```bash
npx playwright install chromium
```

## 4. Vercel koppelen

Kies één van twee:

**A — Inloggen (makkelijkst):**
```bash
vercel login
```
De generator pakt de token automatisch op.

**B — Token in env (voor servers/CI):**
```bash
cp .env.example .env.local
# zet VERCEL_TOKEN= in .env.local (maak token op vercel.com/account/tokens)
```

Werk je met een Vercel-team? Zet dan ook `VERCEL_TEAM_ID` en `VERCEL_SCOPE` in `.env.local`.

## 5. (Optioneel) API-keys voor betere data

Alles werkt zonder keys. Deze twee maken de output beter.

### 5a. Lead-data bron: Google Places API

De generator kiest de bron automatisch:

- **Geen key** → gratis Google Maps-scraping. Naam, adres, telefoon en rating zijn
  betrouwbaar; review-aantal en review-teksten haalt Google niet altijd op (die
  worden wisselend gerenderd).
- **Met key** → Google Places API (New) levert rating, review-aantal én reviews
  gegarandeerd. Aanbevolen voor 100% complete lead-data.

```bash
# in .env.local
GOOGLE_PLACES_API_KEY=je_places_api_key
# optioneel forceren: ALBS_LEADDATA_PROVIDER=places-api | maps-scrape
```

Maak een key in de Google Cloud Console: zet **Places API (New)** aan en koppel
facturatie (ruim binnen de gratis maandtegoeden voor normale volumes).

Heeft een bedrijf écht 0 reviews, dan vult de generator realistische
voorbeeld-reviews (duidelijk gemarkeerd, eigenaar kan ze uitzetten). Per run
uitschakelen: `ALBS_GENERATE_REVIEWS=0` in `.env.local`.

### 5b. AI Gateway

Zonder AI-key werkt alles, maar template-keuze is dan willekeurig en logo's
worden niet gevalideerd. Voor slimme keuze + logo-check:

```bash
# in .env.local
AI_GATEWAY_API_KEY=je_vercel_ai_gateway_key
```

## 6. Eerste run

```bash
node scripts/realrun-v2.mjs loodgieter Utrecht
```

Dit scraped één loodgieter in Utrecht, bouwt de site en zet hem live.
Aan het eind zie je de preview-URL + een `runs/<datum>/bellijst.csv`.
Met een `GOOGLE_PLACES_API_KEY` loopt de scrape via de Places API; zonder key via
gratis Maps-scraping. Een `lead-data-report.json` per run laat per veld zien
welke bron de waarde leverde, zodat er geen stille gaten zijn.

Beschikbare niches: loodgieter, schilder, hovenier, aannemer, installateur,
elektricien, dakdekker, stukadoor, slotenmaker.

## 7. Meerdere leads (batch)

```bash
node scripts/run-batch.mjs loodgieter Utrecht 10
```

## 8. Controleer de installatie

```bash
bash verify-install.sh
```

Dit checkt Node-versie, dependencies, Playwright, Vercel-auth en de
template-structuur. Groen = klaar voor productie.

## Veelgestelde problemen

| Probleem | Oplossing |
|---|---|
| `Vercel-token niet gevonden` | `vercel login` of `VERCEL_TOKEN` in `.env.local` |
| `chromium not found` | `npx playwright install chromium` |
| Build faalt op template | `cd templates/vakman-basis-v1 && pnpm install && pnpm build` om te debuggen |
| Geen leads gevonden | Andere niche/stad proberen — Maps-pool kan uitgeput zijn |

## Wat draait waar

- Scrape + render + build gebeurt **lokaal** op je server.
- Alleen de uiteindelijke site wordt naar **Vercel** gepusht (jouw account).
- Geen externe database vereist voor de kern-flow.
