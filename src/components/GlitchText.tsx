import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './GlitchText.module.css'

interface GlitchTextProps {
  children: string
  tag?: 'h1' | 'h2' | 'span'
  className?: string
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#'

export default function GlitchText({ children, tag: Tag = 'h1', className }: GlitchTextProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const original = children
    let frame = 0
    let rafId: number

    const scramble = () => {
      el.textContent = original
        .split('')
        .map((char: string, i: number) => {
          if (char === ' ') return ' '
          if (i < Math.floor(frame / 3)) return original[i]
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        })
        .join('')
      frame++
      if (frame < original.length * 3) rafId = requestAnimationFrame(scramble)
      else el.textContent = original
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          onComplete: () => {
            frame = 0
            scramble()
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
      cancelAnimationFrame(rafId)
    }
  }, [children])

  return (
    <Tag ref={ref} className={`${styles.glitch}${className ? ` ${className}` : ''}`}>
      {children}
    </Tag>
  )
}
