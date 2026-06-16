/**
 * Lead-data adapter: Google Places API (New). Betrouwbare ruggengraat — levert
 * rating, userRatingCount én reviews (tot 5) gegarandeerd, plus alle NAP-velden.
 * Key uit env GOOGLE_PLACES_API_KEY (via .env.local of creds-registry). Zonder key
 * is isConfigured() false en valt de registry terug op maps-scrape.
 *
 * Docs-shape (New API): https://places.googleapis.com/v1/places:searchText
 * en GET https://places.googleapis.com/v1/places/{id} met X-Goog-FieldMask.
 */
const BASE = 'https://places.googleapis.com/v1'

export const name = 'places-api'

function apiKey() {
  return process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY || null
}

export function isConfigured() {
  return !!apiKey()
}

async function call(url, { method = 'GET', fieldMask, body } = {}) {
  const key = apiKey()
  if (!key) throw new Error('GOOGLE_PLACES_API_KEY ontbreekt')
  const res = await fetch(url, {
    method,
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': fieldMask,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(`Places API ${res.status}: ${txt.slice(0, 200)}`)
  }
  return res.json()
}

export async function searchLeads(niche, city, take = 15) {
  const data = await call(`${BASE}/places:searchText`, {
    method: 'POST',
    fieldMask: 'places.id,places.displayName',
    body: { textQuery: `${niche} ${city}`, languageCode: 'nl', regionCode: 'NL', maxResultCount: Math.min(take, 20) },
  })
  return (data.places ?? []).slice(0, take).map((p) => ({
    name: p.displayName?.text ?? null,
    ref: p.id, // place_id
  }))
}

// Bouw straat/postcode/plaats uit gestructureerde addressComponents (betrouwbaarder dan splitsen).
function parseAddress(components = []) {
  const get = (type) => components.find((c) => (c.types ?? []).includes(type))
  const route = get('route')?.longText ?? ''
  const nr = get('street_number')?.longText ?? ''
  const postcode = get('postal_code')?.longText ?? ''
  const city = get('locality')?.longText ?? get('postal_town')?.longText ?? ''
  const street = [route, nr].filter(Boolean).join(' ').trim()
  return { street, postcode, city }
}

export async function fetchLeadDetail(placeId) {
  const fieldMask = [
    'id', 'displayName', 'nationalPhoneNumber', 'internationalPhoneNumber',
    'formattedAddress', 'addressComponents', 'rating', 'userRatingCount',
    'websiteUri', 'googleMapsUri', 'types', 'primaryTypeDisplayName', 'reviews',
  ].join(',')
  const p = await call(`${BASE}/places/${placeId}`, { fieldMask })

  const { street, postcode, city } = parseAddress(p.addressComponents)
  const reviewSnippets = (p.reviews ?? []).map((r) => ({
    authorRaw: r.authorAttribution?.displayName ?? null,
    text: r.text?.text ?? r.originalText?.text ?? null,
    rating: typeof r.rating === 'number' ? r.rating : null,
    date: r.relativePublishTimeDescription ?? null,
  })).filter((r) => r.text)

  const src = 'places-api'
  return {
    title: p.displayName?.text ?? null,
    phoneRaw: p.nationalPhoneNumber ?? p.internationalPhoneNumber ?? null,
    address: street || p.formattedAddress || '',
    postcode,
    city,
    mapsUrl: p.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    hasWebsite: !!p.websiteUri,
    websiteUrl: p.websiteUri ?? null,
    reviewsCount: typeof p.userRatingCount === 'number' ? p.userRatingCount : null,
    reviewsRating: typeof p.rating === 'number' ? p.rating : null,
    reviewSnippets,
    category: p.primaryTypeDisplayName?.text ?? p.types?.[0] ?? null,
    fieldSources: {
      title: p.displayName ? src : null,
      phone: p.nationalPhoneNumber || p.internationalPhoneNumber ? src : null,
      address: street || p.formattedAddress ? src : null,
      website: p.websiteUri ? src : null,
      rating: typeof p.rating === 'number' ? src : null,
      reviewsCount: typeof p.userRatingCount === 'number' ? src : null,
      reviewSnippets: reviewSnippets.length ? src : null,
      category: p.primaryTypeDisplayName || p.types ? src : null,
    },
  }
}
