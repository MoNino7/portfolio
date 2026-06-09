import { createDialogNode, type DialogNode } from '../../core/stores/dialogMachine'

export const introDialogNodes: DialogNode[] = [
  createDialogNode('greeting', 'Welcome, explorer...', {
    speaker: 'System',
    onComplete: 'intro_1',
  }),
  createDialogNode('intro_1', 'You have entered the Retro Portfolio — a digital realm where code meets pixel art.', {
    speaker: 'System',
    onComplete: 'intro_2',
  }),
  createDialogNode('intro_2', 'I am a Frontend Engineer who builds accessible, performant, and beautifully crafted web experiences.', {
    speaker: 'System',
    onComplete: 'intro_3',
  }),
  createDialogNode('intro_3', 'Feel free to explore the desktop. Open any icon to learn more about my skills, projects, and how to reach me.', {
    speaker: 'System',
    onComplete: 'intro_complete',
  }),
  createDialogNode('intro_complete', 'Enjoy your stay! 🎮', {
    speaker: 'System',
  }),
]
