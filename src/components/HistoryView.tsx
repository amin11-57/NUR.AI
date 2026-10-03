import React, { useState } from 'react';
import {
  Clock,
  Volume2,
  Trash2,
  Calendar,
  Sparkles,
  ArrowLeft,
  VolumeX,
  FileQuestion,
} from 'lucide-react';
import { HistoryItem, AppSettings } from '../types';
import { translations } from '../i18n/translations';
import { speechController } from '../utils/speechController';
import { soundEffects } from '../utils/audioEffects';

interface HistoryViewProps {
  history: HistoryItem[];
  settings: AppSettings;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  settings,
  onClearHistory,
  onDeleteItem,
  onSelectHistoryItem,
  onBack,
}) => {
  const t = translations[settings.language];
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleListenAgain = (item: HistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playClick();

    if (playingId === item.id) {
      speechController.stop();
      setPlayingId(null);
      return;
    }

    setPlayingId(item.id);
    const textToSpeak = `${item.result.spokenDescription}${
      item.result.paiReflection ? `. ${item.result.paiReflection}` : ''
    }`;

    speechController.speak(textToSpeak, {
      language: item.language || settings.language,
      speed: settings.voiceSpeed,
      pitch: settings.voicePitch,
      volume: settings.voiceVolume,
      engine: settings.ttsEngine,
      voiceURI: settings.selectedVoiceURI,
      onStart: () => setPlayingId(item.id),
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(settings.language === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
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

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm(t.history.confirmClear)) {
                  soundEffects.playClick();
                  onClearHistory();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.history.clearAll}</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="font-extrabold text-2xl text-emerald-950 dark:text-emerald-300 flex items-center gap-2.5">
          <Clock className="w-6 h-6 text-amber-500" />
          <span>{t.history.title}</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {t.history.subtitle} ({history.length} {t.history.itemsCount})
        </p>
      </div>

      {/* History Items List */}
      {history.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-3">
          <FileQuestion className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="font-bold text-lg text-stone-800 dark:text-stone-200">
            {t.history.emptyTitle}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {t.history.emptyDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const isItemPlaying = playingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectHistoryItem(item);
                }}
                className="group cursor-pointer bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-stone-200 hover:border-emerald-500 dark:bg-stone-900 dark:border-stone-800 transition flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 border border-stone-200 dark:border-stone-700 flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.result.mainObject}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-base text-stone-900 dark:text-white truncate">
                      {item.result.mainObject || 'Objek Terdeteksi'}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                      {item.language}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-stone-700 dark:text-stone-300 line-clamp-2 leading-relaxed">
                    “{item.result.spokenDescription}”
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={(e) => handleListenAgain(item, e)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition ${
                      isItemPlaying
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
                    }`}
                    aria-label={`${t.history.listenAgain}: ${item.result.mainObject}`}
                  >
                    {isItemPlaying ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 fill-current" />
                        <span>{t.history.listenAgain}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playClick();
                      onDeleteItem(item.id);
                    }}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    title={t.history.deleteItem}
                    aria-label={`${t.history.deleteItem} ${item.result.mainObject}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
