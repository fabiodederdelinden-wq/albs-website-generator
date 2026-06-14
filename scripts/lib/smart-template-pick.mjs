/**
 * Smart-render: Claude beargumenteert template-keuze.
 * Fallback naar random-pick als AI Gateway niet bereikbaar.
 *
 * Hero/intro/layout: uit variants-manifest.json (legacy, blijft werken).
 * Reviews/owner/services/projects/trust/contact/header/footer:
 *   uit variants-registry.json (status === 'approved' filter).
 *   Bij lege approved-set per sectie: fallback uit SECTION_FALLBACKS
 *   (approved + contract-compleet, NOOIT blind variant 1) met warning.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = process.env.ALBS_REPO_ROOT ?? path.resolve(__dirname, '../..')
const MANIFEST_PATH = path.join(REPO_ROOT, 'templates/vakman-basis-v1/variants-manifest.json')
const REGISTRY_PATH = path.join(REPO_ROOT, 'templates/vakman-basis-v1/variants-registry.json')

async function loadJsonOrNull(p) {
  try {
    const raw = await readFile(p, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function loadManifest() {
  return loadJsonOrNull(MANIFEST_PATH)
}

async function loadRegistry() {
  return loadJsonOrNull(REGISTRY_PATH)
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function approvedIds(registry, section) {
  const sec = registry?.sections?.[section]
  if (!sec) return []
  const ids = []
  for (const [id, entry] of Object.entries(sec)) {
    if (entry.status === 'approved') ids.push(parseInt(id, 10))
  }
  return ids
}

// Fallback per sectie = een variant die het sectie-contract haalt (compleet, approved).
// NOOIT blind variant 1: bij footer/trust/owner/contact/header is v1 afgekeurd of te kaal.
const SECTION_FALLBACKS = {
  header: 2,
  services: 1,
  projects: 1,
  reviews: 1,
  trust: 3,
  owner: 2,
  contact: 3,
  footer: 3,
}

function pickFromRegistry(registry, section, warnings) {
  const ids = approvedIds(registry, section)
  if (ids.length === 0) {
    const fb = SECTION_FALLBACKS[section] ?? 1
    warnings.push(`${section}: geen approved varianten, fallback variant ${fb}`)
    return fb
  }
  return pickRandom(ids)
}

// Achtergrond van een sectie-variant (uit manifest.sectionBackgrounds). Default light.
function bgOf(manifest, section, id) {
  const bg = manifest?.sectionBackgrounds?.[section]
  if (!bg) return 'light'
  if (bg.dark?.includes(id)) return 'dark'
  if (bg.tinted?.includes(id)) return 'tinted'
  return 'light'
}

// Body-flow waarvoor achtergrond-ritme telt (header is sticky/overlay, los gekozen).
const FLOW_SECTIONS = ['services', 'projects', 'reviews', 'trust', 'owner', 'contact', 'footer']

// Kiest alle secties met design-contract-bewustzijn: vermijdt twee dark secties
// direct op elkaar (zwaar/schokkend) als er een niet-dark approved alternatief is.
function pickSections(registry, manifest, warnings) {
  const picks = { header: pickFromRegistry(registry, 'header', warnings) }
  let prevBg = null
  for (const sec of FLOW_SECTIONS) {
    const ids = approvedIds(registry, sec)
    let pool = ids
    if (ids.length === 0) {
      const fb = SECTION_FALLBACKS[sec] ?? 1
      warnings.push(`${sec}: geen approved varianten, fallback variant ${fb}`)
      pool = [fb]
    }
    if (prevBg === 'dark') {
      const nonDark = pool.filter((id) => bgOf(manifest, sec, id) !== 'dark')
      if (nonDark.length) pool = nonDark
      else warnings.push(`${sec}: alleen dark varianten approved, dark-na-dark onvermijdelijk`)
    }
    const chosen = pickRandom(pool)
    picks[sec] = chosen
    prevBg = bgOf(manifest, sec, chosen)
  }
  return picks
}

const LAYOUTS = {
  A: 'Direct/Urgent — voor noodgeval-niches (loodgieter, slotenmaker). Telefoon-eerst, snel contact-CTA.',
  B: 'Craftsmanship — voor ambachtelijke niches (schilder, stukadoor). Projectfoto\'s prominent.',
  C: 'Custom/Design — voor design-gevoelige niches (hovenier, interieur). Visueel rustig, witruimte.',
  D: 'Simple/Fast — voor algemene niches. Bewust eenvoudig, conversie-eerst.',
}

const SECTION_LIST = ['header', 'services', 'projects', 'reviews', 'trust', 'owner', 'contact', 'footer']

async function randomPick(niche) {
  const manifest = await loadManifest()
  const registry = await loadRegistry()
  const warnings = []

  const picks = {
    loodgieter: 'A',
    slotenmaker: 'A',
    installateur: 'A',
    schilder: 'B',
    stukadoor: 'B',
    aannemer: 'B',
    hovenier: 'C',
    elektricien: 'D',
    dakdekker: 'B',
  }
  const layoutOptions = manifest?.layout?.approved ?? ['A', 'B', 'C', 'D']
  const heroOptions = manifest?.hero?.approved ?? [{ id: 1, name: 'aurora-flow' }]
  const introOptions = manifest?.intro?.approved ?? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const defaultLayout = picks[niche] ?? 'D'
  const layout = layoutOptions.includes(defaultLayout) ? defaultLayout : pickRandom(layoutOptions)
  const heroChoice = pickRandom(heroOptions)

  const sectionPicks = pickSections(registry, manifest, warnings)

  return {
    layout,
    hero: heroChoice.id ?? heroChoice,
    heroName: heroChoice.name ?? `hero-${heroChoice}`,
    intro: pickRandom(introOptions),
    header: sectionPicks.header,
    services: sectionPicks.services,
    projects: sectionPicks.projects,
    reviews: sectionPicks.reviews,
    trust: sectionPicks.trust,
    owner: sectionPicks.owner,
    contact: sectionPicks.contact,
    footer: sectionPicks.footer,
    warnings,
    reasoning: `Random uit registry: niche=${niche} → layout ${layout}, hero ${heroChoice.name ?? heroChoice.id}, sections ${SECTION_LIST.map((s) => `${s}=${sectionPicks[s]}`).join(', ')}.${warnings.length ? ' Warnings: ' + warnings.length : ''}`,
  }
}

async function tryAIGateway(lead) {
  const token = process.env.AI_GATEWAY_API_KEY || process.env.AI_GATEWAY_TOKEN || process.env.VERCEL_OIDC_TOKEN
  if (!token) return null
  try {
    const prompt = `Je kiest een template-variant voor een ALBS vakman-site.
Lead: ${lead.name}, ${lead.niche} in ${lead.city}
Bedrijfsgrootte (medewerkers indien gevonden): ${lead.size ?? 'onbekend'}
Site-pijnpunten: ${(lead.painPoints ?? []).join(', ') || 'geen'}

Opties:
A — ${LAYOUTS.A}
B — ${LAYOUTS.B}
C — ${LAYOUTS.C}
D — ${LAYOUTS.D}

Kies layout (A/B/C/D) en intro (1-10). Geef 1-zin reasoning waarom.
Antwoord ALLEEN als JSON: {"layout":"A","intro":3,"reasoning":"..."}`

    const res = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'anthropic/claude-haiku-4-5',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.3,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content
    if (!content) return null
    const m = content.match(/\{[\s\S]*\}/)
    if (!m) return null
    const parsed = JSON.parse(m[0])
    if (!['A', 'B', 'C', 'D'].includes(parsed.layout)) return null
    const intro = parseInt(parsed.intro, 10)
    if (!intro) return null

    const manifest = await loadManifest()
    const registry = await loadRegistry()
    const warnings = []
    const heroOptions = manifest?.hero?.approved ?? [{ id: 1, name: 'aurora-flow' }]
    const heroChoice = pickRandom(heroOptions)

    const sectionPicks = {}
    for (const sec of SECTION_LIST) {
      sectionPicks[sec] = pickFromRegistry(registry, sec, warnings)
    }

    return {
      layout: parsed.layout,
      hero: heroChoice.id ?? heroChoice,
      heroName: heroChoice.name ?? `hero-${heroChoice}`,
      intro: Math.min(10, Math.max(1, intro)),
      header: sectionPicks.header,
      services: sectionPicks.services,
      projects: sectionPicks.projects,
      reviews: sectionPicks.reviews,
      trust: sectionPicks.trust,
      owner: sectionPicks.owner,
      contact: sectionPicks.contact,
      footer: sectionPicks.footer,
      warnings,
      reasoning: String(parsed.reasoning ?? 'AI-pick zonder uitleg').slice(0, 300) + ` Hero: ${heroChoice.name}.`,
    }
  } catch {
    return null
  }
}

export async function pickSmartTemplate(lead) {
  const ai = await tryAIGateway(lead)
  if (ai) return ai
  return await randomPick(lead.niche)
}
