import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contact, type Lang, type SiteContent } from '../content'
import { useTypewriter } from '../hooks/useTypewriter'
import CountUp from '../components/CountUp'

const ease = [0.22, 1, 0.36, 1] as const

/** 背景数据折线图 */
function DataLine() {
  return (
    <svg
      className="pointer-events-none absolute bottom-24 left-0 right-0 hidden h-56 w-full md:block"
      viewBox="0 0 1440 220"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* 网格 */}
      {[40, 90, 140, 190].map((y) => (
        <line key={y} x1="0" y1={y} x2="1440" y2={y} stroke="#0B0B0C" strokeOpacity="0.05" strokeDasharray="3 6" />
      ))}
      {/* 数据折线 */}
      <motion.path
        d="M0 180 L120 165 L240 172 L360 130 L480 148 L600 96 L720 118 L840 70 L960 92 L1080 52 L1200 76 L1320 30 L1440 44"
        stroke="#3550F2"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.8, ease: 'easeInOut' }}
      />
      {/* 数据点 */}
      {[
        [120, 165], [360, 130], [600, 96], [840, 70], [1080, 52], [1320, 30],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="#3550F2"
          fillOpacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.25 }}
        />
      ))}
    </svg>
  )
}

/** 背景数据柱群 */
function DataBars() {
  const bars = [0.5, 0.8, 0.35, 0.9, 0.6, 1, 0.45, 0.75, 0.55, 0.95, 0.4, 0.7]
  return (
    <div className="pointer-events-none absolute right-10 top-28 hidden items-end gap-1.5 lg:flex" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={i}
          className="data-bar w-1.5 bg-ink/10"
          style={{ height: `${h * 90}px`, animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  )
}

export default function Hero({ lang, t }: { lang: Lang; t: SiteContent }) {
  const query =
    lang === 'zh'
      ? `SELECT * FROM candidate WHERE name = '方向';`
      : `SELECT * FROM candidate WHERE name = 'Xiang Fang';`
  const typed = useTypewriter(query)

  const rise = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.1 + 0.12 * i, ease },
    }),
  }

  const links = [
    { label: contact.email, href: `mailto:${contact.email}` },
    { label: contact.github, href: contact.githubUrl },
    { label: contact.phone, href: `tel:${contact.phone}` },
  ]

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <DataLine />
      <DataBars />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-16 md:px-10">
        {/* 顶部身份行 */}
        <motion.div custom={0} variants={rise} initial="hidden" animate="show" className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-ink/40" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-ink/50">
            {t.hero.title}
          </span>
        </motion.div>

        {/* 巨型姓名 */}
        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="font-display text-[17vw] font-bold leading-[0.95] tracking-tight text-ink md:text-[10rem]"
        >
          {t.hero.name}
        </motion.h1>

        {/* 简介 */}
        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-xl text-lg leading-relaxed text-ink/60 md:text-xl"
        >
          {t.hero.tagline}
        </motion.p>

        {/* 打字机 SQL 查询 — 数据感细节 */}
        <motion.div custom={3} variants={rise} initial="hidden" animate="show" className="mt-8">
          <div className="inline-flex max-w-full items-center gap-2 border border-line bg-white/60 px-3 py-2.5 backdrop-blur-sm md:gap-3 md:px-4">
            <span className="hidden gap-1.5 sm:flex">
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-ink/15" />
              <span className="h-2 w-2 rounded-full bg-accent1/60" />
            </span>
            <code className="whitespace-nowrap font-mono text-[10px] text-ink/70 md:text-sm">
              <span className="mr-2 select-none text-accent1">›</span>
              {typed}
              <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent1/70" />
            </code>
          </div>
        </motion.div>

        {/* 联系方式 — 纯文字链接 + 悬停箭头 */}
        <motion.div custom={4} variants={rise} initial="hidden" animate="show" className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              <span className="link-underline">{l.label}</span>
              <ArrowUpRight className="h-4 w-4 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent1" />
            </a>
          ))}
        </motion.div>

        {/* 数据亮点 — 细线分栏 + 数字滚动 */}
        <motion.div custom={5} variants={rise} initial="hidden" animate="show" className="mt-20 grid grid-cols-3 gap-6 border-t border-line pt-8 md:mt-24">
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold tabular-nums text-ink md:text-5xl">
                <CountUp text={s.value} />
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-wide text-ink/40 md:text-sm md:normal-case md:tracking-normal">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 底部滚动提示 — 一根呼吸的细线 */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-16 w-px bg-ink/25"
        animate={{ scaleY: [1, 0.4, 1], opacity: [0.25, 0.6, 0.25] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top' }}
      />
    </section>
  )
}
