import { useEffect, useRef, useState } from 'react'
import profileImg from '../assets/profile.png'
import oldProfileImg from '../assets/old_profile.png'
import styles from '../pages/About/About.module.css'

const W = 360
const H = 480
const WAVE_WIDTH = 45
const MAX_DISPLACE = 22
const WAVE_SPEED = 0.52
const MAX_RADIUS = Math.sqrt(W * W + H * H) + WAVE_WIDTH

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight)
  const dx = (W - img.naturalWidth * scale) / 2
  const dy = (H - img.naturalHeight * scale) / 2
  ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale)
}

function samplePixel(data: Uint8ClampedArray, sx: number, sy: number): readonly [number, number, number] {
  const x = Math.max(0, Math.min(W - 1, Math.round(sx)))
  const y = Math.max(0, Math.min(H - 1, Math.round(sy)))
  const i = (y * W + x) * 4
  return [data[i], data[i + 1], data[i + 2]] as const
}

export default function BurnPhoto() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isAnimatingRef = useRef(false)
  const topIndexRef = useRef(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const animFrameRef = useRef(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    let loaded = 0
    const imgs = [profileImg, oldProfileImg].map(src => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loaded++
        if (loaded === 2) {
          imagesRef.current = imgs
          drawStatic()
        }
      }
      return img
    })
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  function drawStatic() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[topIndexRef.current]
    if (!ctx || !img) return
    ctx.clearRect(0, 0, W, H)
    drawCover(ctx, img)
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isAnimatingRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const imgs = imagesRef.current
    if (!ctx || imgs.length < 2) return

    const rect = canvas!.getBoundingClientRect()
    const cx = (e.clientX - rect.left) * (W / rect.width)
    const cy = (e.clientY - rect.top) * (H / rect.height)

    const offA = document.createElement('canvas')
    offA.width = W; offA.height = H
    const ctxA = offA.getContext('2d')!
    drawCover(ctxA, imgs[topIndexRef.current])
    const topData = ctxA.getImageData(0, 0, W, H).data

    const nextIndex = 1 - topIndexRef.current
    const offB = document.createElement('canvas')
    offB.width = W; offB.height = H
    const ctxB = offB.getContext('2d')!
    drawCover(ctxB, imgs[nextIndex])
    const botData = ctxB.getImageData(0, 0, W, H).data

    isAnimatingRef.current = true
    setAnimating(true)
    const startTime = performance.now()

    function animate(now: number) {
      const waveRadius = (now - startTime) * WAVE_SPEED
      const imageData = ctx!.createImageData(W, H)
      const out = imageData.data

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const ddx = x - cx
          const ddy = y - cy
          const d = Math.sqrt(ddx * ddx + ddy * ddy)
          const i = (y * W + x) * 4
          const wavePos = (d - waveRadius) / WAVE_WIDTH

          if (wavePos > 1) {
            out[i] = topData[i]; out[i+1] = topData[i+1]; out[i+2] = topData[i+2]; out[i+3] = 255
          } else if (wavePos < -1) {
            out[i] = botData[i]; out[i+1] = botData[i+1]; out[i+2] = botData[i+2]; out[i+3] = 255
          } else {
            const displacement = Math.sin(wavePos * Math.PI) * MAX_DISPLACE
            const len = d > 0.001 ? d : 1
            const sx = x + (ddx / len) * displacement
            const sy = y + (ddy / len) * displacement
            const tint = 1 - Math.abs(wavePos)
            const src = wavePos > 0 ? topData : botData
            const [r, g, b] = samplePixel(src, sx, sy)
            out[i]   = Math.floor(r * (1 - tint * 0.18) + 180 * tint * 0.18)
            out[i+1] = Math.floor(g * (1 - tint * 0.18) +   8 * tint * 0.18)
            out[i+2] = Math.floor(b * (1 - tint * 0.18) +   8 * tint * 0.18)
            out[i+3] = 255
          }
        }
      }

      ctx!.putImageData(imageData, 0, 0)

      if (waveRadius < MAX_RADIUS) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        topIndexRef.current = nextIndex
        isAnimatingRef.current = false
        setAnimating(false)
        drawStatic()
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      onClick={handleClick}
      className={styles.photo}
      style={{ cursor: animating ? 'default' : 'pointer', display: 'block' }}
      aria-label="Click to reveal alternate photo"
    />
  )
}
