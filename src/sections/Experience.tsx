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

        <div className="relative border-t border-dashed border-ink/15">
          <span className="absolute bottom-0 left-[9px] top-0 w-px bg-accent1/10 md:hidden" />

          {t.experience.items.map((experience, index) => {
            const isOpen = open.includes(index)
            const metricColumns = experience.metrics.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
            const isKoal =
              index === 2 ||
              experience.company.includes('格尔') ||
              experience.company.toLowerCase().includes('koal')
            const collaborationTag = isChinese
              ? '跨部门合作'
              : 'Cross-functional Collaboration'
            const tags =
              isKoal && !experience.tags.includes(collaborationTag)
                ? [...experience.tags, collaborationTag]
                : experience.tags

            return (
              <motion.article
                key={experience.company}
                className="relative border-b border-dashed border-ink/15 pl-7 md:pl-0"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: index * 0.05, ease }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                  className="group grid min-h-24 w-full grid-cols-[1fr_2.75rem] gap-3 py-6 text-left md:grid-cols-[3rem_10rem_1fr_3rem] md:items-center md:py-9"
                >
                  <span className="hidden text-sm text-accent1/75 md:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden text-xs text-ink/30 md:block">{experience.period}</span>
                  <span>
                    <span className="block font-display text-2xl font-bold text-ink/90">
                      {experience.company}
                    </span>
                    <span className="text-sm text-ink/45">
                      {experience.role}
                      <span className="mx-1">·</span>
                      {experience.location}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="flex h-11 w-11 items-center justify-center text-ink/25"
                  >
                    <ChevronDown />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pl-[15rem]">
                        <div
                          className={`mb-6 grid grid-cols-1 gap-x-8 gap-y-4 border-y border-dashed border-ink/15 py-5 ${metricColumns}`}
                        >
                          {experience.metrics.map((metric) => (
                            <div key={metric.label} className="min-w-0">
                              <div className="font-display text-2xl font-bold tabular-nums text-accent1/90 md:text-3xl">
                                {metric.value}
                              </div>
                              <div className="mt-1 text-xs font-medium text-ink/42">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <ul className="space-y-4 text-ink/65">
                          {experience.points.map((point) => (
                            <li key={point}>— {point}</li>
                          ))}
                        </ul>

                        <div className="mt-6 flex flex-wrap gap-2.5">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex min-h-8 items-center rounded-full border border-ink/10 bg-white/30 px-3.5 py-1.5 text-xs font-semibold text-ink/68 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_16px_rgba(11,11,12,0.045)] backdrop-blur-md"
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
