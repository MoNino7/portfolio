import { useState, useRef, useEffect } from 'react'
import { PixelAvatar } from '../../components/atoms/PixelAvatar'

export function AboutWindow() {
  const [activeTab, setActiveTab] = useState<'bio' | 'experience' | 'education'>('bio')

  return (
    <div className="flex flex-col gap-6 p-4 h-full">
      {/* Header Profile Section */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start border-b border-zinc-800 pb-5">
        <PixelAvatar />
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold font-silkscreen text-[#a6e3a1]">
            Mohamad Nour Hallak
          </h2>
          <p className="text-sm font-mono text-[#89b4fa]">
            AI Solutions Engineer
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1.5">
            <span className="px-2 py-0.5 text-xs bg-[#cba6f7]/10 text-[#cba6f7] border border-[#cba6f7]/30 rounded-sm font-mono">
              Age: 21
            </span>
            <span className="px-2 py-0.5 text-xs bg-[#f9e2af]/10 text-[#f9e2af] border border-[#f9e2af]/30 rounded-sm font-mono">
              Cologne, Germany
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-800 font-mono text-sm select-none">
        <button
          onClick={() => setActiveTab('bio')}
          className={`px-4 py-2 border-t-2 border-x -mb-[1px] transition-all cursor-pointer ${activeTab === 'bio'
            ? 'bg-[#181825] border-[#a6e3a1] text-[#a6e3a1] font-bold'
            : 'bg-transparent border-transparent text-[#6c7086] hover:text-[#cdd6f4]'
            }`}
        >
          [ 👤 Bio ]
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-4 py-2 border-t-2 border-x -mb-[1px] transition-all cursor-pointer ${activeTab === 'experience'
            ? 'bg-[#181825] border-[#cba6f7] text-[#cba6f7] font-bold'
            : 'bg-transparent border-transparent text-[#6c7086] hover:text-[#cdd6f4]'
            }`}
        >
          [ 💼 Erfahrung ]
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 border-t-2 border-x -mb-[1px] transition-all cursor-pointer ${activeTab === 'education'
            ? 'bg-[#181825] border-[#89b4fa] text-[#89b4fa] font-bold'
            : 'bg-transparent border-transparent text-[#6c7086] hover:text-[#cdd6f4]'
            }`}
        >
          [ 🎓 Ausbildung ]
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 min-h-[160px] text-base leading-relaxed font-mono">
        {activeTab === 'bio' && (
          <div className="space-y-3 animate-fade-in">
            <p style={{ color: '#cdd6f4' }}>
              <span className="text-[#a6e3a1] font-bold">&gt; Whoami:</span> Ich bin 21 Jahre jung und bilde mich kontinuierlich weiter. Als begeisterter Tech-Enthusiast und AI-Fanatiker liebe ich es, moderne Lösungen zu entwickeln.
            </p>
            <p style={{ color: '#cdd6f4' }}>
              <span className="text-[#a6e3a1] font-bold">&gt; Hobbys:</span> In meiner Freizeit betreibe ich intensiv Calisthenics, lese bücher und interessiere mich für Autos.
            </p>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-4 animate-fade-in overflow-y-auto max-h-[160px] pr-1 scrollbar-thin">
            <div className="border-l-2 border-[#cba6f7] pl-3">
              <div className="flex justify-between text-sm font-bold text-[#cba6f7]">
                <span>Siemens Mobility — AI Solutions Engineer</span>
                <span>Werkstudent // R&D</span>
              </div>
              <p className="text-xs text-zinc-500 mb-1">Entwicklung von Agents- & LLM-Tools</p>
              <p className="text-sm text-[#bac2de]">
                Entwicklung von MVP-Prototypen für reallife usecases von mechanical engineers zur Effizienzsteigerung in Engineering-Prozessen (von Anforderungsanalyse bis Cloud-Hosting).
              </p>
            </div>

            <div className="border-l-2 border-[#cba6f7] pl-3">
              <div className="flex justify-between text-sm font-bold text-[#cba6f7]">
                <span>REWE digital — Business Analyst & Sys Admin</span>
                <span>Werkstudent</span>
              </div>
              <p className="text-xs text-zinc-500 mb-1">2nd & 3rd Level Support // Monitoring // Process Optimization</p>
              <p className="text-sm text-[#bac2de]">
                Zuständig für das Monitoring des ERP-Systems Hexagon, Prozessoptimierung und Bearbeitung komplexer Support-Tickets.
              </p>
            </div>

            <div className="border-l-2 border-[#cba6f7] pl-3">
              <div className="flex justify-between text-sm font-bold text-[#cba6f7]">
                <span>TH Köln — CCNA Labortutor</span>
                <span>Tutor für Netze & Protokolle</span>
              </div>
              <p className="text-xs text-zinc-500 mb-1">Netzwerke & Routing</p>
              <p className="text-sm text-[#bac2de]">
                Nach erfolgreichem Bestehen meiner CCNA-Zertifizierung helfe ich Studierenden im Labor bei den Cisco Certified Network Association Zertifizierungs.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4 animate-fade-in overflow-y-auto pr-1 scrollbar-thin max-h-[290px]">
            <div className="border-l-2 border-[#89b4fa] pl-3">
              <div className="flex justify-between text-sm font-bold text-[#89b4fa]">
                <span>TH Köln — Technische Informatik</span>
                <span>Abschluss: B.Sc. (i.A.)</span>
              </div>
              <p className="text-xs text-zinc-500 mb-1">Verkürzte Regelstudienzeit • Ø ~1,6</p>
              <p className="text-sm text-[#bac2de] mb-3">
                Die Regelstudienzeit wurde erfolgreich von 7 auf 6 Semester verkürzt. Der Bachelorabschluss steht unmittelbar bevor.
              </p>

              {/* Grade Highlights */}
              <div className="bg-[#11111b] border border-[#45475a] rounded-sm p-2 mb-2 font-mono">
                <p className="text-xs text-[#a6e3a1] mb-1.5 font-bold">
                  ┌─ 📊 Notenspiegel ───────────────────┐
                </p>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-xs">
                  <span className="text-[#f9e2af]">Datenbanken 1</span>
                  <span className="text-right text-[#a6e3a1]">1,0</span>
                  <span className="text-[#f9e2af]">Signalverarbeitung</span>
                  <span className="text-right text-[#a6e3a1]">1,0</span>
                  <span className="text-[#f9e2af]">Netze &amp; Protokolle</span>
                  <span className="text-right text-[#a6e3a1]">1,0</span>
                  <span className="text-[#f9e2af]">Netzsicherheit &amp; Automation</span>
                  <span className="text-right text-[#a6e3a1]">1,0</span>
                  <span className="text-[#f9e2af]">Software Management</span>
                  <span className="text-right text-[#a6e3a1]">1,0</span>
                  <span className="text-[#f9e2af]">Maschinelles Lernen</span>
                  <span className="text-right text-[#a6e3a1]">1,3</span>
                  <span className="text-[#f9e2af]">ML Operations</span>
                  <span className="text-right text-[#a6e3a1]">1,3</span>
                  <span className="text-[#f9e2af]">Formale Sprachen &amp; Automaten</span>
                  <span className="text-right text-[#a6e3a1]">1,3</span>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-[#45475a] flex justify-between text-xs">
                  <span className="text-[#6c7086]">Durchschnitt (gewichtet)</span>
                  <span className="text-[#a6e3a1] font-bold">~1,6</span>
                </div>
                <p className="text-xs text-[#6c7086] mt-0.5">
                  └────────────────────────────────────┘
                </p>
              </div>

              <a
                href="/notenspiegel.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#89b4fa]/10 text-[#89b4fa] border border-[#89b4fa]/30 rounded-sm hover:bg-[#89b4fa]/20 transition-colors cursor-pointer font-mono"
              >
                📜 Vollständigen Notenspiegel öffnen
              </a>
            </div>

            <div className="border-l-2 border-[#89b4fa] pl-3">
              <div className="flex justify-between text-sm font-bold text-[#89b4fa]">
                <span>Gymnasium der Stadt Kerpen</span>
                <span>Abschluss: Abitur</span>
              </div>
              <p className="text-xs text-zinc-500 mb-1">Abschlussjahr: 2023</p>
              <p className="text-sm text-[#bac2de]">
                Erfolgreicher Abschluss der allgemeinen Hochschulreife (Abitur).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Terminal Simulator */}
      <InteractiveTerminal />
    </div>
  )
}

function InteractiveTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ text: string; type: 'cmd' | 'resp' }>>([
    { text: 'Mohamad OS v1.0.4. Type "help" for commands.', type: 'resp' },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim()
      const cmd = trimmed.toLowerCase()
      const newHistory = [...history, { text: `$ ${trimmed}`, type: 'cmd' as const }]

      let response = ''
      if (cmd === 'help') {
        response = 'Commands: whoami, experience, education, notenspiegel, contact, clear, matrix'
      } else if (cmd === 'whoami') {
        response = 'Mohamad Nour Hallak - 21 J. alt, Technische Informatik an der TH Köln, AI Dev.'
      } else if (cmd === 'experience') {
        response = 'REWE digital (Business Analyst), Siemens Mobility (AI Developer), TH Köln (CCNA Tutor).'
      } else if (cmd === 'education') {
        response = 'TH Köln - B.Sc. Technische Informatik (Regelstudienzeit verkürzt auf 6 Semester) & Abitur am Gymnasium der Stadt Kerpen (2023).'
      } else if (cmd === 'notenspiegel') {
        response = '📊 Notenspiegel TH Köln: Ø ~1,6 | Topnoten (1,0): Datenbanken 1, Signalverarbeitung, Netze & Protokolle, Netzsicherheit & Automation, Software Management | PDF: /notenspiegel.pdf'
      } else if (cmd === 'contact') {
        response = 'E-Mail: mohamadnourhalak@gmail.com | LinkedIn: Mohamad Nour Hallak'
      } else if (cmd === 'clear') {
        setHistory([])
        setInput('')
        return
      } else if (cmd === 'matrix') {
        response = 'Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇'
      } else if (trimmed === '') {
        response = ''
      } else {
        response = `Command not found: "${trimmed}". Type "help".`
      }

      if (response) {
        setHistory([...newHistory, { text: response, type: 'resp' as const }])
      } else {
        setHistory(newHistory)
      }
      setInput('')
    }
  }

  return (
    <div
      onClick={handleTerminalClick}
      className="border border-[#45475a] p-3 text-xs font-mono rounded-sm cursor-text flex flex-col justify-between h-[120px] bg-[#11111b] overflow-hidden"
    >
      <div ref={containerRef} className="flex-1 overflow-auto space-y-1 scrollbar-none pr-1">
        {history.map((line, i) => (
          <div
            key={i}
            className={line.type === 'cmd' ? 'text-[#a6e3a1]' : 'text-[#6c7086]'}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 border-t border-zinc-800/40 pt-1 text-[#a6e3a1]">
        <span>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[#cdd6f4] p-0 font-mono text-xs focus:ring-0 focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <span className="blink select-none">█</span>
      </div>
    </div>
  )
}
