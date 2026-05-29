import Intro, { type IntroPreset } from '../components/intro'
import HeaderPicker from '../components/header-variants/picker'
import HeroPicker from '../components/hero-picker'
import ServicesPicker from '../components/services-variants/picker'
import ProjectsPicker from '../components/projects-variants/picker'
import ReviewsPicker from '../components/reviews-variants/picker'
import TrustPicker from '../components/trust-variants/picker'
import OwnerPicker from '../components/owner-variants/picker'
import ContactPicker from '../components/contact-variants/picker'
import FooterPicker from '../components/footer-variants/picker'

const BUSINESS_NAME = '{{BUSINESS_NAME}}'
const BUSINESS_TAGLINE = '{{BUSINESS_TAGLINE}}'
const BUSINESS_PHONE = '{{BUSINESS_PHONE}}'
const BUSINESS_WHATSAPP = '{{BUSINESS_WHATSAPP}}'
const BUSINESS_EMAIL = '{{BUSINESS_EMAIL}}'
const BUSINESS_ADDRESS = '{{BUSINESS_ADDRESS}}'
const BUSINESS_CITY = '{{BUSINESS_CITY}}'
const BUSINESS_POSTCODE = '{{BUSINESS_POSTCODE}}'
const BUSINESS_KVK = '{{BUSINESS_KVK}}'
const PRIMARY_COLOR = '{{PRIMARY_COLOR}}'
const SERVICES_B64 = '{{SERVICES_B64}}'
const REVIEW_COUNT = parseInt('{{REVIEW_COUNT}}', 10) || 0
const REVIEW_RATING = parseFloat('{{REVIEW_RATING}}') || 0
const DEKKING_REGIO = '{{DEKKING_REGIO}}'
const REVIEWS_RAW = '{{REVIEWS_JSON}}'
const PROJECTS_RAW = '{{PROJECTS_JSON}}'
const REVIEWS_SOURCE_URL = '{{REVIEWS_SOURCE_URL}}'
const HAS_EMAIL: boolean = JSON.parse('{{HAS_EMAIL}}')
const HAS_KVK: boolean = JSON.parse('{{HAS_KVK}}')
const LAYOUT_VARIANT = '{{LAYOUT_VARIANT}}' as string
const INTRO_PRESET_RAW = '{{INTRO_PRESET}}'
const REVIEWS_VARIANT_RAW = '{{REVIEWS_VARIANT}}'
const OWNER_PHOTO_URL: string = '{{OWNER_PHOTO_URL}}'
const OWNER_NAME: string = '{{OWNER_NAME}}'
const OWNER_VARIANT_RAW = '{{OWNER_VARIANT}}'
const HERO_VARIANT_RAW = '{{HERO_VARIANT}}'
const HEADER_VARIANT_RAW = '{{HEADER_VARIANT}}'
const SERVICES_VARIANT_RAW = '{{SERVICES_VARIANT}}'
const PROJECTS_VARIANT_RAW = '{{PROJECTS_VARIANT}}'
const TRUST_VARIANT_RAW = '{{TRUST_VARIANT}}'
const CONTACT_VARIANT_RAW = '{{CONTACT_VARIANT}}'
const FOOTER_VARIANT_RAW = '{{FOOTER_VARIANT}}'
const NICHE_RAW = '{{NICHE}}'
const ACCENT_COLOR_RAW = '{{ACCENT_COLOR}}'

function clampVariant(raw: string, max = 10): number {
  return Math.max(1, Math.min(max, parseInt(raw, 10) || 1))
}

const introPreset = clampVariant(INTRO_PRESET_RAW) as IntroPreset
const reviewsVariant = clampVariant(REVIEWS_VARIANT_RAW)
const ownerVariant = clampVariant(OWNER_VARIANT_RAW)
const heroVariant = clampVariant(HERO_VARIANT_RAW)
const headerVariant = clampVariant(HEADER_VARIANT_RAW)
const servicesVariant = clampVariant(SERVICES_VARIANT_RAW)
const projectsVariant = clampVariant(PROJECTS_VARIANT_RAW)
const trustVariant = clampVariant(TRUST_VARIANT_RAW)
const contactVariant = clampVariant(CONTACT_VARIANT_RAW)
const footerVariant = clampVariant(FOOTER_VARIANT_RAW)
const niche = NICHE_RAW && !NICHE_RAW.startsWith('{{') ? NICHE_RAW : 'default'
const accentColor =
  ACCENT_COLOR_RAW && !ACCENT_COLOR_RAW.startsWith('{{') ? ACCENT_COLOR_RAW : PRIMARY_COLOR
const hasOwnerPhoto: boolean = !!(OWNER_PHOTO_URL && !OWNER_PHOTO_URL.startsWith('{{'))

