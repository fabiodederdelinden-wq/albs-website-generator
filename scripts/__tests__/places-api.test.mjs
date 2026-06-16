import { test } from 'node:test'
import assert from 'node:assert/strict'

// Mock global fetch vóór import van de adapter.
const FAKE_DETAIL = {
  id: 'PLACE123',
  displayName: { text: 'Loodgieter Jansen' },
  nationalPhoneNumber: '030 123 4567',
  formattedAddress: 'Voorstraat 12, 3512 AA Utrecht',
  addressComponents: [
    { types: ['route'], longText: 'Voorstraat' },
    { types: ['street_number'], longText: '12' },
    { types: ['postal_code'], longText: '3512 AA' },
    { types: ['locality'], longText: 'Utrecht' },
  ],
  rating: 4.8,
  userRatingCount: 137,
  websiteUri: 'https://loodgieter-jansen.nl',
  googleMapsUri: 'https://maps.google.com/?cid=1',
  primaryTypeDisplayName: { text: 'Loodgieter' },
  reviews: [
    { authorAttribution: { displayName: 'Piet K.' }, text: { text: 'Snel en netjes geholpen.' }, rating: 5, relativePublishTimeDescription: '2 weken geleden' },
    { authorAttribution: { displayName: 'Anna B.' }, text: { text: 'Vakkundig advies.' }, rating: 4, relativePublishTimeDescription: 'een maand geleden' },
  ],
}

test('places-api normaliseert detail correct (met key)', async () => {
  process.env.GOOGLE_PLACES_API_KEY = 'testkey'
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => FAKE_DETAIL, text: async () => '' })
  const places = await import('../lib/providers/leaddata/places-api.mjs')

  assert.equal(places.isConfigured(), true)
  const d = await places.fetchLeadDetail('PLACE123')
  assert.equal(d.title, 'Loodgieter Jansen')
  assert.equal(d.phoneRaw, '030 123 4567')
  assert.equal(d.address, 'Voorstraat 12')
  assert.equal(d.postcode, '3512 AA')
  assert.equal(d.city, 'Utrecht')
  assert.equal(d.reviewsRating, 4.8)
  assert.equal(d.reviewsCount, 137) // ← dit was het null-probleem bij scrapen
  assert.equal(d.reviewSnippets.length, 2)
  assert.equal(d.reviewSnippets[0].text, 'Snel en netjes geholpen.')
  assert.equal(d.hasWebsite, true)
  assert.equal(d.fieldSources.reviewsCount, 'places-api')
})

test('places-api: searchLeads geeft {name, ref}', async () => {
  process.env.GOOGLE_PLACES_API_KEY = 'testkey'
  globalThis.fetch = async () => ({
    ok: true, status: 200,
    json: async () => ({ places: [{ id: 'P1', displayName: { text: 'A BV' } }, { id: 'P2', displayName: { text: 'B BV' } }] }),
    text: async () => '',
  })
  const places = await import('../lib/providers/leaddata/places-api.mjs')
  const r = await places.searchLeads('loodgieter', 'Utrecht', 10)
  assert.equal(r.length, 2)
  assert.deepEqual(r[0], { name: 'A BV', ref: 'P1' })
})

test('places-api: zonder key isConfigured=false', async () => {
  delete process.env.GOOGLE_PLACES_API_KEY
  delete process.env.GOOGLE_MAPS_API_KEY
  const places = await import('../lib/providers/leaddata/places-api.mjs')
  assert.equal(places.isConfigured(), false)
})
