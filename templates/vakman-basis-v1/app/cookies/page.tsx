import type { Metadata } from 'next'
import LegalPageShell, { LegalSection } from '../../components/legal-page-shell'
import { CookieSettingsButton } from '../../components/cookie-consent'
import { SITE, IS_LIVE } from '../site-config'

export const metadata: Metadata = {
  title: `Cookieverklaring · ${'{{BUSINESS_NAME}}'}`,
  description: 'Welke cookies deze website gebruikt en waarom.',
  robots: { index: false, follow: true },
}

const LAST_UPDATED = new Date().toLocaleDateString('nl-NL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Cookieverklaring"
      intro={`Welke cookies en vergelijkbare technieken ${SITE.name} op deze website gebruikt, en hoe je je keuze aanpast.`}
    >
      <LegalSection heading="1. Wat zijn cookies?">
        <p>
          Cookies zijn kleine bestanden die een website op je apparaat opslaat. Vergelijkbare
          technieken zijn localStorage en sessionStorage: opslag in je browser die niet wordt
          meegestuurd naar andere partijen.
        </p>
      </LegalSection>

      <LegalSection heading="2. Noodzakelijke opslag (geen toestemming nodig)">
        <p>Deze site gebruikt een paar functionele opslag-items die nodig zijn om goed te werken:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-mono text-xs">albs-intro-seen</span> (sessionStorage): onthoudt
            binnen je bezoek dat je de intro-animatie al hebt gezien. Verdwijnt zodra je de browser
            sluit.
          </li>
          {IS_LIVE && (
            <li>
              <span className="font-mono text-xs">albs-cookie-consent</span> (localStorage):
              onthoudt jouw cookie-keuze, zodat we er niet elke keer opnieuw om vragen.
            </li>
          )}
        </ul>
        <p>Deze opslag bevat geen persoonsgegevens en volgt je niet over andere websites.</p>
      </LegalSection>

      <LegalSection heading="3. Analytische cookies (alleen met jouw toestemming)">
        {IS_LIVE ? (
          <>
            <p>
              Na jouw toestemming gebruikt deze site <strong>Microsoft Clarity</strong> om
              anoniem te zien hoe bezoekers de site gebruiken (zoals klik- en scrollgedrag). Daarmee
              verbeteren we de site. Clarity plaatst onder andere deze cookies:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-mono text-xs">_clck</span> en{' '}
                <span className="font-mono text-xs">_clsk</span>: koppelen je bezoek aan één
                anonieme sessie (bewaartermijn tot 13 maanden respectievelijk 1 dag)
              </li>
              <li>
                <span className="font-mono text-xs">MUID</span>: Microsoft-identifier (tot 13
                maanden)
              </li>
            </ul>
            <p>
              Weiger je, dan worden deze cookies niet geplaatst en werkt de site gewoon volledig.
              Verwerker: Microsoft Corporation. Meer informatie staat in de{' '}
              <a href="/privacy" className="underline" style={{ color: SITE.primaryColor }}>
                privacyverklaring
              </a>
              .
            </p>
          </>
        ) : (
          <p>
            Op deze versie van de website zijn <strong>geen</strong> analytische of
            tracking-cookies actief. Er wordt dus ook geen toestemming gevraagd.
          </p>
        )}
      </LegalSection>

      <LegalSection heading="4. Je keuze aanpassen">
        {IS_LIVE ? (
          <>
            <p>
              Je kunt je keuze op elk moment wijzigen. Eerder geplaatste cookies verwijder je via de
              instellingen van je browser.
            </p>
            <div className="pt-2">
              <CookieSettingsButton primaryColor={SITE.primaryColor} />
            </div>
          </>
        ) : (
          <p>
            Omdat er geen optionele cookies zijn, valt er niets in te stellen. Cookies van andere
            websites beheer je via de instellingen van je browser.
          </p>
        )}
      </LegalSection>

      <LegalSection heading="5. Wijzigingen">
        <p>
          Verandert het cookiegebruik van deze site, dan werken we deze pagina bij.
        </p>
        <p className="text-xs text-[var(--color-ink-500)]">Laatst bijgewerkt: {LAST_UPDATED}</p>
      </LegalSection>
    </LegalPageShell>
  )
}
