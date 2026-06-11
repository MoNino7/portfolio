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

interface Block {
  xOffset: number
  yOffset: number
  type: 'question' | 'brick'
  hit: boolean
  bounceY: number
}

interface Pipe {
  xOffset: number
  w: number
  h: number
}

interface Goomba {
  x: number
  vx: number
  squished: boolean
  squishTime: number
}

interface Particle {
  x: number
  y: number
  vy: number
  alpha: number
  type: 'coin'
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

    // --- Pacman Setup ---
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

    let blinkyX = pacX - dirX * 40
    let blinkyY = pacY - dirY * 40
    let clydeX = pacX - dirX * 80
    let clydeY = pacY - dirY * 80

    let mouthAngle = 0
    let mouthDir = 0.02
    let idleCounter = 0
    let animId = 0

    // --- Mario Setup ---
    const SCALE = 1.5
    const MARIO_W = 12 * SCALE
    const MARIO_H = 20 * SCALE
    const GOOMBA_W = 12 * SCALE
    const GOOMBA_H = 12 * SCALE
    const gravity = 0.22

    let marioX = 80
    let marioY = canvas.height - 45 - MARIO_H
    let marioVx = 0.75
    let marioVy = 0
    let marioIsJumping = false
    let marioWalkFrame = 0

    const blocks: Block[] = [
      { xOffset: 0.35, yOffset: 95, type: 'question', hit: false, bounceY: 0 },
      { xOffset: 0.39, yOffset: 95, type: 'brick', hit: false, bounceY: 0 },
      { xOffset: 0.43, yOffset: 95, type: 'question', hit: false, bounceY: 0 },
      { xOffset: 0.60, yOffset: 95, type: 'brick', hit: false, bounceY: 0 },
      { xOffset: 0.64, yOffset: 95, type: 'question', hit: false, bounceY: 0 },
    ]

    const pipes: Pipe[] = [
      { xOffset: 0.22, w: 24 * SCALE, h: 26 * SCALE },
      { xOffset: 0.78, w: 24 * SCALE, h: 26 * SCALE },
    ]

    const goombas: Goomba[] = [
      { x: canvas.width * 0.45, vx: -0.4, squished: false, squishTime: 0 },
      { x: canvas.width * 0.85, vx: -0.4, squished: false, squishTime: 0 },
    ]

    let particles: Particle[] = []

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
      gCtx.arc(x, y, r, Math.PI, 0, false)
      gCtx.lineTo(x + r, y + r)
      gCtx.lineTo(x + r * 0.5, y + r - 3)
      gCtx.lineTo(x, y + r)
      gCtx.lineTo(x - r * 0.5, y + r - 3)
      gCtx.lineTo(x - r, y + r)
      gCtx.closePath()
      gCtx.fill()

      const dx = targetX > x ? 1.5 : -1.5
      const dy = targetY > y ? 1 : -1

      gCtx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      gCtx.beginPath()
      gCtx.arc(x - r * 0.4, y - 2, 3, 0, Math.PI * 2)
      gCtx.fill()
      gCtx.fillStyle = 'rgba(137, 180, 250, 0.35)'
      gCtx.beginPath()
      gCtx.arc(x - r * 0.4 + dx, y - 2 + dy, 1.2, 0, Math.PI * 2)
      gCtx.fill()

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
      const currentGroundY = c.height - 45

