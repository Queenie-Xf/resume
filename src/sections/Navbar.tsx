import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import type { Lang, SiteContent } from '../content'

interface Props {
  lang: Lang
  setLang: (l: Lang) => void
  t: SiteContent
}

export default function Navbar({ lang, setLang, t }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const links = [
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#projects', label: t.nav.projects },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <motion.div
        className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-accent1"
        style={{ scaleX: progress }}
      />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 md:px-10 md:py-5">
        <a href="#home" className="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-tight text-ink">
          {lang === 'zh' ? '方向' : 'Xiang Fang'}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}

          <span className="select-none text-sm font-medium tracking-wide">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`transition-colors ${lang === 'zh' ? 'text-ink' : 'text-ink/30 hover:text-ink/60'}`}
            >
              中
            </button>
            <span className="mx-1.5 text-ink/20">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-ink' : 'text-ink/30 hover:text-ink/60'}`}
            >
              EN
            </button>
          </span>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold tracking-[0.12em] text-ink"
          >
            {menuOpen ? (lang === 'zh' ? '关闭' : 'CLOSE') : (lang === 'zh' ? '菜单' : 'MENU')}
          </button>

          <span className="flex select-none items-center text-sm font-medium">
            <button
              type="button"
              aria-label="切换为中文"
              onClick={() => setLang('zh')}
              className={`inline-flex min-h-11 min-w-10 items-center justify-center transition-colors ${
                lang === 'zh' ? 'text-ink' : 'text-ink/30'
              }`}
            >
              中
            </button>
            <span className="text-ink/20">/</span>
            <button
              type="button"
              aria-label="Switch to English"
              onClick={() => setLang('en')}
              className={`inline-flex min-h-11 min-w-10 items-center justify-center transition-colors ${
                lang === 'en' ? 'text-ink' : 'text-ink/30'
              }`}
            >
              EN
            </button>
          </span>
        </div>
      </nav>

      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 overflow-y-auto bg-paper/98 px-5 pb-8 pt-24 backdrop-blur-md md:hidden"
            >
              <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index + 0.08, duration: 0.35 }}
                    className="group flex min-h-16 items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="text-xs text-accent1">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent1 sm:text-3xl">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </motion.header>
  )
}
