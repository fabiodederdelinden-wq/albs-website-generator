import type { NextConfig } from 'next'

const SITE_MODE: string = '{{SITE_MODE}}'
const IS_PREVIEW = SITE_MODE !== 'live'

const config: NextConfig = {
  async headers() {
    if (!IS_PREVIEW) return []
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default config
