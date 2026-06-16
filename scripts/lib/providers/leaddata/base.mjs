/**
 * Lead-data provider-contract (vision-default §2: externe bron achter adapter).
 * Elke adapter levert dezelfde genormaliseerde vorm zodat we bronnen kunnen wisselen
 * (gratis scrape ↔ Places API ↔ third-party) zonder de pipeline te raken.
 *
 * Een adapter exporteert:
 *
 *   searchLeads(niche: string, city: string, take: number)
 *     → Promise<Array<{ name: string, ref: string }>>
 *     // ref is een opaque verwijzing die fetchLeadDetail begrijpt (mapsUrl of placeId).
 *
 *   fetchLeadDetail(ref: string)
 *     → Promise<LeadDetail>
 *
 * LeadDetail (genormaliseerd, zelfde shape voor alle adapters):
 *   {
 *     title, phoneRaw, address, postcode, city, mapsUrl,
 *     hasWebsite, websiteUrl, reviewsCount, reviewsRating,
 *     reviewSnippets: [{ authorRaw, text, rating, date }],
 *     category,
 *     fieldSources: { <veld>: <bron-string|null> }   // herkomst per veld, geen stille gaten
 *   }
 *
 *   isConfigured(): boolean   // of de adapter bruikbaar is (bv. key aanwezig)
 *   name: string
 */
export const LEAD_DETAIL_FIELDS = [
  'title', 'phoneRaw', 'address', 'postcode', 'city', 'mapsUrl',
  'hasWebsite', 'websiteUrl', 'reviewsCount', 'reviewsRating',
  'reviewSnippets', 'category', 'fieldSources',
]
