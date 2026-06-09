import { useCallback, useRef, useEffect } from 'react'
import type { Position, Size } from '../../types'

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

interface ResizeOptions {
  position: Position
  size: Size
  minSize: Size
  onResize: (size: Size) => void
  onMove: (position: Position) => void
}

export function useWindowResize({ position, size, minSize, onResize, onMove }: ResizeOptions) {
  const resizeRef = useRef<{
    startMouse: Position
    startPos: Position
    startSize: Size
    direction: ResizeDirection
  } | null>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeRef.current) return
      const { startMouse, startPos, startSize, direction } = resizeRef.current
      const dx = e.clientX - startMouse.x
      const dy = e.clientY - startMouse.y

      let newWidth = startSize.width
      let newHeight = startSize.height
      let newX = startPos.x
      let newY = startPos.y

      if (direction.includes('e')) {
        newWidth = Math.max(minSize.width, startSize.width + dx)
      }
      if (direction.includes('w')) {
        const potentialWidth = Math.max(minSize.width, startSize.width - dx)
        const actualDx = startSize.width - potentialWidth
        newWidth = potentialWidth
        newX = startPos.x + actualDx
      }
      if (direction.includes('s')) {
        newHeight = Math.max(minSize.height, startSize.height + dy)
      }
      if (direction.includes('n')) {
        const potentialHeight = Math.max(minSize.height, startSize.height - dy)
        const actualDy = startSize.height - potentialHeight
        newHeight = potentialHeight
        newY = startPos.y + actualDy
      }

      onResize({ width: newWidth, height: newHeight })
      if (newX !== position.x || newY !== position.y) {
        onMove({ x: newX, y: newY })
      }
    },
    [minSize, onMove, onResize, position],
  )

  const handleMouseUp = useCallback(() => {
    resizeRef.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseMove])

  const onResizeStart = useCallback(
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      resizeRef.current = {
        startMouse: { x: e.clientX, y: e.clientY },
        startPos: { x: position.x, y: position.y },
        startSize: { width: size.width, height: size.height },
        direction,
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [handleMouseMove, handleMouseUp, position, size],
  )

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return { onResizeStart }
}
