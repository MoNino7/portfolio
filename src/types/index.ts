export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface WindowState {
  id: string
  title: string
  position: Position
  size: Size
  zIndex: number
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  icon?: string
  app: string
}

export type WindowAction =
  | { type: 'OPEN'; payload: Omit<WindowState, 'zIndex' | 'isOpen' | 'isMinimized' | 'isMaximized'> & { zIndex?: number } }
  | { type: 'CLOSE'; payload: { id: string } }
  | { type: 'FOCUS'; payload: { id: string } }
  | { type: 'TOGGLE_MINIMIZE'; payload: { id: string } }
  | { type: 'TOGGLE_MAXIMIZE'; payload: { id: string } }
  | { type: 'MOVE'; payload: { id: string; position: Position } }
  | { type: 'RESIZE'; payload: { id: string; size: Size } }

export interface DesktopIcon {
  id: string
  label: string
  icon: string
  app: string
  position: number
}

export interface WindowManagerState {
  windows: WindowState[]
  activeWindowId: string | null
  nextZIndex: number
}
