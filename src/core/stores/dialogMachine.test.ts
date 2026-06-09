import { describe, it, expect } from 'vitest'
import { createDialogNode } from './dialogMachine'

describe('Dialog Machine', () => {
  describe('createDialogNode', () => {
    it('creates a node with id and text', () => {
      const node = createDialogNode('intro', 'Hello!')
      expect(node.id).toBe('intro')
      expect(node.text).toBe('Hello!')
    })

    it('accepts optional overrides', () => {
      const node = createDialogNode('choice', 'Pick one', {
        speaker: 'Narrator',
        options: [{ id: 'opt1', text: 'Option 1', nextNode: 'node1' }],
      })
      expect(node.speaker).toBe('Narrator')
      expect(node.options).toHaveLength(1)
    })

    it('creates a node with onComplete reference', () => {
      const node = createDialogNode('step1', 'Doing step 1', { onComplete: 'step2' })
      expect(node.onComplete).toBe('step2')
    })
  })
})
