import { CtaButtons } from './cta-buttons'
import type { HeroProps } from './types'

export default function HeroV6BlobMorph(p: HeroProps) {
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden bg-zinc-50 text-zinc-900">
      <style>{`
        @keyframes blob-1 {
          0%, 100% { d: path('M421.5,313Q392,376,323,407Q254,438,184,408.5Q114,379,80.5,313.5Q47,248,79.5,182.5Q112,117,182.5,80.5Q253,44,322,79.5Q391,115,421,182.5Q451,250,421.5,313Z'); }
          33% { d: path('M398.5,313Q380,376,317,419Q254,462,195,415.5Q136,369,89,309.5Q42,250,93,194.5Q144,139,199,99.5Q254,60,323,80Q392,100,409.5,175Q427,250,398.5,313Z'); }
          66% { d: path('M444.5,309.5Q397,369,328,403Q259,437,192,404Q125,371,93,310.5Q61,250,90.5,184Q120,118,191,99.5Q262,81,326.5,89Q391,97,431.5,173.5Q472,250,444.5,309.5Z'); }
        }
        @keyframes blob-2 {
          0%, 100% { d: path('M444,313.5Q414,377,346.5,408Q279,439,202.5,418Q126,397,90,318Q54,239,93.5,170.5Q133,102,213,79Q293,56,358,93Q423,130,440.5,190Q458,250,444,313.5Z'); }
          50% { d: path('M421,310Q390,370,327,403Q264,436,195,412Q126,388,85,319Q44,250,86,182.5Q128,115,196,90Q264,65,330,93Q396,121,419,185.5Q442,250,421,310Z'); }
        }
        @keyframes blob-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .blob-1 { animation: blob-1 14s ease-in-out infinite; }
        .blob-2 { animation: blob-2 18s ease-in-out infinite; }
        .blob-spin { animation: blob-rotate 28s linear infinite; transform-origin: 50% 50%; }
        @keyframes fade-up-6 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v6-anim { animation: fade-up-6 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .blob-1, .blob-2, .blob-spin, .v6-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <svg className="absolute -top-32 -left-32 w-[800px] h-[800px] opacity-40 blob-spin" viewBox="0 0 500 500" aria-hidden="true">
        <path className="blob-1" d="M421.5,313Q392,376,323,407Q254,438,184,408.5Q114,379,80.5,313.5Q47,248,79.5,182.5Q112,117,182.5,80.5Q253,44,322,79.5Q391,115,421,182.5Q451,250,421.5,313Z" fill={p.primaryColor} />
      </svg>
      <svg className="absolute -bottom-40 -right-40 w-[800px] h-[800px] opacity-40" viewBox="0 0 500 500" aria-hidden="true">
        <path className="blob-2" d="M444,313.5Q414,377,346.5,408Q279,439,202.5,418Q126,397,90,318Q54,239,93.5,170.5Q133,102,213,79Q293,56,358,93Q423,130,440.5,190Q458,250,444,313.5Z" fill={p.accentColor} />
      </svg>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v6-anim font-display text-5xl md:text-7xl font-black mb-5" style={{ color: p.primaryColor }}>{p.businessName}</h1>
        <p className="v6-anim text-xl text-zinc-700 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v6-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="solid" />
        </div>
      </div>
    </section>
  )
}
