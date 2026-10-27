/**
 * Traditional Vietnamese Music Synthesis Engine using Web Audio API
 * Generates authentic pentatonic melodies with acoustic modeling of:
 * 1. Sáo Trúc (Vietnamese Bamboo Flute with breath noise & finger vibrato)
 * 2. Đàn Tranh (16-string Plucked Zither with crystalline harmonics & pitch bends)
 * 3. Đàn Bầu (Vietnamese Monochord with expressive lever glissando & vocal-like timbre)
 * 4. Trống Đồng Đông Sơn (Ancient Bronze Drum with deep fundamental & metallic resonance)
 * 5. Đại Hòa Tấu Cung Đình (Grand Heritage Ensemble uniting all instruments)
 */

export type TraditionalTrackId =
  | 'sao-truc'
  | 'dan-tranh'
  | 'dan-bau'
  | 'trong-dong'
  | 'hoa-tau';

export interface TraditionalTrackInfo {
  id: TraditionalTrackId;
  title: string;
  subtitle: string;
  instrument: string;
  scaleDescription: string;
  icon: 'flute' | 'zither' | 'monochord' | 'drum' | 'ensemble';
  tag: string;
}

export const TRADITIONAL_TRACKS: TraditionalTrackInfo[] = [
  {
    id: 'sao-truc',
    title: 'Sáo Trúc Kinh Bắc',
    subtitle: 'Lưu Thủy Thiền Định (Bắc Bộ)',
    instrument: 'Sáo Trúc (Bamboo Flute)',
    scaleDescription: 'Điệu Bắc thanh thoát • Âm hưởng sông Cầu Quan họ',
    icon: 'flute',
    tag: 'Thanh Tao'
  },
  {
    id: 'dan-tranh',
    title: 'Đàn Tranh Cố Đô',
    subtitle: 'Nam Bình Hoài Cảm (Huế)',
    instrument: 'Đàn Tranh (16-String Zither)',
    scaleDescription: 'Điệu Nam Bình sâu lắng • Ngón nhấn nhá quý phái',
    icon: 'zither',
    tag: 'Đài Các'
  },
  {
    id: 'dan-bau',
    title: 'Đàn Bầu Độc Tấu',
    subtitle: 'Lục Bát Tình Quê (Độc Huyền Cầm)',
    instrument: 'Đàn Bầu (Vietnamese Monochord)',
    scaleDescription: 'Ngân nga luyến láy • Uốn cần nốt ngọc đẫm hồn dân tộc',
    icon: 'monochord',
    tag: 'Da Diết'
  },
  {
    id: 'trong-dong',
    title: 'Trống Đồng Đông Sơn',
    subtitle: 'Hào Khí Lạc Hồng (Ngàn Năm Âm Vang)',
    instrument: 'Trống Đồng (Ancient Bronze Drum)',
    scaleDescription: 'Âm vang đồng thau trầm hùng • Hào khí dựng nước Văn Lang',
    icon: 'drum',
    tag: 'Trầm Hùng'
  },
  {
    id: 'hoa-tau',
    title: 'Đại Hòa Tấu Cung Đình',
    subtitle: 'Trống Đồng • Đàn Bầu • Đàn Tranh • Sáo Trúc',
    instrument: 'Tứ Tấu Di Sản Đại Lễ',
    scaleDescription: 'Hòa quyện ngũ cung • Bầu, Tranh, Sáo nâng nhịp Trống thiêng',
    icon: 'ensemble',
    tag: 'Đại Lễ'
  }
];

// Pentatonic scale note frequencies in Hz (Hò - Xự - Xang - Xê - Cống)
// Based on traditional Vietnamese tuning: D, F, G, A, C (and octaves)
const FREQS = {
  // Octave 2 & 3 (Low bronze & bass drone)
  D2: 73.42,
  F2: 87.31,
  G2: 98.0,
  A2: 110.0,
  C3: 130.81,
  D3: 146.83,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  C4: 261.63,
  // Octave 4 (Mid singing register)
  D4: 293.66,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  C5: 523.25,
  // Octave 5 (High sweet register)
  D5: 587.33,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  C6: 1046.5
};

