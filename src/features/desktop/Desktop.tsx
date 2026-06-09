import { useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useRovingTabindex } from '../../core/hooks/useRovingTabindex'

interface DesktopIconProps {
  label: string
  icon: string
  onClick: () => void
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <div
      role="gridcell"
      aria-label={label}
      tabIndex={-1}
      className="roving-item desktop-icon flex w-28 cursor-pointer flex-col items-center gap-1 rounded-none border-2 border-transparent p-3 text-center transition-colors hover:bg-white/10 focus-visible:border-[#f5c2e7]"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <span className="desktop-icon__icon text-5xl leading-none" aria-hidden="true">
        {icon}
      </span>
      <span
        className="desktop-icon__label text-[10px] leading-tight text-white drop-shadow-lg"
        style={{ fontFamily: "'VT323', monospace", fontSize: 16 }}
      >
        {label}
      </span>
    </div>
  )
}

export function DesktopGrid({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLDivElement>(null)
  useRovingTabindex(gridRef, true)

  return (
    <div
      ref={gridRef}
      role="grid"
      aria-label={t('a11y.desktop')}
      className="desktop-grid flex flex-wrap content-start gap-6 p-4 max-md:flex-nowrap max-md:overflow-x-auto"
      style={{ width: '100%' }}
    >
      {children}
    </div>
  )
}
