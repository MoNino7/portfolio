import { AppProvider } from './core/context/AppProvider'
import Shell from './features/shell/Shell'

function App() {
  return (
    <AppProvider>
      <div className="flex h-dvh w-dvw flex-col overflow-hidden">
        <Shell />
      </div>
    </AppProvider>
  )
}

export default App
