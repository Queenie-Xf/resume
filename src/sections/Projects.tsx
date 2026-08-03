import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export default function Projects({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="projects" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="03" title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="border-t border-line">
          {t.projects.items.map((proj, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className="border-b border-line"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-5 py-8 text-left md:gap-10 md:py-12"
                >
                  <span className="font-mono text-sm font-semibold text-accent1 md:text-base">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent1 md:text-5xl">
                      {proj.name}
                    </span>
                    <span className="mt-2 block text-sm text-ink/45">
                      {proj.org} · {proj.period}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={`h-6 w-6 shrink-0 self-center text-ink/25 transition-all duration-300 group-hover:text-accent1 md:h-8 md:w-8 ${
                      isOpen ? 'rotate-90 text-accent1' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-10 pb-12 md:grid-cols-[auto_1fr] md:gap-10">
                        <span className="hidden w-[calc(0.5rem+2.5rem)] md:block" />
                        <div className="max-w-4xl">
                          {/* 量化指标条 */}
                          <div className="mb-10 grid grid-cols-2 gap-4 border-y border-line py-5 md:grid-cols-4">
                            {proj.metrics.map((m) => (
                              <div key={m.label}>
                                <div className="font-mono text-xl font-bold tabular-nums text-accent1 md:text-2xl">
                                  {m.value}
                                </div>
                                <div className="mt-1 text-xs text-ink/45">{m.label}</div>
                              </div>
                            ))}
                          </div>
                          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                            {proj.highlights.map((h, hi) => (
                              <div key={hi}>
                                <div className="flex items-center gap-3">
                                  <span className="h-px w-6 bg-ink/30" />
                                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                                    {h.label}
                                  </span>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-ink/65 md:text-base">
                                  {h.text}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-10 font-mono text-xs font-medium uppercase tracking-widest text-ink/35">
                            {proj.tags.join('  ·  ')}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
