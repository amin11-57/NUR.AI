import React, { useState, useEffect } from 'react';
import {
  ActiveTab,
  AnalysisResult,
  AppSettings,
  HistoryItem,
} from './types';
import { loadSettings, saveSettings, loadHistory, saveHistoryItem, clearHistory, deleteHistoryItem } from './utils/storage';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CameraView } from './components/CameraView';
import { UploadView } from './components/UploadView';
import { ResultVoicePlayer } from './components/ResultVoicePlayer';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { LanguageView } from './components/LanguageView';
import { AboutView } from './components/AboutView';
import { SampleItem } from './utils/sampleImages';
import { soundEffects } from './utils/audioEffects';
import { speechController } from './utils/speechController';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);

  // Active analysis result state
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);

  // Update settings and persist
  const handleUpdateSettings = (partial: Partial<AppSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    saveSettings(updated);
    soundEffects.setEnabled(updated.soundEffects);
  };

  // Synchronize RTL layout and document lang
  useEffect(() => {
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
  }, [settings.language]);

  // Keyboard accessibility shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        if (currentResult) {
          speechController.stop();
          setCurrentResult(null);
          setCurrentImageSrc(null);
        } else if (activeTab !== 'home') {
          soundEffects.playClick();
          setActiveTab('home');
        }
      } else if (e.key === 'h' || e.key === 'H') {
        soundEffects.playClick();
        speechController.stop();
        setCurrentResult(null);
        setActiveTab('home');
      } else if (e.key === 's' || e.key === 'S') {
        soundEffects.playClick();
        speechController.stop();
        setCurrentResult(null);
        setActiveTab('quick-scan');
      } else if (e.key === 'c' || e.key === 'C') {
        soundEffects.playClick();
        speechController.stop();
        setCurrentResult(null);
        setActiveTab('scan');
      } else if (e.key === 'u' || e.key === 'U') {
        soundEffects.playClick();
        speechController.stop();
        setCurrentResult(null);
        setActiveTab('upload');
      } else if (e.key === 'r' || e.key === 'R') {
        if (currentResult) {
          e.preventDefault();
          speechController.replay();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentResult, activeTab]);

  // Handle analysis completed from Camera or Upload
  const handleAnalysisComplete = (result: AnalysisResult, imageBase64: string) => {
    setCurrentResult(result);
    setCurrentImageSrc(imageBase64);

    // Save to history automatically
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      thumbnail: imageBase64,
      language: settings.language,
      result,
    };
    const updatedHistory = saveHistoryItem(newItem);
    setHistory(updatedHistory);
  };

  // Sample selected from home or upload
  const handleSelectSample = async (sample: SampleItem) => {
    soundEffects.playClick();
    setCurrentImageSrc(sample.dataUrl);

    if (settings.spokenGuidance) {
      speechController.speakGuidance('Menganalisis contoh gambar, mohon tunggu sebentar...', settings.language);
    }

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: sample.dataUrl,
          mimeType: 'image/svg+xml',
          language: settings.language,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        soundEffects.playSuccessChime();
        handleAnalysisComplete(json.data, sample.dataUrl);
      } else {
        throw new Error(json.error || 'Gagal menganalisis');
      }
    } catch (err: any) {
      console.error('Sample analysis error:', err);
      soundEffects.playAlert();
      alert('Gagal menganalisis sampel: ' + (err?.message || 'Coba lagi'));
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentResult(item.result);
    setCurrentImageSrc(item.thumbnail);
  };

  // Compute theme and font size classes
  const getThemeClasses = () => {
    if (settings.contrastMode === 'high-contrast-yellow') {
      return 'bg-black text-amber-300 contrast-yellow';
    }
    if (settings.contrastMode === 'high-contrast-dark') {
      return 'bg-stone-950 text-stone-100 contrast-dark dark';
    }
    return 'bg-stone-50/70 text-stone-900';
  };

  const getFontSizeClasses = () => {
    if (settings.fontSize === 'extralarge') return 'text-lg';
    if (settings.fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${getThemeClasses()} ${getFontSizeClasses()}`}
    >
      {/* Header with Navigation and Quick Accessibility Actions */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          // If viewing result, exit result on tab change
          setCurrentResult(null);
          setCurrentImageSrc(null);
          speechController.stop();
          setActiveTab(tab);
        }}
        settings={settings}
        updateSettings={handleUpdateSettings}
      />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8"
        role="main"
      >
        {/* If there is an active analysis result, show ResultVoicePlayer */}
        {currentResult && currentImageSrc ? (
          <ResultVoicePlayer
            result={currentResult}
            imageSrc={currentImageSrc}
            settings={settings}
            updateSettings={handleUpdateSettings}
            onScanAgain={() => {
              speechController.stop();
              setCurrentResult(null);
              setCurrentImageSrc(null);
              setActiveTab('scan');
            }}
          />
        ) : (
          /* Render Selected Tab View */
          <>
            {activeTab === 'home' && (
              <HomeView
                settings={settings}
                setActiveTab={setActiveTab}
                onSelectSample={handleSelectSample}
              />
            )}

            {activeTab === 'quick-scan' && (
              <CameraView
                isQuickScan={true}
                settings={settings}
                onAnalysisComplete={handleAnalysisComplete}
                onCancel={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'scan' && (
              <CameraView
                isQuickScan={false}
                settings={settings}
                onAnalysisComplete={handleAnalysisComplete}
                onCancel={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'upload' && (
              <UploadView
                settings={settings}
                onAnalysisComplete={handleAnalysisComplete}
                onCancel={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={history}
                settings={settings}
                onClearHistory={handleClearHistory}
                onDeleteItem={handleDeleteHistoryItem}
                onSelectHistoryItem={handleSelectHistoryItem}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'language' && (
              <LanguageView
                settings={settings}
                updateSettings={handleUpdateSettings}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                updateSettings={handleUpdateSettings}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'about' && (
              <AboutView
                settings={settings}
                onBack={() => setActiveTab('home')}
              />
            )}
          </>
        )}
      </main>

      {/* Accessible Footer with PAI Quote & Project Attribution */}
      <footer className="w-full border-t border-emerald-900/10 dark:border-stone-800 bg-white/70 dark:bg-stone-900/80 backdrop-blur-xs py-5 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-stone-500 dark:text-stone-400">
          <div>
            <span className="font-extrabold text-emerald-950 dark:text-emerald-300">
              NURAI
            </span>{' '}
            — “Teknologi yang Membantu Melihat Dunia dengan Suara”
            <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
              Proyek PAI & BP – Intel Skills for Innovation • “Kenali dengan AI, Dengarkan dengan Hati.”
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
              Empati • Peduli • Tolong-Menolong • Berbagi Manfaat
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
