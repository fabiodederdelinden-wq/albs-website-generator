import { SITE, siteUrl } from '../app/site-config'

/**
 * Schema.org LocalBusiness JSON-LD — de belangrijkste lokale-SEO-bouwsteen.
 * Subtype per niche; aggregateRating alleen als er echte (zichtbare) reviews zijn.
 */

const NICHE_SCHEMA_TYPE: Record<string, string> = {
  loodgieter: 'Plumber',
  elektricien: 'Electrician',
  schilder: 'HousePainter',
  dakdekker: 'RoofingContractor',
  aannemer: 'GeneralContractor',
  installateur: 'HVACBusiness',
  'cv-monteur': 'HVACBusiness',
  slotenmaker: 'Locksmith',
  stukadoor: 'HomeAndConstructionBusiness',
  hovenier: 'HomeAndConstructionBusiness',
  klusbedrijf: 'HomeAndConstructionBusiness',
}

export default function LocalBusinessJsonLd({
  reviewCount,
  reviewRating,
  hasVisibleReviews,
}: {
  reviewCount: number
  reviewRating: number
  hasVisibleReviews: boolean
}) {
  const base = siteUrl()
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': NICHE_SCHEMA_TYPE[SITE.niche] ?? 'HomeAndConstructionBusiness',
    '@id': `${base}/#business`,
    name: SITE.name,
    url: `${base}/`,
    image: `${base}/opengraph-image`,
    ...(SITE.tagline && { description: SITE.tagline }),
    ...(SITE.phone && { telephone: SITE.phone }),
    ...(SITE.email && { email: SITE.email }),
    ...(SITE.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address,
        ...(SITE.postcode && { postalCode: SITE.postcode }),
        addressLocality: SITE.city,
        addressCountry: 'NL',
      },
    }),
    ...(SITE.city && { areaServed: { '@type': 'City', name: SITE.city } }),
    ...(SITE.btw && { vatID: SITE.btw }),
    ...(SITE.kvk && {
      identifier: { '@type': 'PropertyValue', propertyID: 'KVK', value: SITE.kvk },
    }),
    ...(hasVisibleReviews &&
      reviewCount > 0 &&
      reviewRating > 0 && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: reviewRating,
          reviewCount: reviewCount,
          bestRating: 5,
        },
      }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
