import type { SiteContent } from '../content'

export default function Marquee({ t }: { t: SiteContent }) {
  const items = t.skills.groups.flatMap((group) => group.items)
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-line bg-white/50 py-3 sm:py-4" aria-hidden>
      <div className="animate-marquee flex w-max items-center">
        {doubled.map((item, index) => (
          <span key={index} className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-ink/40 sm:text-sm sm:tracking-widest">
            <span className="px-4 transition-colors hover:text-accent1 sm:px-6">{item}</span>
            <span className="text-accent1/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
