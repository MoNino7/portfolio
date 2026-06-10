import { useState } from 'react'

export function ContactWindow() {
  const [copied, setCopied] = useState(false)
  const email = 'mohamadnourhalak@gmail.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 p-4 max-w-2xl mx-auto">
      {/* LinkedIn Card */}
      <div
        className="flex-1 border p-6 text-center flex flex-col justify-between"
        style={{ borderColor: '#cba6f740', backgroundColor: '#181825', boxShadow: '4px 4px 0px 0px #11111b' }}
      >
        <div>
          <div className="mb-4 text-4xl" aria-hidden="true">
            🔗
          </div>
          <h3
            className="mb-2 text-base font-bold uppercase tracking-wider"
            style={{ color: '#cba6f7', fontFamily: "'Silkscreen', sans-serif" }}
          >
            LinkedIn
          </h3>
          <p className="text-sm mb-4 text-[#bac2de]">
            Vernetze dich mit mir auf LinkedIn für berufliche Anfragen.
          </p>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/mohamad-nour-hallak-483299275/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-2 text-xs transition-all hover:bg-[#cba6f730] font-mono border"
            style={{
              backgroundColor: '#cba6f715',
              color: '#cba6f7',
              borderColor: '#cba6f740',
            }}
          >
            linkedin.com/in/mohamad-nour-hallak
          </a>
        </div>
      </div>

      {/* Email Card */}
      <div
        className="flex-1 border p-6 text-center flex flex-col justify-between"
        style={{ borderColor: '#a6e3a140', backgroundColor: '#181825', boxShadow: '4px 4px 0px 0px #11111b' }}
      >
        <div>
          <div className="mb-4 text-4xl" aria-hidden="true">
            ✉️
          </div>
          <h3
            className="mb-2 text-base font-bold uppercase tracking-wider"
            style={{ color: '#a6e3a1', fontFamily: "'Silkscreen', sans-serif" }}
          >
            E-Mail
          </h3>
          <p className="text-sm mb-4 text-[#bac2de]">
            Schreibe mir direkt eine E-Mail für Feedback oder Kooperationen.
          </p>
        </div>
        <div className="space-y-2">
          <a
            href={`mailto:${email}`}
            className="inline-block w-full py-2 text-xs transition-all hover:bg-[#a6e3a130] font-mono border truncate"
            style={{
              backgroundColor: '#a6e3a115',
              color: '#a6e3a1',
              borderColor: '#a6e3a140',
            }}
          >
            {email}
          </a>
          <button
            onClick={handleCopy}
            className="w-full py-1 text-xs cursor-pointer transition-all hover:bg-zinc-800 font-mono border border-zinc-700 text-[#a6e3a1]"
            style={{ backgroundColor: '#11111b' }}
          >
            {copied ? '✅ Kopiert!' : '📋 Adresse kopieren'}
          </button>
        </div>
      </div>
    </div>
  )
}
