export type LanguageCode = 'id' | 'en' | 'ar';

export interface AnalysisResult {
  spokenDescription: string;
  detailedDescription?: string;
  mainObject: string;
  color: string;
  shape: string;
  position: string;
  detectedText?: string;
  clarityStatus: 'clear' | 'blurry' | 'obscured' | string;
  paiReflection?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  thumbnail: string;
  language: LanguageCode;
  result: AnalysisResult;
}

export type AccessibilityContrast = 'standard' | 'high-contrast-yellow' | 'high-contrast-dark';
export type FontSizeScale = 'normal' | 'large' | 'extralarge';

export interface AppSettings {
  language: LanguageCode;
  voiceSpeed: number; // 0.75, 1, 1.25, 1.5
  voicePitch: number; // 0.8, 1, 1.2
  voiceVolume: number; // 0 to 1
  selectedVoiceURI: string;
  ttsEngine: 'browser' | 'gemini-hd';
  contrastMode: AccessibilityContrast;
  fontSize: FontSizeScale;
  spokenGuidance: boolean; // Speaks navigation and UI cues
  soundEffects: boolean; // Audio beeps & chimes
  autoPlayAudio: boolean; // Auto play TTS upon analysis complete
}

export type ActiveTab = 'home' | 'scan' | 'quick-scan' | 'upload' | 'history' | 'language' | 'settings' | 'about';
