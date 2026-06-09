import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSoundContext } from '../../core/context/SoundContext'

export function Taskbar({ children }: { children?: ReactNode }) {
  const { t } = useTranslation()
  const { isMuted, setMuted } = useSoundContext()

  return (
    <div
      role="toolbar"
      aria-label={t('a11y.taskbar')}
      className="taskbar flex h-12 w-full items-center border-t-2 px-2"
      style={{
        backgroundColor: '#11111b',
        borderTopColor: '#313244',
        minHeight: 48,
      }}
    >
      <button
        type="button"
        className="taskbar__start flex cursor-pointer items-center gap-1 border-2 px-3 py-1 font-press-start text-[8px] uppercase tracking-wide transition-colors hover:opacity-80"
        style={{
          borderColor: '#cba6f7',
          backgroundColor: '#cba6f7',
          color: '#1e1e2e',
        }}
        onClick={() => {}}
      >
        <span aria-hidden="true" className="text-xs">&#x25CE;</span>
        Start
      </button>
      <div className="taskbar__items ml-2 flex flex-1 gap-1 overflow-x-auto">
        {children}
      </div>
      <button
        type="button"
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        className="taskbar__mute ml-2 flex cursor-pointer items-center border-2 px-2 py-1 text-sm transition-colors hover:opacity-80"
        style={{
          borderColor: '#45475a',
          backgroundColor: 'transparent',
          color: '#cdd6f4',
        }}
        onClick={() => setMuted(!isMuted)}
      >
        {isMuted ? '\u{1F507}' : '\u{1F509}'}
      </button>
    </div>
  )
}
