import { useState } from 'react'

interface Project {
  id: string
  title: string
  company: string
  subtitle: string
  description: string
  tags: string[]
  color: string
  icon: string
  isNDA: boolean
  github?: string
}

const projects: Project[] = [
  {
    id: 'gamifygrids',
    title: 'GamifyGrids',
    company: 'Universitätsprojekt',
    subtitle: 'Smart Grid Gamification',
    description:
      'Ein interaktives Gamification-System für Stromnetze, aufgebaut als Backend & Frontend Monorepo. Das System interagiert direkt mit externen wissenschaftlichen Services zur Lastfluss-Simulation (PQSim) und zur Bereitstellung von Netztopologien (GridHub). Die Konfigurationen werden dynamisch über Docker-Umgebungen und REST-Endpunkte verwaltet. Zeigt Erfahrung in API-Integration, Docker-Containerisierung, RESTful Backend-Entwicklung und Web-Grundlagen.',
    tags: ['Python', 'FastAPI', 'Uvicorn', 'Docker Compose', 'HTML/CSS/JS'],
    color: '#89dceb',
    icon: '⚡',
    isNDA: false,
    github: 'https://github.com/MoNino7/uni-syp-gamifygrids',
  },
  {
    id: 'plant-biomass',
    title: 'Plant Biomass Pipeline',
    company: 'Universitätsprojekt',
    subtitle: 'MLOps & Deep Learning',
    description:
      'Eine automatisierte End-to-End Machine Learning Pipeline zur Vorhersage von Pflanzenbiomasse anhand von Kamerabildern. Die Pipeline nutzt Dagster für die Orchestrierung der einzelnen Phasen (Datenextraktion, Vorverarbeitung, Training und Evaluation) und MLflow für das kontinuierliche Experiment-Tracking (Hyperparameter, Trainingsverluste und Performanz-Metriken). Zeigt Erfahrung in Deep Learning (CNNs), Pipeline-Orchestrierung, Experiment-Tracking und MLOps-Workflows.',
    tags: ['PyTorch', 'Python', 'Dagster', 'MLflow', 'ResNet18', 'SQLite'],
    color: '#a6e3a1',
    icon: '🌱',
    isNDA: false,
    github: 'https://github.com/MoNino7/uni-mlo-mlops-lab-p2',
  },
  {
    id: 'siemens-thesis',
    title: 'Bachelorarbeit',
    company: 'Siemens Mobility',
    subtitle: 'Abschlussarbeit',
    description:
      'Thema: "Konzeption und prototypische Umsetzung einer modularen KI-gestützten Architektur für Automated Mechanical Design in CAD-nahen Konstruktionsprozessen". Entwicklung eines modularen Demonstrators (Azure OpenAI, RAG, Langflow) zur regelbasierten Optimierung von Baugruppen auf Basis von CAD-Daten aus PTC Creo.',
    tags: ['RAG', 'LLMs', 'Langflow', 'Python', 'Docker', 'NDA'],
    color: '#89b4fa',
    icon: '📝',
    isNDA: true,
  },

]

export function ProjectsWindow() {
  const [selectedId, setSelectedId] = useState('gamifygrids')

  const selectedProj = projects.find((p) => p.id === selectedId) || projects[0]

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[350px] border border-zinc-800 rounded-sm overflow-hidden select-none font-mono text-sm bg-[#11111b]">
      {/* Left Pane - File Explorer */}
      <div className="w-full md:w-[240px] border-b md:border-b-0 md:border-r border-zinc-800 bg-[#11111b] p-3 flex flex-col gap-1.5 overflow-y-auto">
        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
          📁 Projekte Explorer
        </div>
        {projects.map((proj) => {
          const isSelected = proj.id === selectedId
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedId(proj.id)}
              className={`w-full flex items-center gap-2.5 p-2 text-left cursor-pointer transition-all border ${isSelected
                ? 'bg-zinc-800/80 border-zinc-700 text-[#cdd6f4]'
                : 'bg-transparent border-transparent text-[#6c7086] hover:text-[#cdd6f4]'
                }`}
            >
              <span className="text-base select-none">{proj.icon}</span>
              <div className="truncate">
                <div className="font-bold text-xs">{proj.title}</div>
                <div className="text-[9px] opacity-70">{proj.company}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Right Pane - Detail Viewer */}
      <div className="flex-1 bg-[#181825] p-5 flex flex-col justify-between overflow-y-auto">
        {selectedProj.isNDA ? (
          /* NDA Protected View */
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[9px] bg-red-950/40 border border-red-500/40 text-red-400 uppercase tracking-widest font-bold rounded-sm">
                  🔒 NDA geschützt
                </span>
                <span className="text-xs text-zinc-500">{selectedProj.company}</span>
              </div>
              <h3
                className="text-lg font-bold font-silkscreen mb-1"
                style={{ color: selectedProj.color }}
              >
                {selectedProj.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-4">{selectedProj.subtitle}</p>

              {/* Retro NDA clearance block */}
              <div
                className="border border-[#eba0ac]/30 bg-zinc-950/60 p-4 rounded-sm mb-4"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(235,160,172,0.03) 0px, rgba(235,160,172,0.03) 8px, transparent 8px, transparent 16px)',
                }}
              >
                <div className="text-[9px] text-[#eba0ac] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                  Sicherheitsfreigabe Stufe 3 Erforderlich
                </div>
                <p className="text-xs text-[#bac2de] leading-relaxed">
                  {selectedProj.description}
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedProj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs border rounded-sm"
                    style={{
                      backgroundColor: selectedProj.color + '15',
                      color: selectedProj.color,
                      borderColor: selectedProj.color + '35',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-[10px] text-zinc-500 border-t border-zinc-800/60 pt-3">
                *Hinweis: Quellcode und spezifische Systemdetails unterliegen Geheimhaltungsvereinbarungen.
              </div>
            </div>
          </div>
        ) : (
          /* Public Project View */
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[9px] bg-green-950/40 border border-green-500/40 text-green-400 uppercase tracking-widest font-bold rounded-sm">
                  🟢 Öffentlich
                </span>
                <span className="text-xs text-zinc-500">{selectedProj.company}</span>
              </div>
              <h3
                className="text-lg font-bold font-silkscreen mb-1"
                style={{ color: selectedProj.color }}
              >
                {selectedProj.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-4">{selectedProj.subtitle}</p>

              <div className="border border-zinc-800 bg-zinc-950/30 p-4 rounded-sm mb-4">
                <p className="text-xs text-[#bac2de] leading-relaxed">
                  {selectedProj.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {selectedProj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs border rounded-sm"
                    style={{
                      backgroundColor: selectedProj.color + '15',
                      color: selectedProj.color,
                      borderColor: selectedProj.color + '35',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>


              {selectedProj.github && (
                <a
                  href={selectedProj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-zinc-800/80 border border-zinc-700 hover:bg-zinc-700 text-[#cdd6f4] font-bold text-xs uppercase tracking-wider cursor-pointer transition-all rounded-sm flex items-center justify-center gap-2 text-center no-underline"
                >
                  <span>🐙</span> GitHub Repository öffnen
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
