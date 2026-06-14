/**
 * Test voor contrast.mjs (P1.2 contrast-guard).
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { wcagContrast, ensureReadableOnWhite, hexToRgb } from '../lib/contrast.mjs'

test('wcagContrast: bekende extremen', () => {
  assert.ok(Math.abs(wcagContrast('#000000', '#ffffff') - 21) < 0.01, 'zwart/wit = 21')
  assert.ok(Math.abs(wcagContrast('#ffffff', '#ffffff') - 1) < 0.01, 'wit/wit = 1')
})

test('wcagContrast: onbekende input → 1 (veilige fallback)', () => {
  assert.equal(wcagContrast('niet-een-kleur', '#fff'), 1)
})

test('hexToRgb: short + long form', () => {
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 })
  assert.deepEqual(hexToRgb('1d4ed8'), { r: 29, g: 78, b: 216 })
})

test('ensureReadableOnWhite: donker-genoeg blijft ongewijzigd', () => {
  const r = ensureReadableOnWhite('#1d4ed8') // donkerblauw, haalt 4.5 al
  assert.equal(r.adjusted, false)
  assert.ok(r.ratio >= 4.5)
})

test('ensureReadableOnWhite: felgeel wordt gecorrigeerd tot leesbaar', () => {
  const r = ensureReadableOnWhite('#ffe600') // fel geel, ~1.1 op wit
  assert.equal(r.adjusted, true)
  assert.ok(r.ratio >= 4.5, `ratio na correctie ${r.ratio} moet >= 4.5`)
  // Resultaat moet een geldige hex zijn en donkerder dan origineel.
  assert.match(r.color, /^#[0-9a-f]{6}$/)
})

test('ensureReadableOnWhite: onparsebaar → origineel terug', () => {
  const r = ensureReadableOnWhite('rgb(1,2,3)')
  assert.equal(r.adjusted, false)
})
