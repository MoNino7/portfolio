import { useEffect, type ReactNode } from 'react'
import { WindowProvider } from './WindowContext'
import { SoundProvider } from './SoundContext'
import { getAudioContext } from '../utils/synth'
import '../../i18n/config'

export function AppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const resume = () => {
      const ctx = getAudioContext()
      if (ctx.state === 'suspended') ctx.resume()
    }
    document.addEventListener('click', resume, { once: true })
    document.addEventListener('keydown', resume, { once: true })
    return () => {
      document.removeEventListener('click', resume)
      document.removeEventListener('keydown', resume)
    }
  }, [])

  return (
    <SoundProvider>
      <WindowProvider>
        {children}
      </WindowProvider>
    </SoundProvider>
  )
}
