/**
 * AVG-veilige anonimisering van reviewer-namen.
 * "Jan Bovelander" → "Jan B."
 * "M. de Vries" → "M. de V."
 * Lege/local-guides-only: "Anonieme reviewer"
 */

export function anonymizeAuthor(raw) {
  if (!raw) return 'Anonieme reviewer'
  const clean = raw.replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim()
  if (!clean) return 'Anonieme reviewer'
  const parts = clean.split(' ').filter(Boolean)
  if (parts.length === 1) {
    return parts[0]
  }
  const first = parts[0]
  const last = parts[parts.length - 1]
  // Tussenvoegsels niet inkorten (de/van/der/het etc.)
  return `${first} ${last.charAt(0).toUpperCase()}.`
}

export function initialsAvatar(raw) {
  if (!raw) return 'A'
  const clean = raw.replace(/\(.*?\)/g, '').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'A'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}
