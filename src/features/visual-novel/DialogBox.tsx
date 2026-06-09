import { useCallback, useEffect, useRef, useState } from 'react'
import { useMachine } from '@xstate/react'
import { useTranslation } from 'react-i18next'
import { dialogMachine, type DialogNode, type DialogOption } from '../../core/stores/dialogMachine'
import { useSoundContext } from '../../core/context/SoundContext'

interface DialogBoxProps {
  nodes: DialogNode[]
  startNodeId: string
  characterName?: string
  onComplete?: () => void
}

export function DialogBox({ nodes, startNodeId, characterName = '', onComplete }: DialogBoxProps) {
  const { t } = useTranslation()
  const { play } = useSoundContext()
  const nodesMap: Record<string, DialogNode> = {}
  for (const node of nodes) {
    nodesMap[node.id] = node
  }

  const [state, send] = useMachine(dialogMachine, {
    input: {
      nodes: nodesMap,
      characterName,
    },
  })

  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentText = state.context.currentNodeId
    ? nodesMap[state.context.currentNodeId]?.text ?? ''
    : ''

  const currentNode = state.context.currentNodeId
    ? nodesMap[state.context.currentNodeId]
    : null

  useEffect(() => {
    if (state.matches('displaying') && currentText) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        setDisplayedText(currentText)
        setIsTyping(false)
        return
      }
      setIsTyping(true)
      setDisplayedText('')
      let idx = 0
      intervalRef.current = setInterval(() => {
        idx++
        setDisplayedText(currentText.slice(0, idx))
        if (idx >= currentText.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setIsTyping(false)
        }
      }, 30)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [state.value, currentText, state.context.currentNodeId])

  const handleContinue = useCallback(() => {
    if (isTyping) {
      setDisplayedText(currentText)
      setIsTyping(false)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    send({ type: 'CONTINUE' })
    play('dialogAdvance')
  }, [isTyping, currentText, send, play])

  const handleSkip = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    send({ type: 'SKIP' })
  }, [send])

  useEffect(() => {
    if (state.matches('completed')) {
      onComplete?.()
    }
  }, [state.value, onComplete])

  useEffect(() => {
    send({ type: 'START', startNode: startNodeId })
  }, [])

  const handleOptionSelect = useCallback(
    (option: DialogOption) => {
      send({ type: 'SELECT_OPTION', optionId: option.id, nextNode: option.nextNode })
    },
    [send],
  )

  if (state.matches('idle') || state.matches('completed')) return null

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label={t('a11y.dialogInstruction')}
      className="dialog-box border-2 p-4 shadow-lg"
      style={{
        borderColor: '#cba6f7',
        backgroundColor: '#1e1e2e',
        minHeight: 160,
      }}
    >
      {currentNode?.speaker && (
        <p
          className="dialog-box__speaker mb-1 text-sm font-bold uppercase tracking-wide"
          style={{ color: '#f5c2e7', fontFamily: "'Press Start 2P', monospace", fontSize: 8 }}
        >
          {currentNode.speaker}
        </p>
      )}

      <p
        className="dialog-box__text mb-4 leading-relaxed"
        style={{ fontFamily: "'VT323', monospace", fontSize: 20, color: '#cdd6f4', minHeight: 60 }}
      >
        {displayedText}
        {isTyping && <span className="motion-reduce:animate-none" style={{ animation: isTyping ? 'pulse 1s infinite' : 'none' }}>_</span>}
      </p>

      {state.matches('awaiting_input') && currentNode?.options ? (
        <div className="dialog-box__options flex flex-col gap-2">
          {currentNode.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="dialog-box__option cursor-pointer border-2 px-3 py-2 text-left transition-colors hover:opacity-80"
              style={{
                borderColor: '#45475a',
                backgroundColor: '#181825',
                color: '#cdd6f4',
                fontFamily: "'VT323', monospace",
                fontSize: 18,
              }}
              onClick={() => handleOptionSelect(opt)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      ) : state.matches('displaying') && !isTyping ? (
        <button
          type="button"
          className="dialog-box__continue cursor-pointer border-2 px-4 py-1 transition-colors hover:opacity-80"
          style={{
            borderColor: '#a6e3a1',
            backgroundColor: '#a6e3a1',
            color: '#1e1e2e',
            fontFamily: "'VT323', monospace",
            fontSize: 18,
          }}
          onClick={handleContinue}
        >
          {t('dialog.continue')}
        </button>
      ) : null}
      {state.matches('displaying') && !isTyping && (
        <button
          type="button"
          className="dialog-box__skip mt-2 cursor-pointer border px-3 py-1 text-xs transition-colors hover:opacity-80"
          style={{
            borderColor: '#585b70',
            backgroundColor: 'transparent',
            color: '#585b70',
          }}
          onClick={handleSkip}
        >
          {t('dialog.skip')}
        </button>
      )}
    </div>
  )
}
