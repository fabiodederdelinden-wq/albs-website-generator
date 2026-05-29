# Vakman Basis v1

Eerste ALBS-template. Skelet — 5 variants (A-E) komen via `template.json`.

## Placeholders

Zie `template.json` voor de volledige lijst. Template-engine vervangt deze tijdens build:

```
{{BUSINESS_NAME}} → Loodgieter Jansen
{{PRIMARY_COLOR}} → #FF8C42
{{SERVICES}} → CV-installatie|Sanitair|Lekkages (pipe-separated)
```

## Variants

| Variant | Niche | Hero-stijl |
|---------|-------|-----------|
| A-direct | Loodgieter, elektro, dakdekker | Telefoon-centered + urgentie-badge |
| B-craftsmanship | Schilder, stukadoor, aannemer | Before/after slider |
| C-design | Hovenier, klusbedrijf | Project-grid |
| D-simple | Single-service eenmanszaak | Minimal, één CTA |
| E-local | Lokaal sterk | Stad-binding hero |

## Build

```bash
# Via site-builder app
pnpm --filter @albs/site-builder build <site_build_id>

# Of stand-alone test
PRIMARY_COLOR='#FF8C42' BUSINESS_NAME='Loodgieter Jansen' pnpm dev
```
