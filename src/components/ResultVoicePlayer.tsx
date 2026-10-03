import React, { useEffect, useState, useRef } from 'react';
import {
  Volume2,
  Pause,
  RotateCcw,
  Square,
  Sparkles,
  Camera,
  Share2,
  BookmarkCheck,
  Compass,
  Palette,
  Shapes,
  Type as TypeIcon,
  HeartHandshake,
  AlertTriangle,
  Sliders,
  Check,
} from 'lucide-react';
import { AnalysisResult, AppSettings } from '../types';
import { translations } from '../i18n/translations';
import { speechController } from '../utils/speechController';
import { soundEffects } from '../utils/audioEffects';

interface ResultVoicePlayerProps {
  result: AnalysisResult;
  imageSrc: string;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  onScanAgain: () => void;
}

export const ResultVoicePlayer: React.FC<ResultVoicePlayerProps> = ({
  result,
  imageSrc,
  settings,
  updateSettings,
  onScanAgain,
}) => {
  const t = translations[settings.language];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showAudioSettings, setShowAudioSettings] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const autoPlayTriggered = useRef<boolean>(false);

  // Auto-play audio upon display if configured
  useEffect(() => {
    if (settings.autoPlayAudio && !autoPlayTriggered.current) {
      autoPlayTriggered.current = true;
      handlePlay();
    }
    return () => {
      speechController.stop();
    };
  }, [result]);

  const handlePlay = () => {
    soundEffects.playClick();
    if (isPaused) {
      speechController.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    const textToSpeak = `${result.spokenDescription}${
      result.paiReflection ? `. ${result.paiReflection}` : ''
    }`;

    speechController.speak(textToSpeak, {
      language: settings.language,
      speed: settings.voiceSpeed,
      pitch: settings.voicePitch,
      volume: settings.voiceVolume,
      engine: settings.ttsEngine,
      voiceURI: settings.selectedVoiceURI,
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      onPause: () => {
        setIsPaused(true);
        setIsPlaying(false);
      },
      onResume: () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      onError: () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
    });
  };

  const handlePause = () => {
    soundEffects.playClick();
    speechController.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleReplay = () => {
    soundEffects.playClick();
    speechController.stop();
    setIsPaused(false);
    handlePlay();
  };

  const handleStop = () => {
    soundEffects.playClick();
    speechController.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleShare = () => {
    soundEffects.playClick();
    const shareText = `NURAI - Pengenalan Benda:\n${result.spokenDescription}\n\nObjek: ${result.mainObject}\nWarna: ${result.color}\nPosisi: ${result.position}\n\n"Teknologi yang Membantu Melihat Dunia dengan Suara"`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUnclear = result.clarityStatus === 'blurry' || result.clarityStatus === 'obscured';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in duration-300">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isPlaying
          ? t.analysis.playingAudio
          : isPaused
          ? t.analysis.audioPaused
          : t.analysis.resultTitle}
        {result.spokenDescription}
      </div>

      {/* Main Spoken Description Banner - Super high contrast & large text for accessibility */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-6 sm:p-8 shadow-xl border-2 border-emerald-700/80">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/50 text-xs font-semibold tracking-wide text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.analysis.resultTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAudioSettings(!showAudioSettings)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-700 text-emerald-100 transition"
              aria-label={t.analysis.audioControls}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.analysis.audioControls}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white bg-emerald-950/60 border border-emerald-700 transition"
              title="Salin Teks"
              aria-label="Salin Teks Hasil Analisis"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Big Spoken Text */}
        <div className="my-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed tracking-normal text-emerald-50 text-shadow">
            “{result.spokenDescription}”
          </p>
        </div>

        {/* Audio Player Control Bar: 🔊 Dengarkan | ⏸ Jeda | 🔁 Ulangi | 🔇 Berhenti */}
        <div className="mt-6 pt-5 border-t border-emerald-700/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Play / Dengarkan */}
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base shadow-md transition focus:ring-4 focus:ring-amber-300 ${
                isPlaying
                  ? 'bg-emerald-700 text-emerald-300 cursor-default'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950 scale-100 active:scale-95'
              }`}
              aria-label={t.analysis.listen}
            >
              <Volume2 className="w-5 h-5 fill-current" />
              <span>{t.analysis.listen}</span>
            </button>

            {/* Pause / Jeda */}
            <button
              onClick={handlePause}
              disabled={!isPlaying}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm sm:text-base transition border border-emerald-600/80 focus:ring-4 focus:ring-amber-300 ${
                !isPlaying
                  ? 'opacity-40 cursor-not-allowed bg-emerald-950/40 text-emerald-300'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-white'
              }`}
              aria-label={t.analysis.pause}
            >
              <Pause className="w-5 h-5" />
              <span>{t.analysis.pause}</span>
            </button>

            {/* Replay / Ulangi */}
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm sm:text-base bg-emerald-950/80 hover:bg-emerald-900 text-white transition border border-emerald-600/80 focus:ring-4 focus:ring-amber-300 active:scale-95"
              aria-label={t.analysis.replay}
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.analysis.replay}</span>
            </button>

            {/* Stop / Berhenti */}
            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm sm:text-base transition border border-emerald-600/80 focus:ring-4 focus:ring-amber-300 ${
                !isPlaying && !isPaused
                  ? 'opacity-40 cursor-not-allowed bg-emerald-950/40 text-emerald-300'
                  : 'bg-rose-950/70 hover:bg-rose-900 text-rose-200 border-rose-700'
              }`}
              aria-label={t.analysis.stop}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>{t.analysis.stop}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-200">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                isPlaying ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
              }`}
            />
            <span>{isPlaying ? 'Sedang Membacakan...' : 'Audio Siap'}</span>
          </div>
        </div>

        {/* Audio Fine-Tuning Drawer */}
        {showAudioSettings && (
          <div className="mt-4 pt-4 border-t border-emerald-700/60 bg-emerald-950/70 rounded-2xl p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-emerald-200 mb-1">
                  {t.settings.voiceSpeed}: {settings.voiceSpeed}x
                </label>
                <div className="flex items-center gap-2">
                  {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => updateSettings({ voiceSpeed: speed })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        settings.voiceSpeed === speed
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-emerald-200 mb-1">
                  {t.settings.ttsEngine}:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSettings({ ttsEngine: 'browser' })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      settings.ttsEngine === 'browser'
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
                    }`}
                  >
                    Web Speech (Cepat)
                  </button>
                  <button
                    onClick={() => updateSettings({ ttsEngine: 'gemini-hd' })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      settings.ttsEngine === 'gemini-hd'
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800'
                    }`}
                  >
                    Gemini AI Voice (HD)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Warning if image unclear */}
      {isUnclear && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
          <div>
            <p className="font-bold text-sm">{t.analysis.unclearWarning}</p>
          </div>
        </div>
      )}

      {/* Object Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Thumbnail Preview Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 flex flex-col items-center justify-center">
          <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700">
            <img
              src={imageSrc}
              alt={result.mainObject || 'Preview Gambar'}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.analysis.savedToHistory}</span>
          </div>
        </div>

        {/* Detailed Breakdown Attributes */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-4">
          <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Rincian Pengenalan Objek</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Main Object */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 dark:bg-stone-800/80 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{t.analysis.objectName}</span>
              </div>
              <p className="font-bold text-base text-stone-900 dark:text-white">
                {result.mainObject || '-'}
              </p>
            </div>

            {/* Color */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 dark:bg-stone-800/80 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>{t.analysis.color}</span>
              </div>
              <p className="font-bold text-base text-stone-900 dark:text-white">
                {result.color || '-'}
              </p>
            </div>

            {/* Shape */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 dark:bg-stone-800/80 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                <Shapes className="w-4 h-4 text-blue-600" />
                <span>{t.analysis.shape}</span>
              </div>
              <p className="font-bold text-base text-stone-900 dark:text-white">
                {result.shape || '-'}
              </p>
            </div>

            {/* Position */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 dark:bg-stone-800/80 dark:border-stone-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>{t.analysis.position}</span>
              </div>
              <p className="font-bold text-base text-stone-900 dark:text-white">
                {result.position || '-'}
              </p>
            </div>
          </div>

          {/* Visible Text if found */}
          {result.detectedText && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 dark:bg-stone-800 dark:border-amber-700/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400 mb-1">
                <TypeIcon className="w-4 h-4 text-amber-600" />
                <span>{t.analysis.detectedText}</span>
              </div>
              <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                “{result.detectedText}”
              </p>
            </div>
          )}

          {/* Detailed explanation if present */}
          {result.detailedDescription && (
            <div className="pt-2 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="font-semibold text-stone-800 dark:text-stone-100">
                {t.analysis.detailedDescription}:{' '}
              </span>
              {result.detailedDescription}
            </div>
          )}
        </div>
      </div>

      {/* PAI Educational & Moral Reflection Card */}
      {result.paiReflection && (
        <div className="rounded-3xl p-6 bg-linear-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-amber-300/80 dark:border-amber-700/60 dark:bg-stone-900/60 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-400 text-stone-950 font-bold flex-shrink-0 shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-300">
                {t.analysis.paiReflection}
              </h4>
              <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium leading-relaxed italic">
                “{result.paiReflection}”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action: Scan Again Button */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={() => {
            soundEffects.playClick();
            onScanAgain();
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg shadow-lg hover:shadow-xl transition transform active:scale-98 focus:ring-4 focus:ring-emerald-500"
        >
          <Camera className="w-6 h-6" />
          <span>{t.analysis.scanAgain}</span>
        </button>
      </div>
    </div>
  );
};
