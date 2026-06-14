/**
 * Vision-validatie: Claude Sonnet vision via Vercel AI Gateway.
 * Input: logo buffer + business-name.
 * Output: { matchScore: 0-100, hasName: bool, reason: string } of null.
 */

export async function validateLogo({ logoBuffer, mimeType = 'image/png', businessName }) {
  const tokenSource = process.env.AI_GATEWAY_API_KEY
    ? 'AI_GATEWAY_API_KEY'
    : process.env.AI_GATEWAY_TOKEN
      ? 'AI_GATEWAY_TOKEN'
      : process.env.VERCEL_OIDC_TOKEN
        ? 'VERCEL_OIDC_TOKEN'
        : null
  const token = process.env.AI_GATEWAY_API_KEY || process.env.AI_GATEWAY_TOKEN || process.env.VERCEL_OIDC_TOKEN
  if (!token) {
    console.warn('[validate-logo] geen AI-gateway-token → vision-validatie overgeslagen (logo-trust ongewijzigd)')
    return null
  }
  if (process.env.ALBS_DEBUG) console.warn(`[validate-logo] token-bron: ${tokenSource}`)
  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 30_000)
  try {
    const base64 = logoBuffer.toString('base64')
    const prompt = `Je krijgt een logo-afbeelding en een bedrijfsnaam. Bepaal of dit logo bij dit bedrijf hoort.

Bedrijfsnaam: ${businessName}

Antwoord ALLEEN als JSON: {"matchScore": 0-100, "hasName": true/false, "reason": "korte uitleg max 80 chars"}

matchScore=100: logo bevat exact deze bedrijfsnaam.
matchScore=70-99: logo lijkt op bedrijf (afkorting, gerelateerd icoon).
matchScore=40-69: onduidelijk.
matchScore=0-39: logo lijkt NIET bij dit bedrijf te horen.`

    const res = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4-6',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
            ],
          },
        ],
        max_tokens: 200,
        temperature: 0.1,
      }),
    })
    if (!res.ok) {
      console.warn(`[validate-logo] AI-gateway antwoordde ${res.status} → validatie overgeslagen`)
      return null
    }
    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content
    if (!content) return null
    const m = content.match(/\{[\s\S]*\}/)
    if (!m) return null
    const parsed = JSON.parse(m[0])
    const score = parseInt(parsed.matchScore, 10)
    if (Number.isNaN(score)) return null
    return {
      matchScore: Math.max(0, Math.min(100, score)),
      hasName: parsed.hasName === true,
      reason: String(parsed.reason ?? '').slice(0, 100),
    }
  } catch (e) {
    const reason = e.name === 'AbortError' ? 'timeout na 30s' : e.message
    console.warn(`[validate-logo] vision-validatie mislukt (${reason}) → logo-trust ongewijzigd`)
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export function adjustTrustFromValidation(baseTrust, validation) {
  if (!validation) return baseTrust
  if (validation.matchScore >= 80) return baseTrust
  if (validation.matchScore >= 60) return Math.max(0, baseTrust - 1)
  if (validation.matchScore >= 40) return Math.max(0, baseTrust - 3)
  return Math.max(0, baseTrust - 5)
}
