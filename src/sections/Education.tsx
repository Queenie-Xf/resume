import { motion } from 'framer-motion'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

export default function Education({ t }: { t: SiteContent }) {
  return (
    <section id="education" className="scroll-mt-20 py-16 sm:py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <SectionHeading index="04" title={t.education.title} />

        <div className="border-t border-line">
          {t.education.items.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid gap-3 border-b border-line py-6 sm:py-8 md:grid-cols-[1fr_auto_auto] md:items-baseline md:gap-16 md:py-10"
            >
              <div className="min-w-0">
                <span className="mb-2 block text-xs font-semibold tracking-widest text-accent1">
                  EDU.{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="break-words font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-300 hover:text-accent1 md:text-3xl">
                  {edu.school}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-ink/50 md:text-base">{edu.degree}</p>
              </div>
              <span className="text-sm text-ink/40">{edu.location}</span>
              <span className="text-sm font-medium tracking-wide text-ink/50">{edu.period}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
