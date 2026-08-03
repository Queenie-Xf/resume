import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/** 数字滚动：进入视口后从 0 计数到目标值，保留原文本的前后缀（如 “12,000+”“3 段”） */
export default function CountUp({ text, duration = 1400 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [shown, setShown] = useState(text)

  const match = text.match(/(\d[\d,]*)/)
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null
  const prefix = match ? text.slice(0, match.index) : ''
  const suffix = match ? text.slice((match.index ?? 0) + match[1].length) : ''
  const useComma = match ? match[1].includes(',') : false

  useEffect(() => {
    if (!inView || target === null) return
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const value = Math.round(target * eased)
      const formatted = useComma ? value.toLocaleString('en-US') : String(value)
      setShown(`${prefix}${formatted}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return <span ref={ref}>{shown}</span>
}
