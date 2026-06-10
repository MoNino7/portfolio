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
  const positionRef = useRef(position)
  const sizeRef = useRef(size)
  const onResizeRef = useRef(onResize)
  const onMoveRef = useRef(onMove)

  positionRef.current = position
  sizeRef.current = size
  onResizeRef.current = onResize
  onMoveRef.current = onMove

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeRef.current) return
      const { startMouse, startPos, startSize, direction } = resizeRef.current
      const dx = e.clientX - startMouse.x
      const dy = e.clientY - startMouse.y
      const { width: minW, height: minH } = minSize

      let newWidth = startSize.width
      let newHeight = startSize.height
      let newX = startPos.x
      let newY = startPos.y

      if (direction.includes('e')) {
        newWidth = Math.max(minW, startSize.width + dx)
      }
      if (direction.includes('w')) {
        const potentialWidth = Math.max(minW, startSize.width - dx)
        const actualDx = startSize.width - potentialWidth
        newWidth = potentialWidth
        newX = startPos.x + actualDx
      }
      if (direction.includes('s')) {
        newHeight = Math.max(minH, startSize.height + dy)
      }
      if (direction.includes('n')) {
        const potentialHeight = Math.max(minH, startSize.height - dy)
        const actualDy = startSize.height - potentialHeight
        newHeight = potentialHeight
        newY = startPos.y + actualDy
      }

      onResizeRef.current({ width: newWidth, height: newHeight })
      if (newX !== positionRef.current.x || newY !== positionRef.current.y) {
        onMoveRef.current({ x: newX, y: newY })
      }
    },
    [minSize],
  )

  const handleMouseUp = useCallback(() => {
    resizeRef.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const onResizeStart = useCallback(
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      resizeRef.current = {
        startMouse: { x: e.clientX, y: e.clientY },
        startPos: { x: positionRef.current.x, y: positionRef.current.y },
        startSize: { width: sizeRef.current.width, height: sizeRef.current.height },
        direction,
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [],
  )

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return { onResizeStart }
}
