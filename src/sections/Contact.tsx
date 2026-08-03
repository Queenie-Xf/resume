import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contact, type SiteContent } from '../content'
import SectionHeading from './SectionHeading'

export default function Contact({ t }: { t: SiteContent }) {
  const rows = [
    { label: t.contact.emailLabel, value: contact.email, href: `mailto:${contact.email}` },
    { label: t.contact.githubLabel, value: contact.github, href: contact.githubUrl },
    { label: t.contact.phoneLabel, value: contact.phone, href: `tel:${contact.phone}` },
    { label: t.contact.locationLabel, value: t.contact.location, href: undefined },
  ]

  return (
    <section id="contact" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="05" title={t.contact.title} subtitle={t.contact.subtitle} />

        {/* 四行联系方式 — 统一大小 */}
        <div className="border-t border-line">
          {rows.map((r, i) => {
            const inner = (
              <>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 md:w-28 md:shrink-0 md:text-sm">
                  {r.label}
                </span>
                <span className="flex min-w-0 items-center gap-2 font-display text-lg font-medium text-ink md:text-right md:text-2xl">
                  <span className={`break-all ${r.href ? 'link-underline' : ''}`}>{r.value}</span>
                  {r.href && (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent1" />
                  )}
                </span>
              </>
            )
            return (
              <motion.div
                key={r.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex flex-col gap-1.5 border-b border-line py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-7"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex flex-col gap-1.5 border-b border-line py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-7">
                    {inner}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
