#!/usr/bin/env bash
# ALBS Website-Generator — installatie-verificatie
# Groen = klaar voor productie. Rood = actie nodig.
set -uo pipefail

GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'
pass=0; fail=0; warn=0
ok()   { echo -e "${GREEN}✓${NC} $1"; pass=$((pass+1)); }
bad()  { echo -e "${RED}✗${NC} $1"; fail=$((fail+1)); }
war()  { echo -e "${YELLOW}!${NC} $1"; warn=$((warn+1)); }

echo "=== ALBS Website-Generator — verificatie ==="

# 1. Node
if command -v node >/dev/null; then
  major=$(node -v | sed 's/v\([0-9]*\).*/\1/')
  if [ "$major" -ge 20 ]; then ok "Node $(node -v)"; else bad "Node $(node -v) — minimaal v20 vereist"; fi
else bad "Node niet gevonden"; fi

# 2. Package manager
if command -v pnpm >/dev/null; then ok "pnpm $(pnpm -v)"; elif command -v npm >/dev/null; then war "npm aanwezig (pnpm aanbevolen)"; else bad "geen pnpm/npm"; fi

# 3. Vercel CLI
if command -v vercel >/dev/null; then ok "Vercel CLI $(vercel --version 2>/dev/null | head -1)"; else bad "Vercel CLI niet gevonden — npm i -g vercel"; fi

# 4. Vercel auth
if [ -n "${VERCEL_TOKEN:-}" ]; then ok "VERCEL_TOKEN gezet via env"
elif [ -f "$HOME/.local/share/com.vercel.cli/auth.json" ]; then ok "Vercel CLI ingelogd (auth.json)"
else war "geen Vercel-auth — voer 'vercel login' uit of zet VERCEL_TOKEN"; fi

# 5. Script-dependencies
if [ -d "scripts/node_modules" ]; then ok "scripts/node_modules aanwezig"; else war "scripts/node_modules ontbreekt — run 'pnpm install'"; fi

# 6. Playwright chromium
if node -e "require('playwright')" 2>/dev/null; then ok "playwright module beschikbaar"; else war "playwright ontbreekt — npx playwright install chromium"; fi

# 7. Template-structuur
[ -f "templates/vakman-basis-v1/app/page.tsx" ] && ok "template page.tsx aanwezig" || bad "template page.tsx ontbreekt"
[ -d "templates/vakman-basis-v1/components/hero-variants" ] && ok "hero-varianten aanwezig" || bad "hero-varianten ontbreken"
[ -f "templates/vakman-basis-v1/variants-manifest.json" ] && ok "variants-manifest.json aanwezig" || war "variants-manifest.json ontbreekt"

# 8. Geen secrets in code
if grep -rqE "(sk-[a-zA-Z0-9]{20}|vca_[a-zA-Z0-9]+|gho_[a-zA-Z0-9]+)" scripts/ 2>/dev/null; then
  bad "mogelijke hardcoded secret gevonden in scripts/"
else ok "geen hardcoded secrets in scripts/"; fi

# 9. Geen hardcoded persoonlijke paden
if grep -rqE "/home/fabio|team_K6|fabio-de-derde-linden" scripts/ 2>/dev/null; then
  bad "hardcoded persoonlijk pad/team in scripts/"
else ok "geen hardcoded persoonlijke paden"; fi

# 10. Gate-smoke: render+build+gate met lege optionals (vangt empty-BTW/review-loze edge-cases)
if [ -d "templates/vakman-basis-v1/node_modules" ]; then
  if node scripts/smoke-render.mjs >/tmp/albs-smoke.log 2>&1; then
    ok "gate-smoke groen (lege BTW/e-mail/reviews bouwen + passeren de QA-gate)"
  else
    bad "gate-smoke faalt — zie /tmp/albs-smoke.log"
  fi
else
  war "gate-smoke overgeslagen — installeer eerst template-deps (cd templates/vakman-basis-v1 && pnpm install)"
fi

echo ""
echo -e "Resultaat: ${GREEN}${pass} OK${NC}, ${YELLOW}${warn} waarschuwing${NC}, ${RED}${fail} fout${NC}"
[ "$fail" -eq 0 ] && echo -e "${GREEN}Klaar voor productie.${NC}" || echo -e "${RED}Los de fouten op vóór gebruik.${NC}"
exit "$fail"
