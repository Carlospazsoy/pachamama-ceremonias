import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { TestimonialVideos } from "@/components/TestimonialVideos";
import { content, contactEmail, contactPhone, servicesByLocale, siteUrl, whatsappUrl, type Locale } from "@/lib/content";

type PageProps = { params: Promise<{ locale: string }> };

function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const spanish = locale === "es";
  const title = spanish
    ? "Bodas simbólicas y ceremonias en San Miguel de Allende | Pachamama"
    : "Symbolic Weddings & Ceremonies in San Miguel de Allende | Pachamama";
  const description = spanish
    ? "Bodas simbólicas, ceremonias de cacao, sound healing, rituales y temazcal en San Miguel de Allende. Experiencias bilingües creadas desde 2005."
    : "Symbolic weddings, cacao ceremonies, sound healing, rituals and temazcal in San Miguel de Allende. Bilingual experiences created since 2005.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      locale: spanish ? "es_MX" : "en_US",
      alternateLocale: spanish ? ["en_US"] : ["es_MX"],
      title,
      description,
      images: [{ url: servicesByLocale[locale][0].image, alt: spanish ? "Boda simbólica en San Miguel de Allende" : "Symbolic wedding in San Miguel de Allende" }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function StructuredData({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Pachamama Ceremonias",
    url: `${siteUrl}/${locale}`,
    image: servicesByLocale[locale][0].image,
    telephone: contactPhone,
    email: contactEmail,
    description: copy.hero.description,
    areaServed: [
      { "@type": "City", name: "San Miguel de Allende" },
      { "@type": "City", name: "Querétaro" },
      { "@type": "City", name: "León" },
      { "@type": "AdministrativeArea", name: "Guanajuato" },
    ],
    availableLanguage: ["Spanish", "English"],
    sameAs: ["https://www.instagram.com/pachamamaceremonias/"],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale;
  const copy = content[locale];
  const services = copy.services.items;
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL;
  const processLabels = locale === "es" ? ["01", "02", "03"] : ["01", "02", "03"];

  return (
    <>
      <StructuredData locale={locale} />
      <header className="site-header">
        <Link className="brand" href={`/${locale}`} aria-label="Pachamama Ceremonias — home">
          <Image
            className="brand-logo"
            src="/assets/logo-pachamama-ceremonias-1033px-302px.png"
            alt=""
            width={1033}
            height={302}
            sizes="(max-width: 760px) 145px, 180px"
          />
        </Link>
        <nav className="main-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          <a href="#services">{copy.nav.services}</a>
          <a href="#story">{copy.nav.story}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <Link className="language-switch" href={locale === "es" ? "/en" : "/es"} hrefLang={locale === "es" ? "en" : "es"}>
            {copy.switchLabel}
          </Link>
          <a className="button button-small button-dark" href="#contact">{copy.nav.cta}<span aria-hidden="true"> ↗</span></a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-description">{copy.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">{copy.hero.primary}<span aria-hidden="true"> ↗</span></a>
              <a className="text-link" href="#services">{copy.hero.secondary}<span aria-hidden="true"> ↓</span></a>
            </div>
            <div className="hero-trust" aria-label={locale === "es" ? "Detalles del servicio" : "Service details"}>
              <span><span className="trust-dot" />{copy.trust.since}</span>
              <span><span className="trust-dot" />{copy.trust.bilingual}</span>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src={services[0].image}
              alt={copy.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
              className="hero-image"
            />
            <div className="image-caption">
              <span>{locale === "es" ? "Una celebración que habla de ustedes" : "A celebration that feels like you"}</span>
            </div>
            {/* <div className="hero-image-note">San Miguel de Allende · México</div> */}
          </div>
        </section>

        <section className="service-strip" aria-label={locale === "es" ? "Características" : "Highlights"}>
          <span>{copy.trust.custom}</span>
          <span>{locale === "es" ? "San Miguel de Allende y alrededores" : "San Miguel de Allende & beyond"}</span>
          <span>{copy.trust.bilingual}</span>
          <span>{copy.trust.since}</span>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" />{copy.services.eyebrow}</p>
              <h2>{copy.services.title}</h2>
            </div>
            <p className="section-intro">{copy.services.intro}</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <a className={`service-card service-card-${index + 1}`} href="#contact" key={service.title}>
                <div className="service-image-wrap">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="services-note">{copy.services.all}</p>
        </section>

        <section className="story-section" id="story">
          <div className="story-image-wrap">
            <Image
              src="/assets/San-Miguel-de-Allende-2.jpg"
              alt={copy.story.imageAlt}
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className="story-image-label">San Miguel de Allende · México</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{copy.story.eyebrow}</p>
            <h2>{copy.story.title}</h2>
            {copy.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a className="text-link" href="#contact">{locale === "es" ? "Conócenos y cuéntanos tu idea" : "Get to know us and share your idea"} <span aria-hidden="true">↗</span></a>
            <div className="story-signature">{locale === "es" ? "Con respeto, presencia y corazón" : "With respect, presence and care"}</div>
          </div>
        </section>

        <section className="section process-section">
          <div className="section-heading process-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" />{copy.process.eyebrow}</p>
              <h2>{copy.process.title}</h2>
            </div>
            <p className="section-intro">{copy.process.intro}</p>
          </div>
          <div className="process-grid">
            {copy.process.steps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span className="process-index">{processLabels[index]}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials-section">
          <div className="testimonials-heading">
            <p className="eyebrow"><span className="eyebrow-line" />{copy.testimonials.eyebrow}</p>
            <h2>{copy.testimonials.title}</h2>
          </div>
          <TestimonialVideos
            items={copy.testimonials.items}
            watchLabel={copy.testimonials.watchVideo}
            closeLabel={copy.testimonials.closeVideo}
            openLabel={copy.testimonials.openVideo}
          />
        </section>

        <section className="section faq-section">
          <div className="faq-heading">
            <p className="eyebrow"><span className="eyebrow-line" />{copy.faq.eyebrow}</p>
            <h2>{copy.faq.title}</h2>
          </div>
          <div className="faq-list">
            {copy.faq.items.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{copy.contact.eyebrow}</p>
            <h2>{copy.contact.title}</h2>
            <p className="contact-description">{copy.contact.description}</p>
            <div className="contact-links">
              <a className="contact-link" href={whatsappUrl} target="_blank" rel="noreferrer">
                <span className="contact-link-icon" aria-hidden="true">↗</span><span>{copy.contact.whatsapp}<small>+52 415 101 2965</small></span>
              </a>
              <a className="contact-link" href={`mailto:${contactEmail}`}>
                <span className="contact-link-icon" aria-hidden="true">@</span><span>{copy.contact.email}<small>{contactEmail}</small></span>
              </a>
              <a className="contact-link" href={`tel:${contactPhone}`}>
                <span className="contact-link-icon" aria-hidden="true">⌕</span><span>{copy.contact.phone}<small>+52 415 101 2965</small></span>
              </a>
            </div>
            {calUrl ? (
              <a className="button button-light contact-cal" href={calUrl} target="_blank" rel="noreferrer">
                {locale === "es" ? "Reservar una llamada" : "Book a call"}<span aria-hidden="true"> ↗</span>
              </a>
            ) : <p className="cal-pending">{copy.contact.fields.calPending}</p>}
          </div>
          <div className="contact-form-panel">
            <h3>{copy.contact.formTitle}</h3>
            <p>{copy.contact.formDescription}</p>
            <ContactForm locale={locale} calUrl={calUrl} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Link className="brand footer-brand" href={`/${locale}`}>
          <Image
            className="brand-logo"
            src="/assets/logo-pachamama-ceremonias-1033px-302px.png"
            alt=""
            width={1033}
            height={302}
            sizes="160px"
          />
        </Link>
        <p>{copy.footer.note}</p>
        <span className="footer-privacy">{copy.footer.privacy}</span>
        <span className="footer-copy">© {new Date().getFullYear()} Pachamama Ceremonias</span>
      </footer>
    </>
  );
}
