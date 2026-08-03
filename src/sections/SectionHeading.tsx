import { motion } from 'framer-motion'

interface Props {
  index: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 sm:mb-14 md:mb-20"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="shrink-0 text-xs font-semibold text-accent1 sm:text-sm">[ {index} ]</span>
        <span className="scan-line h-px min-w-0 flex-1 bg-line" />
      </div>

      <h2 className="mt-5 max-w-full break-words font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:mt-6 sm:text-4xl md:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-xl break-words text-sm leading-7 text-ink/50 sm:mt-4 sm:text-base sm:leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
