# Changelog

## v1.2.0 — 100% echte lead-data (2026-06-16)

Lead-data wordt nu zo betrouwbaar mogelijk opgehaald, met een nette uitwijk als een
bron iets niet geeft. Geen verzonnen cijfers, geen stille gaten.

### Lead-data bron-abstractie
- Nieuwe provider-laag `scripts/lib/providers/leaddata/`: één contract, twee adapters.
- **Google Places API (New)**-adapter: levert rating, review-aantal én review-teksten
  gegarandeerd. Schakelt automatisch in zodra `GOOGLE_PLACES_API_KEY` is gezet.
- **Maps-scrape**-adapter (gratis, geen key): rating + NAP betrouwbaar via aria-label en
  `APP_INITIALIZATION_STATE`; review-aantal kan ontbreken omdat Google dat wisselend toont.
- De registry kiest de bron automatisch (key aanwezig → Places API, anders scrape);
  forceren kan met `ALBS_LEADDATA_PROVIDER=places-api|maps-scrape`.

### Robuustere scraper
- Maps-scraper gehard tegen wisselende CSS: rating via aria-label, review-aantal via
  meerdere strategieën (aria-label, `APP_INITIALIZATION_STATE`, CSS-vangnet).
- Per veld wordt de bron vastgelegd (`fieldSources`) — zichtbaar in het run-rapport.

### Reviews-fallback (compliant)
- Heeft een bedrijf écht 0 reviews, dan worden realistische voorbeeld-reviews gegenereerd:
  seeded per bedrijf (stabiel), niche-bewust, AVG-vorm (voornaam + initiaal), en intern
  gemarkeerd als `generated: true`. Echte reviews hebben altijd voorrang.
- Per run uit te zetten met `ALBS_GENERATE_REVIEWS=0`.

### Volledigheid + transparantie
- `lead-completeness.mjs` valideert per lead of de kernvelden (naam + contactweg) er zijn
  en rapporteert de status expliciet — geen lead gaat ongemerkt incompleet door.
- `lead-data-report.json` per run toont per veld de waarde én de bron.

### Deploy
- Vercel-deploy honoreert nu `VERCEL_TOKEN` uit de env (servers/CI), met `vercel login`
  als fallback — zoals INSTALL.md al beschreef. Foutmelding noemt beide opties.

### Tests
- Nieuwe suites: `generate-reviews`, `lead-completeness`, `places-api` (adapter).

## v1.1.0 — Release-audit (2026-06-14)

Volledige doorlichting vóór distributie. Wettelijke compliance, robuustheid en een
QA-gate die garandeert dat elke gegenereerde site het skelet-contract haalt.

### Wettelijk fundament
- `/privacy` + `/cookies` gegenereerd per klant in de huisstijl.
- Cookie-consent-banner (alleen op live sites), eigen design, Clarity laadt pas na opt-in.
- `SITE_MODE` preview/live: preview krijgt onzichtbare `noindex` (robots.ts + X-Robots-Tag), geen tracking, geen banner.
- Reviewer-foto's en volledige namen verwijderd (AVG); avatars tonen initialen.
- `BUSINESS_BTW` veld + scrape van bestaande klant-site.

### Site-skelet (elke site)
- Footer-contract op alle 10 footer-varianten: naam, telefoon, e-mail, adres, KvK, privacy/cookies-links, copyright-jaar.
- favicon + apple-touch-icon, robots, sitemap, 404, error-pagina, OG/Twitter-tags, og-image, JSON-LD LocalBusiness, web-manifest, theme-color.
- Fonts self-hosted via `next/font` (geen IP-doorgifte aan Google).
- Approved-only variant-selectie met contract-veilige fallbacks (nooit een afgekeurde variant).
- Header-nav toont alleen secties die echt renderen (geen dode anchors).

### QA-gate
- `scripts/lib/site-gate.mjs` draait na de build en vóór de deploy. Faalt de gate, dan gaat de site NIET live.
- Controleert: footer met tel + juridische links, /privacy + /cookies, JSON-LD, OG-tags, favicon, robots passend bij mode, exact 1 h1, html-lang, img-alt, geen onvervangen placeholders, geen reviewer-foto-lekken.
- `scripts/smoke-render.mjs`: render+build+gate met lege optionals (regressie-guard).

### Robuustheid + pipeline
- Vercel-deploy is env-driven: `VERCEL_TEAM_ID`/`VERCEL_SCOPE` voor een team, leeg = persoonlijk account. Geen hardcoded team in de repo.
- render-template: veilige replacement (geen corruptie bij `$`, apostrof, `&`, umlaut, emoji in bedrijfsnamen) — met test-suite.
- Contrast-guard: te lichte klantkleur wordt gedonkerd tot WCAG 4.5:1 op wit.
- Design-ritme: geen twee donkere secties direct op elkaar.
- A11y: aria-labels op icon-knoppen, aria-hidden op decoratieve SVG's.
- legal-log append-only, scrape/deploy met timeouts + nette foutafhandeling, emoji-strip, CSV zonder regeleinde-bugs.

### Bugfixes
- Lege BTW liet de build crashen (TypeScript-narrowing) — opgelost.
- Dode `/#reviews`-nav bij bedrijven zonder review-teksten — opgelost.

## v1.0.0 — Eerste release
Site-generator: scrape → analyse → template-render → Vercel-deploy + bellijst.
