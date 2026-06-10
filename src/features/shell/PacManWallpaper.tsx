import { useEffect, useRef } from 'react'

const DOT_COUNT = 30
const PAC_RADIUS = 14
const DOT_RADIUS = 3
const SPEED = 1.0

interface Dot {
  x: number
  y: number
  collected: boolean
}

export function PacManWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      collected: false,
    }))

    let pacX = canvas.width / 2
    let pacY = canvas.height / 2
    let dirX = (Math.random() - 0.5) * SPEED
    let dirY = (Math.random() - 0.5) * SPEED
    const mag = Math.sqrt(dirX * dirX + dirY * dirY)
    dirX = (dirX / mag) * SPEED
    dirY = (dirY / mag) * SPEED

    // Ghosts coordinates trailing Pacman
    let blinkyX = pacX - dirX * 40
    let blinkyY = pacY - dirY * 40
    let clydeX = pacX - dirX * 80
    let clydeY = pacY - dirY * 80

    let mouthAngle = 0
    let mouthDir = 0.02
    let idleCounter = 0
    let animId = 0

    function resize() {
      const c = canvasRef.current
      if (!c) return
      c.width = window.innerWidth
      c.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    function drawGhost(
      gCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      color: string,
      targetX: number,
      targetY: number
    ) {
      const r = PAC_RADIUS
      gCtx.fillStyle = color
      gCtx.beginPath()
      // Semicircle top
      gCtx.arc(x, y, r, Math.PI, 0, false)
      // Body bottom
      gCtx.lineTo(x + r, y + r)
      // Wavy bottom
      gCtx.lineTo(x + r * 0.5, y + r - 3)
      gCtx.lineTo(x, y + r)
      gCtx.lineTo(x - r * 0.5, y + r - 3)
      gCtx.lineTo(x - r, y + r)
      gCtx.closePath()
      gCtx.fill()

      // Eyes
      const dx = targetX > x ? 1.5 : -1.5
      const dy = targetY > y ? 1 : -1

      // Left eye
      gCtx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      gCtx.beginPath()
      gCtx.arc(x - r * 0.4, y - 2, 3, 0, Math.PI * 2)
      gCtx.fill()
      gCtx.fillStyle = 'rgba(137, 180, 250, 0.35)' // blue iris
      gCtx.beginPath()
      gCtx.arc(x - r * 0.4 + dx, y - 2 + dy, 1.2, 0, Math.PI * 2)
      gCtx.fill()

      // Right eye
      gCtx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      gCtx.beginPath()
      gCtx.arc(x + r * 0.4, y - 2, 3, 0, Math.PI * 2)
      gCtx.fill()
      gCtx.fillStyle = 'rgba(137, 180, 250, 0.35)'
      gCtx.beginPath()
      gCtx.arc(x + r * 0.4 + dx, y - 2 + dy, 1.2, 0, Math.PI * 2)
      gCtx.fill()
    }

    function render() {
      const c = canvasRef.current
      if (!c || !ctx) return

      ctx.clearRect(0, 0, c.width, c.height)

      if (!prefersReduced) {
        pacX += dirX
        pacY += dirY

        if (pacX < PAC_RADIUS || pacX > c.width - PAC_RADIUS) {
          dirX = -dirX
          pacX = Math.max(PAC_RADIUS, Math.min(c.width - PAC_RADIUS, pacX))
        }
        if (pacY < PAC_RADIUS || pacY > c.height - PAC_RADIUS) {
          dirY = -dirY
          pacY = Math.max(PAC_RADIUS, Math.min(c.height - PAC_RADIUS, pacY))
        }

        // Interpolate ghosts positions to chase Pacman
        blinkyX += (pacX - blinkyX) * 0.04
        blinkyY += (pacY - blinkyY) * 0.04

        clydeX += (blinkyX - clydeX) * 0.03
        clydeY += (blinkyY - clydeY) * 0.03

        idleCounter++
        if (idleCounter > 240) {
          const angle = Math.random() * Math.PI * 2
          dirX = Math.cos(angle) * SPEED
          dirY = Math.sin(angle) * SPEED
          idleCounter = 0
        }

        mouthAngle += mouthDir
        if (mouthAngle > 0.35) mouthDir = -0.02
        if (mouthAngle < 0.01) mouthDir = 0.02

        for (const dot of dots) {
          if (!dot.collected) {
            const dist = Math.sqrt((pacX - dot.x) ** 2 + (pacY - dot.y) ** 2)
            if (dist < PAC_RADIUS + DOT_RADIUS) {
              dot.collected = true
            }
          }
        }

        if (dots.every((d) => d.collected)) {
          for (const dot of dots) {
            dot.x = Math.random() * c.width
            dot.y = Math.random() * c.height
            dot.collected = false
          }
        }
      }

      const pacDir = Math.atan2(dirY, dirX)

      // Draw Dots
      for (const dot of dots) {
        if (!dot.collected) {
          ctx.fillStyle = 'rgba(245, 194, 231, 0.12)' // Catppuccin Pink (translucent)
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw Clyde (Orange Ghost)
      drawGhost(ctx, clydeX, clydeY, 'rgba(250, 179, 135, 0.12)', blinkyX, blinkyY)

      // Draw Blinky (Red Ghost)
      drawGhost(ctx, blinkyX, blinkyY, 'rgba(243, 139, 168, 0.12)', pacX, pacY)

      // Draw PacMan
      ctx.fillStyle = 'rgba(249, 226, 175, 0.12)' // Catppuccin Yellow (translucent)
      ctx.beginPath()
      ctx.arc(pacX, pacY, PAC_RADIUS, pacDir + mouthAngle, pacDir + Math.PI * 2 - mouthAngle)
      ctx.lineTo(pacX, pacY)
      ctx.closePath()
      ctx.fill()

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
