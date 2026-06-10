import { useState, useEffect } from 'react'

interface SkillCategory {
  id: string
  title: string
  skills?: string[]
  color: string
  gridClass: string
}

const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'Data Science & AI/ML',
    skills: ['Hugging Face', 'RAG', 'LLMs', 'MLflow', 'DVC', 'Jupyter Notebook'],
    color: '#f38ba8',
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2',
  },
  {
    id: 'devops',
    title: 'DevOps & Monitoring',
    skills: ['Docker', 'Git', 'Prometheus', 'Grafana'],
    color: '#cba6f7',
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'networking',
    title: 'Netze & Virtualisierung',
    skills: ['CCNA', 'Packet Tracer', 'Virtualisierung'],
    color: '#89b4fa',
    gridClass: 'col-span-1',
  },
  {
    id: 'backend',
    title: 'Backend & API',
    skills: ['REST', 'PostgreSQL', 'JUnit', 'curl'],
    color: '#a6e3a1',
    gridClass: 'col-span-1',
  },

  {
    id: 'languages',
    title: 'Sprachen',
    skills: ['Java', 'Python'],
    color: '#89dceb',
    gridClass: 'col-span-1',
  },
  {
    id: 'management',
    title: 'Management & Tools',
    skills: ['Scrum', 'Confluence', 'MS Office'],
    color: '#f9e2af',
    gridClass: 'col-span-1',
  },
  {
    id: 'classified',
    title: 'Restricted / Classified',
    skills: ['Siemens Mobility (NDA)', 'REWE digital (NDA)'],
    color: '#eba0ac',
    gridClass: 'col-span-1',
  },
  {
    id: 'softskills',
    title: 'Soft Skills (RPG Stats)',
    color: '#fab387',
    gridClass: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
]

