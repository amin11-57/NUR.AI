import React from 'react';
import {
  Info,
  Heart,
  ShieldAlert,
  Award,
  BookOpen,
  Keyboard,
  ArrowLeft,
  Users,
  HandHeart,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { AppSettings } from '../types';
import { translations } from '../i18n/translations';
import { NuraiLogo } from './NuraiLogo';
import { soundEffects } from '../utils/audioEffects';

interface AboutViewProps {
  settings: AppSettings;
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ settings, onBack }) => {
  const t = translations[settings.language];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header Back Button */}
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
      </div>

      {/* Hero Banner */}
      <div className="bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-700 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-stone-950 font-extrabold text-xs shadow-xs">
            <Award className="w-4 h-4" />
            <span>{t.about.projectBadge}</span>
          </div>

          <NuraiLogo size="lg" showText={true} />

          <p className="text-base sm:text-lg text-emerald-100 italic font-medium leading-relaxed pt-2 border-t border-emerald-700/60">
            {t.about.introParagraph}
          </p>

          <div className="pt-2 text-amber-300 font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>“{t.subTagline}”</span>
          </div>
        </div>
      </div>

      {/* PAI Educational Values Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
            <HandHeart className="w-4 h-4" />
            <span>{t.paiValuesTitle}</span>
          </div>
          <h3 className="font-extrabold text-xl text-emerald-950 dark:text-white">
            {t.about.valuesTitle}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.about.valuesDesc}
          </p>
        </div>

        {/* 5 Core Values Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.paiValues.empathy}</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Merasakan kebutuhan dan sudut pandang saudara penyandang disabilitas sensorik netra.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.paiValues.caring}</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Menumbuhkan kepekaan nurani untuk tanggap membantu lingkungan sekitar.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.paiValues.help} (Ta'awun)</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Bekerja sama dalam kebajikan dan meringankan beban sesama manusia.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-stone-800 border border-emerald-200/80 dark:border-stone-700 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.paiValues.sharing} (Khairunnas)</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              “Sebaik-baik manusia adalah yang paling bermanfaat bagi sesamanya.”
            </p>
          </div>

          <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>{t.paiValues.responsibleTech}</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300">
              Menggunakan kecerdasan buatan secara amanah, menghargai privasi sesama, dan menjaga martabat manusia.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Privacy Warning */}
      <div className="bg-rose-50/80 dark:bg-rose-950/30 rounded-3xl p-6 sm:p-7 border-2 border-rose-300 dark:border-rose-900 space-y-3">
        <div className="flex items-center gap-2.5 text-rose-900 dark:text-rose-300 font-extrabold text-base">
          <ShieldAlert className="w-6 h-6 text-rose-600" />
          <span>{t.about.privacyTitle}</span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-300 list-disc list-inside leading-relaxed">
          <li className="font-semibold text-rose-950 dark:text-rose-200">
            {t.about.privacyWarning1}
          </li>
          <li>
            {t.about.privacyWarning2}
          </li>
          <li>
            Foto diproses secara privat dan langsung melalui Gemini API tanpa disimpan di basis data publik.
          </li>
        </ul>
      </div>

      {/* Intel SFI & Educational Goals */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-4">
        <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 text-sm">
          <BookOpen className="w-4 h-4" />
          <span>{t.about.intelSkillsTitle}</span>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          {t.about.intelSkillsDesc}
        </p>

        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-start gap-3">
          <Keyboard className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
            <span className="font-bold text-stone-900 dark:text-stone-200">
              {t.about.keyboardTitle}
            </span>
            <p>{t.about.keyboardDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
