import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './VineSVG.module.css'

interface VineSVGProps {
  position: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right'
  width?: number
  height?: number
  opacity?: number
}

const positionClass: Record<VineSVGProps['position'], string> = {
  'top-right': styles.topRight,
  'bottom-left': styles.bottomLeft,
  'top-left': styles.topLeft,
  'bottom-right': styles.bottomRight,
}

export default function VineSVG({ position, width = 200, height = 280, opacity = 0.7 }: VineSVGProps): React.JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const isRight = position.includes('right')
  const isBottom = position.includes('bottom')

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const paths = svg.querySelectorAll('path[data-vine]')
    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const el = path as SVGPathElement
        if (typeof el.getTotalLength !== 'function') return
        const length = el.getTotalLength()
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          delay: Math.random() * 0.4,
        })
      })
    }, svg)
    return () => ctx.revert()
  }, [])

  const scaleX = isRight ? 1 : -1
  const scaleY = isBottom ? -1 : 1
  const transform = `scale(${scaleX}, ${scaleY})`

  return (
    <svg
      ref={svgRef}
      className={`${styles.vine} ${positionClass[position]}`}
      width={width}
      height={height}
      viewBox="0 0 200 280"
      fill="none"
      aria-hidden="true"
      style={{ opacity, transform, transformOrigin: 'center center' }}
    >
      {/* Main climbing stem */}
      <path
        data-vine
        d="M200 0 C180 35 190 75 168 108 C150 135 162 165 140 192 C124 212 136 244 114 268"
        stroke="var(--color-accent-vine)"
        strokeWidth="1.8"
        fill="none"
        opacity="0.75"
      />
      {/* Secondary stem */}
      <path
        data-vine
        d="M200 0 C196 45 184 88 174 118 C162 148 168 178 152 204"
        stroke="var(--color-accent-vine)"
        strokeWidth="1"
        fill="none"
        opacity="0.45"
      />
      {/* Tendrils */}
      <path
        data-vine
        d="M168 108 C152 94 136 98 132 112"
        stroke="var(--color-accent-vine)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        data-vine
        d="M140 192 C122 176 106 180 102 196"
        stroke="var(--color-accent-vine)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        data-vine
        d="M152 204 C172 192 184 202 180 216"
        stroke="var(--color-accent-vine)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      {/* Leaves */}
      <path d="M168 108 C152 94 136 98 132 112 C148 104 160 106 168 108Z" fill="var(--color-accent-vine)" opacity="0.55" />
      <path d="M140 192 C122 176 106 180 102 196 C118 188 130 190 140 192Z" fill="var(--color-accent-vine)" opacity="0.5" />
      <path d="M152 204 C172 192 184 202 180 216 C170 206 160 204 152 204Z" fill="var(--color-accent-vine)" opacity="0.45" />
      {/* Bioluminescent spore dots */}
      <circle cx="168" cy="108" r="2.5" fill="var(--color-accent-bio)" opacity="0.6" />
      <circle cx="140" cy="192" r="2" fill="var(--color-accent-bio)" opacity="0.5" />
      <circle cx="114" cy="268" r="3" fill="var(--color-accent-bio)" opacity="0.4" />
      <circle cx="152" cy="204" r="1.5" fill="var(--color-accent-bio)" opacity="0.45" />
    </svg>
  )
}
