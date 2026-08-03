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
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 菜单打开时锁定页面滚动
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      {/* 顶部滚动进度条 */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-accent1"
        style={{ scaleX: progress }}
      />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#home" className="font-display text-lg font-bold tracking-tight text-ink">
          {lang === 'zh' ? '方向' : 'Xiang Fang'}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}

          {/* 语言切换 — 纯文字，无按钮感 */}
          <span className="select-none text-sm font-medium tracking-wide">
            <button
              onClick={() => setLang('zh')}
              className={`transition-colors ${lang === 'zh' ? 'text-ink' : 'text-ink/30 hover:text-ink/60'}`}
            >
              中
            </button>
            <span className="mx-1.5 text-ink/20">/</span>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-ink' : 'text-ink/30 hover:text-ink/60'}`}
            >
              EN
            </button>
          </span>
        </div>

        {/* 移动端：菜单 + 语言切换 */}
        <div className="flex items-center gap-5 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-mono text-xs font-semibold tracking-[0.2em] text-ink"
          >
            {menuOpen ? (lang === 'zh' ? '关闭' : 'CLOSE') : (lang === 'zh' ? '菜单' : 'MENU')}
          </button>
          <span className="select-none text-sm font-medium">
            <button
              onClick={() => setLang('zh')}
              className={`transition-colors ${lang === 'zh' ? 'text-ink' : 'text-ink/30'}`}
            >
              中
            </button>
            <span className="mx-1.5 text-ink/20">/</span>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors ${lang === 'en' ? 'text-ink' : 'text-ink/30'}`}
            >
              EN
            </button>
          </span>
        </div>
      </nav>

      {/* 移动端全屏菜单 — 渲染到 body，避免受导航栏毛玻璃影响 */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 bg-paper/97 backdrop-blur-md md:hidden"
            >
              <div className="flex h-full flex-col justify-center px-8">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                    className="group flex items-baseline gap-4 border-b border-line py-5"
                  >
                    <span className="font-mono text-xs text-accent1">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent1">
                      {l.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  )
}
