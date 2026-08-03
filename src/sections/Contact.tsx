import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { contact, type SiteContent } from '../content'
import SectionHeading from './SectionHeading'

const phoneDisplay = '+86 150 2111 2769'
const phoneHref = '+8615021112769'
const wechatId = 'Queenie_Softdrink'

export default function Contact({ t }: { t: SiteContent }) {
  const [copied, setCopied] = useState(false)
  const isChinese = t.contact.title === '联系我'
  const locationDisplay = isChinese ? '上海' : 'Shanghai'

  const rows = [
    { label: t.contact.emailLabel, value: contact.email, href: `mailto:${contact.email}` },
    { label: t.contact.githubLabel, value: contact.github, href: contact.githubUrl },
    { label: t.contact.phoneLabel, value: phoneDisplay, href: `tel:${phoneHref}` },
  ]

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(wechatId)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <SectionHeading index="05" title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="border-t border-line/30">
          {rows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <a
                href={row.href}
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex min-h-20 flex-col justify-center gap-1.5 border-b border-line/30 py-4 sm:min-h-0 sm:py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-7"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/36 md:w-28 md:shrink-0 md:text-sm md:tracking-[0.2em]">
                  {row.label}
                </span>
                <span className="flex min-w-0 items-center gap-2 font-display text-lg font-medium text-ink/84 sm:text-xl md:text-right md:text-2xl">
                  <span className="link-underline break-all">{row.value}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent1" />
                </span>
              </a>
            </motion.div>
          ))}

          <motion.button
            type="button"
            onClick={copyWechat}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="group flex min-h-20 w-full flex-col justify-center gap-1.5 border-b border-line/30 py-4 text-left sm:min-h-0 sm:py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-7"
            aria-label={isChinese ? `复制微信号 ${wechatId}` : `Copy WeChat ID ${wechatId}`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/36 md:w-28 md:shrink-0 md:text-sm md:tracking-[0.2em]">
              {isChinese ? '微信' : 'WeChat'}
            </span>
            <span className="flex min-w-0 items-center gap-2 font-display text-lg font-medium text-ink/84 sm:text-xl md:text-right md:text-2xl">
              <span className="break-all">{wechatId}</span>
              {copied ? (
                <Check className="h-5 w-5 shrink-0 text-accent1" />
              ) : (
                <Copy className="h-4 w-4 shrink-0 text-ink/24 transition-colors group-hover:text-accent1" />
              )}
              <span className="text-xs font-normal text-ink/32">
                {copied ? (isChinese ? '已复制' : 'Copied') : (isChinese ? '点击复制' : 'Copy')}
              </span>
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex min-h-20 flex-col justify-center gap-1.5 border-b border-line/30 py-4 sm:min-h-0 sm:py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-7"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/36 md:w-28 md:shrink-0 md:text-sm md:tracking-[0.2em]">
              {t.contact.locationLabel}
            </span>
            <span className="font-display text-lg font-medium text-ink/84 sm:text-xl md:text-right md:text-2xl">
              {locationDisplay}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
