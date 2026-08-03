import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contact, type SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const ease=[0.22,1,0.36,1] as const

type ProjectWithLink=SiteContent['projects']['items'][number]&{githubUrl?:string}

export default function Projects({t}:{t:SiteContent}){
 const [open,setOpen]=useState(0)
 const isChinese=t.projects.title==='项目作品'
 return <section id="projects" className="scroll-mt-20 py-16 sm:py-20 md:py-36"><div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10"><SectionHeading index="03" title={t.projects.title} subtitle={t.projects.subtitle}/>
 <div className="border-t border-dashed border-ink/15">{t.projects.items.map((raw,index)=>{const project=raw as ProjectWithLink;const isOpen=open===index;return <motion.article key={project.name} className="border-b border-dashed border-ink/15" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.5}}>
 <button className="grid w-full grid-cols-[1fr_auto] gap-4 py-8 text-left md:grid-cols-[auto_1fr_auto]" onClick={()=>setOpen(isOpen?-1:index)}><span className="text-accent1/80">{String(index+1).padStart(2,'0')}</span><span><span className="block break-words font-display text-3xl font-bold text-ink/90">{project.name}</span><span className="text-sm text-ink/45">{project.org} · {project.period}</span></span><ArrowUpRight className="text-ink/25"/></button>
 <AnimatePresence>{isOpen&&<motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden"><div className="pb-10 md:pl-16"><div className="mb-7 grid border-y border-dashed border-ink/15 py-5 md:grid-cols-4">{project.metrics.map(m=><div key={m.label}><div className="text-2xl text-accent1/85">{m.value}</div><div className="text-xs text-ink/40">{m.label}</div></div>)}</div><div className="grid gap-7 md:grid-cols-2">{project.highlights.map(h=><div key={h.label}><div className="text-xs text-ink/45">{h.label}</div><p className="mt-3 text-ink/65">{h.text}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="rounded-full border border-white/70 bg-white/15 px-3 py-1 text-xs text-ink/48 backdrop-blur">{tag}</span>)}</div></div></motion.div>}</AnimatePresence></motion.article>})}</div><div className="mt-6 flex justify-end"><a href={contact.githubUrl} target="_blank" className="text-sm text-ink/35"><span className="link-underline">{isChinese?'查看 GitHub 主页':'View GitHub Profile'}</span><ArrowUpRight className="inline h-4 w-4"/></a></div></div></section>
}
