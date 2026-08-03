import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export default function Experience({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState<number[]>([0])

  const toggle = (index: number) =>
    setOpen((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    )

  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <SectionHeading index="02" title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="relative border-t border-line">
          <span
            className="absolute bottom-0 left-[9px] top-0 w-px bg-accent1/20 md:hidden"
            aria-hidden
          />

          {t.experience.items.map((experience, index) => {
            const isOpen = open.includes(index)
            const metricColumns = experience.metrics.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'

            return (
              <motion.article
                key={`${experience.company}-${experience.period}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease }}
                className="relative border-b border-line pl-7 md:pl-0"
              >
                <span
                  className={`absolute left-[5px] top-8 h-[9px] w-[9px] rounded-full ring-4 ring-paper md:hidden ${
                    isOpen ? 'bg-accent1' : 'bg-ink/20'
                  }`}
                  aria-hidden
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                  className="group flex min-h-24 w-full items-start gap-3 py-6 text-left sm:gap-5 sm:py-7 md:min-h-0 md:items-center md:gap-10 md:py-9"
                >
                  <div className="min-w-0 flex-1 md:flex md:items-baseline md:gap-10">
                    <span className="mb-2 block text-xs font-medium tracking-[0.12em] text-accent1/80 md:mb-0 md:w-40 md:shrink-0 md:text-sm md:tracking-widest md:text-ink/40">
                      {experience.period}
                    </span>

                    <span className="block min-w-0">
                      <span className="block break-words font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-accent1 md:text-3xl">
                        {experience.role}
                      </span>
                      <span className="mt-1.5 block break-words text-sm leading-relaxed text-ink/50">
                        {experience.company}
                        <span className="mx-1.5 text-ink/20">·</span>
                        {experience.location}
                      </span>
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="mt-6 inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink/35 transition-colors group-hover:text-ink md:mt-0"
                    aria-hidden
                  >
                    <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 md:pb-10 md:pl-[calc(10rem+2.5rem)]">
                        <div
                          className={`mb-6 grid ${metricColumns} max-w-3xl gap-3 border-y border-line py-4 sm:mb-8 sm:gap-4 sm:py-5`}
                        >
                          {experience.metrics.map((metric) => (
                            <div key={metric.label} className="min-w-0">
                              <div className="font-display text-xl font-bold tabular-nums text-accent1 sm:text-2xl md:text-3xl">
                                {metric.value}
                              </div>
                              <div className="mt-1 break-words text-[11px] leading-snug text-ink/50 sm:text-xs">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <ul className="max-w-3xl space-y-3 sm:space-y-4">
                          {experience.points.map((point, pointIndex) => (
                            <li
                              key={pointIndex}
                              className="flex gap-3 text-[15px] leading-7 text-ink/70 sm:gap-4 sm:text-base"
                            >
                              <span className="mt-[0.85em] h-px w-4 shrink-0 bg-accent1 sm:w-5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {experience.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex min-h-8 items-center rounded-full border border-line bg-white/50 px-3 py-1 text-xs font-medium leading-none text-ink/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
