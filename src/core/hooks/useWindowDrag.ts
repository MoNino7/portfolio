import { useCallback, useRef, useEffect } from 'react'
import type { Position } from '../../types'

interface DragOptions {
  initialPosition: Position
  size: { width: number; height: number }
  onMove: (position: Position) => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function useWindowDrag({ initialPosition, size, onMove, onDragStart, onDragEnd }: DragOptions) {
  const dragRef = useRef<{ startMouse: Position; startPos: Position } | null>(null)
  const onMoveRef = useRef(onMove)
  const sizeRef = useRef(size)
  const onDragStartRef = useRef(onDragStart)
  const onDragEndRef = useRef(onDragEnd)
  const initialPositionRef = useRef(initialPosition)

  onMoveRef.current = onMove
  sizeRef.current = size
  onDragStartRef.current = onDragStart
  onDragEndRef.current = onDragEnd
  initialPositionRef.current = initialPosition

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current) return
      const dx = e.clientX - dragRef.current.startMouse.x
      const dy = e.clientY - dragRef.current.startMouse.y
      const { width, height } = sizeRef.current
      const newX = Math.max(0, Math.min(window.innerWidth - width, dragRef.current.startPos.x + dx))
      const newY = Math.max(0, Math.min(window.innerHeight - height, dragRef.current.startPos.y + dy))
      onMoveRef.current({ x: newX, y: newY })
    },
    [],
  )

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current) return
    dragRef.current = null
    onDragEndRef.current?.()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const onDragStartHandler = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onDragStartRef.current?.()
      dragRef.current = {
        startMouse: { x: e.clientX, y: e.clientY },
        startPos: { ...initialPositionRef.current },
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

  return { onDragStart: onDragStartHandler, isDragging: dragRef.current !== null }
}
