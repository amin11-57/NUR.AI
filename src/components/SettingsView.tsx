import React, { useEffect, useState } from 'react';
import {
  Settings,
  Volume2,
  Sliders,
  Eye,
  Type,
  Radio,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Languages,
  Check,
} from 'lucide-react';
import { AppSettings, AccessibilityContrast, FontSizeScale, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { speechController } from '../utils/speechController';
import { soundEffects } from '../utils/audioEffects';
import { DEFAULT_SETTINGS } from '../utils/storage';

interface SettingsViewProps {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  updateSettings,
  onBack,
}) => {
  const t = translations[settings.language];
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const list = speechController.getVoicesForLanguage(settings.language);
    setVoices(list);

    // If voices change dynamically in browser
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoices(speechController.getVoicesForLanguage(settings.language));
      };
    }
  }, [settings.language]);

  const handleTestSpeech = () => {
    soundEffects.playClick();
    const testPhrases = {
      id: 'Halo, ini adalah contoh suara NURAI dengan pengaturan saat ini.',
      en: 'Hello, this is a voice sample of NURAI with your current settings.',
      ar: 'مرحبًا بك، هذه تجربة لصوت تطبيق نور آي بالإعدادات الحالية.',
    };

    speechController.speak(testPhrases[settings.language], {
      language: settings.language,
      speed: settings.voiceSpeed,
      pitch: settings.voicePitch,
      volume: settings.voiceVolume,
      engine: settings.ttsEngine,
      voiceURI: settings.selectedVoiceURI,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundEffects.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            updateSettings(DEFAULT_SETTINGS);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.settings.resetSettings}</span>
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="font-extrabold text-2xl text-emerald-950 dark:text-emerald-300 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
          <span>{t.settings.title}</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Audio Settings Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-500" />
            <span>{t.settings.audioCategory}</span>
          </h3>

          <button
            onClick={handleTestSpeech}
            className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-xs transition"
          >
            🔊 Uji Suara
          </button>
        </div>

        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="voice-speed" className="font-bold text-stone-800 dark:text-stone-200">
              {t.settings.voiceSpeed}: <span className="text-emerald-700 dark:text-amber-400">{settings.voiceSpeed}x</span>
            </label>
            <span className="text-xs text-stone-400">Lambat - Cepat</span>
          </div>
          <input
            id="voice-speed"
            type="range"
            min="0.5"
            max="1.75"
            step="0.25"
            value={settings.voiceSpeed}
            onChange={(e) => updateSettings({ voiceSpeed: parseFloat(e.target.value) })}
            className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer dark:bg-stone-700"
          />
          <div className="flex justify-between text-[11px] text-stone-400 px-1 font-mono">
            <span>0.5x</span>
            <span>0.75x</span>
            <span>1.0x (Normal)</span>
            <span>1.25x</span>
            <span>1.5x</span>
            <span>1.75x</span>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <label htmlFor="voice-volume" className="font-bold text-stone-800 dark:text-stone-200">
              {t.settings.voiceVolume}: <span className="text-emerald-700 dark:text-amber-400">{Math.round(settings.voiceVolume * 100)}%</span>
            </label>
          </div>
          <input
            id="voice-volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.voiceVolume}
            onChange={(e) => updateSettings({ voiceVolume: parseFloat(e.target.value) })}
            className="w-full accent-emerald-600 h-2 bg-stone-200 rounded-lg cursor-pointer dark:bg-stone-700"
          />
        </div>

        {/* Speech Engine */}
        <div className="space-y-2 pt-2">
          <label className="block font-bold text-sm text-stone-800 dark:text-stone-200">
            {t.settings.ttsEngine}
          </label>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {t.settings.ttsEngineDesc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => {
                soundEffects.playClick();
                updateSettings({ ttsEngine: 'browser' });
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                settings.ttsEngine === 'browser'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500'
                  : 'border-stone-200 bg-white hover:bg-stone-50 dark:bg-stone-800 dark:border-stone-700'
              }`}
            >
              <div>
                <p className="font-bold text-sm">{t.settings.engineBrowser}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Instan, tanpa internet</p>
              </div>
              {settings.ttsEngine === 'browser' && <Check className="w-5 h-5 text-emerald-600" />}
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                updateSettings({ ttsEngine: 'gemini-hd' });
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                settings.ttsEngine === 'gemini-hd'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400'
                  : 'border-stone-200 bg-white hover:bg-stone-50 dark:bg-stone-800 dark:border-stone-700'
              }`}
            >
              <div>
                <p className="font-bold text-sm">{t.settings.engineGeminiHD}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Suara AI Studio berkualitas tinggi</p>
              </div>
              {settings.ttsEngine === 'gemini-hd' && <Check className="w-5 h-5 text-amber-600" />}
            </button>
          </div>
        </div>

        {/* Voice Selection (if browser has multiple voices for language) */}
        {voices.length > 0 && settings.ttsEngine === 'browser' && (
          <div className="space-y-1.5 pt-2">
            <label htmlFor="voice-select" className="block font-bold text-sm text-stone-800 dark:text-stone-200">
              Pilihan Suara Peramban
            </label>
            <select
              id="voice-select"
              value={settings.selectedVoiceURI}
              onChange={(e) => updateSettings({ selectedVoiceURI: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Otomatis / Default</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Auto Play Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
          <div>
            <label className="font-bold text-sm text-stone-800 dark:text-stone-200 cursor-pointer" htmlFor="auto-play-toggle">
              {t.settings.autoPlay}
            </label>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.settings.autoPlayDesc}
            </p>
          </div>
          <input
            id="auto-play-toggle"
            type="checkbox"
            checked={settings.autoPlayAudio}
            onChange={(e) => updateSettings({ autoPlayAudio: e.target.checked })}
            className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Accessibility & Visual Contrast Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-5">
        <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-200 flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <Eye className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <span>{t.settings.accessibilityCategory}</span>
        </h3>

        {/* Contrast Modes */}
        <div className="space-y-2">
          <label className="block font-bold text-sm text-stone-800 dark:text-stone-200">
            {t.settings.contrastMode}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                soundEffects.playClick();
                updateSettings({ contrastMode: 'standard' });
              }}
              className={`p-3.5 rounded-2xl border text-center transition ${
                settings.contrastMode === 'standard'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 font-bold ring-2 ring-emerald-500'
                  : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-700 mx-auto mb-1.5" />
              <span className="text-xs font-semibold">{t.settings.contrastStandard}</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                updateSettings({ contrastMode: 'high-contrast-yellow' });
              }}
              className={`p-3.5 rounded-2xl border text-center transition ${
                settings.contrastMode === 'high-contrast-yellow'
                  ? 'border-amber-400 bg-black text-amber-300 font-extrabold ring-2 ring-amber-400'
                  : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 border border-black mx-auto mb-1.5" />
              <span className="text-xs font-semibold">{t.settings.contrastYellowBlack}</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                updateSettings({ contrastMode: 'high-contrast-dark' });
              }}
              className={`p-3.5 rounded-2xl border text-center transition ${
                settings.contrastMode === 'high-contrast-dark'
                  ? 'border-stone-400 bg-stone-900 text-white font-bold ring-2 ring-stone-400'
                  : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-stone-900 mx-auto mb-1.5" />
              <span className="text-xs font-semibold">{t.settings.contrastDark}</span>
            </button>
          </div>
        </div>

        {/* Font Scale */}
        <div className="space-y-2 pt-2">
          <label className="block font-bold text-sm text-stone-800 dark:text-stone-200">
            {t.settings.fontSize}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'normal', label: t.settings.fontSizeNormal, size: 'text-sm' },
              { id: 'large', label: t.settings.fontSizeLarge, size: 'text-base font-bold' },
              { id: 'extralarge', label: t.settings.fontSizeExtraLarge, size: 'text-lg font-extrabold' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  soundEffects.playClick();
                  updateSettings({ fontSize: f.id as FontSizeScale });
                }}
                className={`p-3 rounded-2xl border text-center transition ${
                  settings.fontSize === f.id
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500'
                    : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700'
                }`}
              >
                <span className={f.size}>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spoken Guidance & Sound Effects Toggles */}
        <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="guidance-toggle" className="font-bold text-sm text-stone-800 dark:text-stone-200 cursor-pointer">
                {t.settings.spokenGuidance}
              </label>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.settings.spokenGuidanceDesc}
              </p>
            </div>
            <input
              id="guidance-toggle"
              type="checkbox"
              checked={settings.spokenGuidance}
              onChange={(e) => updateSettings({ spokenGuidance: e.target.checked })}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="sound-fx-toggle" className="font-bold text-sm text-stone-800 dark:text-stone-200 cursor-pointer">
                {t.settings.soundEffects}
              </label>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.settings.soundEffectsDesc}
              </p>
            </div>
            <input
              id="sound-fx-toggle"
              type="checkbox"
              checked={settings.soundEffects}
              onChange={(e) => {
                updateSettings({ soundEffects: e.target.checked });
                soundEffects.setEnabled(e.target.checked);
              }}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
