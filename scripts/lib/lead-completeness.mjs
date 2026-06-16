/**
 * Lead-data-completeness: maakt expliciet welk veld ECHT gescrapet is en welk
 * ontbreekt — nooit een stil-partiële lead. Kritieke velden (naam + minstens één
 * contactweg) moeten aanwezig zijn, anders bouwen we geen halve site.
 */

// Velden die we proberen te verzamelen + of ze kritiek zijn voor een bruikbare lead.
const FIELDS = [
  { key: 'title', label: 'bedrijfsnaam', critical: true },
  { key: 'phone', label: 'telefoon', critical: false, contact: true },
  { key: 'email', label: 'e-mail', critical: false, contact: true },
  { key: 'address', label: 'adres', critical: false },
  { key: 'city', label: 'plaats', critical: false },
  { key: 'kvk', label: 'kvk', critical: false },
  { key: 'btw', label: 'btw', critical: false },
  { key: 'website', label: 'website', critical: false },
  { key: 'rating', label: 'rating', critical: false },
  { key: 'reviewsCount', label: 'review-aantal', critical: false },
  { key: 'reviewSnippets', label: 'review-teksten', critical: false },
  { key: 'category', label: 'categorie', critical: false },
  { key: 'logo', label: 'logo', critical: false },
]

/**
 * @param {object} data — genormaliseerde lead met velden + optioneel `fieldSources`
 * @returns {{ pass:boolean, critical:string[], missing:string[], present:string[], fields:object }}
 */
export function assessLead(data) {
  const sources = data.fieldSources ?? {}
  const present = []
  const missing = []
  const criticalMissing = []
  const fields = {}

  for (const f of FIELDS) {
    const raw = data[f.key]
    const has = Array.isArray(raw) ? raw.length > 0 : raw != null && raw !== '' && raw !== 0
    fields[f.key] = { present: has, source: sources[f.key] ?? (has ? 'derived' : null) }
    if (has) present.push(f.key)
    else {
      missing.push(f.key)
      if (f.critical) criticalMissing.push(f.label)
    }
  }

  // Minstens één contactweg (telefoon of e-mail) vereist voor een belbare lead.
  const hasContact = FIELDS.filter((f) => f.contact).some((f) => fields[f.key].present)
  if (!hasContact) criticalMissing.push('geen contactweg (telefoon/e-mail)')

  return {
    pass: criticalMissing.length === 0,
    critical: criticalMissing,
    missing,
    present,
    fields,
  }
}
