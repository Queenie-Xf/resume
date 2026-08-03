import { motion } from 'framer-motion'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

export default function Skills({ t }: { t: SiteContent }) {
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="01" title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {t.skills.groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="border-t-2 border-ink pt-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                <span className="mr-2 text-accent1">//</span>{g.title}
              </h3>
              <ul className="mt-6">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="skill-row group flex cursor-default items-baseline justify-between border-b border-line py-2.5 transition-colors"
                  >
                    <span className="font-display text-lg font-medium text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent1">
                      {item}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/15 transition-colors duration-300 group-hover:bg-accent1" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 语言能力 — 醒目排版条 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border-t-2 border-ink pt-8"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-accent1">
            {t.skills.languagesTitle}
          </div>
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-baseline md:gap-16">
            {t.skills.languages.map((l) => (
              <div key={l.name} className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                  {l.name}
                </span>
                <span className="text-base text-ink/50 md:text-lg">{l.level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