      if (!prefersReduced) {
        // --- Pacman Updates ---
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

        // --- Mario Updates ---
        marioX += marioVx
        if (marioX > c.width + 40) {
          marioX = -40
          blocks.forEach(b => {
            b.hit = false
            b.bounceY = 0
          })
        }

        // Jump triggers
        if (!marioIsJumping) {
          marioY = currentGroundY - MARIO_H
          marioWalkFrame++

          // 1. Pipe collision check
          let nearPipe = false
          for (const pipe of pipes) {
            const px = pipe.xOffset * c.width
            if (marioX < px && marioX + MARIO_W + 25 > px) {
              nearPipe = true
            }
          }

          // 2. Goomba collision check
          let nearGoomba = false
          for (const goomba of goombas) {
            if (!goomba.squished && marioX < goomba.x && marioX + MARIO_W + 25 > goomba.x) {
              nearGoomba = true
            }
          }

          // 3. Block check (jump to hit block)
          let underBlock = false
          for (const block of blocks) {
            const bx = block.xOffset * c.width
            if (!block.hit && Math.abs((marioX + MARIO_W / 2) - (bx + 12)) < 6) {
              underBlock = true
            }
          }

          if (nearPipe || nearGoomba || underBlock) {
            marioIsJumping = true
            marioVy = -5.8
          }
        } else {
          marioVy += gravity
          marioY += marioVy

          // Land on ground
          if (marioY >= currentGroundY - MARIO_H) {
            marioY = currentGroundY - MARIO_H
            marioVy = 0
            marioIsJumping = false
          }

          // Head butt blocks
          if (marioVy < 0) {
            for (const block of blocks) {
              const bx = block.xOffset * c.width
              const by = currentGroundY - block.yOffset
              if (marioX + MARIO_W > bx && marioX < bx + 24) {
                if (marioY <= by + 24 && marioY + MARIO_H >= by + 12) {
                  if (!block.hit) {
                    block.hit = true
                    block.bounceY = -6
                    marioVy = 0.8
                    particles.push({
                      x: bx + 12,
                      y: by - 4,
                      vy: -3.5,
                      alpha: 1.0,
                      type: 'coin'
                    })
                  }
                }
              }
            }
          }
        }

        // Block bounce
        for (const block of blocks) {
          if (block.bounceY < 0) {
            block.bounceY += 0.5
            if (block.bounceY > 0) block.bounceY = 0
          }
        }

        // Goombas update
        for (const goomba of goombas) {
          if (goomba.squished) {
            goomba.squishTime++
            if (goomba.squishTime > 50) {
              goomba.squished = false
              goomba.squishTime = 0
              goomba.x = c.width + 30 + Math.random() * 100
            }
          } else {
            goomba.x += goomba.vx

            if (goomba.x < -30) {
              goomba.x = c.width + 30
            }

            // Pipe reverse
            for (const pipe of pipes) {
              const px = pipe.xOffset * c.width
              if (goomba.x + GOOMBA_W > px && goomba.x < px + pipe.w) {
                goomba.vx = -goomba.vx
                if (goomba.vx > 0) {
                  goomba.x = px + pipe.w + 1
                } else {
                  goomba.x = px - GOOMBA_W - 1
                }
              }
            }

            // Mario stomp
            if (
              marioVy > 0 &&
              marioX + MARIO_W > goomba.x &&
              marioX < goomba.x + GOOMBA_W &&
              marioY + MARIO_H >= currentGroundY - GOOMBA_H &&
              marioY + MARIO_H <= currentGroundY - GOOMBA_H + 9
            ) {
              goomba.squished = true
              goomba.squishTime = 0
              marioVy = -2.8
            }
          }
        }

        // Particles update
        for (const p of particles) {
          p.y += p.vy
          p.vy += 0.12
          p.alpha -= 0.02
        }
        particles = particles.filter(p => p.alpha > 0)
      } else {
        // Reduced motion defaults
        marioY = currentGroundY - MARIO_H
      }

      // --- Draw Pacman Elements ---
      const pacDir = Math.atan2(dirY, dirX)

