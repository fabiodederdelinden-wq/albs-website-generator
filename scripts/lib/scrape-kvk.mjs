/**
 * KvK-lookup via gratis api.overheid.io/openkvk (CC BY 4.0).
 * Geen API-key nodig.
 * Geeft: kvkNumber, handelsnaam, vestigingsplaats.
 */

const BASE = 'https://api.overheid.io/openkvk'

export async function lookupKvk(handelsnaam, postcode) {
  if (!handelsnaam) return null
  const url = new URL(BASE)
  url.searchParams.set('filters[handelsnaam]', handelsnaam)
  if (postcode) {
    url.searchParams.set('filters[postcode]', postcode.replace(/\s/g, '').toUpperCase())
  }
  url.searchParams.set('size', '3')

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ALBS-research/1.0',
      },
    })
    if (!res.ok) return null
    const json = await res.json()
    const hits = json?._embedded?.bedrijf ?? []
    if (hits.length === 0) return null
    const best = hits[0]
    return {
      kvkNumber: best?.dossiernummer ?? null,
      handelsnaam: best?.handelsnaam ?? null,
      vestigingsplaats: best?.vestigingsplaats ?? null,
      hits: hits.length,
    }
  } catch {
    return null
  }
}
