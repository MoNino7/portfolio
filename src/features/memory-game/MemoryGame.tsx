import { useEffect, useRef } from 'react'
import { useMachine } from '@xstate/react'
import { useTranslation } from 'react-i18next'
import {
  memoryMachine,
  createMemoryCards,
  type MemoryCard,
} from '../../core/stores/memoryMachine'
import { useFocusTrap } from '../../core/hooks/useFocusTrap'
import { useSoundContext } from '../../core/context/SoundContext'

const EMOJIS = ['🚀', '💻', '⚛️', '🎮', '🕹️', '👾', '🖥️', '📡']

export function MemoryGame() {
  const { t } = useTranslation()
  const { play } = useSoundContext()
  const [state, send] = useMachine(memoryMachine)
  const gridRef = useRef<HTMLDivElement>(null)
  const focusTrapRef = useFocusTrap(true)

  useEffect(() => {
    send({ type: 'INIT', cards: createMemoryCards(EMOJIS) })
  }, [])

  const handleFlip = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched) return
    play('cardFlip')
    send({ type: 'FLIP', cardId: card.id })
  }

  const handleReset = () => {
    send({ type: 'RESET' })
    send({ type: 'INIT', cards: createMemoryCards(EMOJIS) })
  }

  const isGameOver = state.matches('won')

  useEffect(() => {
    if (state.context.matches > 0 && !state.matches('checking') && !state.matches('won')) {
      play('matchFound')
    }
  }, [state.context.matches])

  useEffect(() => {
    if (state.matches('won')) {
      play('gameWin')
    }
  }, [state.value])

  return (
    <div ref={focusTrapRef} tabIndex={-1} className="memory-game">
      <div className="memory-game__header mb-3 flex items-center justify-between">
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10 }}>
          {t('desktop.memory')}
        </span>
        <span style={{ fontFamily: "'VT323', monospace", fontSize: 18 }}>
          {t('desktop.memory')}: {state.context.moves}
        </span>
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-label="Memory card grid"
        className="memory-game__grid mx-auto grid max-w-md gap-2"
        style={{ gridTemplateColumns: `repeat(${state.context.gridSize}, 1fr)` }}
      >
        {state.context.cards.map((card) => (
          <button
            key={card.id}
            type="button"
            role="gridcell"
            aria-label={card.isFlipped || card.isMatched ? card.emoji : 'Hidden card'}
            disabled={card.isMatched}
            className={`memory-game__card flex aspect-square cursor-pointer items-center justify-center border-2 text-3xl transition-all duration-200 motion-reduce:duration-0 ${
              card.isMatched ? 'opacity-40' : ''
            }`}
            style={{
              borderColor: card.isFlipped || card.isMatched ? '#a6e3a1' : '#45475a',
              backgroundColor: card.isFlipped || card.isMatched ? '#1e1e2e' : '#313244',
              fontFamily: "'Press Start 2P', monospace",
            }}
            onClick={() => handleFlip(card)}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </button>
        ))}
      </div>

      {isGameOver && (
        <div className="memory-game__win mt-4 text-center">
          <p
            className="mb-2 text-lg"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: '#a6e3a1' }}
          >
            You matched all pairs in {state.context.moves} moves!
          </p>
          <button
            type="button"
            className="cursor-pointer border-2 px-4 py-2 transition-colors hover:opacity-80"
            style={{
              borderColor: '#f5c2e7',
              backgroundColor: '#f5c2e7',
              color: '#1e1e2e',
              fontFamily: "'VT323', monospace",
              fontSize: 18,
            }}
            onClick={handleReset}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
