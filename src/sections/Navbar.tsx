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
    const onScroll = () => setScrolled(window.scrollY > 32)
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? 'bg-paper/62' : 'bg-paper/24'
      }`}
    >
      <motion.div
        className="absolute left-0 right-0 top-0 h-px origin-left bg-accent1/45"
        style={{ scaleX: progress }}
      />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-1.5 sm:px-6 sm:py-2 md:px-10 md:py-2.5">
        <a
          href="#home"
          className="inline-flex min-h-11 items-center font-display text-base font-bold tracking-tight text-ink/88 sm:text-lg"
        >
          {lang === 'zh' ? '方向' : 'Xiang Fang'}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline inline-flex min-h-10 items-center text-sm font-medium text-ink/52 transition-colors hover:text-ink/88"
            >
              {link.label}
            </a>
          ))}

          <span className="flex min-h-10 select-none items-center text-sm font-medium tracking-wide">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={`inline-flex min-h-10 items-center transition-colors ${
                lang === 'zh' ? 'text-ink/85' : 'text-ink/25 hover:text-ink/55'
              }`}
            >
              中
            </button>
            <span className="mx-1.5 text-ink/15">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`inline-flex min-h-10 items-center transition-colors ${
                lang === 'en' ? 'text-ink/85' : 'text-ink/25 hover:text-ink/55'
              }`}
            >
              EN
            </button>
          </span>
        </div>

        <div className="flex items-center gap-0 md:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center px-2 text-xs font-semibold tracking-[0.12em] text-ink/75"
          >
            {menuOpen ? (lang === 'zh' ? '关闭' : 'CLOSE') : (lang === 'zh' ? '菜单' : 'MENU')}
          </button>

          <span className="flex select-none items-center text-sm font-medium">
            <button
              type="button"
              aria-label="切换为中文"
              onClick={() => setLang('zh')}
              className={`inline-flex min-h-11 min-w-9 items-center justify-center transition-colors ${
                lang === 'zh' ? 'text-ink/85' : 'text-ink/25'
              }`}
            >
              中
            </button>
            <span className="text-ink/15">/</span>
            <button
              type="button"
              aria-label="Switch to English"
              onClick={() => setLang('en')}
              className={`inline-flex min-h-11 min-w-9 items-center justify-center transition-colors ${
                lang === 'en' ? 'text-ink/85' : 'text-ink/25'
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
              className="fixed inset-0 z-40 overflow-y-auto bg-paper/88 px-5 pb-8 pt-20 backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index + 0.08, duration: 0.32 }}
                    className="group flex min-h-16 items-baseline gap-4 border-b border-dashed border-ink/10 py-4"
                  >
                    <span className="text-xs text-accent1/75">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display text-2xl font-bold tracking-tight text-ink/88 transition-colors group-hover:text-accent1 sm:text-3xl">
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
