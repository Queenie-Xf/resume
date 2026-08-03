import type { SiteContent } from '../content'

/** 技术栈无限滚动条 — 数据 ticker 效果 */
export default function Marquee({ t }: { t: SiteContent }) {
  const items = t.skills.groups.flatMap((g) => g.items)
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-line bg-white/50 py-4" aria-hidden>
      <div className="animate-marquee flex w-max items-center">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-mono text-sm uppercase tracking-widest text-ink/40">
            <span className="px-6 transition-colors hover:text-accent1">{item}</span>
            <span className="text-accent1/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
