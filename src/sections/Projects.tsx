import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contact, type SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

type ProjectWithLink = SiteContent['projects']['items'][number] & { githubUrl?: string }

export default function Projects({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState<number>(0)
  const isChinese = t.projects.title === '项目作品'

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <SectionHeading index="03" title={t.projects.title} subtitle={t.projects.subtitle} />
        <div className="border-t border-line/35">
          {t.projects.items.map((rawProject, index) => {
            const project = rawProject as ProjectWithLink
            const isOpen = open === index
            return (
              <motion.article key={project.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: index * 0.06, ease }} className="border-b border-line/35">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)} className="group grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-3 py-7 text-left sm:py-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:py-12">
                  <span className="col-span-2 text-sm font-semibold tracking-[0.12em] text-accent1/80 md:col-span-1 md:col-start-1 md:row-start-1 md:text-base">{String(index + 1).padStart(2, '0')}</span>
                  <span className="col-start-1 row-start-2 min-w-0 md:col-start-2 md:row-start-1">
                    <span className="block break-words font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink/92 transition-colors duration-300 group-hover:text-accent1 sm:text-4xl md:text-5xl">{project.name}</span>
                    <span className="mt-2 block break-words text-sm leading-relaxed text-ink/46">{project.org}<span className="mx-1.5 text-ink/15">·</span>{project.period}</span>
                  </span>
                  <span className="col-start-2 row-start-2 inline-flex h-11 w-11 items-center justify-center self-start md:col-start-3 md:row-start-1 md:self-center"><ArrowUpRight className={`h-6 w-6 text-ink/22 transition-all duration-300 group-hover:text-accent1 md:h-8 md:w-8 ${isOpen ? 'rotate-90 text-accent1' : ''}`} /></span>
                </button>
                <AnimatePresence initial={false}>{isOpen && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.42,ease}} className="overflow-hidden">
                  <div className="pb-9 md:grid md:grid-cols-[auto_1fr] md:gap-10 md:pb-12"><span className="hidden w-[calc(0.5rem+2.5rem)] md:block"/><div className="max-w-4xl">
                    <div className="mb-7 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-line/35 py-5 sm:mb-9 md:grid-cols-4">{project.metrics.map(metric=><div key={metric.label}><div className="font-display text-xl font-bold tabular-nums text-accent1/85 sm:text-2xl">{metric.value}</div><div className="mt-1 text-xs text-ink/45">{metric.label}</div></div>)}</div>
                    <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">{project.highlights.map((highlight,i)=><div key={i}><div className="flex items-center gap-3"><span className="h-px w-5 bg-ink/25"/><span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{highlight.label}</span></div><p className="mt-3 text-[15px] leading-7 text-ink/68 md:text-base">{highlight.text}</p></div>)}</div>
                    <div className="mt-8 flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="inline-flex min-h-8 items-center rounded-full border border-white/70 bg-white/15 px-3 py-1 text-xs font-medium text-ink/48 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.75)]">{tag}</span>)}</div>
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex py-2 text-sm text-ink/40 hover:text-accent1"><span className="link-underline">{isChinese?'查看项目代码':'View Project Code'}</span><ArrowUpRight className="ml-1 h-4 w-4"/></a>}
                  </div></div>
                </motion.div>}</AnimatePresence>
              </motion.article>
            )
          })}
        </div>
        <div className="mt-6 flex justify-end"><a href={contact.githubUrl} target="_blank" rel="noreferrer" className="inline-flex py-2 text-sm text-ink/35 hover:text-accent1"><span className="link-underline">{isChinese?'查看 GitHub 主页':'View GitHub Profile'}</span><ArrowUpRight className="ml-1 h-4 w-4"/></a></div>
      </div>
    </section>
  )
}
