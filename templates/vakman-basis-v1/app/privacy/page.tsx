import type { Metadata } from 'next'
import LegalPageShell, { LegalSection } from '../../components/legal-page-shell'
import { SITE, IS_LIVE } from '../site-config'

export const metadata: Metadata = {
  title: `Privacyverklaring · ${'{{BUSINESS_NAME}}'}`,
  description: 'Hoe wij omgaan met je persoonsgegevens.',
  robots: { index: false, follow: true },
}

const LAST_UPDATED = new Date().toLocaleDateString('nl-NL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacyverklaring"
      intro={`Hier lees je welke persoonsgegevens ${SITE.name} verwerkt, waarom, en welke rechten je hebt.`}
    >
      <LegalSection heading="1. Wie is verantwoordelijk?">
        <p>
          {SITE.name}
          {SITE.address && (
            <>
              , gevestigd aan {SITE.address}
              {SITE.postcode && `, ${SITE.postcode}`} {SITE.city && SITE.city}
            </>
          )}
          , is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze
          verklaring.
        </p>
        <ul className="list-none space-y-1">
          {SITE.kvk && <li>KvK-nummer: {SITE.kvk}</li>}
          {SITE.btw && <li>BTW-identificatienummer: {SITE.btw}</li>}
          {SITE.phone && <li>Telefoon: {SITE.phone}</li>}
          {SITE.email && <li>E-mail: {SITE.email}</li>}
        </ul>
      </LegalSection>

      <LegalSection heading="2. Welke gegevens verwerken we en waarom?">
        <p>
          <strong>Contact via telefoon, WhatsApp of e-mail.</strong> Als je contact opneemt,
          verwerken we de gegevens die je zelf deelt: je naam, telefoonnummer of e-mailadres en de
          inhoud van je bericht. We gebruiken die uitsluitend om je vraag te beantwoorden en een
          eventuele offerte of afspraak te regelen. Grondslag: uitvoering van een (aanstaande)
          overeenkomst.
        </p>
        <p>
          <strong>Contactformulier.</strong> Vul je het formulier op deze site in, dan komen je
          gegevens direct bij ons binnen{SITE.email && ` op ${SITE.email}`}. We bewaren ze maximaal
          één jaar na het laatste contact, daarna verwijderen we ze.
        </p>
        <p>
          <strong>Websitebezoek.</strong>{' '}
          {IS_LIVE
            ? 'Deze site gebruikt Microsoft Clarity om te zien hoe bezoekers de site gebruiken, maar alleen nadat je daar via de cookie-melding toestemming voor hebt gegeven. Zie de '
            : 'Op deze versie van de site zijn geen analyse- of trackingcookies actief. Zie de '}
          <a href="/cookies" className="underline" style={{ color: SITE.primaryColor }}>
            cookieverklaring
          </a>{' '}
          voor details.
        </p>
        <p>
          <strong>Hosting.</strong> Deze website wordt gehost bij Vercel. De server verwerkt
          technische gegevens (zoals IP-adres) in logbestanden, kort en uitsluitend om de site
          veilig en bereikbaar te houden. Grondslag: gerechtvaardigd belang.
        </p>
      </LegalSection>

      <LegalSection heading="3. Met wie delen we gegevens?">
        <p>
          We verkopen je gegevens nooit. We delen ze alleen met partijen die nodig zijn om deze
          website en onze dienstverlening te laten werken:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Vercel Inc. (hosting van deze website)</li>
          {IS_LIVE && <li>Microsoft Corporation (Clarity-statistieken, alleen na jouw toestemming)</li>}
          <li>Onze e-mailprovider (afhandeling van berichten)</li>
        </ul>
        <p>
          Met deze partijen gelden verwerkersafspraken. Voor zover gegevens buiten de EU worden
          verwerkt, gebeurt dat op basis van de EU-standaardcontractbepalingen.
        </p>
      </LegalSection>

      <LegalSection heading="4. Hoe lang bewaren we gegevens?">
        <p>
          Contactgegevens bewaren we maximaal één jaar na het laatste contact. Word je klant, dan
          bewaren we gegevens zo lang als nodig voor de opdracht en de wettelijke
          (fiscale) bewaarplicht van zeven jaar voor administratie.
        </p>
      </LegalSection>

      <LegalSection heading="5. Jouw rechten">
        <p>Je hebt het recht om:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>in te zien welke gegevens we van je hebben</li>
          <li>gegevens te laten corrigeren of verwijderen</li>
          <li>de verwerking te beperken of er bezwaar tegen te maken</li>
          <li>je gegevens overgedragen te krijgen (dataportabiliteit)</li>
          <li>een gegeven toestemming op elk moment in te trekken</li>
        </ul>
        <p>
          Stuur je verzoek naar {SITE.email ? <strong>{SITE.email}</strong> : 'ons contactadres'}
          {SITE.phone && <> of bel {SITE.phone}</>}. We reageren binnen vier weken. Niet tevreden
          met de afhandeling? Je kunt een klacht indienen bij de Autoriteit Persoonsgegevens via{' '}
          <a
            href="https://autoriteitpersoonsgegevens.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: SITE.primaryColor }}
          >
            autoriteitpersoonsgegevens.nl
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="6. Wijzigingen">
        <p>
          We kunnen deze verklaring aanpassen als de site of wetgeving verandert. De actuele versie
          staat altijd op deze pagina.
        </p>
        <p className="text-xs text-[var(--color-ink-500)]">Laatst bijgewerkt: {LAST_UPDATED}</p>
      </LegalSection>
    </LegalPageShell>
  )
}
