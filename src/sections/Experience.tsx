import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

export default function Experience({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState<number[]>([0])

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  return (
    <section id="experience" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading index="02" title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="border-t border-line">
          {t.experience.items.map((exp, i) => {
            const isOpen = open.includes(i)
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className="border-b border-line"
              >
                {/* 行头 — 点击展开/收起 */}
                <button
                  onClick={() => toggle(i)}
                  className="group flex w-full items-center gap-6 py-7 text-left md:gap-10 md:py-9"
                >
                  <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-baseline md:gap-10">
                    <span className="w-40 shrink-0 text-xs font-medium tracking-widest text-ink/40 md:text-sm">
                      {exp.period}
                    </span>
                    <span>
                      <span className="block font-display text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent1 md:text-3xl">
                        {exp.role}
                      </span>
                      <span className="mt-1 block text-sm text-ink/50">
                        {exp.company} · {exp.location}
                      </span>
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="shrink-0 text-ink/30 transition-colors group-hover:text-ink"
                  >
                    <ChevronDown className="h-6 w-6" />
                  </motion.span>
                </button>

                {/* 展开内容 */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pl-[calc(10rem+2.5rem)]">
                        {/* 量化指标条 */}
                        <div className="mb-8 grid max-w-3xl grid-cols-3 gap-4 border-y border-line py-5">
                          {exp.metrics.map((m) => (
                            <div key={m.label}>
                              <div className="font-mono text-xl font-bold tabular-nums text-accent1 md:text-3xl">
                                {m.value}
                              </div>
                              <div className="mt-1 text-xs text-ink/45">{m.label}</div>
                            </div>
                          ))}
                        </div>
                        <ul className="max-w-3xl space-y-4">
                          {exp.points.map((p, pi) => (
                            <li key={pi} className="flex gap-4 text-base leading-relaxed text-ink/70">
                              <span className="mt-[0.7em] h-px w-5 shrink-0 bg-accent1" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 font-mono text-xs font-medium uppercase tracking-widest text-ink/35">
                          {exp.tags.join('  ·  ')}
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
