import { useCallback, useEffect, useRef } from 'react'

const ROVING_SELECTOR = '[role="gridcell"], [role="option"], .roving-item'

export function useRovingTabindex(containerRef: React.RefObject<HTMLDivElement | null>, enabled = true) {
  const currentIndexRef = useRef(0)

  const getItems = useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(containerRef.current.querySelectorAll<HTMLElement>(ROVING_SELECTOR))
      .filter((el) => el.offsetParent !== null)
  }, [containerRef])

  const updateTabindex = useCallback((items: HTMLElement[], focusIndex: number) => {
    items.forEach((item, i) => {
      item.setAttribute('tabindex', i === focusIndex ? '0' : '-1')
    })
  }, [])

  const focusItem = useCallback((index: number) => {
    const items = getItems()
    if (index < 0) index = 0
    if (index >= items.length) index = items.length - 1
    const item = items[index]
    if (item) {
      updateTabindex(items, index)
      currentIndexRef.current = index
      item.focus()
    }
  }, [getItems, updateTabindex])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const items = getItems()
      if (items.length === 0) return
      const firstItem = items[0]
      const itemWidth = firstItem?.offsetWidth ?? 112
      const gapPx = 24
      const colCount = Math.floor((containerRef.current?.clientWidth ?? 300) / (itemWidth + gapPx))

      const keyMap: Record<string, number> = {
        ArrowRight: 1,
        ArrowLeft: -1,
        ArrowDown: colCount,
        ArrowUp: -colCount,
        Home: -currentIndexRef.current,
        End: items.length - 1 - currentIndexRef.current,
      }

      const offset = keyMap[e.key]
      if (offset !== undefined) {
        e.preventDefault()
        const newIndex = Math.max(0, Math.min(items.length - 1, currentIndexRef.current + offset))
        focusItem(newIndex)
      }
    },
    [getItems, focusItem, containerRef],
  )

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const item = target.closest(ROVING_SELECTOR) as HTMLElement | null
      if (!item) return
      const items = getItems()
      const index = items.indexOf(item)
      if (index !== -1) {
        updateTabindex(items, index)
        currentIndexRef.current = index
      }
    },
    [getItems, updateTabindex],
  )

  useEffect(() => {
    if (!enabled || !containerRef.current) return
    const el = containerRef.current
    el.addEventListener('keydown', handleKeyDown)
    el.addEventListener('click', handleClick)

    const items = getItems()
    updateTabindex(items, currentIndexRef.current)

    return () => {
      el.removeEventListener('keydown', handleKeyDown)
      el.removeEventListener('click', handleClick)
    }
  }, [enabled, handleKeyDown, handleClick, getItems, updateTabindex, containerRef])

  return { focusItem, currentIndex: currentIndexRef }
}
