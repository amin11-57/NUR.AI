import React from 'react';
import { Languages, Check, ArrowLeft, Volume2 } from 'lucide-react';
import { AppSettings, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { soundEffects } from '../utils/audioEffects';
import { speechController } from '../utils/speechController';

interface LanguageViewProps {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  onBack: () => void;
}

export const LanguageView: React.FC<LanguageViewProps> = ({
  settings,
  updateSettings,
  onBack,
}) => {
  const t = translations[settings.language];

  const languagesList: { code: LanguageCode; flag: string; name: string; nativeName: string; sampleSpeech: string }[] = [
    {
      code: 'id',
      flag: '🇮🇩',
      name: 'Bahasa Indonesia',
      nativeName: 'Bahasa Indonesia',
      sampleSpeech: 'Bahasa Indonesia dipilih. NURAI siap mendampingi Anda.',
    },
    {
      code: 'en',
      flag: '🇬🇧',
      name: 'English',
      nativeName: 'English (UK / US)',
      sampleSpeech: 'English language selected. NURAI is ready to assist you.',
    },
    {
      code: 'ar',
      flag: '🇸🇦',
      name: 'العربية',
      nativeName: 'اللغة العربية الفصحى',
      sampleSpeech: 'تم اختيار اللغة العربية. تطبيق نور آي في خدمتكم.',
    },
  ];

  const handleSelectLanguage = (code: LanguageCode, speech: string) => {
    soundEffects.playClick();
    updateSettings({ language: code });
    if (settings.spokenGuidance) {
      speechController.speakGuidance(speech, code);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
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

        <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
          {t.language.currentLanguage} <strong className="text-emerald-700 dark:text-amber-400 uppercase">{settings.language}</strong>
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="font-extrabold text-2xl text-emerald-950 dark:text-emerald-300 flex items-center gap-2.5">
          <Languages className="w-6 h-6 text-amber-500" />
          <span>{t.language.title}</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {t.language.subtitle}
        </p>
      </div>

      {/* Language Cards */}
      <div className="space-y-3">
        {languagesList.map((item) => {
          const isSelected = settings.language === item.code;

          return (
            <button
              key={item.code}
              onClick={() => handleSelectLanguage(item.code, item.sampleSpeech)}
              className={`w-full p-5 rounded-3xl border-2 transition flex items-center justify-between text-left group ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/50'
                  : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50 dark:bg-stone-900 dark:border-stone-800 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl filter drop-shadow-xs">{item.flag}</span>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
                    {item.nativeName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
