import type { Metadata } from "next";
import { site } from "@/content/site";
import { SocialLinks } from "@/components/site/social-links";
import { Clock } from "@/components/site/clock";
import { ContactForm } from "@/components/site/contact-form";
import { PageHeader, PageShell, Row } from "@/components/ui/page-shell";
import { getDict } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import "./contact.css";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDict();
  return pageMetadata({ locale, path: "/contact", title: t.meta.contact.title, description: t.meta.contact.description });
}

export default async function ContactPage() {
  const { t } = await getDict();
  const c = t.contact;
  const canSend = Boolean(site.email || site.whatsapp);
  const writeLabel = canSend ? c.write : c.direct;

  return (
    <PageShell className="contact-page">
      <PageHeader index="05" label={c.title} title={c.heading} intro={c.intro} />
      <Row label={writeLabel} className="contact-details grow">
        <div className="grid h-full gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] xl:gap-12">
          <div className="contact-form-column">
            {canSend ? (
              <ContactForm labels={c} accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""} whatsapp={site.whatsapp} />
            ) : (
              <div className="flex flex-col items-start justify-center gap-5 border border-line bg-card p-6 sm:p-8">
                <h2 className="title text-3xl">{c.socialHeading}</h2>
                <p className="max-w-sm leading-relaxed text-muted">{c.socialIntro}</p>
                <a href={site.socials.x || site.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{c.socialAction}</a>
              </div>
            )}
          </div>
          <div className="contact-write flex flex-col gap-8">
            <div className="space-y-5">
              <h2 className="contact-write-label section-label">{writeLabel}</h2>
              {site.email && (
                <div>
                  <p className="mb-2 text-sm text-muted">{c.emailLabel}</p>
                  <a href={`mailto:${site.email}`} className="title link break-words text-xl">{site.email}</a>
                </div>
              )}
              {site.whatsapp && (
                <div>
                  <p className="mb-2 text-sm text-muted">{c.phoneLabel}</p>
                  <a href={`tel:+${site.whatsapp}`} className="link inline-block text-lg" aria-label={`${c.call}: +${site.whatsapp}`}>
                    +{site.whatsapp}
                  </a>
                </div>
              )}
              <div>
                <p className="text-sm">{site.location}</p>
                <p className="mt-1 text-sm text-muted">
                  <Clock timeZone={site.timeZone} label={t.footer.localTime} /> · {t.footer.localTime.toLowerCase()}
                </p>
              </div>
            </div>
            <nav aria-label={c.elsewhere} className="contact-socials border-t border-line pt-4">
              <SocialLinks includeWhatsApp />
            </nav>
          </div>
        </div>
      </Row>
    </PageShell>
  );
}
