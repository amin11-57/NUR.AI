import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileImage,
} from 'lucide-react';
import { AppSettings, AnalysisResult } from '../types';
import { translations } from '../i18n/translations';
import { SAMPLE_IMAGES, SampleItem } from '../utils/sampleImages';
import { soundEffects } from '../utils/audioEffects';
import { speechController } from '../utils/speechController';

interface UploadViewProps {
  settings: AppSettings;
  onAnalysisComplete: (result: AnalysisResult, imageBase64: string) => void;
  onCancel: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  settings,
  onAnalysisComplete,
  onCancel,
}) => {
  const t = translations[settings.language];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleFileChange = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar (JPG, PNG, WebP).');
      return;
    }

    soundEffects.playClick();
    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
      if (settings.spokenGuidance) {
        speechController.speakGuidance(`Gambar ${file.name} terpilih. Tekan tombol Analisis untuk mendengarkan.`, settings.language);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSampleSelect = (sample: SampleItem) => {
    soundEffects.playClick();
    setSelectedImage(sample.dataUrl);
    const itemName = sample.name[settings.language] || sample.name.id;
    setSelectedFileName(itemName);
    if (settings.spokenGuidance) {
      speechController.speakGuidance(`Contoh ${itemName} dipilih. Tekan tombol Analisis untuk mendengarkan.`, settings.language);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    soundEffects.playClick();
    setIsAnalyzing(true);

    if (settings.spokenGuidance) {
      speechController.speakGuidance(t.analysis.analyzingTitle, settings.language);
    }

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: 'image/jpeg',
          language: settings.language,
        }),
      });

      const json = await response.json();

      if (json.success && json.data) {
        soundEffects.playSuccessChime();
        soundEffects.vibrate([80, 50, 80]);
        onAnalysisComplete(json.data, selectedImage);
      } else {
        throw new Error(json.error || 'Gagal menganalisis');
      }
    } catch (err: any) {
      console.error('Upload analysis failed:', err);
      soundEffects.playAlert();
      alert(err?.message || 'Gagal menganalisis gambar. Periksa koneksi internet Anda.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundEffects.playClick();
            onCancel();
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <h2 className="font-extrabold text-lg text-emerald-950 dark:text-emerald-300">
          {t.upload.title}
        </h2>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />

      {/* Main Upload Dropzone / Preview */}
      {!selectedImage ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-3xl p-8 sm:p-12 text-center border-3 border-dashed transition flex flex-col items-center justify-center space-y-4 ${
            isDragging
              ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/30'
              : 'border-emerald-300 hover:border-emerald-500 bg-white dark:bg-stone-900 dark:border-stone-700'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          aria-label={t.upload.browseFiles}
        >
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shadow-inner">
            <UploadCloud className="w-10 h-10" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="font-extrabold text-lg text-emerald-950 dark:text-emerald-100">
              {t.upload.browseFiles}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {t.upload.dragDrop}
            </p>
          </div>

          <button
            type="button"
            className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
          >
            {t.upload.browseFiles}
          </button>
        </div>
      ) : (
        /* Image Preview with Analyze Action */
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-4">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-950 flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Preview Gambar Terpilih"
              className="w-full h-full object-contain"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin" />
                <p className="font-bold text-base">{t.analysis.analyzingTitle}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-600 dark:text-stone-400 px-1">
            <div className="flex items-center gap-1.5 truncate max-w-[220px]">
              <FileImage className="w-4 h-4 text-emerald-600" />
              <span className="truncate font-medium">{selectedFileName || 'Foto'}</span>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                setSelectedImage(null);
                setSelectedFileName(null);
              }}
              disabled={isAnalyzing}
              className="text-rose-600 hover:text-rose-700 dark:text-rose-400 font-semibold"
            >
              Ganti Gambar
            </button>
          </div>

          {/* Big Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-base sm:text-lg shadow-lg transition transform active:scale-98 focus:ring-4 focus:ring-amber-300"
          >
            <Sparkles className="w-6 h-6 fill-current text-stone-950" />
            <span>{t.upload.analyze}</span>
          </button>
        </div>
      )}

      {/* Presets / Classroom Demo Samples Section */}
      <div className="bg-emerald-50/70 dark:bg-stone-900/60 rounded-3xl p-5 border border-emerald-200/80 dark:border-stone-800 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
          <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
            {t.upload.orChooseSample}
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_IMAGES.map((sample) => {
            const name = sample.name[settings.language] || sample.name.id;
            const isSelected = selectedImage === sample.dataUrl;

            return (
              <button
                key={sample.id}
                onClick={() => handleSampleSelect(sample)}
                className={`relative flex flex-col items-center p-3 rounded-2xl border transition text-left text-xs ${
                  isSelected
                    ? 'border-amber-500 bg-amber-100/60 dark:bg-amber-950/40 ring-2 ring-amber-400'
                    : 'border-emerald-200/80 bg-white hover:bg-emerald-50 dark:bg-stone-800 dark:border-stone-700'
                }`}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-700 mb-2 flex items-center justify-center">
                  <img src={sample.dataUrl} alt={name} className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-center leading-tight line-clamp-2">
                  {name}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-amber-600 absolute top-2 right-2 fill-amber-200" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
