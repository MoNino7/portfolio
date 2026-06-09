import { setup, assign } from 'xstate'

export interface DialogOption {
  id: string
  text: string
  nextNode: string
}

export interface DialogNode {
  id: string
  speaker?: string
  text: string
  options?: DialogOption[]
  onComplete?: string
}

export interface DialogContext {
  currentNodeId: string | null
  history: string[]
  nodes: Record<string, DialogNode>
  characterName: string
}

export interface DialogInput {
  nodes: Record<string, DialogNode>
  characterName: string
}

export type DialogEvent =
  | { type: 'START'; startNode: string }
  | { type: 'CONTINUE' }
  | { type: 'SELECT_OPTION'; optionId: string; nextNode: string }
  | { type: 'SKIP' }
  | { type: 'COMPLETE' }

function getNode(context: DialogContext) {
  return context.currentNodeId ? context.nodes[context.currentNodeId] : null
}

export const dialogMachine = setup({
  types: {
    context: {} as DialogContext,
    events: {} as DialogEvent,
    input: {} as DialogInput,
  },
  guards: {
    hasOptions: ({ context }) => {
      const node = getNode(context)
      return !!node?.options && node.options.length > 0
    },
    hasNextNode: ({ context }) => {
      const node = getNode(context)
      return !!node?.onComplete
    },
  },
  actions: {
    loadStartNode: assign(({ context, event }) => {
      if (event.type !== 'START') return {}
      return {
        currentNodeId: event.startNode,
        history: [...context.history, event.startNode],
      }
    }),
    advanceNode: assign(({ context }) => {
      const node = getNode(context)
      if (!node?.onComplete) return {}
      return {
        currentNodeId: node.onComplete,
        history: [...context.history, node.onComplete],
      }
    }),
    selectOption: assign(({ context, event }) => {
      if (event.type !== 'SELECT_OPTION') return {}
      return {
        currentNodeId: event.nextNode,
        history: [...context.history, event.nextNode],
      }
    }),
    markCompleted: assign(() => ({
      currentNodeId: '__completed__',
    })),
  },
}).createMachine({
  id: 'dialog',
  initial: 'idle',
  context: ({ input }) => ({
    currentNodeId: null,
    history: [],
    nodes: input.nodes,
    characterName: input.characterName,
  }),
  states: {
    idle: {
      on: {
        START: {
          target: 'displaying',
          actions: 'loadStartNode',
        },
      },
    },
    displaying: {
      on: {
        CONTINUE: [
          {
            guard: 'hasOptions',
            target: 'awaiting_input',
          },
          {
            guard: 'hasNextNode',
            target: 'displaying',
            actions: 'advanceNode',
          },
          {
            target: 'completed',
            actions: 'markCompleted',
          },
        ],
        SKIP: {
          target: 'completed',
          actions: 'markCompleted',
        },
      },
    },
    awaiting_input: {
      on: {
        SELECT_OPTION: {
          target: 'displaying',
          actions: 'selectOption',
        },
      },
    },
    completed: {
      type: 'final',
    },
  },
})

export function createDialogNode(id: string, text: string, overrides?: Partial<DialogNode>): DialogNode {
  return { id, text, ...overrides }
}
