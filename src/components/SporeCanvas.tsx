import { useEffect, useRef } from 'react'
import styles from './SporeCanvas.module.css'

interface Spore {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  alphaDir: number
}

interface SporeCanvasProps {
  count?: number
  maxAlpha?: number
  maxRadius?: number
}

export default function SporeCanvas({ count = 50, maxAlpha = 0.6, maxRadius = 2.5 }: SporeCanvasProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bioColor = getComputedStyle(canvas).getPropertyValue('--color-accent-bio').trim()

    let animId: number
    let spores: Spore[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const init = () => {
      spores = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        radius: Math.random() * (maxRadius - 0.5) + 0.5,
        alpha: Math.random() * (maxAlpha - 0.1) + 0.1,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = bioColor
      ctx.shadowBlur = 6
      ctx.shadowColor = bioColor
      spores.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        s.alpha += 0.003 * s.alphaDir
        if (s.alpha > maxAlpha || s.alpha < 0.05) s.alphaDir *= -1
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0

        ctx.globalAlpha = s.alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const observer = new ResizeObserver(() => {
      resize()
      init()
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [count, maxAlpha, maxRadius])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
