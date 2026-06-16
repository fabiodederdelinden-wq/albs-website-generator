/**
 * Genereert realistische, menselijke NL-reviews als FALLBACK wanneer een bedrijf
 * écht 0 echte reviews heeft (productiebeleid). Echte reviews hebben altijd
 * voorrang; dit draait alleen als die ontbreken én GENERATE_REVIEWS aan staat.
 *
 * - AVG-vorm: voornaam + initiaal (zoals echte, geanonimiseerde reviews).
 * - Elke review krijgt `generated: true` zodat we intern echt vs gegenereerd zien.
 * - Seeded op bedrijfsnaam → stabiel over re-runs, gevarieerd tussen bedrijven.
 * - Niche-bewust: noemt diensten/situaties die bij het vak passen.
 */

// Kleine seeded PRNG (mulberry32) — deterministisch per bedrijf.
function makeRng(seedStr) {
  let h = 1779033703 ^ seedStr.length
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FIRST_NAMES = [
  'Jeroen', 'Sanne', 'Mark', 'Linda', 'Bart', 'Esther', 'Tom', 'Kim', 'Peter', 'Anouk',
  'Dennis', 'Wendy', 'Rob', 'Manon', 'Sander', 'Iris', 'Erik', 'Femke', 'Jan', 'Daphne',
  'Hans', 'Marloes', 'Niels', 'Carla', 'Ruben', 'Sophie', 'Patrick', 'Lotte', 'Kevin', 'Nadia',
  'Wouter', 'Ingrid', 'Stefan', 'Bianca', 'Maarten', 'Chantal', 'Jorrit', 'Petra', 'Vincent', 'Hanneke',
]
const INITIALS = 'BDHJKLMPRSTVWZ'.split('')

// Niche-specifieke werk-omschrijving (wat de vakman deed).
const NICHE_JOBS = {
  loodgieter: ['een lekkage verholpen', 'onze kraan vervangen', 'de cv-ketel ontstopt', 'een nieuwe afvoer aangelegd', 'het toilet gerepareerd'],
  slotenmaker: ['ons snel buitengesloten geholpen', 'nieuwe sloten gemonteerd', 'de cilinder vervangen', 'het slot opengemaakt zonder schade'],
  hovenier: ['onze tuin compleet opnieuw aangelegd', 'het terras bestraat', 'de heg netjes gesnoeid', 'een mooie border aangelegd', 'het onderhoud van de tuin verzorgd'],
  schilder: ['ons huis binnen geschilderd', 'het buitenwerk gelakt', 'de kozijnen geschilderd', 'het stucwerk afgewerkt'],
  stukadoor: ['de muren strak gestuukt', 'het plafond gladgemaakt', 'onze badkamer afgewerkt'],
  elektricien: ['de meterkast vernieuwd', 'nieuwe groepen aangelegd', 'onze verlichting aangesloten', 'een storing snel opgelost'],
  dakdekker: ['ons dak vernieuwd', 'de dakgoot vervangen', 'een lekkage in het dak verholpen'],
  installateur: ['de cv-ketel vervangen', 'onze airco geïnstalleerd', 'de vloerverwarming aangelegd'],
  aannemer: ['onze verbouwing uitgevoerd', 'de aanbouw gerealiseerd', 'de badkamer compleet verbouwd'],
}
const DEFAULT_JOBS = ['het werk uitgevoerd', 'de klus geklaard', 'ons goed geholpen']

const OPENERS = [
  'Super tevreden!', 'Echt een aanrader.', 'Top service.', 'Helemaal blij mee.',
  'Wat een vakwerk.', 'Niets dan lof.', 'Heel netjes geregeld.', 'Prima ervaring.',
  'Snel en vakkundig.', 'Goede service gehad.',
]
const QUALITIES = [
  'Netjes gewerkt en alles goed achtergelaten.',
  'Kwam op de afgesproken tijd en duidelijke prijs vooraf.',
  'Vakkundig en vriendelijk personeel.',
  'Goed meegedacht en eerlijk advies gekregen.',
  'Snel gereageerd en het werk netjes afgemaakt.',
  'Keurig werk geleverd voor een nette prijs.',
  'Goede communicatie en alles strak afgewerkt.',
  'Betrouwbaar en je merkt dat ze er verstand van hebben.',
]
const CLOSERS = [
  'Zeker een aanrader!', 'Volgende keer weer.', 'Dik verdiend.', 'Bedankt!',
  'Top bedrijf.', 'Echt blij mee.', 'Aanrader voor de buurt.', '',
]
const RELATIVE_TIMES = [
  'een week geleden', '2 weken geleden', '3 weken geleden', 'een maand geleden',
  '2 maanden geleden', '3 maanden geleden', 'een half jaar geleden',
]

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}

function sentenceCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * @param {{ businessName: string, niche?: string, city?: string, count?: number }} opts
 * @returns {Array<{author:string, rating:number, text:string, relativeTime:string, generated:true}>}
 */
export function generateReviews({ businessName, niche, city, count }) {
  const rng = makeRng(`${businessName}|${niche ?? ''}|${city ?? ''}`)
  const jobs = NICHE_JOBS[niche] ?? DEFAULT_JOBS
  const n = count ?? 4 + Math.floor(rng() * 4) // 4-7 reviews
  const usedNames = new Set()
  const reviews = []

  for (let i = 0; i < n; i++) {
    // unieke auteur
    let author
    let guard = 0
    do {
      author = `${pick(rng, FIRST_NAMES)} ${pick(rng, INITIALS)}.`
      guard++
    } while (usedNames.has(author) && guard < 20)
    usedNames.add(author)

    const job = pick(rng, jobs)
    const opener = pick(rng, OPENERS)
    const quality = pick(rng, QUALITIES)
    const closer = pick(rng, CLOSERS)
    const cityBit = city && rng() > 0.6 ? ` Fijn dat ze in ${city} zitten.` : ''

    const text = `${opener} Ze hebben ${job}. ${quality}${cityBit}${closer ? ' ' + closer : ''}`.trim()

    // Rating: overwegend 5, soms 4 (realistisch, geen perfecte 5.0-muur).
    const rating = rng() > 0.78 ? 4 : 5

    reviews.push({
      author,
      rating,
      text: sentenceCase(text),
      relativeTime: pick(rng, RELATIVE_TIMES),
      generated: true,
    })
  }
  return reviews
}

/**
 * Gemiddelde + telling afgeleid van de gegenereerde set (voor REVIEW_RATING/COUNT
 * placeholders), zodat trust/reviews-secties consistente cijfers tonen.
 */
export function reviewsAggregate(reviews) {
  if (!reviews.length) return { rating: 0, count: 0 }
  const sum = reviews.reduce((a, r) => a + r.rating, 0)
  return { rating: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length }
}
