// Web Audio API synthesized supercar soundscape (no external asset dependencies)
class SupercarAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private revOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public playEngineRev() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // 1. Starter click & starter motor crank
      const starterNoise = this.ctx.createBufferSource();
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }
      starterNoise.buffer = buffer;

      const starterFilter = this.ctx.createBiquadFilter();
      starterFilter.type = "bandpass";
      starterFilter.frequency.value = 180;
      starterNoise.connect(starterFilter);
      starterFilter.connect(this.ctx.destination);
      starterNoise.start(now);

      // 2. V6 Twin Turbo Combustion Ignition & Roar
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sawtooth";
      subOsc.type = "triangle";

      // Pitch rev ramp (Idle 60Hz -> Rev 240Hz -> Settle 90Hz)
      osc.frequency.setValueAtTime(55, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.8);
      osc.frequency.exponentialRampToValueAtTime(95, now + 2.0);

      subOsc.frequency.setValueAtTime(28, now + 0.2);
      subOsc.frequency.exponentialRampToValueAtTime(160, now + 0.8);
      subOsc.frequency.exponentialRampToValueAtTime(48, now + 2.0);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(450, now + 2.0);

      // Gain envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + 0.2);
      subOsc.start(now + 0.2);

      osc.stop(now + 2.4);
      subOsc.stop(now + 2.4);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playClick() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }
}

export const soundFx = new SupercarAudio();
