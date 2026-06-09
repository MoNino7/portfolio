import { createContext, useContext, useCallback, useState, type ReactNode } from 'react'
import { getAudioContext, playTone, playMultiTone } from '../utils/synth'

export type SfxEvent =
  | 'windowOpen'
  | 'windowClose'
  | 'dialogAdvance'
  | 'cardFlip'
  | 'matchFound'
  | 'gameWin'

interface SoundContextValue {
  isMuted: boolean
  setMuted: (muted: boolean) => void
  play: (event: SfxEvent) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const sfxMap: Record<SfxEvent, () => void> = {
  windowOpen: () => {
    playTone(440, 0.12, 'sine', 0.02)
  },
  windowClose: () => {
    playTone(350, 0.1, 'sine', 0.015)
  },
  dialogAdvance: () => {
    playTone(220, 0.04, 'sine', 0.01)
  },
  cardFlip: () => {
    playTone(660, 0.03, 'sine', 0.008)
  },
  matchFound: () => {
    playMultiTone(
      [
        { freq: 523, time: 0, duration: 0.15 },
        { freq: 659, time: 0.12, duration: 0.2 },
      ],
      'sine',
      0.025,
    )
  },
  gameWin: () => {
    playMultiTone(
      [
        { freq: 523, time: 0, duration: 0.15 },
        { freq: 659, time: 0.15, duration: 0.15 },
        { freq: 784, time: 0.3, duration: 0.15 },
        { freq: 1047, time: 0.45, duration: 0.3 },
      ],
      'sine',
      0.02,
    )
  },
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setMuted] = useState(false)

  const play = useCallback(
    (event: SfxEvent) => {
      if (isMuted) return
      getAudioContext()
      sfxMap[event]()
    },
    [isMuted],
  )

  return (
    <SoundContext.Provider value={{ isMuted, setMuted, play }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundContext() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSoundContext must be used within SoundProvider')
  return ctx
}
