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

## 5. (Optioneel) AI Gateway

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
