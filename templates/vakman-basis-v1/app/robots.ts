import type { MetadataRoute } from 'next'
import { IS_LIVE } from './site-config'

/**
 * Preview-deploys (verkoopdemo) mogen NOOIT geïndexeerd worden — onzichtbare
 * bescherming, de site zelf oogt 100% af. Live sites zijn volledig open.
 */
export default function robots(): MetadataRoute.Robots {
  if (IS_LIVE) {
    return {
      rules: { userAgent: '*', allow: '/' },
    }
  }
  return {
    rules: { userAgent: '*', disallow: '/' },
  }
}
