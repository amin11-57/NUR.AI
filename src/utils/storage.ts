import { AppSettings, HistoryItem, LanguageCode } from '../types';

const SETTINGS_KEY = 'nurai_settings_v1';
const HISTORY_KEY = 'nurai_history_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'id',
  voiceSpeed: 1.0,
  voicePitch: 1.0,
  voiceVolume: 1.0,
  selectedVoiceURI: '',
  ttsEngine: 'browser',
  contrastMode: 'standard',
  fontSize: 'normal',
  spokenGuidance: true,
  soundEffects: true,
  autoPlayAudio: true,
};

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load settings:', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function saveHistoryItem(item: HistoryItem): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadHistory();
    // Keep up to 30 items
    const updated = [item, ...current.filter((x) => x.id !== item.id)].slice(0, 30);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save history item:', e);
    return [];
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadHistory();
    const updated = current.filter((x) => x.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}