function safeB64StringArray(b64: string): string[] {
  try {
    if (!b64 || b64.startsWith('{{')) return []
    const arr = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'))
    return Array.isArray(arr) ? arr.filter((s) => typeof s === 'string') : []
  } catch {
    return []
  }
}
function safeParseB64<T>(b64: string, fallback: T): T {
  try {
    if (!b64 || b64.startsWith('{{')) return fallback
    const json = Buffer.from(b64, 'base64').toString('utf8')
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

const services = safeB64StringArray(SERVICES_B64)

interface ReviewWire {
  author: string
  initials: string
  photoUrl?: string
  text: string
  rating: number
  date: string
}
const reviewItems = safeParseB64<ReviewWire[]>(REVIEWS_RAW, [])
const projectItems = safeParseB64<Array<{ title: string; caption: string; imageUrl: string }>>(
  PROJECTS_RAW,
  [],
)

const INTRO_MODULES = ['CONTACT', 'WHATSAPP', 'DIENSTEN', 'REVIEWS', 'LOKALE SEO']

export default function HomePage() {
  const sharedHeader = (
    <HeaderPicker
      variantId={headerVariant}
      businessName={BUSINESS_NAME}
      phone={BUSINESS_PHONE}
      whatsapp={BUSINESS_WHATSAPP}
      primaryColor={PRIMARY_COLOR}
      services={services}
      niche={niche}
    />
  )
  const sharedHero = (
    <HeroPicker
      variantId={heroVariant}
      businessName={BUSINESS_NAME}
      tagline={BUSINESS_TAGLINE}
      phone={BUSINESS_PHONE}
      whatsapp={BUSINESS_WHATSAPP}
      primaryColor={PRIMARY_COLOR}
      accentColor={accentColor}
      reviewsRating={REVIEW_RATING || undefined}
      reviewsCount={REVIEW_COUNT || undefined}
      niche={niche}
    />
  )
  const sharedServices = (
    <ServicesPicker
      variantId={servicesVariant}
      services={services}
      primaryColor={PRIMARY_COLOR}
      accentColor={accentColor}
      businessName={BUSINESS_NAME}
      niche={niche}
      phone={BUSINESS_PHONE}
    />
  )
  const sharedProjects =
    projectItems.length > 0 ? (
      <ProjectsPicker
        variantId={projectsVariant}
        projects={projectItems}
        primaryColor={PRIMARY_COLOR}
        accentColor={accentColor}
        note="Voorbeeld-foto's uit onze niche. Eigen foto's volgen zodra je akkoord geeft."
      />
    ) : null
  const sharedReviews =
    reviewItems.length > 0 ? (
      <ReviewsPicker
        variantId={reviewsVariant}
        reviews={reviewItems}
        reviewCount={REVIEW_COUNT}
        reviewRating={REVIEW_RATING}
        sourceUrl={REVIEWS_SOURCE_URL}
        primaryColor={PRIMARY_COLOR}
        accentColor={accentColor}
      />
    ) : null
  const sharedTrust = (
    <TrustPicker
      variantId={trustVariant}
      reviewCount={REVIEW_COUNT}
      reviewRating={REVIEW_RATING}
      kvk={HAS_KVK ? BUSINESS_KVK : '••••••••'}
      primaryColor={PRIMARY_COLOR}
      accentColor={accentColor}
    />
  )
  const sharedOwner = hasOwnerPhoto ? (
    <OwnerPicker
      variantId={ownerVariant}
      businessName={BUSINESS_NAME}
      ownerName={OWNER_NAME && !OWNER_NAME.startsWith('{{') ? OWNER_NAME : ''}
      photoUrl={OWNER_PHOTO_URL}
      primaryColor={PRIMARY_COLOR}
      accentColor={accentColor}
      city={BUSINESS_CITY}
    />
  ) : null

  const sharedContact = (
    <ContactPicker
      variantId={contactVariant}
      businessName={BUSINESS_NAME}
      phone={BUSINESS_PHONE}
      email={HAS_EMAIL ? BUSINESS_EMAIL : ''}
      whatsapp={BUSINESS_WHATSAPP}
      address={BUSINESS_ADDRESS}
      postcode={BUSINESS_POSTCODE}
      city={BUSINESS_CITY}
      primaryColor={PRIMARY_COLOR}
      accentColor={accentColor}
    />
  )

  let mainSections: React.ReactNode
  switch (LAYOUT_VARIANT) {
    case 'A':
      mainSections = (
        <>
          {sharedHero}
          {sharedTrust}
          {sharedServices}
          {sharedOwner}
          {sharedReviews}
          {sharedContact}
        </>
      )
      break
    case 'C':
      mainSections = (
        <>
          {sharedHero}
          {sharedProjects}
          {sharedServices}
          {sharedOwner}
          {sharedReviews}
          {sharedTrust}
          {sharedContact}
        </>
      )
      break
    case 'D':
      mainSections = (
        <>
          {sharedHero}
          {sharedServices}
          {sharedOwner}
          {sharedContact}
        </>
      )
      break
    case 'B':
    default:
      mainSections = (
        <>
          {sharedHero}
          {sharedOwner}
          {sharedServices}
          {sharedProjects}
          {sharedReviews}
          {sharedTrust}
          {sharedContact}
        </>
      )
  }

  return (
    <>
      <Intro
        businessName={BUSINESS_NAME}
        primaryColor={PRIMARY_COLOR}
        modules={INTRO_MODULES}
        preset={introPreset}
      />
      {sharedHeader}
      <main>{mainSections}</main>
      <FooterPicker
        variantId={footerVariant}
        businessName={BUSINESS_NAME}
        kvk={HAS_KVK ? BUSINESS_KVK : ''}
        primaryColor={PRIMARY_COLOR}
        accentColor={accentColor}
        phone={BUSINESS_PHONE}
        whatsapp={BUSINESS_WHATSAPP}
        email={HAS_EMAIL ? BUSINESS_EMAIL : ''}
        address={BUSINESS_ADDRESS}
        city={BUSINESS_CITY}
        postcode={BUSINESS_POSTCODE}
        services={services}
      />
    </>
  )
}
