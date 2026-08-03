import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contact, type SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

type ProjectWithLink = SiteContent['projects']['items'][number] & {
  githubUrl?: string
}

export default function Projects({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState<number>(0)
  const isChinese = t.projects.title === '项目作品'

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <SectionHeading index="03" title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="border-t border-line">
          {t.projects.items.map((rawProject, index) => {
            const project = rawProject as ProjectWithLink
            const isOpen = open === index

            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
                className="border-b border-line"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="group grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-3 py-7 text-left sm:py-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:py-12"
                >
                  <span className="col-span-2 text-sm font-semibold tracking-[0.12em] text-accent1 md:col-span-1 md:col-start-1 md:row-start-1 md:text-base">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="col-start-1 row-start-2 min-w-0 md:col-start-2 md:row-start-1">
                    <span className="block break-words font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink transition-colors duration-300 group-hover:text-accent1 sm:text-4xl md:text-5xl">
                      {project.name}
                    </span>
                    <span className="mt-2 block break-words text-sm leading-relaxed text-ink/50">
                      {project.org}
                      <span className="mx-1.5 text-ink/20">·</span>
                      {project.period}
                    </span>
                  </span>

                  <span className="col-start-2 row-start-2 inline-flex h-11 w-11 items-center justify-center self-start md:col-start-3 md:row-start-1 md:self-center">
                    <ArrowUpRight
                      className={`h-6 w-6 shrink-0 text-ink/25 transition-all duration-300 group-hover:text-accent1 md:h-8 md:w-8 ${
                        isOpen ? 'rotate-90 text-accent1' : ''
                      }`}
                      aria-hidden
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-9 md:grid md:grid-cols-[auto_1fr] md:gap-10 md:pb-12">
                        <span className="hidden w-[calc(0.5rem+2.5rem)] md:block" />
                        <div className="max-w-4xl">
                          <div className="mb-7 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-line py-5 sm:mb-9 md:grid-cols-4">
                            {project.metrics.map((metric) => (
                              <div key={metric.label} className="min-w-0">
                                <div className="font-display text-xl font-bold tabular-nums text-accent1 sm:text-2xl">
                                  {metric.value}
                                </div>
                                <div className="mt-1 break-words text-xs leading-snug text-ink/50">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="grid gap-x-12 gap-y-7 md:grid-cols-2 md:gap-y-8">
                            {project.highlights.map((highlight, highlightIndex) => (
                              <div key={highlightIndex}>
                                <div className="flex items-center gap-3">
                                  <span className="h-px w-5 shrink-0 bg-ink/30 sm:w-6" />
                                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50 sm:tracking-[0.2em]">
                                    {highlight.label}
                                  </span>
                                </div>
                                <p className="mt-3 text-[15px] leading-7 text-ink/70 md:text-base">
                                  {highlight.text}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex min-h-8 items-center rounded-full border border-line/80 bg-white/30 px-3 py-1 text-xs font-medium leading-none text-ink/55"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="group mt-6 inline-flex min-h-11 items-center gap-1.5 py-2 text-sm font-medium text-ink/45 transition-colors hover:text-accent1"
                            >
                              <span className="link-underline">
                                {isChinese ? '查看项目代码' : 'View Project Code'}
                              </span>
                              <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end sm:mt-8">
          <a
            href={contact.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-11 items-center gap-1.5 py-2 text-sm font-medium text-ink/40 transition-colors hover:text-accent1"
          >
            <span className="link-underline">
              {isChinese ? '查看 GitHub 主页' : 'View GitHub Profile'}
            </span>
            <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </section>
  )
}
