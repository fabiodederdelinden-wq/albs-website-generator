import { test } from 'node:test'
import assert from 'node:assert/strict'
import { assessLead } from '../lib/lead-completeness.mjs'

test('naam + telefoon → pass', () => {
  const r = assessLead({ title: 'X BV', phone: '030 1234567', reviewSnippets: [] })
  assert.equal(r.pass, true)
  assert.ok(r.present.includes('title') && r.present.includes('phone'))
})

test('naam zonder enige contactweg → fail (kritiek)', () => {
  const r = assessLead({ title: 'X BV', phone: null, email: null, reviewSnippets: [] })
  assert.equal(r.pass, false)
  assert.ok(r.critical.some((c) => /contactweg/.test(c)))
})

test('geen naam → fail (kritiek veld)', () => {
  const r = assessLead({ title: null, phone: '030', reviewSnippets: [] })
  assert.equal(r.pass, false)
  assert.ok(r.critical.some((c) => /bedrijfsnaam/.test(c)))
})

test('e-mail telt als contactweg', () => {
  const r = assessLead({ title: 'X', phone: null, email: 'info@x.nl', reviewSnippets: [] })
  assert.equal(r.pass, true)
})

test('lege array (reviewSnippets) telt als afwezig, niet present', () => {
  const r = assessLead({ title: 'X', phone: '030', reviewSnippets: [] })
  assert.ok(r.missing.includes('reviewSnippets'))
})

test('fieldSources worden meegenomen', () => {
  const r = assessLead({ title: 'X', phone: '030', reviewSnippets: [], fieldSources: { reviewsCount: 'aria-label' } })
  // reviewsCount afwezig in data → present:false, maar source-veld blijft beschikbaar in fields
  assert.equal(r.fields.title.present, true)
})
