import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Zap,
  Volume2,
  ArrowLeft,
  Upload,
  CheckCircle,
} from 'lucide-react';
import { AppSettings, AnalysisResult } from '../types';
import { translations } from '../i18n/translations';
import { soundEffects } from '../utils/audioEffects';
import { speechController } from '../utils/speechController';

interface CameraViewProps {
  isQuickScan?: boolean;
  settings: AppSettings;
  onAnalysisComplete: (result: AnalysisResult, imageBase64: string) => void;
  onCancel: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  isQuickScan = false,
  settings,
  onAnalysisComplete,
  onCancel,
}) => {
  const t = translations[settings.language];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Spoken audio instruction on mount
  useEffect(() => {
    if (settings.spokenGuidance) {
      const guidanceText = isQuickScan
        ? 'Mode Scan Cepat. Kamera aktif. Arahkan ke objek lalu tekan tombol kuning besar untuk memfoto dan langsung mendengarkan.'
        : t.camera.cameraActive;
      speechController.speakGuidance(guidanceText, settings.language);
    }
  }, [isQuickScan, settings.language]);

  // Start Camera Stream
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let isMounted = true;

    async function initCamera() {
      setIsInitializing(true);
      setCameraError(null);

      // Stop previous stream if any
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: cameraFacing,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!isMounted) {
          newStream.getTracks().forEach((t) => t.stop());
          return;
        }

        currentStream = newStream;
        setStream(newStream);

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        console.error('Camera access error:', err);
        setCameraError(t.camera.cameraError);
        if (settings.spokenGuidance) {
          speechController.speakGuidance(t.camera.cameraError, settings.language);
        }
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacing]);

  // Keyboard shortcut: Spacebar captures photo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isAnalyzing) {
        e.preventDefault();
        if (!capturedImage) {
          handleCapturePhoto();
        } else {
          handleAnalyze();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [capturedImage, isAnalyzing, stream]);

  // Capture Snapshot from Video
  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    soundEffects.playCameraSnap();
    soundEffects.vibrate(120);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    setCapturedImage(dataUrl);

    // Stop video tracks while previewing
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (settings.spokenGuidance) {
      speechController.speakGuidance(t.camera.photoTaken, settings.language);
    }

    // In Quick Scan mode: automatically trigger analysis immediately!
    if (isQuickScan) {
      executeAnalysis(dataUrl);
    }
  };

  const handleRetake = () => {
    soundEffects.playClick();
    setCapturedImage(null);
    setCameraFacing((prev) => prev); // re-trigger effect
  };

  const handleFlipCamera = () => {
    soundEffects.playClick();
    setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleAnalyze = () => {
    if (!capturedImage) return;
    executeAnalysis(capturedImage);
  };

  const executeAnalysis = async (imageBase64: string) => {
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
          imageBase64,
          mimeType: 'image/jpeg',
          language: settings.language,
        }),
      });

      const json = await response.json();

      if (json.success && json.data) {
        soundEffects.playSuccessChime();
        soundEffects.vibrate([80, 50, 80]);
        onAnalysisComplete(json.data, imageBase64);
      } else {
        throw new Error(json.error || 'Gagal menganalisis');
      }
    } catch (err: any) {
      console.error('Analysis failed:', err);
      soundEffects.playAlert();
      alert(err?.message || 'Gagal menganalisis gambar. Periksa koneksi internet Anda.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundEffects.playClick();
            onCancel();
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 transition"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          {isQuickScan && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-stone-950 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{t.nav.quickScan}</span>
            </span>
          )}
          {!capturedImage && !cameraError && (
            <button
              onClick={handleFlipCamera}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-100 text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 transition"
              aria-label={t.camera.switchCamera}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.camera.switchCamera}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden bg-stone-950 border-4 border-emerald-800/80 shadow-2xl flex items-center justify-center">
        {/* Hidden Canvas for snapshot drawing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Live Video Feed */}
        {!capturedImage && !cameraError && (
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        )}

        {/* Captured Image Preview */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Foto yang diambil"
            className="w-full h-full object-contain bg-black"
          />
        )}

        {/* Viewfinder Overlay Guide (High-Contrast Reticle for Visually Impaired) */}
        {!capturedImage && !cameraError && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
            <div className="w-full flex justify-between items-center text-white/90 text-xs font-mono drop-shadow-md">
              <span className="bg-black/60 px-2.5 py-1 rounded-md">NURAI VISION</span>
              <span className="bg-black/60 px-2.5 py-1 rounded-md">
                {cameraFacing === 'environment' ? 'Belakang' : 'Depan'}
              </span>
            </div>

            {/* Tactile Framing Corners */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 relative border border-amber-300/40 rounded-2xl flex items-center justify-center">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-lg" />
              {/* Center Target Dot */}
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            </div>

            <p className="bg-black/75 text-amber-200 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full drop-shadow-md text-center">
              {t.camera.instruction}
            </p>
          </div>
        )}

        {/* Loading Spinner during analysis */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin" />
              <Sparkles className="w-7 h-7 text-amber-300 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">
                {t.analysis.analyzingTitle}
              </h3>
              <p className="text-sm text-stone-300 max-w-sm">
                {t.analysis.analyzingSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Camera Permission / Error Fallback */}
        {cameraError && (
          <div className="p-6 text-center text-white space-y-4 max-w-md">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="font-bold text-lg">{cameraError}</h3>
            <p className="text-xs text-stone-300">
              Anda juga dapat mengunggah foto langsung dari perangkat atau mencoba contoh gambar pembelajaran.
            </p>
            <button
              onClick={() => onCancel()}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition"
            >
              Gunakan Menu Upload
            </button>
          </div>
        )}
      </div>

      {/* Primary Action Controls */}
      <div className="pt-2">
        {!capturedImage ? (
          /* Live Shutter Button */
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleCapturePhoto}
              disabled={isInitializing || !!cameraError}
              className={`w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-3xl font-extrabold text-lg sm:text-xl shadow-xl transition transform active:scale-95 focus:ring-4 focus:ring-amber-300 ${
                isQuickScan
                  ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 ring-4 ring-amber-500/50'
                  : 'bg-emerald-800 hover:bg-emerald-700 text-white ring-4 ring-emerald-600/50'
              }`}
              aria-label={t.camera.shutterAria}
            >
              <Camera className="w-8 h-8 fill-current" />
              <span>{isQuickScan ? '⚡ FOTO & DENGARKAN LANGSUNG' : t.camera.takePhoto}</span>
            </button>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Tips Aksesibilitas: Tekan tombol <strong className="font-mono text-stone-700 dark:text-stone-200">Spasi</strong> pada keyboard untuk memfoto.
            </span>
          </div>
        ) : (
          /* Captured Preview Options */
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              disabled={isAnalyzing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-base transition dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
              aria-label={t.camera.retake}
            >
              <RefreshCw className="w-5 h-5" />
              <span>{t.camera.retake}</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-base sm:text-lg shadow-lg transition transform active:scale-95 focus:ring-4 focus:ring-amber-300"
              aria-label={t.camera.analyze}
            >
              <Sparkles className="w-6 h-6 fill-current text-stone-950" />
              <span>{t.camera.analyze}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
