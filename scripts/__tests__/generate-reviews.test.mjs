import { test } from 'node:test'
import assert from 'node:assert/strict'
import { generateReviews, reviewsAggregate } from '../lib/generate-reviews.mjs'

test('genereert 4-7 reviews, allemaal gemarkeerd generated', () => {
  const r = generateReviews({ businessName: 'Test BV', niche: 'loodgieter', city: 'Utrecht' })
  assert.ok(r.length >= 4 && r.length <= 7, `count ${r.length} buiten 4-7`)
  for (const x of r) {
    assert.equal(x.generated, true)
    assert.ok(x.rating === 4 || x.rating === 5, 'rating 4 of 5')
    assert.ok(x.text.length > 30, 'tekst niet leeg')
    assert.match(x.author, /^[A-Z][a-zé]+ [A-Z]\.$/, 'voornaam + initiaal (AVG)')
    assert.ok(x.relativeTime, 'relatieve datum aanwezig')
  }
})

test('deterministisch per bedrijf, verschillend tussen bedrijven', () => {
  const a1 = generateReviews({ businessName: 'Alpha', niche: 'hovenier', city: 'Breda' })
  const a2 = generateReviews({ businessName: 'Alpha', niche: 'hovenier', city: 'Breda' })
  const b = generateReviews({ businessName: 'Beta', niche: 'hovenier', city: 'Breda' })
  assert.deepEqual(a1, a2, 'zelfde input = zelfde output')
  assert.notDeepEqual(a1, b, 'ander bedrijf = andere set')
})

test('aggregate klopt en is realistisch (geen perfecte 5.0-muur verplicht)', () => {
  const r = generateReviews({ businessName: 'Gamma', niche: 'elektricien', city: 'Tilburg', count: 6 })
  const agg = reviewsAggregate(r)
  assert.equal(agg.count, 6)
  assert.ok(agg.rating >= 4 && agg.rating <= 5)
})

test('onbekende niche → generieke job-omschrijving, geen crash', () => {
  const r = generateReviews({ businessName: 'Delta', niche: 'onbekend-vak', city: 'Assen' })
  assert.ok(r.length >= 4)
  assert.ok(r[0].text.length > 30)
})
