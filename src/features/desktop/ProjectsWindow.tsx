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
  challenge?: {
    problem: string
    value: string
  }
  solution?: {
    architecture: string
    flow?: string[]
  }
  highlights?: string[]
  bullets?: string[]
}

const projects: Project[] = [
  {
    id: 'pictoscout',
    title: 'PictoScout',
    company: 'Siemens Mobility',
    subtitle: 'KI-gestütztes Piktogramm-Management',
    description:
      'Ein KI-gestütztes Wissens- und Managementsystem für Schienenfahrzeug-Piktogramme. Die Anwendung löst fragmentierte Datensilos auf, ermöglicht eine sprachübergreifende semantische Suche und generiert Fertigungs- und Materialdokumente automatisiert.',
    tags: [
      'Python',
      'FastAPI',
      'Azure OpenAI GPT-4o',
      'LangChain',
      'ChromaDB',
      'Docker',
      'AWS EC2',
      'Streamlit',
      'NDA',
    ],
    color: '#f9e2af',
    icon: '🔍',
    isNDA: true,
    challenge: {
      problem:
        'Im Schienenfahrzeugbau waren Sicherheitspiktogramme über zwei getrennte Datensilos verteilt: CAD-Geometrie in unstrukturierten DWG-Dateien und zugehörige Metadaten in manuell gepflegten Excel-Listen. Es gab keine Verknüpfung, keine zentrale Suche und die Dokumentation war fehleranfällig.',
      value:
        'PictoScout zentralisiert alle Piktogramm-Daten, ermöglicht Ingenieuren eine sofortige Suche und generiert Montageanleitungen sowie Mengengerüste automatisiert – was den manuellen Aufwand pro Zugprojekt erheblich reduziert.',
    },
    solution: {
      architecture:
        'Containerisierter Microservice-Stack mit Docker: Ein Worker-Service konvertiert und klassifiziert CAD-Dateien automatisch per KI, ein FastAPI-Backend verwaltet die Vektordatenbank und Hybrid-Suche, und ein Streamlit-Frontend bietet Ingenieuren ein interaktives Warenkorb-System zur Dokumentengenerierung.',
      flow: [
        'CAD-Dateien & Metadaten-Kataloge einlesen',
        'Automatische Filterung & KI-Klassifizierung',
        'Vektorisierung & Indexierung in ChromaDB',
        'Semantische + lexikalische Hybrid-Suche',
        'Dokumentengenerierung (Word/Excel) per Warenkorb',
      ],
    },
    highlights: [
      'Hybrid-Search: Kombination aus Vektor- und Fuzzy-Suche für semantische Anfragen und exakte Teilenummern-Suche.',
      'Dynamisches Thresholding: Statistische Grenzwertberechnung statt starrer Schwellenwerte für präzisere Suchergebnisse.',
      'API-First Design: Saubere REST-Architektur, die zukünftige Integrationen (SAP, CAD-Tools) ohne Kernsystem-Änderung ermöglicht.',
      'Optimiertes Deployment: CPU-only Container-Optimierung für kosteneffizientes Cloud-Hosting.',
    ],
    bullets: [
      'Konzipiert eine KI-Pipeline, die CAD-Symbole automatisch klassifiziert und mit Metadaten verknüpft.',
      'Entwickelt einen Hybrid-Search-Algorithmus für sprachübergreifende semantische und exakte Suche.',
      'Automatisiert die Generierung von Montageanleitungen und Mengengerüsten über ein interaktives Frontend.',
      'Containerisiert und deployt die Anwendung ressourceneffizient auf AWS EC2.',
    ],
  },
  {
    id: 'ki-navigator',
    title: 'KI-Engineering-Navigator',
    company: 'Siemens Mobility',
    subtitle: 'Multimodaler RAG-Assistent',
    description:
      'Eine kontextsensitive KI-Assistenzplattform, die Dokumentensuche (RAG) mit Bildanalyse (GPT-4o Vision) kombiniert. Ingenieure erhalten maßgeschneiderte Antworten zu technischen Spezifikationen und können Screenshots direkt analysieren lassen.',
    tags: [
      'Python',
      'Streamlit',
      'LangChain',
      'Azure OpenAI GPT-4o',
      'GPT-4o Vision',
      'ChromaDB',
      'Docker',
      'NDA',
    ],
    color: '#89b4fa',
    icon: '🤖',
    isNDA: true,
    challenge: {
      problem:
        'Ingenieure arbeiten täglich mit einer großen Menge heterogener Dokumente (PDFs, CAD-Zeichnungen, Datenblätter) und müssen technische Informationen mühsam manuell suchen. Auch die Analyse von Screenshots (z. B. Fehlermeldungen) ist zeitaufwendig.',
      value:
        'Eine integrierte Plattform, die Text- und Bildanalyse vereint und Antworten passend zur Ingenieur-Rolle und Projektphase liefert – für schnelleren Wissenstransfer und kürzere Entwicklungszyklen.',
    },
    solution: {
      architecture:
        'Multimodale RAG-Pipeline mit rollenbasiertem Prompting: Das System passt sich dynamisch an die gewählte Persona und V-Modell-Phase an. Dokumente werden dedupliziert, eingebettet und über einen zweistufigen Hybrid-Retriever mit LLM-Re-Ranking durchsucht. Screenshots werden parallel per Vision-API analysiert.',
      flow: [
        'Frage eingeben + optionale Screenshots hochladen',
        'Parallele Bildanalyse via GPT-4o Vision',
        'Hybrid Retrieval mit LLM Re-Ranking',
        'Kontextfusion und Antwortgenerierung',
        'Streaming-Antwort mit Quellenreferenzen',
      ],
    },
    highlights: [
      'Hybrid RAG: Zweistufiger Retriever mit Self-Query- und Parent-Document-Ansatz, plus LLM-basiertes Re-Ranking.',
      'Multimodale Analyse: Parallele Screenshot-Verarbeitung via GPT-4o Vision für visuelle Kontexteinbindung.',
      'Rollen-Adaption: Dynamische System-Prompt-Anpassung an Ingenieur-Rolle und V-Modell-Entwicklungsphase.',
      'Clean Architecture: Modularer Aufbau mit Performance-Profiling und statischer Typisierung.',
    ],
    bullets: [
      'Konzipiert eine RAG-Pipeline mit Hybrid-Retriever und LLM-Re-Ranking für präzise Dokumentensuche.',
      'Integriert asynchrone Bildverarbeitung (GPT-4o Vision) für parallele Screenshot-Analyse.',
      'Entwickelt ein rollenbasiertes Web-Interface mit dynamischen Filtern für personalisierte Antworten.',
      'Optimiert die Datenaufbereitung durch Deduplizierung und Batch-Einbettung in ChromaDB.',
    ],
  },
  {
    id: 'siemens-thesis',
    title: 'Bachelorarbeit',
    company: 'Siemens Mobility',
    subtitle: 'Abschlussarbeit',
    description:
      'Thema: "Konzeption und prototypische Umsetzung einer modularen KI-gestützten Architektur für Automated Mechanical Design in CAD-nahen Konstruktionsprozessen". Entwicklung eines modularen Demonstrators (Azure OpenAI, RAG, Langflow) zur regelbasierten Optimierung von Baugruppen auf Basis von CAD-Daten aus PTC Creo.',
    tags: ['RAG', 'LLMs', 'Langflow', 'Python', 'Docker', 'NDA'],
    color: '#cba6f7',
    icon: '📝',
    isNDA: true,
  },
  {
    id: 'gamifygrids',
    title: 'GamifyGrids',
    company: 'Universitätsprojekt',
    subtitle: 'Smart Grid Gamification',
    description:
      'Ein interaktives Gamification-System für Stromnetze, aufgebaut als Full-Stack Monorepo. Das System bindet externe wissenschaftliche Simulationsdienste für Lastfluss-Berechnung und Netztopologien ein.',
    tags: ['Python', 'FastAPI', 'Uvicorn', 'Docker Compose', 'HTML/CSS/JS'],
    color: '#89dceb',
    icon: '⚡',
    isNDA: false,
    github: 'https://github.com/MoNino7/uni-syp-gamifygrids',
    challenge: {
      problem:
        'Stromnetze sind komplex und abstrakt. Es fehlte eine interaktive Plattform, die Lastfluss-Simulation spielerisch erfahrbar macht und dabei reale Berechnungsdienste einbindet.',
      value:
        'Durch Gamification wird das Verständnis für Energienetze gefördert und die Integration externer Microservices in einem modernen Full-Stack-Setup demonstriert.',
    },
    solution: {
      architecture:
        'Full-Stack Monorepo mit FastAPI-Backend als REST-Schnittstelle zu externen wissenschaftlichen Services. Containerisiert via Docker Compose für einfaches Deployment.',
      flow: [
        'Benutzer interagiert mit Web-Frontend',
        'REST-Anfragen an FastAPI-Backend',
        'Backend delegiert an Simulationsdienste',
        'Ergebnisse werden aufbereitet und visualisiert',
      ],
    },
    highlights: [
      'API-Integration: Anbindung externer Simulationsdienste für Echtzeit-Lastfluss-Berechnung.',
      'Docker Compose: Multi-Container-Setup für reproduzierbare Entwicklungsumgebungen.',
      'RESTful Architektur: Saubere Trennung von Frontend und Backend mit FastAPI.',
    ],
    bullets: [
      'Konzipiert ein Gamification-System für Stromnetze mit Anbindung externer Simulationsdienste.',
      'Implementiert ein FastAPI-Backend als REST-Schnittstelle zwischen Frontend und Microservices.',
      'Containerisiert die Anwendung via Docker Compose für reproduzierbares Deployment.',
    ],
  },
  {
    id: 'plant-biomass',
    title: 'Plant Biomass Pipeline',
    company: 'Universitätsprojekt',
    subtitle: 'MLOps & Deep Learning',
    description:
      'Eine automatisierte End-to-End ML-Pipeline zur Vorhersage von Pflanzenbiomasse aus Kamerabildern. Orchestriert mit Dagster und überwacht mit MLflow für vollständige Reproduzierbarkeit.',
    tags: ['PyTorch', 'Python', 'Dagster', 'MLflow', 'ResNet18', 'SQLite'],
    color: '#a6e3a1',
    icon: '🌱',
    isNDA: false,
    github: 'https://github.com/MoNino7/uni-mlo-mlops-lab-p2',
    challenge: {
      problem:
        'Die Vorhersage von Pflanzenbiomasse aus Bilddaten erfordert eine reproduzierbare, automatisierte Pipeline – ohne manuelle Eingriffe zwischen den einzelnen ML-Phasen.',
      value:
        'Ein vollständiger MLOps-Workflow, der Best Practices wie Pipeline-Orchestrierung, Experiment-Tracking und automatisierte Evaluierung demonstriert.',
    },
    solution: {
      architecture:
        'End-to-End Pipeline mit Dagster für die Orchestrierung aller Phasen. MLflow trackt Hyperparameter und Metriken. ResNet18 dient als vortrainiertes CNN-Backbone.',
      flow: [
        'Datenextraktion aus Bilddatenquellen',
        'Vorverarbeitung & Augmentierung',
        'CNN-Training (ResNet18) mit Tracking',
        'Automatisierte Evaluation & Metrik-Logging',
      ],
    },
    highlights: [
      'Dagster-Orchestrierung: Deklarative Pipeline mit klar definierten Dependencies zwischen ML-Phasen.',
      'MLflow Tracking: Kontinuierliches Logging von Hyperparametern und Evaluationsmetriken.',
      'Transfer Learning: Vortrainiertes ResNet18 für effizientes Training auf begrenzten Datensätzen.',
    ],
    bullets: [
      'Konzipiert eine End-to-End ML-Pipeline mit Dagster-Orchestrierung.',
      'Implementiert Transfer Learning (ResNet18) für Biomasse-Vorhersage mit PyTorch.',
      'Integriert MLflow für Experiment-Tracking und reproduzierbare Modellvergleiche.',
    ],
  },
]


