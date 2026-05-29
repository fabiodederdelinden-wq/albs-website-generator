/**
 * Deterministische verify-stap (geen Claude nodig, geen tokens).
 * Cross-check telefoon (libphonenumber NL), email (MX-record lookup),
 * KvK (8-cijferig), adres (heeft NL-postcode).
 *
 * Output: { ok, fields: {phone:{valid, formatted}, email:{valid, mxHost}, kvk:{valid}}, errors[] }
 */

import { Resolver } from 'node:dns/promises'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const NL_POSTCODE_RE = /^\d{4}\s?[A-Z]{2}$/i

const resolver = new Resolver()
resolver.setServers(['8.8.8.8', '1.1.1.1'])

export function verifyPhoneNL(raw) {
  if (!raw) return { valid: false, formatted: null, type: null }
  const parsed = parsePhoneNumberFromString(raw, 'NL')
  if (!parsed || !parsed.isValid()) return { valid: false, formatted: null, type: null }
  return {
    valid: true,
    formatted: parsed.number, // E.164 +31...
    national: parsed.formatNational(),
    type: parsed.getType() ?? 'unknown',
  }
}

async function lookupMx(domain, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), timeoutMs)
    resolver
      .resolveMx(domain)
      .then((records) => {
        clearTimeout(t)
        if (!records || records.length === 0) return resolve(null)
        records.sort((a, b) => a.priority - b.priority)
        resolve(records[0].exchange)
      })
      .catch(() => {
        clearTimeout(t)
        resolve(null)
      })
  })
}

export async function verifyEmail(email) {
  if (!email || !email.includes('@')) return { valid: false, mxHost: null }
  const domain = email.split('@')[1].toLowerCase()
  const mxHost = await lookupMx(domain)
  return { valid: !!mxHost, mxHost, domain }
}

export function verifyKvk(kvk) {
  if (!kvk) return { valid: false }
  const digits = String(kvk).replace(/[^0-9]/g, '')
  return { valid: digits.length === 8, number: digits }
}

export function verifyPostcode(postcode) {
  if (!postcode) return { valid: false }
  return { valid: NL_POSTCODE_RE.test(postcode.trim()) }
}

export async function verifyLead(lead) {
  const errors = []
  const phone = verifyPhoneNL(lead.phoneRaw)
  if (!phone.valid && lead.phoneRaw) errors.push('phone-format-invalid')

  const email = lead.businessEmail ? await verifyEmail(lead.businessEmail) : { valid: false }
  if (lead.businessEmail && !email.valid) errors.push('email-mx-failed')

  const kvk = verifyKvk(lead.kvkNumber)
  if (lead.kvkNumber && !kvk.valid) errors.push('kvk-format-invalid')

  const postcode = verifyPostcode(lead.postcode)
  if (lead.postcode && !postcode.valid) errors.push('postcode-format-invalid')

  // Strict business rule: skip als geen tel EN geen email
  const reachable = phone.valid || email.valid

  return {
    ok: reachable && errors.length === 0,
    reachable,
    fields: { phone, email, kvk, postcode },
    errors,
  }
}