      // Draw Dots
      for (const dot of dots) {
        if (!dot.collected) {
          ctx.fillStyle = 'rgba(245, 194, 231, 0.12)'
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw Clyde
      drawGhost(ctx, clydeX, clydeY, 'rgba(250, 179, 135, 0.12)', blinkyX, blinkyY)

      // Draw Blinky
      drawGhost(ctx, blinkyX, blinkyY, 'rgba(243, 139, 168, 0.12)', pacX, pacY)

      // Draw PacMan
      ctx.fillStyle = 'rgba(249, 226, 175, 0.12)'
      ctx.beginPath()
      ctx.arc(pacX, pacY, PAC_RADIUS, pacDir + mouthAngle, pacDir + Math.PI * 2 - mouthAngle)
      ctx.lineTo(pacX, pacY)
      ctx.closePath()
      ctx.fill()

      // --- Draw Mario Elements ---
      // Ground line
      ctx.beginPath()
      ctx.moveTo(0, currentGroundY)
      ctx.lineTo(c.width, currentGroundY)
      ctx.strokeStyle = 'rgba(180, 190, 254, 0.12)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = 'rgba(180, 190, 254, 0.03)'
      ctx.fillRect(0, currentGroundY, c.width, c.height - currentGroundY)

      // Pipes
      for (const pipe of pipes) {
        const px = pipe.xOffset * c.width
        const py = currentGroundY - pipe.h

        ctx.save()
        ctx.translate(px, py)
        ctx.scale(SCALE, SCALE)

        ctx.fillStyle = 'rgba(166, 227, 161, 0.12)'
        ctx.fillRect(2, 5, 20, 21)
        ctx.fillRect(0, 0, 24, 5)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.fillRect(3, 1, 2, 24)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(19, 1, 2, 24)

        ctx.restore()
      }

      // Blocks
      for (const block of blocks) {
        const bx = block.xOffset * c.width
        const by = currentGroundY - block.yOffset + block.bounceY

        ctx.save()
        ctx.translate(bx, by)
        ctx.scale(SCALE, SCALE)

        if (block.hit) {
          ctx.fillStyle = 'rgba(108, 112, 134, 0.12)'
          ctx.fillRect(0, 0, 16, 16)
          ctx.fillStyle = 'rgba(108, 112, 134, 0.06)'
          ctx.fillRect(3, 3, 2, 2)
          ctx.fillRect(11, 3, 2, 2)
          ctx.fillRect(3, 11, 2, 2)
          ctx.fillRect(11, 11, 2, 2)
        } else if (block.type === 'question') {
          ctx.fillStyle = 'rgba(249, 226, 175, 0.12)'
          ctx.fillRect(0, 0, 16, 16)
          ctx.fillStyle = 'rgba(249, 226, 175, 0.25)'
          ctx.font = '8px monospace'
          ctx.fillText('?', 5, 11)
        } else {
          ctx.fillStyle = 'rgba(250, 179, 135, 0.12)'
          ctx.fillRect(0, 0, 16, 16)
          ctx.strokeStyle = 'rgba(250, 179, 135, 0.25)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, 8)
          ctx.lineTo(16, 8)
          ctx.moveTo(8, 0)
          ctx.lineTo(8, 8)
          ctx.moveTo(4, 8)
          ctx.lineTo(4, 16)
          ctx.stroke()
        }

        ctx.restore()
      }

      // Goombas
      for (const goomba of goombas) {
        if (goomba.squished) {
          ctx.save()
          ctx.translate(goomba.x, currentGroundY)
          ctx.scale(SCALE, SCALE)

          ctx.fillStyle = 'rgba(166, 129, 89, 0.12)'
          ctx.fillRect(0, -3, 12, 3)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
          ctx.fillRect(2, -2, 2, 1)
          ctx.fillRect(8, -2, 2, 1)

          ctx.restore()
        } else {
          const gy = currentGroundY - GOOMBA_H

          ctx.save()
          ctx.translate(goomba.x, gy)
          ctx.scale(SCALE, SCALE)

          ctx.fillStyle = 'rgba(166, 129, 89, 0.12)'
          ctx.beginPath()
          ctx.arc(6, 4, 5, Math.PI, 0, false)
          ctx.lineTo(12, 9)
          ctx.lineTo(0, 9)
          ctx.closePath()
          ctx.fill()

          ctx.fillStyle = 'rgba(245, 224, 220, 0.12)'
          ctx.fillRect(3, 7, 6, 3)

          ctx.fillStyle = 'rgba(108, 112, 134, 0.12)'
          ctx.fillRect(1, 10, 3, 2)
          ctx.fillRect(8, 10, 3, 2)

          ctx.restore()
        }
      }

      // Mario
      const right = marioVx > 0
      ctx.save()
      ctx.translate(marioX, marioY)
      ctx.scale(SCALE, SCALE)

      // Cap
      ctx.fillStyle = 'rgba(243, 139, 168, 0.12)'
      ctx.fillRect(right ? 2 : 0, 0, 8, 3)
      ctx.fillRect(right ? 5 : -1, 1, 6, 1.5)

      // Hair & Face
      ctx.fillStyle = 'rgba(166, 129, 89, 0.12)'
      ctx.fillRect(right ? 1 : 7, 3, 2, 4)
      ctx.fillStyle = 'rgba(245, 224, 220, 0.12)'
      ctx.fillRect(right ? 3 : 1, 3, 6, 5)

      // Mustache & Eye
      ctx.fillStyle = 'rgba(166, 129, 89, 0.12)'
      ctx.fillRect(right ? 6 : 2, 5, 3, 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(right ? 5 : 3.5, 3, 1.5, 2)

      // Shirt & Overalls
      ctx.fillStyle = 'rgba(243, 139, 168, 0.12)'
      ctx.fillRect(2, 8, 6, 6)
      ctx.fillStyle = 'rgba(137, 180, 250, 0.12)'
      ctx.fillRect(3, 10, 4, 6)
      ctx.fillRect(3, 8, 1.5, 2)
      ctx.fillRect(5.5, 8, 1.5, 2)

      // Hand swing
      ctx.fillStyle = 'rgba(243, 139, 168, 0.12)'
      if (marioIsJumping) {
        ctx.fillRect(right ? 8 : -2, 5, 2, 4)
        ctx.fillStyle = 'rgba(245, 224, 220, 0.12)'
        ctx.fillRect(right ? 8 : -2, 3, 2, 2)
      } else {
        const swing = Math.floor(marioWalkFrame / 6) % 2 === 0 ? 2 : -2
        ctx.fillRect(right ? 8 : -2, 9 + swing / 2, 2, 4)
        ctx.fillStyle = 'rgba(245, 224, 220, 0.12)'
        ctx.fillRect(right ? 8 : -2, 12 + swing / 2, 2, 2)
      }

      // Shoes
      ctx.fillStyle = 'rgba(166, 129, 89, 0.12)'
      if (marioIsJumping) {
        ctx.fillRect(1, 16, 3, 2)
        ctx.fillRect(6, 16, 3, 2)
      } else {
        const walkState = Math.floor(marioWalkFrame / 6) % 2 === 0
        if (walkState) {
          ctx.fillRect(1, 16, 3, 2)
          ctx.fillRect(6, 16, 3, 2)
        } else {
          ctx.fillRect(2, 16, 3, 2)
          ctx.fillRect(5, 16, 3, 2)
        }
      }

      ctx.restore()

      // Particles
      for (const p of particles) {
        ctx.fillStyle = `rgba(249, 226, 175, ${p.alpha * 0.15})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
        ctx.fill()
      }

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
