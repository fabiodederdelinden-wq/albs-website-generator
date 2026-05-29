/**
 * Render @albs/template-vakman-basis-v1 met placeholder-replace naar dst-folder.
 * Schrijft standalone tsconfig en patcht package.json voor losse deploy.
 */

import { readFile, writeFile, readdir, mkdir, cp } from 'node:fs/promises'
import path from 'node:path'

const REPLACE_EXTS = new Set(['.tsx', '.ts', '.css', '.html', '.json', '.md', '.mjs'])
const SKIP_DIRS = new Set(['node_modules', '.next', '.turbo', 'dist'])

function sanitizeForJsString(value) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/'/g, "\\'")
    .replace(/\\$/g, '')
    .trim()
}

function applyReplacements(text, placeholders) {
  let out = text
  for (const [k, v] of Object.entries(placeholders)) {
    out = out.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), sanitizeForJsString(v))
  }
  return out
}

async function walkAndReplace(srcDir, dstDir, placeholders) {
  await mkdir(dstDir, { recursive: true })
  const entries = await readdir(srcDir, { withFileTypes: true })
  for (const ent of entries) {
    if (ent.name.startsWith('.dummy-customer')) continue
    if (SKIP_DIRS.has(ent.name)) continue
    const s = path.join(srcDir, ent.name)
    const d = path.join(dstDir, ent.name)
    if (ent.isDirectory()) await walkAndReplace(s, d, placeholders)
    else {
      const ext = path.extname(ent.name)
      if (REPLACE_EXTS.has(ext)) {
        const c = await readFile(s, 'utf8')
        await writeFile(d, applyReplacements(c, placeholders))
      } else {
        await cp(s, d)
      }
    }
  }
}

export async function renderTemplate({ templateDir, dstDir, placeholders, siteName }) {
  await walkAndReplace(templateDir, dstDir, placeholders)

  // Standalone tsconfig
  await writeFile(
    path.join(dstDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          jsx: 'preserve',
          strict: true,
          noUncheckedIndexedAccess: false,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          isolatedModules: true,
          skipLibCheck: true,
          incremental: true,
          noEmit: true,
          allowJs: true,
          plugins: [{ name: 'next' }],
          paths: { '@/*': ['./app/*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules', '.next', '.turbo'],
      },
      null,
      2,
    ),
  )

  // package.json patch
  const pkgPath = path.join(dstDir, 'package.json')
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))
  pkg.name = siteName
  pkg.version = '1.0.0'
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  await writeFile(path.join(dstDir, '.vercelignore'), 'node_modules\n.next/cache\n.turbo\n')

  return { dstDir, siteName }
}
