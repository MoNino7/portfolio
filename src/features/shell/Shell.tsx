import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Taskbar } from '../taskbar/Taskbar'
import { DesktopGrid, DesktopIcon } from '../desktop/Desktop'
import { Window } from '../window-manager/Window'
import { useWindowManager } from '../../core/context/WindowContext'
import { DialogBox } from '../visual-novel/DialogBox'
import { introDialogNodes } from '../visual-novel/introStory'
import { MemoryGame } from '../memory-game/MemoryGame'
import { PacManWallpaper } from './PacManWallpaper'
import { AboutWindow } from '../desktop/AboutWindow'
import { SkillsWindow } from '../desktop/SkillsWindow'
import { ProjectsWindow } from '../desktop/ProjectsWindow'
import { ContactWindow } from '../desktop/ContactWindow'

function Shell() {
  const { t } = useTranslation()
  const { openWindow, state } = useWindowManager()
  const { windows } = state
  const [showIntro, setShowIntro] = useState(() => {
    return !localStorage.getItem('introSeen')
  })

  const icons: Array<{ id: string; labelKey: string; icon: string; app: string }> = [
    { id: 'about', labelKey: 'desktop.about', icon: '\u{1F464}', app: 'about' },
    { id: 'projects', labelKey: 'desktop.projects', icon: '\u{1F4BB}', app: 'projects' },
    { id: 'skills', labelKey: 'desktop.skills', icon: '\u{2699}\uFE0F', app: 'skills' },
    { id: 'contact', labelKey: 'desktop.contact', icon: '\u{2709}\uFE0F', app: 'contact' },
    { id: 'memory', labelKey: 'desktop.memory', icon: '\u{1F3AE}', app: 'memory' },
  ]

  const getDefaultSize = (app: string) => {
    switch (app) {
      case 'skills':
        return { width: 900, height: 600 }
      case 'projects':
        return { width: 750, height: 500 }
      case 'memory':
        return { width: 620, height: 620 }
      case 'about':
        return { width: 700, height: 560 }
      default:
        return { width: 600, height: 400 }
    }
  }

  const handleIconClick = (id: string, label: string, icon: string, app: string) => {
    openWindow({
      id,
      title: label,
      icon,
      app,
      position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
      size: getDefaultSize(app),
    })
  }

  const handleIntroComplete = () => {
    localStorage.setItem('introSeen', 'true')
    setShowIntro(false)
  }

  return (
    <div className="flex h-full w-full flex-col">
      <PacManWallpaper />
      <div className="flex flex-1 flex-col overflow-hidden">
        {showIntro && (
          <div
            className="intro-overlay absolute inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(17, 17, 27, 0.92)' }}
          >
            <div className="w-full max-w-lg px-4">
              <DialogBox
                nodes={introDialogNodes}
                startNodeId="greeting"
                characterName="System"
                onComplete={handleIntroComplete}
              />
            </div>
          </div>
        )}
        <DesktopGrid>
          {icons.map((ic) => (
            <DesktopIcon
              key={ic.id}
              label={t(ic.labelKey)}
              icon={ic.icon}
              onClick={() => handleIconClick(ic.id, t(ic.labelKey), ic.icon, ic.app)}
            />
          ))}
        </DesktopGrid>

        {windows.map((win) => (
          <Window key={win.id} win={win}>
            <AppContent app={win.app} />
          </Window>
        ))}
      </div>
      <Taskbar>
        {windows
          .filter((w) => w.isOpen)
          .map((w) => (
            <button
              key={w.id}
              type="button"
              className="taskbar__item flex cursor-pointer items-center gap-1 border px-2 text-xs transition-colors hover:opacity-80"
              style={{
                borderColor: '#45475a',
                backgroundColor: '#181825',
                color: '#cdd6f4',
                height: 32,
              }}
              onClick={() => {}}
            >
              <span aria-hidden="true">{w.icon}</span>
              <span className="truncate">{w.title}</span>
            </button>
          ))}
      </Taskbar>
    </div>
  )
}

function AppContent({ app }: { app: string }) {
  switch (app) {
    case 'about':
      return <AboutWindow />
    case 'skills':
      return <SkillsWindow />
    case 'projects':
      return <ProjectsWindow />
    case 'contact':
      return <ContactWindow />
    case 'memory':
      return <MemoryGame />
    default:
      return <p>Content coming soon...</p>
  }
}

export default Shell
