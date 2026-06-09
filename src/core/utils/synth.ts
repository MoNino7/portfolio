let sharedCtx: AudioContext | null = null

export function getAudioContext(): AudioContext {
  if (!sharedCtx) {
    sharedCtx = new AudioContext()
  }
  return sharedCtx
}

export function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.03,
  delay = 0,
) {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)

  gain.gain.setValueAtTime(0, ctx.currentTime + delay)
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.005)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime + delay)
  osc.stop(ctx.currentTime + delay + duration + 0.01)
}

export function playMultiTone(
  tones: Array<{ freq: number; time: number; duration: number }>,
  type: OscillatorType = 'sine',
  volume = 0.03,
) {
  for (const t of tones) {
    playTone(t.freq, t.duration, type, volume, t.time)
  }
}
