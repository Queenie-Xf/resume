import { useEffect, useRef } from 'react'

interface P {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/** 鼠标跟随的数据粒子网络：粒子缓慢漂移，近距离连线，靠近鼠标时被轻轻吸引并与鼠标连线 */
export default function ParticleField({ density = 70 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    let particles: P[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
      }))
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const LINK = 110
    const MOUSE_LINK = 170

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // 轻微鼠标引力
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_LINK && dist > 0.001) {
          p.vx += (dx / dist) * 0.012
          p.vy += (dy / dist) * 0.012
        }
        // 限速
        p.vx = Math.max(-0.45, Math.min(0.45, p.vx))
        p.vy = Math.max(-0.45, Math.min(0.45, p.vy))
        p.x += p.vx
        p.y += p.vy
        // 边缘回绕
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // 粒子间连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(11,11,12,${0.07 * (1 - d / LINK)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // 鼠标连线（蓝色）
      for (const p of particles) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (d < MOUSE_LINK) {
          ctx.strokeStyle = `rgba(53,80,242,${0.22 * (1 - d / MOUSE_LINK)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      // 粒子
      for (const p of particles) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        const near = d < MOUSE_LINK
        ctx.fillStyle = near ? 'rgba(53,80,242,0.5)' : 'rgba(11,11,12,0.22)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [density])

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
}