// 1. Phrase Sáo Trúc: Lưu Thủy (Flowing water - gentle, soothing, contemplative)
const PHRASE_LUU_THUY: Array<{ freq: number; dur: number; rest: number }> = [
  { freq: FREQS.D4, dur: 1.2, rest: 0.2 },
  { freq: FREQS.F4, dur: 0.8, rest: 0.1 },
  { freq: FREQS.G4, dur: 1.4, rest: 0.3 },
  { freq: FREQS.A4, dur: 1.8, rest: 0.4 },
  { freq: FREQS.C5, dur: 1.0, rest: 0.2 },
  { freq: FREQS.A4, dur: 1.2, rest: 0.2 },
  { freq: FREQS.G4, dur: 2.0, rest: 0.5 },
  { freq: FREQS.F4, dur: 1.0, rest: 0.2 },
  { freq: FREQS.D4, dur: 2.4, rest: 0.8 },
  // High verse
  { freq: FREQS.G4, dur: 1.0, rest: 0.2 },
  { freq: FREQS.A4, dur: 1.2, rest: 0.2 },
  { freq: FREQS.D5, dur: 1.6, rest: 0.3 },
  { freq: FREQS.C5, dur: 1.2, rest: 0.2 },
  { freq: FREQS.A4, dur: 1.5, rest: 0.3 },
  { freq: FREQS.G4, dur: 1.2, rest: 0.2 },
  { freq: FREQS.F4, dur: 1.0, rest: 0.2 },
  { freq: FREQS.D4, dur: 3.0, rest: 1.2 }
];

// 2. Phrase Đàn Tranh: Nam Bình (Hue chamber music - poetic, cascading, delicate zither)
const PHRASE_NAM_BINH: Array<{ freq: number; dur: number; rest: number; bend?: number }> = [
  { freq: FREQS.A3, dur: 0.6, rest: 0.1 },
  { freq: FREQS.D4, dur: 0.8, rest: 0.1, bend: 15 },
  { freq: FREQS.F4, dur: 1.0, rest: 0.2 },
  { freq: FREQS.G4, dur: 0.6, rest: 0.1 },
  { freq: FREQS.A4, dur: 1.4, rest: 0.3, bend: 20 },
  { freq: FREQS.F4, dur: 0.7, rest: 0.1 },
  { freq: FREQS.D4, dur: 1.8, rest: 0.4 },
  { freq: FREQS.C4, dur: 0.9, rest: 0.2 },
  { freq: FREQS.D4, dur: 2.2, rest: 0.6 },
  // Cascading zither runs
  { freq: FREQS.D4, dur: 0.4, rest: 0.05 },
  { freq: FREQS.F4, dur: 0.4, rest: 0.05 },
  { freq: FREQS.G4, dur: 0.4, rest: 0.05 },
  { freq: FREQS.A4, dur: 0.8, rest: 0.15, bend: 25 },
  { freq: FREQS.C5, dur: 1.2, rest: 0.2 },
  { freq: FREQS.D5, dur: 1.8, rest: 0.4, bend: 18 },
  { freq: FREQS.A4, dur: 1.0, rest: 0.2 },
  { freq: FREQS.G4, dur: 1.2, rest: 0.2 },
  { freq: FREQS.F4, dur: 0.8, rest: 0.1 },
  { freq: FREQS.D4, dur: 2.8, rest: 1.0 }
];

// 3. Phrase Đàn Bầu: Lục Bát Tình Quê (Weeping glissando, vocal-like single-string bend)
const PHRASE_DAN_BAU: Array<{
  freq: number;
  dur: number;
  rest: number;
  glideTo?: number;
  vibratoDepth?: number;
}> = [
  { freq: FREQS.D4, dur: 1.5, rest: 0.2, glideTo: FREQS.F4, vibratoDepth: 8 },
  { freq: FREQS.G4, dur: 1.8, rest: 0.3, glideTo: FREQS.A4, vibratoDepth: 10 },
  { freq: FREQS.C5, dur: 1.4, rest: 0.2, glideTo: FREQS.D5, vibratoDepth: 12 },
  { freq: FREQS.D5, dur: 2.0, rest: 0.35, glideTo: FREQS.C5, vibratoDepth: 9 },
  { freq: FREQS.A4, dur: 1.6, rest: 0.25, vibratoDepth: 8 },
  { freq: FREQS.G4, dur: 2.2, rest: 0.4, glideTo: FREQS.F4, vibratoDepth: 8 },
  { freq: FREQS.D4, dur: 3.0, rest: 0.9, vibratoDepth: 6 },
  // Movement 2: Thâm trầm uốn lượn
  { freq: FREQS.A3, dur: 1.0, rest: 0.15, glideTo: FREQS.D4, vibratoDepth: 6 },
  { freq: FREQS.F4, dur: 1.3, rest: 0.2, glideTo: FREQS.G4, vibratoDepth: 8 },
  { freq: FREQS.A4, dur: 1.9, rest: 0.3, glideTo: FREQS.D5, vibratoDepth: 11 },
  { freq: FREQS.C5, dur: 1.5, rest: 0.25, glideTo: FREQS.A4, vibratoDepth: 8 },
  { freq: FREQS.G4, dur: 1.8, rest: 0.3, glideTo: FREQS.F4, vibratoDepth: 8 },
  { freq: FREQS.D4, dur: 3.4, rest: 1.2, vibratoDepth: 6 }
];

