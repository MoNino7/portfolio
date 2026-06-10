import { createDialogNode, type DialogNode } from '../../core/stores/dialogMachine'

export const introDialogNodes: DialogNode[] = [
  createDialogNode('greeting', 'Initialisiere Profil... Mohamad Nour Hallak.', {
    speaker: 'System',
    onComplete: 'intro_1',
  }),
  createDialogNode('intro_1', 'TH Köln — Technische Informatik. Regelstudienzeit verkürzt. Bachelorabschluss steht kurz bevor.', {
    speaker: 'System',
    onComplete: 'intro_2',
  }),
  createDialogNode('intro_2', 'Du Intressierst dich für mein Portfolio. Cool. Hier ein paar Fakten über mich.', {
    speaker: 'System',
    onComplete: 'intro_3',
  }),
  createDialogNode('intro_3', 'Ich bin -_- Jahre Alt und..', {
    speaker: 'System',
    onComplete: 'intro_4',
  }),
  createDialogNode('intro_4', 'Ach Klicke dich im Desktop rum. Da ist viel Interessantes für dich.', {
    speaker: 'System',
    onComplete: 'intro_5',
  }),
  createDialogNode('intro_complete', 'Desktop freigegeben. Viel Erfolg.', {
    speaker: 'System',
  }),
]
