import { motion } from 'framer-motion'

interface Props {
  index: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-20"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm font-semibold text-accent1">[ {index} ]</span>
        <span className="scan-line h-px flex-1 bg-line" />
      </div>
      <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/50">{subtitle}</p>}
    </motion.div>
  )
}
