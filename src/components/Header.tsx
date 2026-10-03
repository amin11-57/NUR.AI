import React from 'react';
import {
  Volume2,
  VolumeX,
  Languages,
  Settings,
  Eye,
  Info,
  Clock,
  Home,
  Camera,
  UploadCloud,
  Zap,
} from 'lucide-react';
import { NuraiLogo } from './NuraiLogo';
import { ActiveTab, AppSettings, LanguageCode } from '../types';
import { translations } from '../i18n/translations';
import { soundEffects } from '../utils/audioEffects';
import { speechController } from '../utils/speechController';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  updateSettings,
}) => {
  const t = translations[settings.language];

  const handleTabChange = (tab: ActiveTab, promptText?: string) => {
    soundEffects.playClick();
    setActiveTab(tab);
    if (settings.spokenGuidance) {
      speechController.speakGuidance(promptText || tab, settings.language);
    }
  };

  const toggleHighContrast = () => {
    soundEffects.playClick();
    const nextMode =
      settings.contrastMode === 'standard'
        ? 'high-contrast-yellow'
        : settings.contrastMode === 'high-contrast-yellow'
        ? 'high-contrast-dark'
        : 'standard';
    updateSettings({ contrastMode: nextMode });
    if (settings.spokenGuidance) {
      const modeName =
        nextMode === 'standard'
          ? 'Mode standar'
          : nextMode === 'high-contrast-yellow'
          ? 'Mode ultra kontras kuning'
          : 'Mode gelap kontras';
      speechController.speakGuidance(modeName, settings.language);
    }
  };

  const toggleSoundGuidance = () => {
    const next = !settings.spokenGuidance;
    soundEffects.playClick();
    updateSettings({ spokenGuidance: next });
    if (next) {
      speechController.speakGuidance('Panduan suara diaktifkan', settings.language);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-emerald-900/10 shadow-xs transition-colors dark:bg-stone-900/95 dark:border-stone-800">
      {/* Skip to Content for Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-stone-950 focus:font-bold focus:rounded-md shadow-lg"
      >
        {t.accessibility.skipToContent}
      </a>

      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Logo and Home Click */}
        <button
          onClick={() => handleTabChange('home', `${t.nav.home} NURAI`)}
          className="flex items-center text-left rounded-xl focus:outline-hidden focus:ring-3 focus:ring-emerald-600 dark:focus:ring-amber-400 transition"
          aria-label={`${t.appName} - ${t.nav.home}`}
        >
          <NuraiLogo size="sm" showText={true} />
        </button>

        {/* Quick Accessibility & Navigation Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Scan Action (Golden Highlighted) */}
          <button
            onClick={() => handleTabChange('quick-scan', t.nav.quickScan)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition ${
              activeTab === 'quick-scan'
                ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-600'
                : 'bg-amber-400/20 text-amber-900 border border-amber-300 hover:bg-amber-400/40 dark:bg-amber-500/20 dark:text-amber-200 dark:border-amber-600'
            }`}
            aria-label={t.nav.quickScan}
          >
            <Zap className="w-4 h-4 fill-amber-500 text-amber-700 dark:text-amber-300" />
            <span>{t.nav.quickScan}</span>
          </button>

          {/* Toggle Contrast Button */}
          <button
            onClick={toggleHighContrast}
            title={t.settings.contrastMode}
            className={`p-2 rounded-xl transition border focus:outline-hidden focus:ring-3 focus:ring-emerald-600 ${
              settings.contrastMode !== 'standard'
                ? 'bg-amber-400 text-stone-950 border-amber-500 font-bold'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100 dark:bg-stone-800 dark:text-emerald-300 dark:border-stone-700'
            }`}
            aria-label={`${t.settings.contrastMode}: ${settings.contrastMode}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Spoken UI Guidance Toggle */}
          <button
            onClick={toggleSoundGuidance}
            title={t.settings.spokenGuidance}
            className={`p-2 rounded-xl transition border focus:outline-hidden focus:ring-3 focus:ring-emerald-600 ${
              settings.spokenGuidance
                ? 'bg-emerald-700 text-white border-emerald-800 dark:bg-emerald-600'
                : 'bg-stone-100 text-stone-500 border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700'
            }`}
            aria-label={`${t.settings.spokenGuidance}: ${settings.spokenGuidance ? 'Aktif' : 'Nonaktif'}`}
          >
            {settings.spokenGuidance ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Selector Button */}
          <button
            onClick={() => handleTabChange('language', t.nav.language)}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition focus:outline-hidden focus:ring-3 focus:ring-emerald-600 ${
              activeTab === 'language'
                ? 'bg-emerald-800 text-white border-emerald-900 dark:bg-emerald-600'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100 dark:bg-stone-800 dark:text-emerald-200 dark:border-stone-700'
            }`}
            aria-label={`${t.nav.language}: ${settings.language.toUpperCase()}`}
          >
            <Languages className="w-4 h-4" />
            <span className="uppercase">{settings.language}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={() => handleTabChange('settings', t.nav.settings)}
            className={`p-2 rounded-xl transition border focus:outline-hidden focus:ring-3 focus:ring-emerald-600 ${
              activeTab === 'settings'
                ? 'bg-emerald-800 text-white border-emerald-900 dark:bg-emerald-600'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100 dark:bg-stone-800 dark:text-emerald-200 dark:border-stone-700'
            }`}
            aria-label={t.nav.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className="w-full bg-emerald-900 text-white dark:bg-stone-950 border-t border-emerald-800/60 dark:border-stone-800"
        aria-label="Navigasi Utama"
      >
        <div className="max-w-6xl mx-auto px-2 flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max mx-auto sm:mx-0">
            {/* Beranda */}
            <button
              onClick={() => handleTabChange('home', t.nav.home)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition focus:outline-hidden focus:ring-2 focus:ring-amber-300 ${
                activeTab === 'home'
                  ? 'bg-emerald-800 text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.nav.home}</span>
            </button>

            {/* Quick Scan (Mobile prominent) */}
            <button
              onClick={() => handleTabChange('quick-scan', t.nav.quickScan)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition focus:outline-hidden focus:ring-2 focus:ring-amber-300 ${
                activeTab === 'quick-scan'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-amber-400/20 text-amber-200 hover:bg-amber-400/30'
              }`}
            >
              <Zap className="w-4 h-4 fill-amber-400 text-amber-300" />
              <span>{t.nav.quickScan}</span>
            </button>

            {/* Kamera Scan */}
            <button
              onClick={() => handleTabChange('scan', t.nav.scan)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition focus:outline-hidden focus:ring-2 focus:ring-amber-300 ${
                activeTab === 'scan'
                  ? 'bg-emerald-800 text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t.nav.scan}</span>
            </button>

            {/* Upload */}
            <button
              onClick={() => handleTabChange('upload', t.nav.upload)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition focus:outline-hidden focus:ring-2 focus:ring-amber-300 ${
                activeTab === 'upload'
                  ? 'bg-emerald-800 text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>{t.nav.upload}</span>
            </button>

            {/* Riwayat */}
            <button
              onClick={() => handleTabChange('history', t.nav.history)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition focus:outline-hidden focus:ring-2 focus:ring-amber-300 ${
                activeTab === 'history'
                  ? 'bg-emerald-800 text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{t.nav.history}</span>
            </button>

            {/* Tentang */}
            <button
              onClick={() => handleTabChange('about', t.nav.about)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition focus:outline-hidden focus:ring-2 focus:ring-amber-300 ${
                activeTab === 'about'
                  ? 'bg-emerald-800 text-amber-300 font-bold border-b-2 border-amber-400'
                  : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{t.nav.about}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
