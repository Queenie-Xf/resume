import { motion } from 'framer-motion'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

export default function Skills({ t }: { t: SiteContent }) {
  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <SectionHeading index="01" title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {t.skills.groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: groupIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="border-t-2 border-ink pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink/50 sm:pt-5 sm:tracking-[0.2em]">
                <span className="mr-2 text-accent1">//</span>
                {group.title}
              </h3>
              <ul className="mt-4 sm:mt-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="skill-row group flex min-h-11 cursor-default items-center justify-between gap-4 border-b border-line py-2.5 transition-colors"
                  >
                    <span className="min-w-0 break-words font-display text-base font-medium leading-snug text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent1 sm:text-lg">
                      {item}
                    </span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-ink/15 transition-colors duration-300 group-hover:bg-accent1" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 border-t-2 border-ink pt-6 sm:mt-20 sm:pt-8"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent1 sm:tracking-[0.25em]">
            {t.skills.languagesTitle}
          </div>
          <div className="mt-4 grid gap-5 sm:mt-5 sm:grid-cols-2 md:flex md:flex-wrap md:items-baseline md:gap-x-16 md:gap-y-6">
            {t.skills.languages.map((language) => (
              <div key={language.name} className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
                  {language.name}
                </span>
                <span className="text-sm text-ink/50 sm:text-base md:text-lg">{language.level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
