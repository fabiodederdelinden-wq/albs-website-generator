/**
 * Regressie-test voor render-template.mjs (P0.6).
 * Borgt dat gemene bedrijfsnamen ($, apostrof, &, umlaut, emoji) de render niet
 * corrumperen: TSX-strings blijven geldig, JSON blijft parsebaar, geen $&/$1-artefacten.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { renderTemplate } from '../lib/render-template.mjs'

const NAMES = ["O'Brien Loodgieters", 'Kop & Schotel', '100$ Service', 'Müller Dakwerken', '🔧 Klusbedrijf']

async function buildMiniTemplate() {
  const dir = await mkdtemp(path.join(tmpdir(), 'albs-tmpl-'))
  // TSX: waarde belandt in een single-quoted JS-string
  await writeFile(path.join(dir, 'app.tsx'), `export const NAME = '{{BUSINESS_NAME}}'\nexport const TAG = '{{BUSINESS_TAGLINE}}'\n`)
  // JSON: waarde belandt in een JSON-string
  await writeFile(path.join(dir, 'data.json'), `{"name":"{{BUSINESS_NAME}}","tag":"{{BUSINESS_TAGLINE}}"}`)
  // package.json is verplicht (render-template patcht naam/versie)
  await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'mini', version: '0.0.0' }))
  return dir
}

for (const name of NAMES) {
  test(`render zonder corruptie: ${name}`, async () => {
    const templateDir = await buildMiniTemplate()
    const dstDir = await mkdtemp(path.join(tmpdir(), 'albs-out-'))
    try {
      await renderTemplate({
        templateDir,
        dstDir,
        placeholders: { BUSINESS_NAME: name, BUSINESS_TAGLINE: `De beste van ${name}` },
        siteName: 'mini-test',
      })

      // 1) Geen onvervangen placeholders
      const tsx = await readFile(path.join(dstDir, 'app.tsx'), 'utf8')
      const json = await readFile(path.join(dstDir, 'data.json'), 'utf8')
      assert.ok(!tsx.includes('{{'), 'TSX heeft onvervangen placeholder')
      assert.ok(!json.includes('{{'), 'JSON heeft onvervangen placeholder')

      // 2) Geen $-replacement-artefacten (de oude String.replace-bug)
      assert.ok(!tsx.includes('$&') && !tsx.includes('$1'), 'TSX bevat $-artefact')

      // 3) JSON blijft parsebaar (apostrof/&/$/umlaut/emoji mogen JSON niet breken)
      const parsed = JSON.parse(json)
      assert.equal(parsed.name, name.replace(/[\r\n\t]+/g, ' '))

      // 4) TSX-string is een geldige single-quoted JS-string: eval levert exact de naam.
      //    Apostrof moet ge-escaped zijn, backslash gestript (conform sanitizeForJsString).
      const m = tsx.match(/export const NAME = '([\s\S]*?)'\n/)
      assert.ok(m, 'NAME-export niet gevonden / quote-balans kapot')
      // eslint-disable-next-line no-eval
      const evaluated = eval(`'${m[1]}'`)
      assert.equal(evaluated, name.replace(/\\/g, ''))
    } finally {
      await rm(templateDir, { recursive: true, force: true })
      await rm(dstDir, { recursive: true, force: true })
    }
  })
}
