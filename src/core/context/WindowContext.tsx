import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react'
import type { WindowState, WindowAction, WindowManagerState, Position, Size } from '../../types'

const initialState: WindowManagerState = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
}

function windowReducer(state: WindowManagerState, action: WindowAction): WindowManagerState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows.find(w => w.id === action.payload.id)
      if (existing) {
        return windowReducer(state, { type: 'FOCUS', payload: { id: action.payload.id } })
      }
      const newWindow: WindowState = {
        ...action.payload,
        zIndex: action.payload.zIndex ?? state.nextZIndex,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
      }
      return {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      }
    }
    case 'CLOSE':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload.id),
        activeWindowId: state.activeWindowId === action.payload.id
          ? null
          : state.activeWindowId,
      }
    case 'FOCUS': {
      const idx = state.windows.findIndex(w => w.id === action.payload.id)
      if (idx === -1) return state
      const updated = [...state.windows]
      updated[idx] = { ...updated[idx], zIndex: state.nextZIndex, isMinimized: false }
      return {
        ...state,
        windows: updated,
        activeWindowId: action.payload.id,
        nextZIndex: state.nextZIndex + 1,
      }
    }
    case 'TOGGLE_MINIMIZE': {
      const idx = state.windows.findIndex(w => w.id === action.payload.id)
      if (idx === -1) return state
      const updated = [...state.windows]
      updated[idx] = { ...updated[idx], isMinimized: !updated[idx].isMinimized }
      const newActive = updated[idx].isMinimized
        ? state.windows.filter(w => w.id !== action.payload.id && w.isOpen && !w.isMinimized)
            .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
        : action.payload.id
      return { ...state, windows: updated, activeWindowId: newActive }
    }
    case 'TOGGLE_MAXIMIZE': {
      const idx = state.windows.findIndex(w => w.id === action.payload.id)
      if (idx === -1) return state
      const updated = [...state.windows]
      updated[idx] = { ...updated[idx], isMaximized: !updated[idx].isMaximized }
      return { ...state, windows: updated }
    }
    case 'MOVE': {
      const idx = state.windows.findIndex(w => w.id === action.payload.id)
      if (idx === -1) return state
      const updated = [...state.windows]
      updated[idx] = { ...updated[idx], position: action.payload.position }
      return { ...state, windows: updated }
    }
    case 'RESIZE': {
      const idx = state.windows.findIndex(w => w.id === action.payload.id)
      if (idx === -1) return state
      const updated = [...state.windows]
      updated[idx] = { ...updated[idx], size: action.payload.size }
      return { ...state, windows: updated }
    }
    default:
      return state
  }
}

interface WindowContextValue {
  state: WindowManagerState
  openWindow: (win: Omit<WindowState, 'zIndex' | 'isOpen' | 'isMinimized' | 'isMaximized'> & { zIndex?: number }) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  moveWindow: (id: string, position: Position) => void
  resizeWindow: (id: string, size: Size) => void
}

const WindowContext = createContext<WindowContextValue | null>(null)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialState)

  const openWindow = useCallback(
    (win: Parameters<WindowContextValue['openWindow']>[0]) => {
      dispatch({ type: 'OPEN', payload: win })
    },
    [],
  )

  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE', payload: { id } }), [])
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS', payload: { id } }), [])
  const toggleMinimize = useCallback((id: string) => dispatch({ type: 'TOGGLE_MINIMIZE', payload: { id } }), [])
  const toggleMaximize = useCallback((id: string) => dispatch({ type: 'TOGGLE_MAXIMIZE', payload: { id } }), [])
  const moveWindow = useCallback((id: string, position: Position) => dispatch({ type: 'MOVE', payload: { id, position } }), [])
  const resizeWindow = useCallback((id: string, size: Size) => dispatch({ type: 'RESIZE', payload: { id, size } }), [])

  return (
    <WindowContext.Provider
      value={{ state, openWindow, closeWindow, focusWindow, toggleMinimize, toggleMaximize, moveWindow, resizeWindow }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindowManager() {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindowManager must be used within WindowProvider')
  return ctx
}

/** Exported for testing */
export { windowReducer }
export function getInitialState(): WindowManagerState {
  return { windows: [], activeWindowId: null, nextZIndex: 1 }
}
