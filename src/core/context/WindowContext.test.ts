import { describe, it, expect, beforeEach } from 'vitest'
import { windowReducer, getInitialState } from './WindowContext'

describe('windowReducer', () => {
  let state: ReturnType<typeof getInitialState>

  beforeEach(() => {
    state = getInitialState()
  })

  it('opens a window', () => {
    const next = windowReducer(state, {
      type: 'OPEN',
      payload: { id: 'about', title: 'About Me', app: 'about', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } },
    })
    expect(next.windows).toHaveLength(1)
    expect(next.windows[0].id).toBe('about')
    expect(next.windows[0].isOpen).toBe(true)
    expect(next.activeWindowId).toBe('about')
  })

  it('focuses existing window instead of duplicating on OPEN', () => {
    state = windowReducer(state, {
      type: 'OPEN',
      payload: { id: 'about', title: 'About Me', app: 'about', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } },
    })
    const next = windowReducer(state, {
      type: 'OPEN',
      payload: { id: 'about', title: 'About Me', app: 'about', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } },
    })
    expect(next.windows).toHaveLength(1)
  })

  it('closes a window', () => {
    state = windowReducer(state, {
      type: 'OPEN',
      payload: { id: 'test', title: 'Test', app: 'test', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } },
    })
    const next = windowReducer(state, { type: 'CLOSE', payload: { id: 'test' } })
    expect(next.windows).toHaveLength(0)
    expect(next.activeWindowId).toBeNull()
  })

  it('increments zIndex on focus', () => {
    state = windowReducer(state, {
      type: 'OPEN',
      payload: { id: 'win1', title: 'Win 1', app: 'test', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } },
    })
    const z1 = state.windows[0].zIndex
    const next = windowReducer(state, { type: 'FOCUS', payload: { id: 'win1' } })
    expect(next.windows[0].zIndex).toBeGreaterThan(z1)
  })

  it('toggles minimize', () => {
    state = windowReducer(state, {
      type: 'OPEN',
      payload: { id: 'win1', title: 'Win 1', app: 'test', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } },
    })
    const next = windowReducer(state, { type: 'TOGGLE_MINIMIZE', payload: { id: 'win1' } })
    expect(next.windows[0].isMinimized).toBe(true)
  })
})
