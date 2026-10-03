import { LanguageCode } from '../types';

export interface SpeechOptions {
  language: LanguageCode;
  speed: number;
  pitch: number;
  volume: number;
  voiceURI?: string;
  engine?: 'browser' | 'gemini-hd';
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (err: any) => void;
}

class SpeechController {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private lastSpokenText: string = '';
  private lastOptions: SpeechOptions | null = null;

  public getVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return [];
    }
    return window.speechSynthesis.getVoices();
  }

  public getVoicesForLanguage(lang: LanguageCode): SpeechSynthesisVoice[] {
    const all = this.getVoices();
    const prefix = lang === 'id' ? 'id' : lang === 'ar' ? 'ar' : 'en';
    return all.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    this.isSpeakingState = false;
    this.isPausedState = false;
  }

  public pause() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.isPausedState = true;
      this.isSpeakingState = false;
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      this.isPausedState = true;
      this.isSpeakingState = false;
    }
  }

  public resume() {
    if (this.currentAudioElement) {
      this.currentAudioElement.play().catch(() => {});
      this.isPausedState = false;
      this.isSpeakingState = true;
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      this.isPausedState = false;
      this.isSpeakingState = true;
    }
  }

  public replay() {
    if (this.lastSpokenText && this.lastOptions) {
      this.stop();
      this.speak(this.lastSpokenText, this.lastOptions);
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public isPaused(): boolean {
    return this.isPausedState;
  }

  public async speak(text: string, options: SpeechOptions) {
    if (!text || text.trim().length === 0) return;

    this.stop();
    this.lastSpokenText = text;
    this.lastOptions = options;

    // If Gemini HD engine is chosen, try fetching from server endpoint
    if (options.engine === 'gemini-hd') {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            language: options.language,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.audioBase64) {
            const audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
            const audio = new Audio(audioUrl);
            this.currentAudioElement = audio;
            audio.playbackRate = options.speed || 1.0;
            audio.volume = options.volume ?? 1.0;

            audio.onplay = () => {
              this.isSpeakingState = true;
              this.isPausedState = false;
              options.onStart?.();
            };

            audio.onpause = () => {
              if (audio.currentTime < audio.duration) {
                this.isPausedState = true;
                this.isSpeakingState = false;
                options.onPause?.();
              }
            };

            audio.onended = () => {
              this.isSpeakingState = false;
              this.isPausedState = false;
              this.currentAudioElement = null;
              options.onEnd?.();
            };

            audio.onerror = (e) => {
              console.warn('Gemini HD audio playback failed, falling back to Web Speech:', e);
              this.speakWithWebSpeech(text, options);
            };

            await audio.play();
            return;
          }
        }
      } catch (err) {
        console.warn('Gemini TTS endpoint call failed, falling back to browser speech:', err);
      }
    }

    // Default: Web Speech API
    this.speakWithWebSpeech(text, options);
  }

  private speakWithWebSpeech(text: string, options: SpeechOptions) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options.onError?.('SpeechSynthesis tidak didukung di perangkat ini.');
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const langCode = options.language === 'id' ? 'id-ID' : options.language === 'ar' ? 'ar-SA' : 'en-US';
    utterance.lang = langCode;
    utterance.rate = Math.max(0.5, Math.min(2.0, options.speed || 1.0));
    utterance.pitch = Math.max(0.5, Math.min(1.5, options.pitch || 1.0));
    utterance.volume = Math.max(0, Math.min(1.0, options.volume ?? 1.0));

    // Choose voice if requested or find best match
    const voices = window.speechSynthesis.getVoices();
    if (options.voiceURI) {
      const match = voices.find((v) => v.voiceURI === options.voiceURI);
      if (match) utterance.voice = match;
    } else {
      const bestVoice = voices.find((v) => v.lang.toLowerCase().startsWith(options.language));
      if (bestVoice) utterance.voice = bestVoice;
    }

    utterance.onstart = () => {
      this.isSpeakingState = true;
      this.isPausedState = false;
      options.onStart?.();
    };

    utterance.onpause = () => {
      this.isPausedState = true;
      this.isSpeakingState = false;
      options.onPause?.();
    };

    utterance.onresume = () => {
      this.isSpeakingState = true;
      this.isPausedState = false;
      options.onResume?.();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (event) => {
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.currentUtterance = null;
      options.onError?.(event);
    };

    window.speechSynthesis.speak(utterance);
  }

  // Quick UI spoken prompt helper for blind navigation
  public speakGuidance(text: string, language: LanguageCode = 'id') {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = language === 'id' ? 'id-ID' : language === 'ar' ? 'ar-SA' : 'en-US';
      u.rate = 1.1;
      u.volume = 0.9;
      window.speechSynthesis.speak(u);
    } catch {
      // Ignore
    }
  }
}

export const speechController = new SpeechController();
