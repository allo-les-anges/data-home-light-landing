import Image from "next/image"

const pillars = [
  {
    number: "01",
    label: "Your agency online",
    headline: "Multilingual website\nand digital presence.",
    description:
      "DATAhome deploys a professional agency website in a single onboarding session — production-ready, multilingual and optimized for search from the first day.",
    capabilities: [
      "6 languages included by default",
      "Premium templates with full customization",
      "Custom domain, SEO-ready from launch",
      "XML feed integration directly from the workspace",
    ],
    reversed: false,
    screenshot: "/screenshots/pillar-website.png",
    screenshotAlt: "DATAhome — agency website template",
    screenshotW: 1440,
    screenshotH: 843,
    frameClass: "border-slate-200 shadow-[0_24px_64px_rgba(15,23,42,0.08)]",
  },
  {
    number: "02",
    label: "Manage",
    headline: "Properties, catalogue,\nleads and CRM.",
    description:
      "Every listing, every inquiry and every client conversation organized in one workspace — without switching between tools.",
    capabilities: [
      "Property Manager — sales and rentals with media",
      "XML import with HabiHub integration",
      "Mini CRM with structured lead pipeline",
      "AI chatbot for automated lead qualification",
    ],
    reversed: true,
    screenshot: "/screenshots/property-catalogue.png",
    screenshotAlt: "DATAhome — Property Manager, catalogue and listing controls",
    screenshotW: 1440,
    screenshotH: 900,
    frameClass: "border-[#1d2236] shadow-[0_24px_64px_rgba(8,11,29,0.16)]",
  },
  {
    number: "03",
    label: "Generate demand",
    headline: "Landing pages, Social Hub\nand visitor intelligence.",
    description:
      "Targeted campaign and conversion tools that help agencies turn traffic into qualified enquiries — from property pages to scheduled social content.",
    capabilities: [
      "Landing page generator per property or development",
      "Social Hub — AI drafts for Facebook, Instagram, LinkedIn",
      "Visitor tracking with one-click lead conversion",
      "Newsletter sent directly from the agency dashboard",
    ],
    reversed: false,
    screenshot: "/screenshots/social-hub.png",
    screenshotAlt: "DATAhome — Social Hub and demand generation",
    screenshotW: 1440,
    screenshotH: 900,
    frameClass: "border-[#1d2236] shadow-[0_24px_64px_rgba(8,11,29,0.16)]",
  },
  {
    number: "04",
    label: "Extend",
    headline: "Optional modules\nand AI capabilities.",
    description:
      "Add capabilities as the agency grows. Every module connects directly to the existing DATAhome workspace — no separate logins, no integration work.",
    capabilities: [
      "Video hero and immersive property tours",
      "SEO IA — AI-optimized listing titles and meta",
      "Cadastre and compliance passport (Spain)",
      "Custom pages and additional market languages",
    ],
    reversed: true,
    screenshot: "/screenshots/modules.png",
    screenshotAlt: "DATAhome — optional modules and AI capabilities",
    screenshotW: 1440,
    screenshotH: 804,
    frameClass: "border-slate-200/60 shadow-[0_24px_64px_rgba(15,23,42,0.10)]",
  },
]


function ProductImage({ src, alt, crop, width = 1920, height = 1200 }: { src: string; alt: string; crop: string; width?: number; height?: number }) {
  return <div className={"product-crop " + crop}><Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 600px) 1200px, 1920px" /></div>
}

export function Features() {
  return (
    <section id="features" className="product-features">
      <div className="dh-container">
        <h2 className="product-intro">One workspace.<br />Four operating pillars.</h2>
        {pillars.map((pillar, index) => (
          <article key={pillar.number} className={"product-chapter chapter-" + index}>
            <div className="product-chapter-copy">
              <div><p className="product-label">{pillar.label}</p><h3>{pillar.headline}</h3><p className="product-description">{pillar.description}</p></div>
              <ul>{pillar.capabilities.map(cap => <li key={cap}>{cap}</li>)}</ul>
            </div>
            {index === 2 ? (
              <div className="product-demand-story">
                <figure className="product-stage">
                  <figcaption><span>Create / publish</span><p>Give each property its own destination.</p></figcaption>
                  <ProductImage src="/screenshots/landing-pages.png" alt="DATAhome Landing Pages : published property pages, performance and page creation controls." crop="crop-landing" />
                </figure>
                <figure className="product-stage stage-distribute">
                  <figcaption><span>Promote / distribute</span><p>Bring that property to your social channels.</p></figcaption>
                  <ProductImage src={pillar.screenshot} alt={pillar.screenshotAlt} crop="crop-social" />
                </figure>
              </div>
            ) : (
              <figure className={"product-visual visual-" + index}>
                <ProductImage src={pillar.screenshot} alt={pillar.screenshotAlt} crop={index === 0 ? "crop-website" : index === 1 ? "crop-catalogue" : "crop-modules"} width={index === 0 ? 1440 : 1920} height={index === 0 ? 843 : 1200} />
                {index === 1 && <figcaption>Your catalogue and your leads, connected. CRM activity is visible from the Cockpit.</figcaption>}
              </figure>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
