import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export default function Experience({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState<number[]>([0])
  const isChinese = t.experience.title === '工作经历'

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
            className="absolute bottom-0 left-[9px] top-0 w-px bg-accent1/18 md:hidden"
            aria-hidden
          />

          {t.experience.items.map((experience, index) => {
            const isOpen = open.includes(index)
            const panelId = `experience-panel-${index}`
            const metricColumns = experience.metrics.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'
            const isKoal =
              index === 2 ||
              experience.company.includes('格尔') ||
              experience.company.toLowerCase().includes('koal')
            const collaborationTag = isChinese
              ? '跨部门合作'
              : 'Cross-functional Collaboration'
            const displayTags =
              isKoal && !experience.tags.includes(collaborationTag)
                ? [...experience.tags, collaborationTag]
                : experience.tags

            return (
              <motion.article
                key={`${experience.company}-${experience.period}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.48, delay: index * 0.05, ease }}
                className="relative border-b border-line pl-7 md:pl-0"
              >
                <span
                  className={`absolute left-[5px] top-8 h-[9px] w-[9px] rounded-full ring-4 ring-paper md:hidden ${
                    isOpen ? 'bg-accent1' : 'bg-ink/18'
                  }`}
                  aria-hidden
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="group grid min-h-24 w-full grid-cols-[minmax(0,1fr)_2.75rem] gap-x-3 py-6 text-left md:min-h-0 md:grid-cols-[3rem_10rem_minmax(0,1fr)_3rem] md:items-center md:gap-x-6 md:py-9"
                >
                  <span className="hidden text-sm font-semibold tracking-[0.12em] text-accent1 md:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="hidden text-xs font-medium tracking-[0.1em] text-ink/38 md:block md:text-sm md:tracking-widest">
                    {experience.period}
                  </span>

                  <span className="min-w-0">
                    <span className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent1/75 md:hidden">
                      <span>EXP.{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-ink/20">/</span>
                      <span>{experience.period}</span>
                    </span>

                    <span className="block break-words font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-accent1 sm:text-[1.7rem] md:text-3xl">
                      {experience.company}
                    </span>

                    <span className="mt-1.5 block break-words text-sm leading-relaxed text-ink/50">
                      {experience.role}
                      <span className="mx-1.5 text-ink/20">·</span>
                      {experience.location}
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.28, ease }}
                    className="inline-flex h-11 w-11 items-center justify-center self-center text-ink/28 transition-colors group-hover:text-accent1 md:h-12 md:w-12"
                    aria-hidden
                  >
                    <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 md:grid md:grid-cols-[3rem_10rem_minmax(0,1fr)_3rem] md:gap-x-6 md:pb-11">
                        <div className="md:col-start-3">
                          <div
                            className={`mb-6 grid ${metricColumns} max-w-3xl gap-3 border-y border-line/80 py-4 sm:mb-8 sm:gap-4 sm:py-5`}
                          >
                            {experience.metrics.map((metric) => (
                              <div key={metric.label} className="min-w-0">
                                <div className="font-display text-xl font-bold tabular-nums text-accent1 sm:text-2xl md:text-3xl">
                                  {metric.value}
                                </div>
                                <div className="mt-1 break-words text-[11px] leading-snug text-ink/48 sm:text-xs">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>

                          <ul className="max-w-3xl space-y-3 sm:space-y-4">
                            {experience.points.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="flex gap-3 text-[15px] leading-7 text-ink/68 sm:gap-4 sm:text-base"
                              >
                                <span className="mt-[0.85em] h-px w-4 shrink-0 bg-accent1/70 sm:w-5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {displayTags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex min-h-8 items-center rounded-full border border-line/80 bg-white/25 px-3 py-1 text-xs font-medium leading-none text-ink/52"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
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