function SkillCard({ cat, children }: { cat: SkillCategory; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`border p-4 transition-all duration-300 relative ${cat.gridClass}`}
      style={{
        borderColor: isHovered ? cat.color : cat.color + '40',
        backgroundColor: '#181825',
        boxShadow: isHovered
          ? `0 0 12px ${cat.color}30, 4px 4px 0px 0px ${cat.color}60`
          : '4px 4px 0px 0px #11111b',
        transform: isHovered ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        className="mb-3 text-base font-bold uppercase tracking-wider flex items-center justify-between"
        style={{ color: cat.color, fontFamily: "'Silkscreen', sans-serif" }}
      >
        <span>{cat.title}</span>
        <span className="text-[10px] opacity-40 select-none">[{cat.id}]</span>
      </h3>
      {children}
    </div>
  )
}

function AITerminal() {
  const [logs, setLogs] = useState<string[]>([
    'Initializing RAG pipeline...',
    'Vector Database: CONNECTED (1420 embeddings)',
    'MLflow: Run "resplendent-fox" started',
  ])

  useEffect(() => {
    const logOptions = [
      'Loading Llama-3-8Bweights (4-bit quant)...',
      'Epoch 1/5 - loss: 0.842 - val_loss: 0.912',
      'Epoch 3/5 - loss: 0.354 - val_loss: 0.412',
      'Epoch 5/5 - loss: 0.121 - val_loss: 0.230',
      'Evaluating BLEU/ROUGE score... Done (0.84)',
      'Model pushed to Hugging Face Hub.',
      'DVC: data/raw_dataset.bin.dvc updated.',
      'Jupyter: In [12] -> run_eval() output processed.',
      'RAG: Retrieved context chunk #2 (similarity: 0.89)',
      'LLM: Response generated in 184ms.',
    ]

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextIndex = Math.floor(Math.random() * logOptions.length)
        const nextLog = logOptions[nextIndex]
        const updated = [...prev, nextLog]
        if (updated.length > 4) {
          return updated.slice(1)
        }
        return updated
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-3 border border-[#f38ba8]/30 bg-black/50 p-2 font-mono text-xs text-rose-400 rounded-sm">
      <div className="flex items-center justify-between border-b border-[#f38ba8]/20 pb-1 mb-1 text-[9px] text-rose-400/60 uppercase tracking-widest">
        <span>LOGS // training_loop.py</span>
        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping"></span>
      </div>
      <div className="space-y-1 min-h-[80px] text-[11px] leading-relaxed">
        {logs.map((log, i) => (
          <div key={i} className="truncate">
            <span className="text-rose-500/80 mr-1.5">&gt;</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

function DevOpsMonitor() {
  const [points, setPoints] = useState<number[]>([30, 45, 35, 60, 50, 40, 55, 65, 58, 70, 75, 60])

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        const last = prev[prev.length - 1]
        const change = (Math.random() - 0.5) * 25
        const nextVal = Math.max(15, Math.min(95, last + change))
        return [...prev.slice(1), Math.round(nextVal)]
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const svgWidth = 220
  const svgHeight = 50
  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * svgWidth
      const y = svgHeight - (p / 100) * svgHeight
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <div className="mt-3 border border-[#cba6f7]/30 bg-black/45 p-2 rounded-sm">
      <div className="mb-1 flex items-center justify-between text-[9px] text-[#cba6f7]/70 font-mono">
        <span>PROMETHEUS & GRAFANA MONITOR</span>
        <span>LOAD: {points[points.length - 1]}%</span>
      </div>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-[40px] overflow-visible">
        <line x1="0" y1="12.5" x2={svgWidth} y2="12.5" stroke="rgba(203, 166, 247, 0.1)" strokeDasharray="2" />
        <line x1="0" y1="25" x2={svgWidth} y2="25" stroke="rgba(203, 166, 247, 0.1)" strokeDasharray="2" />
        <line x1="0" y1="37.5" x2={svgWidth} y2="37.5" stroke="rgba(203, 166, 247, 0.1)" strokeDasharray="2" />

        <path
          d={`${pathData} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`}
          fill="rgba(203, 166, 247, 0.08)"
        />
        <path
          d={pathData}
          fill="none"
          stroke="#cba6f7"
          strokeWidth="1.5"
        />
        <circle
          cx={svgWidth}
          cy={svgHeight - (points[points.length - 1] / 100) * svgHeight}
          r="2.5"
          fill="#f5c2e7"
          className="animate-pulse"
        />
      </svg>
    </div>
  )
}

function NetworkPanel() {
  const [ports, setPorts] = useState([true, false, true, true, false, true])

  useEffect(() => {
    const interval = setInterval(() => {
      setPorts((prev) => prev.map(() => Math.random() > 0.35))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-3 border border-[#89b4fa]/30 bg-black/40 p-2 rounded-sm font-mono text-[9px]">
      <div className="mb-1.5 text-[#89b4fa]/70 uppercase tracking-wider">PACKET TRACER / LINK STATUS</div>
      <div className="flex gap-1.5 justify-around bg-zinc-900/80 p-1.5 rounded border border-zinc-800">
        {ports.map((active, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[7px] text-zinc-500">P0{i + 1}</span>
            <div className="w-5 h-4 bg-zinc-950 rounded-sm border border-zinc-700 relative flex items-end justify-center pb-0.5">
              <div className="w-2.5 h-1.5 bg-zinc-800 rounded-t-sm border-t border-zinc-600"></div>
              <span
                className={`absolute top-0.5 right-0.5 w-1 h-1 rounded-full transition-colors duration-100 ${
                  active ? 'bg-green-400 shadow-[0_0_3px_#4ade80]' : 'bg-green-950'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RPGStats() {
  return (
    <div className="font-mono text-xs text-[#fab387]/90 space-y-3 mt-1 select-none">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-[#fab387]/20 pb-2 mb-2">
        <div><span className="text-zinc-500">NAME:</span> Mohamad Nour H.</div>
        <div><span className="text-zinc-500">CLASS:</span> AI Dev & Tutor</div>
        <div><span className="text-zinc-500">HP:</span> <span className="text-[#a6e3a1]">100/100</span></div>
        <div><span className="text-zinc-500">MP:</span> <span className="text-[#89b4fa]">99/99</span></div>
      </div>

      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between mb-0.5 text-[11px]">
            <span>INT (Problem Solving)</span>
            <span className="text-[#fab387] font-bold">98/99</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 border border-zinc-800 p-[1px] rounded-sm">
            <div className="bg-[#fab387] h-full transition-all duration-500" style={{ width: '98%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-0.5 text-[11px]">
            <span>WIS (Tutor & Knowledge)</span>
            <span className="text-[#fab387] font-bold">92/99</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 border border-zinc-800 p-[1px] rounded-sm">
            <div className="bg-[#fab387] h-full transition-all duration-500" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-0.5 text-[11px]">
            <span>DEX (Adaptability)</span>
            <span className="text-[#fab387] font-bold">94/99</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 border border-zinc-800 p-[1px] rounded-sm">
            <div className="bg-[#fab387] h-full transition-all duration-500" style={{ width: '94%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-0.5 text-[11px]">
            <span>CHA (Teamwork / Comm.)</span>
            <span className="text-[#fab387] font-bold">88/99</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 border border-zinc-800 p-[1px] rounded-sm">
            <div className="bg-[#fab387] h-full transition-all duration-500" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-zinc-500 text-center italic mt-2 border-t border-[#fab387]/10 pt-1.5">
        *Passive Skill: Continuous Learning (+15% XP gain)
      </div>
    </div>
  )
}

function ClassifiedNDA() {
  return (
    <div
      className="relative p-3 bg-zinc-950/40 border border-[#eba0ac]/30 overflow-hidden flex flex-col justify-center items-center min-h-[140px] rounded-sm select-none"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(235, 160, 172, 0.05) 0px, rgba(235, 160, 172, 0.05) 8px, transparent 8px, transparent 16px)',
      }}
    >
      <div className="absolute top-1 left-2 right-2 flex justify-between text-[8px] text-[#eba0ac]/60 font-mono tracking-widest">
        <span>LVL_3_SECURE</span>
        <span>RESTRICTED</span>
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center mt-2">
        <span className="text-2xl animate-pulse filter drop-shadow-[0_0_5px_#eba0ac]">🔒</span>
        <div className="text-xs font-bold text-[#eba0ac] font-silkscreen uppercase tracking-wider">NDA Classified</div>
        <p className="text-[10px] text-zinc-500 max-w-[170px] leading-normal font-mono">
          Systeme & Daten bei Siemens Mobility & REWE digital geschützt.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center mt-2.5">
        <span className="px-1.5 py-0.5 text-[10px] border border-[#eba0ac]/30 bg-[#eba0ac]/10 text-[#eba0ac] font-mono rounded-sm">
          Siemens NDA
        </span>
        <span className="px-1.5 py-0.5 text-[10px] border border-[#eba0ac]/30 bg-[#eba0ac]/10 text-[#eba0ac] font-mono rounded-sm">
          REWE NDA
        </span>
      </div>
    </div>
  )
}

export function SkillsWindow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {skillCategories.map((cat) => {
        if (cat.id === 'softskills') {
          return (
            <SkillCard key={cat.id} cat={cat}>
              <RPGStats />
            </SkillCard>
          )
        }
        if (cat.id === 'classified') {
          return (
            <SkillCard key={cat.id} cat={cat}>
              <ClassifiedNDA />
            </SkillCard>
          )
        }
        return (
          <SkillCard key={cat.id} cat={cat}>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs transition-all duration-150 hover:scale-105 select-none cursor-default font-mono rounded-sm"
                  style={{
                    backgroundColor: cat.color + '15',
                    color: cat.color,
                    border: '1px solid ' + cat.color + '35',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            {cat.id === 'ai-ml' && <AITerminal />}
            {cat.id === 'devops' && <DevOpsMonitor />}
            {cat.id === 'networking' && <NetworkPanel />}
          </SkillCard>
        )
      })}
    </div>
  )
}
