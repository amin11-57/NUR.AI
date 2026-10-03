import React from 'react';
import {
  Camera,
  UploadCloud,
  Zap,
  Sparkles,
  BookOpen,
  Volume2,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab, AppSettings } from '../types';
import { translations } from '../i18n/translations';
import { NuraiLogo } from './NuraiLogo';
import { SAMPLE_IMAGES, SampleItem } from '../utils/sampleImages';
import { soundEffects } from '../utils/audioEffects';
import { speechController } from '../utils/speechController';

interface HomeViewProps {
  settings: AppSettings;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSample: (sample: SampleItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  settings,
  setActiveTab,
  onSelectSample,
}) => {
  const t = translations[settings.language];

  const handleNavigate = (tab: ActiveTab, promptText: string) => {
    soundEffects.playClick();
    setActiveTab(tab);
    if (settings.spokenGuidance) {
      speechController.speakGuidance(promptText, settings.language);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Hero Card with Islamic Green & Gold Radiance */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-10 shadow-xl border-2 border-emerald-700/80">
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Logo NURAI */}
          <NuraiLogo size="xl" showText={false} />

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              NUR<span className="text-amber-400">AI</span>
            </h1>
            <p className="text-base sm:text-xl font-bold text-amber-300 max-w-xl mx-auto">
              “{t.tagline}”
            </p>
            <p className="text-xs sm:text-sm font-medium text-emerald-200/90 tracking-wide">
              {t.subTagline}
            </p>
          </div>

          {/* Core PAI Quote Banner */}
          <div className="py-2 px-5 rounded-2xl bg-emerald-900/80 border border-emerald-600/70 text-amber-200 text-xs sm:text-sm font-semibold shadow-inner">
            {t.paiQuote}
          </div>

          {/* Quick Scan Big Button - Mode Cepat Tunanetra */}
          <div className="pt-2 w-full max-w-md">
            <button
              onClick={() => handleNavigate('quick-scan', 'Membuka Mode Scan Cepat')}
              className="w-full group relative flex items-center justify-center gap-3 px-6 py-5 rounded-3xl bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-extrabold text-lg sm:text-xl shadow-2xl transition transform hover:scale-[1.02] active:scale-95 ring-4 ring-amber-400/40 focus:outline-hidden focus:ring-4 focus:ring-white"
              aria-label={t.home.quickScanButton}
            >
              <Zap className="w-7 h-7 fill-stone-950 text-stone-950 animate-bounce" />
              <span>{t.home.quickScanButton}</span>
            </button>
            <p className="text-[11px] sm:text-xs text-emerald-200/80 mt-2">
              {t.home.quickScanDesc}
            </p>
          </div>

          {/* Primary Dual Actions: Mulai Mengenali & Upload Gambar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pt-2">
            {/* Foto Sekarang / Mulai Mengenali */}
            <button
              onClick={() => handleNavigate('scan', 'Membuka Kamera untuk Foto Sekarang')}
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-base shadow-md transition border border-emerald-500/60 active:scale-95 focus:outline-hidden focus:ring-3 focus:ring-amber-300"
              aria-label={t.home.startRecognizing}
            >
              <Camera className="w-5 h-5 text-amber-300" />
              <span>{t.home.startRecognizing}</span>
            </button>

            {/* Upload Gambar */}
            <button
              onClick={() => handleNavigate('upload', 'Membuka Menu Upload Gambar')}
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-white font-bold text-base shadow-md transition border border-emerald-700/80 active:scale-95 focus:outline-hidden focus:ring-3 focus:ring-amber-300"
              aria-label={t.home.uploadImage}
            >
              <UploadCloud className="w-5 h-5 text-amber-300" />
              <span>{t.home.uploadImage}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PAI Values Banner: Nilai Pembelajaran */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Pendidikan Agama Islam & Budi Pekerti
            </span>
            <h2 className="font-extrabold text-lg sm:text-xl text-emerald-950 dark:text-white">
              {t.paiValuesTitle}
            </h2>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/60 self-start sm:self-center">
            Intel Skills for Innovation
          </span>
        </div>

        {/* 4 Values Pill Grid: Empati • Peduli • Tolong-Menolong • Berbagi Manfaat */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700">
            <span className="text-2xl mb-1 block">🤝</span>
            <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
              {t.paiValues.empathy}
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Merasakan keterbatasan sesama
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700">
            <span className="text-2xl mb-1 block">💚</span>
            <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
              {t.paiValues.caring}
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Peduli & tanggap membantu
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700">
            <span className="text-2xl mb-1 block">🤲</span>
            <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
              {t.paiValues.help}
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Ta'awun dalam kebaikan
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700">
            <span className="text-2xl mb-1 block">🌟</span>
            <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
              {t.paiValues.sharing}
            </h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Khairunnas anfa'uhum linnas
            </p>
          </div>
        </div>
      </div>

      {/* How it works (Alur Pengenalan) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-4">
        <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{t.home.howItWorksTitle}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              1
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              {t.home.steps.step1Title}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {t.home.steps.step1Desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-extrabold flex items-center justify-center text-sm shadow-xs">
              2
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              {t.home.steps.step2Title}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {t.home.steps.step2Desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              3
            </div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              {t.home.steps.step3Title}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {t.home.steps.step3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Classroom Demonstration Samples */}
      <div className="bg-emerald-50/70 dark:bg-stone-900/60 rounded-3xl p-6 border border-emerald-200/80 dark:border-stone-800 space-y-4">
        <div className="space-y-1">
          <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-300 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <span>{t.home.trySampleTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {t.home.trySampleDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_IMAGES.map((sample) => {
            const name = sample.name[settings.language] || sample.name.id;
            return (
              <button
                key={sample.id}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectSample(sample);
                }}
                className="group p-3 rounded-2xl bg-white hover:bg-emerald-100/60 dark:bg-stone-800 dark:hover:bg-stone-700 border border-emerald-200 dark:border-stone-700 transition flex flex-col items-center text-center shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-700 mb-2 flex items-center justify-center">
                  <img
                    src={sample.dataUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
                  {name}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-amber-400 font-medium mt-1 flex items-center gap-1">
                  <span>Uji Coba</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
