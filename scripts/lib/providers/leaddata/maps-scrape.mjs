/**
 * Lead-data adapter: gratis Google Maps frontend-scrape (Playwright).
 * Wrapt de bestaande, robuust-gemaakte scrape-maps.mjs (APP_INITIALIZATION_STATE
 * + aria-label-strategieën). Altijd beschikbaar; fallback als er geen Places-key is.
 * Beperking: review-count + review-teksten zijn niet 100% gegarandeerd (Google rendert
 * die wisselend) — daarvoor is de places-api adapter de betrouwbare bron.
 */
import { scrapeMapsList, scrapeMapsDetail } from '../../scrape-maps.mjs'

export const name = 'maps-scrape'

export function isConfigured() {
  return true // geen key nodig
}

export async function searchLeads(niche, city, take = 15) {
  const cards = await scrapeMapsList(niche, city, take)
  return cards.map((c) => ({ name: c.name, ref: c.href }))
}

export async function fetchLeadDetail(ref) {
  return scrapeMapsDetail(ref)
}
