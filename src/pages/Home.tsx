import { useState } from 'react'
import { content, type Lang } from '../content'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import ParticleField from '../components/ParticleField'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Education from '../sections/Education'
import Contact from '../sections/Contact'

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh')
  const t = content[lang]

  return (
    <div className="dot-grid relative min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="fixed inset-0 z-0">
        <ParticleField density={90} />
      </div>
      <div className="relative z-10">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero lang={lang} t={t} />
        <Marquee t={t} />
        <Skills t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Education t={t} />
        <Contact t={t} />
      </main>
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-xs text-ink/35 md:flex-row md:px-10">
          <span className="font-display font-semibold">{lang === 'zh' ? '方向' : 'Xiang Fang'}</span>
          <span>{t.footer}</span>
          <span className="font-mono text-[11px] text-ink/30">$ status --open-to-work <span className="text-accent1">→ true</span></span>
        </div>
      </footer>
      </div>
    </div>
  )
}