type DetailTab = 'overview' | 'challenge' | 'solution' | 'highlights'

export function ProjectsWindow() {
  const [selectedId, setSelectedId] = useState('pictoscout')
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')

  const selectedProj = projects.find((p) => p.id === selectedId) || projects[0]

  const handleSelectProject = (id: string) => {
    setSelectedId(id)
    setActiveTab('overview')
  }

  const hasTabs =
    !!selectedProj.challenge || !!selectedProj.solution || !!selectedProj.highlights

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
              onClick={() => handleSelectProject(proj.id)}
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
      <div className="flex-1 bg-[#181825] flex flex-col overflow-hidden">
        {/* Detail Tabs */}
        {hasTabs && (
          <div className="flex border-b border-zinc-800 font-mono text-[10px] select-none shrink-0 overflow-x-auto">
            <TabButton
              label="📁 Übersicht"
              isActive={activeTab === 'overview'}
              color={selectedProj.color}
              onClick={() => setActiveTab('overview')}
            />
            {selectedProj.challenge && (
              <TabButton
                label="🎯 Challenge"
                isActive={activeTab === 'challenge'}
                color={selectedProj.color}
                onClick={() => setActiveTab('challenge')}
              />
            )}
            {selectedProj.solution && (
              <TabButton
                label="⚙️ Lösung"
                isActive={activeTab === 'solution'}
                color={selectedProj.color}
                onClick={() => setActiveTab('solution')}
              />
            )}
            {selectedProj.highlights && (
              <TabButton
                label="⚡ Highlights"
                isActive={activeTab === 'highlights'}
                color={selectedProj.color}
                onClick={() => setActiveTab('highlights')}
              />
            )}
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'overview' && (
            <OverviewTab project={selectedProj} />
          )}
          {activeTab === 'challenge' && selectedProj.challenge && (
            <ChallengeTab project={selectedProj} />
          )}
          {activeTab === 'solution' && selectedProj.solution && (
            <SolutionTab project={selectedProj} />
          )}
          {activeTab === 'highlights' && selectedProj.highlights && (
            <HighlightsTab project={selectedProj} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Tab Button ─── */
function TabButton({
  label,
  isActive,
  color,
  onClick,
}: {
  label: string
  isActive: boolean
  color: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 border-t-2 border-x -mb-[1px] transition-all cursor-pointer whitespace-nowrap"
      style={{
        backgroundColor: isActive ? '#181825' : 'transparent',
        borderTopColor: isActive ? color : 'transparent',
        borderLeftColor: isActive ? '#313244' : 'transparent',
        borderRightColor: isActive ? '#313244' : 'transparent',
        color: isActive ? color : '#6c7086',
        fontWeight: isActive ? 700 : 400,
      }}
    >
      [ {label} ]
    </button>
  )
}

/* ─── Overview Tab ─── */
function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between h-full gap-4">
      <div>
        {/* Header badges */}
        <div className="flex items-center gap-2 mb-3">
          {project.isNDA ? (
            <span className="px-2 py-0.5 text-[9px] bg-red-950/40 border border-red-500/40 text-red-400 uppercase tracking-widest font-bold rounded-sm">
              🔒 NDA geschützt
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[9px] bg-green-950/40 border border-green-500/40 text-green-400 uppercase tracking-widest font-bold rounded-sm">
              🟢 Öffentlich
            </span>
          )}
          <span className="text-xs text-zinc-500">{project.company}</span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold font-silkscreen mb-1"
          style={{ color: project.color }}
        >
          {project.title}
        </h3>
        <p className="text-xs text-zinc-400 mb-4">{project.subtitle}</p>

        {/* Description block */}
        <div
          className="border p-4 rounded-sm mb-4"
          style={{
            borderColor: project.isNDA ? 'rgba(235,160,172,0.3)' : '#313244',
            backgroundColor: project.isNDA ? 'rgba(9,9,11,0.6)' : 'rgba(9,9,11,0.3)',
            backgroundImage: project.isNDA
              ? 'repeating-linear-gradient(45deg, rgba(235,160,172,0.03) 0px, rgba(235,160,172,0.03) 8px, transparent 8px, transparent 16px)'
              : 'none',
          }}
        >
          {project.isNDA && (
            <div className="text-[9px] text-[#eba0ac] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
              Sicherheitsfreigabe Stufe 3 Erforderlich
            </div>
          )}
          <p className="text-xs text-[#bac2de] leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Footer: tags + links */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5 mb-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs border rounded-sm"
              style={{
                backgroundColor: project.color + '15',
                color: project.color,
                borderColor: project.color + '35',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-zinc-800/80 border border-zinc-700 hover:bg-zinc-700 text-[#cdd6f4] font-bold text-xs uppercase tracking-wider cursor-pointer transition-all rounded-sm flex items-center justify-center gap-2 text-center no-underline"
          >
            <span>🐙</span> GitHub Repository öffnen
          </a>
        )}

        {project.isNDA && (
          <div className="text-[10px] text-zinc-500 border-t border-zinc-800/60 pt-3">
            *Hinweis: Quellcode und spezifische Systemdetails unterliegen
            Geheimhaltungsvereinbarungen.
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Challenge Tab ─── */
function ChallengeTab({ project }: { project: Project }) {
  if (!project.challenge) return null
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <h3
          className="text-base font-bold font-silkscreen"
          style={{ color: project.color }}
        >
          🎯 The Challenge
        </h3>
      </div>

      {/* Problem Card */}
      <div className="border border-red-500/20 bg-red-950/10 rounded-sm p-4">
        <div className="text-[9px] text-red-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <span className="text-red-500">▸</span> Das Problem
        </div>
        <p className="text-xs text-[#bac2de] leading-relaxed">
          {project.challenge.problem}
        </p>
      </div>

      {/* Value Card */}
      <div
        className="border rounded-sm p-4"
        style={{
          borderColor: project.color + '30',
          backgroundColor: project.color + '08',
        }}
      >
        <div
          className="text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"
          style={{ color: project.color }}
        >
          <span>▸</span> Der Mehrwert
        </div>
        <p className="text-xs text-[#bac2de] leading-relaxed">
          {project.challenge.value}
        </p>
      </div>
    </div>
  )
}

/* ─── Solution Tab ─── */
function SolutionTab({ project }: { project: Project }) {
  if (!project.solution) return null
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <h3
          className="text-base font-bold font-silkscreen"
          style={{ color: project.color }}
        >
          ⚙️ Die Lösung
        </h3>
      </div>

      {/* Architecture */}
      <div className="border border-zinc-800 bg-zinc-950/40 rounded-sm p-4">
        <div
          className="text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"
          style={{ color: project.color }}
        >
          <span>▸</span> Architektur & Features
        </div>
        <p className="text-xs text-[#bac2de] leading-relaxed">
          {project.solution.architecture}
        </p>
      </div>

      {/* Data Flow */}
      {project.solution.flow && project.solution.flow.length > 0 && (
        <div className="border border-zinc-800 bg-[#11111b] rounded-sm p-4">
          <div
            className="text-[9px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"
            style={{ color: project.color }}
          >
            <span>▸</span> Datenfluss
          </div>
          <div className="space-y-0">
            {project.solution.flow.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold shrink-0"
                    style={{
                      borderColor: project.color + '60',
                      color: project.color,
                      backgroundColor: project.color + '15',
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < project.solution!.flow!.length - 1 && (
                    <div
                      className="w-0.5 h-4"
                      style={{ backgroundColor: project.color + '25' }}
                    ></div>
                  )}
                </div>
                <p className="text-xs text-[#bac2de] leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Highlights Tab ─── */
function HighlightsTab({ project }: { project: Project }) {
  if (!project.highlights) return null
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <h3
          className="text-base font-bold font-silkscreen"
          style={{ color: project.color }}
        >
          ⚡ Technische Highlights
        </h3>
      </div>

      {/* Highlights */}
      <div className="space-y-2.5">
        {project.highlights.map((highlight, i) => {
          const [title, ...rest] = highlight.split(': ')
          const body = rest.join(': ')
          return (
            <div
              key={i}
              className="border border-zinc-800 bg-zinc-950/40 rounded-sm p-3"
            >
              <div className="flex items-start gap-2">
                <span
                  className="text-[10px] mt-0.5 shrink-0"
                  style={{ color: project.color }}
                >
                  ✦
                </span>
                <div>
                  <span
                    className="text-xs font-bold"
                    style={{ color: project.color }}
                  >
                    {title}
                  </span>
                  {body && (
                    <span className="text-xs text-[#bac2de]">: {body}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Portfolio Bullets */}
      {project.bullets && project.bullets.length > 0 && (
        <div
          className="border rounded-sm p-4 mt-2"
          style={{
            borderColor: project.color + '25',
            backgroundColor: project.color + '06',
          }}
        >
          <div
            className="text-[9px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"
            style={{ color: project.color }}
          >
            <span>▸</span> Portfolio Summary
          </div>
          <div className="space-y-2">
            {project.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="text-[10px] mt-0.5 shrink-0"
                  style={{ color: project.color }}
                >
                  ▶
                </span>
                <p className="text-xs text-[#bac2de] leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
