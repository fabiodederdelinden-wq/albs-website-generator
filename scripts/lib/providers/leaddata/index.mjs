/**
 * Lead-data provider-registry. Kiest de actieve bron:
 *   1. expliciet via ALBS_LEADDATA_PROVIDER (places-api | maps-scrape)
 *   2. anders: places-api als die geconfigureerd is (key aanwezig), anders maps-scrape.
 * Zo schakelt de pipeline vanzelf naar Places API zodra de key er is, zonder code-wijziging.
 */
import * as mapsScrape from './maps-scrape.mjs'
import * as placesApi from './places-api.mjs'

const ADAPTERS = { 'maps-scrape': mapsScrape, 'places-api': placesApi }

export function activeProvider() {
  const forced = process.env.ALBS_LEADDATA_PROVIDER
  if (forced && ADAPTERS[forced]) {
    const a = ADAPTERS[forced]
    if (!a.isConfigured()) {
      console.warn(`[leaddata] geforceerde provider '${forced}' is niet geconfigureerd → fallback maps-scrape`)
      return mapsScrape
    }
    return a
  }
  return placesApi.isConfigured() ? placesApi : mapsScrape
}

export async function searchLeads(niche, city, take) {
  return activeProvider().searchLeads(niche, city, take)
}

export async function fetchLeadDetail(ref) {
  return activeProvider().fetchLeadDetail(ref)
}

export function activeProviderName() {
  return activeProvider().name
}
