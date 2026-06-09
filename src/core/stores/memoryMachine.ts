import { setup, assign } from 'xstate'

export interface MemoryCard {
  id: string
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export interface MemoryContext {
  cards: MemoryCard[]
  flippedIds: string[]
  matches: number
  moves: number
  gridSize: number
}

export type MemoryEvent =
  | { type: 'INIT'; cards: MemoryCard[] }
  | { type: 'FLIP'; cardId: string }
  | { type: 'RESET' }

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function createMemoryCards(emojis: string[]): MemoryCard[] {
  const pairs = emojis.flatMap((emoji, i) => [
    { id: `card-${i}-a`, emoji, isFlipped: false, isMatched: false },
    { id: `card-${i}-b`, emoji, isFlipped: false, isMatched: false },
  ])
  return shuffleArray(pairs)
}

export const memoryMachine = setup({
  types: {
    context: {} as MemoryContext,
    events: {} as MemoryEvent,
  },
  guards: {
    isMatch: ({ context }) => {
      if (context.flippedIds.length !== 2) return false
      const [first, second] = context.flippedIds.map(
        (id) => context.cards.find((c) => c.id === id)!,
      )
      return first.emoji === second.emoji
    },
    isGameWon: ({ context }) => {
      return context.matches === context.cards.length / 2
    },
  },
  actions: {
    flipCard: assign(({ context, event }) => {
      if (event.type !== 'FLIP') return {}
      const idx = context.cards.findIndex((c) => c.id === event.cardId)
      if (idx === -1) return {}
      const updated = [...context.cards]
      updated[idx] = { ...updated[idx], isFlipped: true }
      return {
        cards: updated,
        flippedIds: [...context.flippedIds, event.cardId],
      }
    }),
    markMatch: assign(({ context }) => {
      const updated = context.cards.map((c) =>
        context.flippedIds.includes(c.id) ? { ...c, isMatched: true } : c,
      )
      return {
        cards: updated,
        flippedIds: [],
        matches: context.matches + 1,
        moves: context.moves + 1,
      }
    }),
    unflipCards: assign(({ context }) => {
      const updated = context.cards.map((c) =>
        context.flippedIds.includes(c.id) ? { ...c, isFlipped: false } : c,
      )
      return {
        cards: updated,
        flippedIds: [],
        moves: context.moves + 1,
      }
    }),
    resetGame: assign(({ context }) => {
      const reshuffled = shuffleArray(
        context.cards.map((c) => ({ ...c, isFlipped: false, isMatched: false })),
      )
      return {
        cards: reshuffled,
        flippedIds: [],
        matches: 0,
        moves: 0,
      }
    }),
  },
}).createMachine({
  id: 'memory',
  initial: 'idle',
  context: {
    cards: [],
    flippedIds: [],
    matches: 0,
    moves: 0,
    gridSize: 4,
  },
  states: {
    idle: {
      on: {
        INIT: {
          target: 'playing',
          actions: assign(({ event }) => ({
            cards: event.cards,
            gridSize: Math.round(Math.sqrt(event.cards.length)),
          })),
        },
      },
    },
    playing: {
      on: {
        FLIP: {
          target: 'checking',
          actions: 'flipCard',
          guard: ({ context, event }) => {
            if (event.type !== 'FLIP') return false
            const card = context.cards.find((c) => c.id === event.cardId)
            return !!card && !card.isFlipped && !card.isMatched && context.flippedIds.length < 2
          },
        },
        RESET: {
          target: 'playing',
          actions: 'resetGame',
        },
      },
    },
    checking: {
      always: [
        {
          guard: 'isGameWon',
          target: 'won',
          actions: 'markMatch',
        },
        {
          guard: 'isMatch',
          target: 'playing',
          actions: 'markMatch',
        },
        {
          target: 'playing',
          actions: 'unflipCards',
        },
      ],
    },
    won: {
      type: 'final',
      on: {
        RESET: {
          target: 'playing',
          actions: 'resetGame',
        },
      },
    },
  },
})
