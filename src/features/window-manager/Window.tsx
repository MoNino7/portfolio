import { useCallback, useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowManager } from '../../core/context/WindowContext'
import { useWindowDrag } from '../../core/hooks/useWindowDrag'
import { useWindowResize } from '../../core/hooks/useWindowResize'
import { useFocusTrap } from '../../core/hooks/useFocusTrap'
import { useMediaQuery } from '../../core/hooks/useMediaQuery'
import { useSoundContext } from '../../core/context/SoundContext'
import type { WindowState } from '../../types'

const MIN_WIDTH = 300
const MIN_HEIGHT = 200

export function Window({ win, children }: { win: WindowState; children?: ReactNode }) {
  const { t } = useTranslation()
  const { focusWindow, closeWindow, toggleMinimize, toggleMaximize, moveWindow, resizeWindow } = useWindowManager()
  const { play } = useSoundContext()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const focusTrapRef = useFocusTrap(win.isOpen && !win.isMinimized)

  useEffect(() => {
    play('windowOpen')
  }, [])

  const handleClose = useCallback(() => {
    play('windowClose')
    closeWindow(win.id)
  }, [play, closeWindow, win.id])

  const drag = useWindowDrag({
    initialPosition: win.position,
    size: win.size,
    onMove: (pos) => moveWindow(win.id, pos),
    onDragStart: () => focusWindow(win.id),
  })

  const resize = useWindowResize({
    position: win.position,
    size: win.size,
    minSize: { width: MIN_WIDTH, height: MIN_HEIGHT },
    onResize: (s) => resizeWindow(win.id, s),
    onMove: (pos) => moveWindow(win.id, pos),
  })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return
    focusWindow(win.id)
  }, [focusWindow, win.id])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'F11') {
        e.preventDefault()
        toggleMaximize(win.id)
      }
    },
    [closeWindow, toggleMaximize, win.id],
  )

  if (win.isMinimized) return null

  const displayWidth = win.isMaximized || isMobile ? window.innerWidth : win.size.width
  const displayHeight = win.isMaximized || isMobile ? window.innerHeight - 48 : win.size.height
  const displayX = win.isMaximized || isMobile ? 0 : win.position.x
  const displayY = win.isMaximized || isMobile ? 0 : win.position.y

  return (
    <div
      ref={focusTrapRef}
      role="dialog"
      aria-labelledby={`window-title-${win.id}`}
      aria-modal={!win.isMaximized}
      tabIndex={-1}
      className="window absolute flex flex-col border-2 shadow-lg"
      style={{
        left: displayX,
        top: displayY,
        width: displayWidth,
        height: displayHeight,
        zIndex: win.zIndex,
        borderColor: '#cba6f7',
        backgroundColor: '#1e1e2e',
        boxShadow: '4px 4px 0 #11111b',
      }}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
    >
      {/* Title bar */}
      <div
        className="window__header flex cursor-grab items-center justify-between px-2 py-1 select-none max-md:cursor-default"
        style={{
          backgroundColor: '#cba6f7',
          color: '#1e1e2e',
          height: 28,
        }}
        onMouseDown={drag.onDragStart}
      >
        <span id={`window-title-${win.id}`} className="window__title font-press-start text-[8px] leading-none uppercase tracking-wide">
          {win.icon && <span className="mr-1" aria-hidden="true">{win.icon}</span>}
          {win.title}
        </span>

        <div className="window__actions flex gap-1">
          <button
            type="button"
            aria-label={t('window.minimize')}
            className="window__action-btn flex h-5 w-5 cursor-pointer items-center justify-center border-2 text-xs font-bold transition-colors hover:opacity-80"
            style={{ borderColor: '#1e1e2e', backgroundColor: '#f5c2e7', color: '#1e1e2e' }}
            onClick={() => toggleMinimize(win.id)}
          >
            _
          </button>
          <button
            type="button"
            aria-label={win.isMaximized ? t('window.restore') : t('window.maximize')}
            className="window__action-btn flex h-5 w-5 cursor-pointer items-center justify-center border-2 text-xs font-bold transition-colors hover:opacity-80"
            style={{ borderColor: '#1e1e2e', backgroundColor: '#a6e3a1', color: '#1e1e2e' }}
            onClick={() => toggleMaximize(win.id)}
          >
            {win.isMaximized ? '\u21F1' : '\u25A1'}
          </button>
          <button
            type="button"
            aria-label={t('window.close')}
            className="window__action-btn flex h-5 w-5 cursor-pointer items-center justify-center border-2 text-xs font-bold transition-colors hover:opacity-80"
            style={{ borderColor: '#1e1e2e', backgroundColor: '#f38ba8', color: '#1e1e2e' }}
            onClick={handleClose}
          >
            X
          </button>
        </div>
      </div>

      {/* Content area */}
      <div
        className="window__content flex-1 overflow-auto p-2"
        style={{ fontFamily: "'VT323', monospace", fontSize: 16 }}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!win.isMaximized && !isMobile && (
        <>
          <div
            className="window__resize-handle window__resize-handle--se absolute bottom-0 right-0 z-10 h-4 w-4 cursor-se-resize"
            style={{ borderRight: '3px solid #585b70', borderBottom: '3px solid #585b70' }}
            onMouseDown={resize.onResizeStart('se')}
          />
          <div
            className="window__resize-handle window__resize-handle--e absolute right-0 top-0 z-10 h-full w-2 cursor-e-resize"
            onMouseDown={resize.onResizeStart('e')}
          />
          <div
            className="window__resize-handle window__resize-handle--s absolute bottom-0 left-0 z-10 h-2 w-full cursor-s-resize"
            onMouseDown={resize.onResizeStart('s')}
          />
        </>
      )}
    </div>
  )
}
