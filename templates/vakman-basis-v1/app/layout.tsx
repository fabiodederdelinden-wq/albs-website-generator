import type { Metadata, Viewport } from 'next'
import { Inter, Roboto, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CookieConsent from '../components/cookie-consent'
import { SITE, siteUrl } from './site-config'

// Self-hosted via next/font (download bij build, niet bij bezoeker):
// geen IP-doorgifte aan Google (AVG) en sneller laden dan de externe stylesheet.
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' })
const roboto = Roboto({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-roboto', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })

const CLARITY_PROJECT_ID: string = '{{CLARITY_PROJECT_ID}}'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: '{{BUSINESS_NAME}} · {{BUSINESS_CITY}}',
  description: '{{BUSINESS_TAGLINE}}',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: '{{BUSINESS_NAME}}',
    title: '{{BUSINESS_NAME}} · {{BUSINESS_CITY}}',
    description: '{{BUSINESS_TAGLINE}}',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: '{{BUSINESS_NAME}} · {{BUSINESS_CITY}}',
    description: '{{BUSINESS_TAGLINE}}',
  },
}

export const viewport: Viewport = {
  themeColor: SITE.primaryColor,
}

// Pre-intro boot-script: zet intro-pending class direct, voorkomt flicker.
// Alleen op de homepage — subpagina's (privacy/cookies) hebben geen Intro-component
// die de class weer weghaalt en zouden anders permanent verborgen blijven.
const bootScript = `(function(){try{if(location.pathname!=='/')return;var sk=sessionStorage.getItem('albs-intro-seen');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!sk && !rm){document.documentElement.classList.add('intro-pending','intro-active');}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      id="top"
      className={`${inter.variable} ${roboto.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <CookieConsent
          projectId={CLARITY_PROJECT_ID}
          siteMode={SITE.mode}
          primaryColor={SITE.primaryColor}
        />
      </body>
    </html>
  )
}