// 4. Pattern Trống Đồng: Nhịp Hào Khí Đông Sơn (Sacred ceremonial cadence)
const PATTERN_TRONG_DONG: Array<{
  type: 'deep' | 'accent' | 'rim' | 'chime';
  delay: number;
  pitch: number;
  strength: number;
}> = [
  // Measure 1: Đại cổ sơ khai
  { type: 'deep', delay: 0.0, pitch: 72, strength: 1.0 },
  { type: 'chime', delay: 0.8, pitch: 1100, strength: 0.6 },
  { type: 'rim', delay: 1.6, pitch: 180, strength: 0.6 },
  // Measure 2: Nhịp thức
  { type: 'accent', delay: 2.6, pitch: 78, strength: 0.85 },
  { type: 'deep', delay: 3.8, pitch: 72, strength: 0.95 },
  // Measure 3: Cặp trống giao hòa
  { type: 'rim', delay: 4.8, pitch: 195, strength: 0.7 },
  { type: 'deep', delay: 5.6, pitch: 72, strength: 1.0 },
  { type: 'chime', delay: 6.2, pitch: 1320, strength: 0.7 },
  { type: 'accent', delay: 7.0, pitch: 84, strength: 0.8 },
  // Measure 4: Âm vang kết khúc
  { type: 'deep', delay: 8.2, pitch: 72, strength: 1.1 },
  { type: 'chime', delay: 9.4, pitch: 1100, strength: 0.8 }
];

class TraditionalAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrack: TraditionalTrackId = 'sao-truc';
  private masterGain: GainNode | null = null;
  private volume = 0.65;
  private activeTimers: number[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): TraditionalTrackId {
    return this.currentTrack;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public setTrack(trackId: TraditionalTrackId): void {
    if (this.currentTrack === trackId) return;
    this.currentTrack = trackId;
    if (this.isPlaying) {
      this.stop();
      setTimeout(() => this.start(), 150);
    } else {
      this.notify();
    }
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public start(): void {
    const ctx = this.initContext();
    this.clearAllTimers();
    this.isPlaying = true;
    this.notify();

    // Start background drone/temple resonance
    this.startDronePad(ctx);

    // Schedule melodies based on selected track
    switch (this.currentTrack) {
      case 'sao-truc':
        this.scheduleFluteLoop(ctx);
        break;

      case 'dan-tranh':
        this.scheduleZitherLoop(ctx);
        break;

      case 'dan-bau':
        this.scheduleDanBauLoop(ctx);
        break;

      case 'trong-dong':
        this.scheduleTrongDongLoop(ctx);
        break;

      case 'hoa-tau':
      default:
        // Grand Imperial Ensemble: Trống Đồng cadence + Đàn Bầu + Đàn Tranh + Sáo Trúc
        this.scheduleTrongDongLoop(ctx, 0.7);
        this.scheduleDanBauLoop(ctx, 0.85);
        const zitherTimer = window.setTimeout(() => {
          this.scheduleZitherLoop(ctx);
        }, 1200);
        const fluteTimer = window.setTimeout(() => {
          this.scheduleFluteLoop(ctx);
        }, 3200);
        this.activeTimers.push(zitherTimer, fluteTimer);
        break;
    }
  }

  public stop(): void {
    this.clearAllTimers();
    this.isPlaying = false;
    if (this.masterGain && this.ctx) {
      // Gentle fade out
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      const resetTimer = window.setTimeout(() => {
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
      }, 300);
      this.activeTimers.push(resetTimer);
    }
    this.notify();
  }

  private clearAllTimers(): void {
    this.activeTimers.forEach((t) => clearTimeout(t));
    this.activeTimers = [];
  }

  // -------------------------------------------------------------
  // AMBIENT RESONANCE & TEMPLE DRONE (BASS WARMTH)
  // -------------------------------------------------------------
  private startDronePad(ctx: AudioContext): void {
    if (!this.isPlaying || !this.masterGain) return;

    // Warm deep root note D2/D3
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(FREQS.D3, ctx.currentTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    // Quiet gentle ambient bed
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 3.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();

    // Loop periodic subtle pitch shimmer
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
    lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();
  }

  // -------------------------------------------------------------
  // 1. SÁO TRÚC (VIETNAMESE BAMBOO FLUTE ACOUSTIC SYNTHESIS)
  // -------------------------------------------------------------
  public playFluteNote(
    ctx: AudioContext,
    freq: number,
    duration: number,
    vibratoAmount = 3.5
  ): void {
    if (!this.masterGain) return;

    const now = ctx.currentTime;

    // 1. Tone Generator: Sine oscillator with overtone
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle 2nd harmonic for wooden flute timbre
    const overtone = ctx.createOscillator();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.08, now);

    // 2. Breath Noise Layer (Air passing through bamboo mouth hole)
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * Math.min(duration, 2), ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(freq * 1.8, now);
    noiseFilter.Q.setValueAtTime(4.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);
    noiseGain.gain.linearRampToValueAtTime(0.04, now + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // 3. Vibrato LFO (Traditional Vietnamese finger shaking technique)
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(0, now);
    vibratoGain.gain.linearRampToValueAtTime(vibratoAmount, now + 0.35);

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration + 0.2);

    // 4. Note Envelope
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.18);
    noteGain.gain.setValueAtTime(0.16, now + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Connect nodes
    osc.connect(noteGain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(noteGain);
    noiseGain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    noiseSource.start(now);

    osc.stop(now + duration + 0.05);
    overtone.stop(now + duration + 0.05);
    noiseSource.stop(now + duration + 0.05);
  }

  // -------------------------------------------------------------
  // 2. ĐÀN TRANH (VIETNAMESE 16-STRING ZITHER PLUCKING SYNTHESIS)
  // -------------------------------------------------------------
  public playZitherPluck(
    ctx: AudioContext,
    freq: number,
    duration: number,
    pitchBendCents = 0
  ): void {
    if (!this.masterGain) return;

    const now = ctx.currentTime;

    // 1. Plucked Silk String Timbre
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Authentic Đàn Tranh pitch-bend (ngón nhấn ngón tay trái)
    if (pitchBendCents > 0) {
      const bentFreq = freq * Math.pow(2, pitchBendCents / 1200);
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(bentFreq, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(
        freq * Math.pow(2, (pitchBendCents * 0.6) / 1200),
        now + duration * 0.7
      );
    }

    // High crystalline sheen harmonic
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(freq * 3, now);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.04, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    // 2. Pluck Strike Click (Plectrum snap)
    const clickOsc = ctx.createOscillator();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1400, now);
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.05, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    clickOsc.connect(clickGain);

    // 3. String Ring Envelope
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.24, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Connect nodes
    osc.connect(noteGain);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(noteGain);
    clickGain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    shimmer.start(now);
    clickOsc.start(now);

    osc.stop(now + duration + 0.05);
    shimmer.stop(now + 0.3);
    clickOsc.stop(now + 0.05);
  }

  // -------------------------------------------------------------
  // 3. ĐÀN BẦU (VIETNAMESE MONOCHORD WEEPING HARMONIC SYNTHESIS)
  // -------------------------------------------------------------
  public playDanBauNote(
    ctx: AudioContext,
    freq: number,
    duration: number,
    options?: {
      glideTo?: number;
      vibratoDepth?: number;
      volumeMultiplier?: number;
    }
  ): void {
    if (!this.masterGain) return;

    const now = ctx.currentTime;
    const glideTo = options?.glideTo;
    const vibratoDepth = options?.vibratoDepth ?? 7.5;
    const volMult = options?.volumeMultiplier ?? 1.0;

    // 1. Monochord String: Pure harmonic sine + subtle harmonic warmth
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Lever bending action (uốn cần đàn bầu tạo âm luyến lướt điệu đà)
    if (glideTo) {
      osc.frequency.setValueAtTime(freq, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(glideTo, now + duration * 0.6);
    }

    // Octave overtone representing the light fingertip touch at string harmonic node
    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);
    if (glideTo) {
      overtone.frequency.setValueAtTime(freq * 2, now + 0.12);
      overtone.frequency.exponentialRampToValueAtTime(glideTo * 2, now + duration * 0.6);
    }

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.07 * volMult, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.015, now + duration * 0.7);

    // 2. Gourd Resonator Formant (Bầu đàn tự nhiên)
    const formantFilter = ctx.createBiquadFilter();
    formantFilter.type = 'bandpass';
    formantFilter.frequency.setValueAtTime(720, now);
    formantFilter.Q.setValueAtTime(2.4, now);

    // 3. Deep expressive vibrato (Ngón rung da diết)
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(4.6, now); // ~4.6Hz vocal vibrato
    vibratoGain.gain.setValueAtTime(0, now);
    vibratoGain.gain.linearRampToValueAtTime(vibratoDepth, now + 0.28);

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration + 0.2);

    // 4. Envelope: Soft plucked touch, singing sustain, gentle weeping release
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.22 * volMult, now + 0.09);
    noteGain.gain.setValueAtTime(0.19 * volMult, now + duration * 0.65);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(formantFilter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(formantFilter);
    formantFilter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);

    osc.stop(now + duration + 0.05);
    overtone.stop(now + duration + 0.05);
  }

  // -------------------------------------------------------------
  // 4. TRỐNG ĐỒNG ĐÔNG SƠN (ANCIENT BRONZE DRUM RESONANCE SYNTHESIS)
  // -------------------------------------------------------------
  public playTrongDongStrike(
    ctx: AudioContext,
    strength = 1.0,
    pitch = 72
  ): void {
    if (!this.masterGain) return;

    const now = ctx.currentTime;

    // 1. Deep Fundamental Bronze Body (Mặt trống đồng Đông Sơn)
    const bodyOsc = ctx.createOscillator();
    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(pitch, now);
    // Subtle acoustic pitch descent upon impact
    bodyOsc.frequency.exponentialRampToValueAtTime(pitch * 0.84, now + 0.14);

    const bodyGain = ctx.createGain();
    bodyGain.gain.setValueAtTime(0.001, now);
    bodyGain.gain.linearRampToValueAtTime(0.44 * strength, now + 0.015);
    bodyGain.gain.exponentialRampToValueAtTime(0.14 * strength, now + 0.38);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    // 2. Inharmonic Bronze Ringing Overtones (Đồng thau cổ Đông Sơn)
    const bronzeFrequencies = [pitch * 1.48, pitch * 2.14, pitch * 2.82, pitch * 3.42];
    bronzeFrequencies.forEach((otFreq, idx) => {
      const otOsc = ctx.createOscillator();
      otOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      otOsc.frequency.setValueAtTime(otFreq, now);

      const otGain = ctx.createGain();
      const otVol = (0.13 / (idx + 1)) * strength;
      otGain.gain.setValueAtTime(0.001, now);
      otGain.gain.linearRampToValueAtTime(otVol, now + 0.012);
      otGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4 + idx * 0.3);

      otOsc.connect(otGain);
      otGain.connect(this.masterGain!);

      otOsc.start(now);
      otOsc.stop(now + 1.8 + idx * 0.3);
    });

    // 3. Wooden beater strike impact (Tiếng dùi gõ da/gỗ)
    const clickBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    for (let i = 0; i < clickBuffer.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / 160);
    }
    const clickSrc = ctx.createBufferSource();
    clickSrc.buffer = clickBuffer;

    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = 'lowpass';
    clickFilter.frequency.setValueAtTime(480, now);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.22 * strength, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    clickSrc.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(this.masterGain);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.masterGain);

    bodyOsc.start(now);
    clickSrc.start(now);

    bodyOsc.stop(now + 2.6);
  }

  // -------------------------------------------------------------
  // TEMPLE CHIME / KHÁNH ĐỒNG (SOOTHING ACCENT)
  // -------------------------------------------------------------
  public playTempleChime(ctx: AudioContext, freq = 1200): void {
    if (!this.masterGain) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.038, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.6);
  }

  // -------------------------------------------------------------
  // INTERACTIVE PREVIEW HIT (FOR SOUNDBOARD TEST)
  // -------------------------------------------------------------
  public previewInstrument(type: 'sao-truc' | 'dan-tranh' | 'dan-bau' | 'trong-dong' | 'chime'): void {
    const ctx = this.initContext();

    switch (type) {
      case 'sao-truc':
        this.playFluteNote(ctx, FREQS.D5, 1.8, 4.0);
        break;

      case 'dan-tranh':
        this.playZitherPluck(ctx, FREQS.A4, 1.5, 20);
        setTimeout(() => this.playZitherPluck(ctx, FREQS.D5, 2.0, 15), 180);
        break;

      case 'dan-bau':
        this.playDanBauNote(ctx, FREQS.G4, 2.2, {
          glideTo: FREQS.A4,
          vibratoDepth: 9.0
        });
        break;

      case 'trong-dong':
        this.playTrongDongStrike(ctx, 1.15, 72);
        break;

      case 'chime':
      default:
        this.playTempleChime(ctx, 1320);
        break;
    }
  }

  // -------------------------------------------------------------
  // MELODY SEQUENCERS
  // -------------------------------------------------------------
  private scheduleFluteLoop(ctx: AudioContext): void {
    if (!this.isPlaying) return;

    let totalOffset = 0;
    PHRASE_LUU_THUY.forEach((note) => {
      const playTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          this.playFluteNote(ctx, note.freq, note.dur, 3.8);
        }
      }, totalOffset * 1000);

      this.activeTimers.push(playTimer);
      totalOffset += note.dur + note.rest;
    });

    // Occasional gentle temple chime at phrase boundary
    const chimeTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playTempleChime(ctx, 1320);
      }
    }, (totalOffset - 1.5) * 1000);
    this.activeTimers.push(chimeTimer);

    // Schedule next seamless loop
    const loopTimer = window.setTimeout(() => {
      if (
        this.isPlaying &&
        (this.currentTrack === 'sao-truc' || this.currentTrack === 'hoa-tau')
      ) {
        this.scheduleFluteLoop(ctx);
      }
    }, totalOffset * 1000);
    this.activeTimers.push(loopTimer);
  }

  private scheduleZitherLoop(ctx: AudioContext): void {
    if (!this.isPlaying) return;

    let totalOffset = 0;
    PHRASE_NAM_BINH.forEach((note) => {
      const playTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          this.playZitherPluck(ctx, note.freq, note.dur, note.bend || 0);
        }
      }, totalOffset * 1000);

      this.activeTimers.push(playTimer);
      totalOffset += note.dur + note.rest;
    });

    // Schedule next loop
    const loopTimer = window.setTimeout(() => {
      if (
        this.isPlaying &&
        (this.currentTrack === 'dan-tranh' || this.currentTrack === 'hoa-tau')
      ) {
        this.scheduleZitherLoop(ctx);
      }
    }, totalOffset * 1000);
    this.activeTimers.push(loopTimer);
  }

  private scheduleDanBauLoop(ctx: AudioContext, volMult = 1.0): void {
    if (!this.isPlaying) return;

    let totalOffset = 0;
    PHRASE_DAN_BAU.forEach((note) => {
      const playTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          this.playDanBauNote(ctx, note.freq, note.dur, {
            glideTo: note.glideTo,
            vibratoDepth: note.vibratoDepth,
            volumeMultiplier: volMult
          });
        }
      }, totalOffset * 1000);

      this.activeTimers.push(playTimer);
      totalOffset += note.dur + note.rest;
    });

    // Schedule next loop
    const loopTimer = window.setTimeout(() => {
      if (
        this.isPlaying &&
        (this.currentTrack === 'dan-bau' || this.currentTrack === 'hoa-tau')
      ) {
        this.scheduleDanBauLoop(ctx, volMult);
      }
    }, totalOffset * 1000);
    this.activeTimers.push(loopTimer);
  }

  private scheduleTrongDongLoop(ctx: AudioContext, volMult = 1.0): void {
    if (!this.isPlaying) return;

    PATTERN_TRONG_DONG.forEach((hit) => {
      const hitTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          if (hit.type === 'deep' || hit.type === 'accent') {
            this.playTrongDongStrike(ctx, hit.strength * volMult, hit.pitch);
          } else if (hit.type === 'rim') {
            this.playTrongDongStrike(ctx, hit.strength * 0.7 * volMult, hit.pitch);
          } else {
            this.playTempleChime(ctx, hit.pitch);
          }
        }
      }, hit.delay * 1000);

      this.activeTimers.push(hitTimer);
    });

    const loopCycleDuration = 10.5; // seconds per ceremonial cycle
    const loopTimer = window.setTimeout(() => {
      if (
        this.isPlaying &&
        (this.currentTrack === 'trong-dong' || this.currentTrack === 'hoa-tau')
      ) {
        this.scheduleTrongDongLoop(ctx, volMult);
      }
    }, loopCycleDuration * 1000);
    this.activeTimers.push(loopTimer);
  }
}

// Global singleton instance for seamless playback across pages and tabs
export const traditionalAudio = new TraditionalAudioEngine();
