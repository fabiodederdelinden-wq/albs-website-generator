import type { Metadata } from 'next'
import './globals.css'
import ClarityInit from '../components/clarity-init'

const CLARITY_PROJECT_ID: string = '{{CLARITY_PROJECT_ID}}'

export const metadata: Metadata = {
  title: '{{BUSINESS_NAME}} · {{BUSINESS_CITY}}',
  description: '{{BUSINESS_TAGLINE}}',
}

// Pre-intro boot-script: zet intro-pending class direct, voorkomt flicker
const bootScript = `(function(){try{var sk=sessionStorage.getItem('albs-intro-seen');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!sk && !rm){document.documentElement.classList.add('intro-pending','intro-active');}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasClarity: boolean = !!(CLARITY_PROJECT_ID && !CLARITY_PROJECT_ID.startsWith('{{'))
  return (
    <html lang="nl" id="top">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto:wght@700;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {hasClarity && <ClarityInit projectId={CLARITY_PROJECT_ID} />}
        {children}
      </body>
    </html>
  )
}
