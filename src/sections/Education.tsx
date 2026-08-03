import { motion } from 'framer-motion'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

export default function Education({ t }: { t: SiteContent }) {
  return (
    <section id="education" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="04" title={t.education.title} />

        <div className="border-t border-line">
          {t.education.items.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-8 md:grid-cols-[1fr_auto_auto] md:gap-16 md:py-10"
            >
              <div>
                <span className="mb-2 block font-mono text-xs font-semibold tracking-widest text-accent1">
                  EDU.{String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent1 md:text-3xl">
                  {edu.school}
                </h3>
                <p className="mt-2 text-sm text-ink/50 md:text-base">{edu.degree}</p>
              </div>
              <span className="hidden text-sm text-ink/40 md:block">{edu.location}</span>
              <span className="text-sm font-medium tracking-wide text-ink/50">{edu.period}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
