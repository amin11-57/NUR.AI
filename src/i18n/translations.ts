import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  paiQuote: string;
  paiValuesTitle: string;
  paiValues: {
    empathy: string;
    caring: string;
    help: string;
    sharing: string;
    responsibleTech: string;
  };
  nav: {
    home: string;
    quickScan: string;
    scan: string;
    upload: string;
    history: string;
    language: string;
    settings: string;
    about: string;
  };
  home: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    startRecognizing: string;
    uploadImage: string;
    quickScanTitle: string;
    quickScanDesc: string;
    quickScanButton: string;
    howItWorksTitle: string;
    steps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
    };
    trySampleTitle: string;
    trySampleDesc: string;
  };
  camera: {
    title: string;
    instruction: string;
    takePhoto: string;
    retake: string;
    switchCamera: string;
    analyze: string;
    cameraError: string;
    requestPermission: string;
    shutterAria: string;
    cameraActive: string;
    photoTaken: string;
  };
  upload: {
    title: string;
    instruction: string;
    dragDrop: string;
    browseFiles: string;
    orChooseSample: string;
    analyze: string;
    selectedFile: string;
    noFileSelected: string;
  };
  analysis: {
    analyzingTitle: string;
    analyzingSubtitle: string;
    resultTitle: string;
    listen: string;
    pause: string;
    replay: string;
    stop: string;
    playingAudio: string;
    audioPaused: string;
    audioStopped: string;
    objectName: string;
    color: string;
    shape: string;
    position: string;
    detectedText: string;
    detailedDescription: string;
    paiReflection: string;
    audioControls: string;
    speed: string;
    volume: string;
    engine: string;
    scanAgain: string;
    savedToHistory: string;
    unclearWarning: string;
    privacyWarning: string;
  };
  history: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    listenAgain: string;
    clearAll: string;
    confirmClear: string;
    itemsCount: string;
    deleteItem: string;
  };
  language: {
    title: string;
    subtitle: string;
    currentLanguage: string;
    choose: string;
    idName: string;
    enName: string;
    arName: string;
  };
  settings: {
    title: string;
    subtitle: string;
    audioCategory: string;
    accessibilityCategory: string;
    voiceSpeed: string;
    voicePitch: string;
    voiceVolume: string;
    ttsEngine: string;
    ttsEngineDesc: string;
    engineBrowser: string;
    engineGeminiHD: string;
    contrastMode: string;
    contrastStandard: string;
    contrastYellowBlack: string;
    contrastDark: string;
    fontSize: string;
    fontSizeNormal: string;
    fontSizeLarge: string;
    fontSizeExtraLarge: string;
    spokenGuidance: string;
    spokenGuidanceDesc: string;
    soundEffects: string;
    soundEffectsDesc: string;
    autoPlay: string;
    autoPlayDesc: string;
    resetSettings: string;
  };
  about: {
    title: string;
    tagline: string;
    introParagraph: string;
    projectBadge: string;
    valuesTitle: string;
    valuesDesc: string;
    privacyTitle: string;
    privacyWarning1: string;
    privacyWarning2: string;
    educationalGoalTitle: string;
    educationalGoalDesc: string;
    intelSkillsTitle: string;
    intelSkillsDesc: string;
    keyboardTitle: string;
    keyboardDesc: string;
  };
  accessibility: {
    screenReaderAnnounce: string;
    skipToContent: string;
    closeModal: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  id: {
    appName: 'NURAI',
    tagline: 'Teknologi yang Membantu Melihat Dunia dengan Suara',
    subTagline: 'Kenali dengan AI, Dengarkan dengan Hati.',
    paiQuote: '“Gunakan ilmu dan teknologi untuk membantu sesama.”',
    paiValuesTitle: 'Nilai Pembelajaran PAI & Budi Pekerti',
    paiValues: {
      empathy: 'Empati',
      caring: 'Kepedulian',
      help: 'Tolong-Menolong',
      sharing: 'Berbagi Manfaat',
      responsibleTech: 'Teknologi Bertanggung Jawab',
    },
    nav: {
      home: 'Beranda',
      quickScan: 'Scan Cepat',
      scan: 'Scan Kamera',
      upload: 'Upload Gambar',
      history: 'Riwayat',
      language: 'Bahasa',
      settings: 'Pengaturan',
      about: 'Tentang NURAI',
    },
    home: {
      welcomeTitle: 'Selamat Datang di NURAI',
      welcomeSubtitle: 'Membantu saudara tunanetra dan pembelajar mengenali benda di hadapan melalui kecerdasan buatan dan suara penuh empati.',
      startRecognizing: '📷 Mulai Mengenali',
      uploadImage: '🖼️ Upload Gambar',
      quickScanTitle: 'Mode Praktis Tunanetra',
      quickScanDesc: 'Buka kamera, ambil foto dalam sekali sentuh, dan langsung dengarkan suara deskripsi tanpa langkah rumit.',
      quickScanButton: '⚡ SCAN CEPAT SEKARANG',
      howItWorksTitle: 'Alur Pengenalan NURAI',
      steps: {
        step1Title: '1. Arahkan / Upload',
        step1Desc: 'Arahkan kamera ke benda atau pilih berkas foto.',
        step2Title: '2. AI Menganalisis',
        step2Desc: 'Gemini mengenali benda, warna, bentuk, dan posisi.',
        step3Title: '3. Dengarkan Suara',
        step3Desc: 'Deskripsi suara otomatis dibacakan dengan jelas dan santun.',
      },
      trySampleTitle: 'Uji Coba Cepat (Sampel Belajar)',
      trySampleDesc: 'Siswa atau guru dapat langsung mencoba mengenali benda sekolah berikut tanpa perlu kamera:',
    },
    camera: {
      title: 'Kamera NURAI',
      instruction: 'Arahkan kamera ke objek yang ingin dikenali. Pastikan pencahayaan cukup.',
      takePhoto: '📷 Foto Sekarang',
      retake: '🔄 Ambil Ulang',
      switchCamera: '🔄 Balik Kamera',
      analyze: '✨ Analisis Gambar Sekarang',
      cameraError: 'Kamera tidak dapat diakses. Mohon izinkan akses kamera di peramban Anda.',
      requestPermission: 'Izinkan Akses Kamera',
      shutterAria: 'Ambil foto sekarang. Tekan spasi atau ketuk tombol ini.',
      cameraActive: 'Kamera aktif. Arahkan ke objek.',
      photoTaken: 'Foto berhasil diambil. Ketuk tombol Analisis Gambar untuk mendengarkan.',
    },
    upload: {
      title: 'Unggah Gambar',
      instruction: 'Pilih foto benda dari perangkat Anda untuk dianalisis oleh NURAI.',
      dragDrop: 'Tarik & lepas foto di sini, atau ketuk untuk memilih berkas',
      browseFiles: 'Pilih Berkas Foto',
      orChooseSample: 'Atau Pilih Contoh Objek Pembelajaran:',
      analyze: '✨ Analisis Gambar Ini',
      selectedFile: 'Berkas terpilih:',
      noFileSelected: 'Belum ada gambar yang dipilih.',
    },
    analysis: {
      analyzingTitle: 'Menganalisis Gambar...',
      analyzingSubtitle: 'Kecerdasan buatan sedang mengenali objek, warna, posisi, dan teks untuk Anda.',
      resultTitle: 'Hasil Pengenalan Objek',
      listen: '🔊 Dengarkan',
      pause: '⏸ Jeda',
      replay: '🔁 Ulangi',
      stop: '🔇 Berhenti',
      playingAudio: 'Sedang membacakan deskripsi suara...',
      audioPaused: 'Suara dijeda.',
      audioStopped: 'Suara dihentikan.',
      objectName: 'Benda Utama',
      color: 'Warna',
      shape: 'Bentuk',
      position: 'Posisi / Letak',
      detectedText: 'Teks Terlihat',
      detailedDescription: 'Penjelasan Lengkap',
      paiReflection: 'Refleksi Nilai Kebaikan (PAI)',
      audioControls: 'Kontrol Suara & Aksesibilitas',
      speed: 'Kecepatan',
      volume: 'Volume',
      engine: 'Mesin Suara',
      scanAgain: '📷 Kenali Benda Lain',
      savedToHistory: 'Tersimpan otomatis ke riwayat lokal Anda.',
      unclearWarning: 'Gambar kurang jelas. Silakan ambil foto dari jarak atau posisi yang lebih baik.',
      privacyWarning: 'Keamanan: NURAI tidak mengidentifikasi data pribadi atau wajah seseorang demi menjaga privasi.',
    },
    history: {
      title: 'Riwayat Pengenalan',
      subtitle: 'Daftar benda yang pernah Anda kenali. Anda dapat mendengarkan kembali suara deskripsi kapan saja.',
      emptyTitle: 'Belum Ada Riwayat',
      emptyDesc: 'Ambil foto atau unggah gambar untuk memulai pengenalan benda pertama Anda.',
      listenAgain: '🔊 Dengarkan Lagi',
      clearAll: '🗑️ Kosongkan Riwayat',
      confirmClear: 'Apakah Anda yakin ingin menghapus seluruh riwayat pengenalan?',
      itemsCount: 'benda tersimpan',
      deleteItem: 'Hapus',
    },
    language: {
      title: 'Pilih Bahasa / Language',
      subtitle: 'Bahasa yang dipilih akan digunakan untuk teks antarmuka, hasil analisis gambar, dan suara pembacaan.',
      currentLanguage: 'Bahasa aktif:',
      choose: 'Pilih Bahasa Ini',
      idName: 'Bahasa Indonesia (ID)',
      enName: 'English (EN)',
      arName: 'العربية (AR)',
    },
    settings: {
      title: 'Pengaturan & Aksesibilitas',
      subtitle: 'Sesuaikan kenyamanan suara dan tampilan antarmuka ramah tunanetra / low-vision.',
      audioCategory: 'Pengaturan Suara (Text-to-Speech)',
      accessibilityCategory: 'Tampilan & Aksesibilitas',
      voiceSpeed: 'Kecepatan Suara',
      voicePitch: 'Nada Suara',
      voiceVolume: 'Volume Suara',
      ttsEngine: 'Mesin Suara Utama',
      ttsEngineDesc: 'Pilih suara peramban lokal (cepat & offline) atau Gemini AI HD Voice (alami).',
      engineBrowser: 'Suara Sistem Peramban (Web Speech)',
      engineGeminiHD: 'Gemini Studio AI Voice (HD)',
      contrastMode: 'Mode Kontras Visual',
      contrastStandard: 'Standar (Hijau Islami & Emas)',
      contrastYellowBlack: 'Ultra Kontras (Kuning di atas Hitam)',
      contrastDark: 'Mode Gelap (Slate Kontras)',
      fontSize: 'Ukuran Huruf Teks',
      fontSizeNormal: 'Normal (100%)',
      fontSizeLarge: 'Besar (125%)',
      fontSizeExtraLarge: 'Sangat Besar (150%)',
      spokenGuidance: 'Panduan Suara Antarmuka (Audio Cues)',
      spokenGuidanceDesc: 'Membacakan nama tombol dan status layar saat berpindah menu.',
      soundEffects: 'Efek Suara Tombol (Beep & Chime)',
      soundEffectsDesc: 'Bunyi nada saat shutter ditekan atau proses selesai untuk membantu navigasi raba/dengar.',
      autoPlay: 'Otomatis Putar Suara Setelah Analisis',
      autoPlayDesc: 'Langsung membacakan hasil pengenalan tanpa perlu menekan tombol Dengarkan.',
      resetSettings: 'Kembalikan Pengaturan Awal',
    },
    about: {
      title: 'Tentang NURAI',
      tagline: 'Teknologi yang Membantu Melihat Dunia dengan Suara',
      introParagraph: '“Dibuat sebagai proyek pembelajaran untuk mengembangkan empati, kreativitas, problem solving, dan pemanfaatan teknologi untuk kebaikan.”',
      projectBadge: 'Proyek PAI & BP – Intel Skills for Innovation',
      valuesTitle: 'Pilar Nilai Pendidikan Agama Islam (PAI)',
      valuesDesc: 'NURAI lahir bukan hanya sebagai perkakas kecerdasan buatan, melainkan wujud nyata pembelajaran akhlak mulia dan kasih sayang kepada sesama makhluk.',
      privacyTitle: 'Keamanan, Etika & Privasi Data',
      privacyWarning1: 'Jangan gunakan aplikasi untuk mengambil atau menganalisis informasi pribadi yang sensitif.',
      privacyWarning2: 'Jika gambar berisi wajah seseorang, NURAI tidak akan memberikan identitas, nama, alamat, atau data pribadi individu. Foto diolah secara privat dan tidak disimpan permanen di peladen eksternal tanpa izin.',
      educationalGoalTitle: 'Tujuan Pembelajaran Siswa',
      educationalGoalDesc: 'Membekali peserta didik dengan kesadaran bahwa kemajuan teknologi AI harus dilandasi rasa kemanusiaan, empati kepada penyandang disabilitas sensorik netra, serta semangat tolong-menolong (ta’awun).',
      intelSkillsTitle: 'Integrasi Intel Skills for Innovation',
      intelSkillsDesc: 'Menerapkan komputasi berbasis AI untuk memecahkan persoalan dunia nyata (Real-World Problem Solving) secara inklusif dan mudah diakses oleh semua kalangan.',
      keyboardTitle: 'Pintasan Tombol Akses Cepat (Keyboard Shortcuts)',
      keyboardDesc: 'Spasi: Ambil Foto / Putar Suara | S: Scan Cepat | C: Kamera | U: Upload | H: Beranda | R: Ulangi Suara | Esc: Kembali',
    },
    accessibility: {
      screenReaderAnnounce: 'Pengumuman layar pembaca:',
      skipToContent: 'Lewati ke konten utama',
      closeModal: 'Tutup',
    },
  },
  en: {
    appName: 'NURAI',
    tagline: 'Technology Helping You See the World with Sound',
    subTagline: 'Recognize with AI, Listen with Heart.',
    paiQuote: '“Use knowledge and technology to help others.”',
    paiValuesTitle: 'Islamic Education & Character Values',
    paiValues: {
      empathy: 'Empathy',
      caring: 'Caring',
      help: 'Mutual Help',
      sharing: 'Sharing Benefits',
      responsibleTech: 'Responsible Technology',
    },
    nav: {
      home: 'Home',
      quickScan: 'Quick Scan',
      scan: 'Camera Scan',
      upload: 'Upload Image',
      history: 'History',
      language: 'Language',
      settings: 'Settings',
      about: 'About NURAI',
    },
    home: {
      welcomeTitle: 'Welcome to NURAI',
      welcomeSubtitle: 'Empowering blind and visually impaired friends to recognize objects through artificial intelligence and empathetic speech.',
      startRecognizing: '📷 Start Recognizing',
      uploadImage: '🖼️ Upload Image',
      quickScanTitle: 'Blind-Friendly Quick Mode',
      quickScanDesc: 'Open camera, snap with one tap, and hear voice descriptions immediately without complex navigation.',
      quickScanButton: '⚡ QUICK SCAN NOW',
      howItWorksTitle: 'How NURAI Works',
      steps: {
        step1Title: '1. Point / Upload',
        step1Desc: 'Point the camera towards an object or pick a photo.',
        step2Title: '2. AI Analyzes',
        step2Desc: 'Gemini recognizes the object, color, shape, and position.',
        step3Title: '3. Listen to Voice',
        step3Desc: 'Voice description is read aloud clearly and gently.',
      },
      trySampleTitle: 'Quick Classroom Demo (Samples)',
      trySampleDesc: 'Students and teachers can test recognition instantly with these school objects:',
    },
    camera: {
      title: 'NURAI Camera',
      instruction: 'Aim the camera at the object you want to identify. Ensure adequate lighting.',
      takePhoto: '📷 Take Photo',
      retake: '🔄 Retake',
      switchCamera: '🔄 Flip Camera',
      analyze: '✨ Analyze Image Now',
      cameraError: 'Camera cannot be accessed. Please grant camera permission in your browser.',
      requestPermission: 'Allow Camera Access',
      shutterAria: 'Take photo now. Press Space or tap this button.',
      cameraActive: 'Camera active. Point at an object.',
      photoTaken: 'Photo captured. Tap Analyze Image to hear the voice description.',
    },
    upload: {
      title: 'Upload Image',
      instruction: 'Choose a photo from your device to analyze with NURAI.',
      dragDrop: 'Drag & drop photo here, or tap to browse files',
      browseFiles: 'Browse Photos',
      orChooseSample: 'Or Select a Sample Learning Object:',
      analyze: '✨ Analyze This Image',
      selectedFile: 'Selected file:',
      noFileSelected: 'No image selected yet.',
    },
    analysis: {
      analyzingTitle: 'Analyzing Image...',
      analyzingSubtitle: 'Artificial intelligence is detecting objects, colors, position, and text for you.',
      resultTitle: 'Object Recognition Result',
      listen: '🔊 Listen',
      pause: '⏸ Pause',
      replay: '🔁 Replay',
      stop: '🔇 Stop',
      playingAudio: 'Reading voice description...',
      audioPaused: 'Audio paused.',
      audioStopped: 'Audio stopped.',
      objectName: 'Main Object',
      color: 'Color',
      shape: 'Shape',
      position: 'Position',
      detectedText: 'Visible Text',
      detailedDescription: 'Full Explanation',
      paiReflection: 'Moral & Empathy Reflection',
      audioControls: 'Audio Controls & Accessibility',
      speed: 'Speed',
      volume: 'Volume',
      engine: 'Voice Engine',
      scanAgain: '📷 Scan Another Object',
      savedToHistory: 'Automatically saved to your local history.',
      unclearWarning: 'The image is unclear. Please take another photo from a better distance or angle.',
      privacyWarning: 'Security: NURAI does not identify private personal data or human identities to preserve privacy.',
    },
    history: {
      title: 'Recognition History',
      subtitle: 'List of objects you have identified. You can listen to the audio description again anytime.',
      emptyTitle: 'No History Yet',
      emptyDesc: 'Take a photo or upload an image to start your first object recognition.',
      listenAgain: '🔊 Listen Again',
      clearAll: '🗑️ Clear History',
      confirmClear: 'Are you sure you want to clear your entire history?',
      itemsCount: 'items saved',
      deleteItem: 'Delete',
    },
    language: {
      title: 'Select Language',
      subtitle: 'The selected language will be used for UI menus, AI analysis text, and voice narration.',
      currentLanguage: 'Active language:',
      choose: 'Select This Language',
      idName: 'Bahasa Indonesia (ID)',
      enName: 'English (EN)',
      arName: 'العربية (AR)',
    },
    settings: {
      title: 'Settings & Accessibility',
      subtitle: 'Customize speech parameters and high-contrast display for blind and low-vision accessibility.',
      audioCategory: 'Speech Settings (Text-to-Speech)',
      accessibilityCategory: 'Display & Accessibility',
      voiceSpeed: 'Voice Speed',
      voicePitch: 'Voice Pitch',
      voiceVolume: 'Voice Volume',
      ttsEngine: 'Primary Speech Engine',
      ttsEngineDesc: 'Choose between browser speech (fast & offline) or Gemini AI HD Voice (lifelike).',
      engineBrowser: 'Browser System Voice (Web Speech)',
      engineGeminiHD: 'Gemini Studio AI Voice (HD)',
      contrastMode: 'Visual Contrast Mode',
      contrastStandard: 'Standard (Islamic Green & Gold)',
      contrastYellowBlack: 'Ultra Contrast (Yellow on Black)',
      contrastDark: 'Dark Mode (Contrast Slate)',
      fontSize: 'Font Size Scale',
      fontSizeNormal: 'Normal (100%)',
      fontSizeLarge: 'Large (125%)',
      fontSizeExtraLarge: 'Extra Large (150%)',
      spokenGuidance: 'Spoken Interface Guidance',
      spokenGuidanceDesc: 'Announces button names and screen changes for screen reader users.',
      soundEffects: 'Tactile Sound Effects',
      soundEffectsDesc: 'Chimes and beeps when taking photos or completing analysis.',
      autoPlay: 'Auto-Play Audio on Completion',
      autoPlayDesc: 'Immediately reads out recognition result without tapping Listen.',
      resetSettings: 'Reset to Defaults',
    },
    about: {
      title: 'About NURAI',
      tagline: 'Technology Helping You See the World with Sound',
      introParagraph: '“Created as an educational project to nurture empathy, creativity, problem-solving, and the responsible use of technology for good.”',
      projectBadge: 'PAI & BP Project – Intel Skills for Innovation',
      valuesTitle: 'Pillars of Islamic Character Education',
      valuesDesc: 'NURAI was conceived as a tangible manifestation of compassion, caring, and mutual assistance for our fellow human beings.',
      privacyTitle: 'Security, Ethics & Privacy',
      privacyWarning1: 'Do not use this app to capture or analyze sensitive personal information.',
      privacyWarning2: 'If an image contains human faces, NURAI will never reveal personal identities, names, or addresses. Photos are processed temporarily and never stored permanently on external servers.',
      educationalGoalTitle: 'Educational Goals for Students',
      educationalGoalDesc: 'Equipping learners with the conviction that AI technological progress must be anchored in humanity, empathy for sensory impaired individuals, and a spirit of helping one another (ta’awun).',
      intelSkillsTitle: 'Intel Skills for Innovation Integration',
      intelSkillsDesc: 'Applying AI technology to solve real-world accessibility challenges in an inclusive manner for all classrooms.',
      keyboardTitle: 'Keyboard Quick Navigation',
      keyboardDesc: 'Space: Capture / Play Audio | S: Quick Scan | C: Camera | U: Upload | H: Home | R: Repeat Audio | Esc: Back',
    },
    accessibility: {
      screenReaderAnnounce: 'Screen reader announcement:',
      skipToContent: 'Skip to main content',
      closeModal: 'Close',
    },
  },
  ar: {
    appName: 'نور آي (NURAI)',
    tagline: 'تكنولوجيا تُعين على رؤية العالم بالصوت',
    subTagline: 'تعرّف بالذكاء الاصطناعي، واستمع بقلبك.',
    paiQuote: '«استخدم العلم والتكنولوجيا لنفع الناس ومساعدة الآخرين.»',
    paiValuesTitle: 'قيم التربية الإسلامية والأخلاق',
    paiValues: {
      empathy: 'التعاطف',
      caring: 'الاهتمام والرعاية',
      help: 'التعاون والتآزر',
      sharing: 'نشر المنفعة',
      responsibleTech: 'التكنولوجيا المسؤولة',
    },
    nav: {
      home: 'الرئيسية',
      quickScan: 'المسح السريع',
      scan: 'الكاميرا',
      upload: 'رفع صورة',
      history: 'السجل',
      language: 'اللغة',
      settings: 'الإعدادات',
      about: 'عن التطبيق',
    },
    home: {
      welcomeTitle: 'مرحبًا بك في نور آي (NURAI)',
      welcomeSubtitle: 'مساعدة المكفوفين وضعاف البصر والطلاب على معرفة الأشياء المحيطة بهم عبر الذكاء الاصطناعي والصوت الدافئ.',
      startRecognizing: '📷 ابدأ بالتعرف',
      uploadImage: '🖼️ رفع صورة',
      quickScanTitle: 'الوضع السريع للمكفوفين',
      quickScanDesc: 'افتح الكاميرا، التقط بلمسة واحدة، واستمع إلى الوصف الصوتي فورًا دون خطوات معقدة.',
      quickScanButton: '⚡ مسح سريع الآن',
      howItWorksTitle: 'كيف يعمل تطبيق نور آي؟',
      steps: {
        step1Title: '١. وجّه أو ارفع الصورة',
        step1Desc: 'وجّه الكاميرا نحو الشيء أو اختر صورة من جهازك.',
        step2Title: '٢. تحليل الذكاء الاصطناعي',
        step2Desc: 'يتعرف الذكاء الاصطناعي على الشيء ولونه وشكله وموضعه بدقة.',
        step3Title: '٣. استمع للوصف الصوتي',
        step3Desc: 'يتم قراءة الوصف بصوت واضح وبسيط يسهل فهمه.',
      },
      trySampleTitle: 'تجربة سريعة (عينات تعليمية)',
      trySampleDesc: 'يمكن للطلاب والمعلمين تجربة التعرف الفوري على هذه الأدوات المدرسية دون الحاجة لكاميرا:',
    },
    camera: {
      title: 'كاميرا نور آي',
      instruction: 'وجّه الكاميرا نحو الشيء المراد التعرف عليه مع التأكد من وضوح الإضاءة.',
      takePhoto: '📷 التقط الصورة الآن',
      retake: '🔄 إعادة الالتقاط',
      switchCamera: '🔄 تبديل الكاميرا',
      analyze: '✨ تحليل الصورة الآن',
      cameraError: 'تعذر الوصول إلى الكاميرا. يُرجى السماح بالوصول إليها من إعدادات المتصفح.',
      requestPermission: 'السماح بالوصول للكاميرا',
      shutterAria: 'التقاط الصورة الآن. اضغط على مفتاح المسافة أو انقر هنا.',
      cameraActive: 'الكاميرا نشطة. وجّه نحو الشيء.',
      photoTaken: 'تم التقاط الصورة. انقر على زر التحليل للاستماع إلى النتيجة.',
    },
    upload: {
      title: 'رفع صورة',
      instruction: 'اختر صورة من جهازك ليقوم تطبيق نور آي بتحليلها وتوضيح محتواها.',
      dragDrop: 'اسحب وأفلت الصورة هنا، أو انقر للاختيار من جهازك',
      browseFiles: 'تصفح الصور',
      orChooseSample: 'أو اختر عينة تعليمية جاهزة:',
      analyze: '✨ تحليل هذه الصورة',
      selectedFile: 'الملف المختار:',
      noFileSelected: 'لم يتم اختيار أي صورة بعد.',
    },
    analysis: {
      analyzingTitle: 'جارٍ تحليل الصورة...',
      analyzingSubtitle: 'يقوم الذكاء الاصطناعي بالتعرف على الأجسام، الألوان، الموضع، والنصوص المكتوبة من أجلك.',
      resultTitle: 'نتيجة التعرف على الشيء',
      listen: '🔊 استماع',
      pause: '⏸ إيقاف مؤقت',
      replay: '🔁 إعادة',
      stop: '🔇 إيقاف',
      playingAudio: 'جارٍ تشغيل الوصف الصوتي...',
      audioPaused: 'تم إيقاف الصوت مؤقتًا.',
      audioStopped: 'تم إنهاء الصوت.',
      objectName: 'الشيء الأساسي',
      color: 'اللون',
      shape: 'الشكل',
      position: 'الموضع / المكان',
      detectedText: 'النص الظاهر',
      detailedDescription: 'الوصف التفصيلي',
      paiReflection: 'خاطرة وقيمة إيمانية (خير الناس أنفعهم للناس)',
      audioControls: 'التحكم بالصوت وسهولة الوصول',
      speed: 'السرعة',
      volume: 'مستوى الصوت',
      engine: 'محرك النطق',
      scanAgain: '📷 التعرف على شيء آخر',
      savedToHistory: 'تم الحفظ تلقائيًا في سجلك المحلي.',
      unclearWarning: 'الصورة غير واضحة. يرجى التقاط صورة أخرى من مسافة أو زاوية أفضل.',
      privacyWarning: 'الأمان: تطبيق نور آي لا يحدد البيانات الشخصية أو هويات الأفراد حفاظًا على الخصوصية.',
    },
    history: {
      title: 'سجل التعرف السابق',
      subtitle: 'قائمة بالأشياء التي تم التعرف عليها سابقًا، يمكنك إعادة الاستماع للوصف في أي وقت.',
      emptyTitle: 'لا يوجد سجل حتى الآن',
      emptyDesc: 'التقط صورة أو ارفع ملفًا لتبدأ أول عملية تعرف على الأشياء.',
      listenAgain: '🔊 استمع مجددًا',
      clearAll: '🗑️ مسح السجل بالكامل',
      confirmClear: 'هل أنت متأكد من رغبتك في مسح سجل التعرف بالكامل؟',
      itemsCount: 'عناصر محفوظة',
      deleteItem: 'حذف',
    },
    language: {
      title: 'اختر اللغة / Language',
      subtitle: 'اللغة المختارة ستُستخدم في واجهة التطبيق، ووصف الصور، والقراءة الصوتية.',
      currentLanguage: 'اللغة الحالية:',
      choose: 'اختيار هذه اللغة',
      idName: 'Bahasa Indonesia (ID)',
      enName: 'English (EN)',
      arName: 'العربية (AR)',
    },
    settings: {
      title: 'الإعدادات وسهولة الوصول',
      subtitle: 'تخصيص سرعة الصوت والتباين العالي المناسب للمكفوفين وضعاف البصر.',
      audioCategory: 'إعدادات تحويل النص إلى صوت (TTS)',
      accessibilityCategory: 'العرض وسهولة الوصول',
      voiceSpeed: 'سرعة النطق',
      voicePitch: 'طبقة الصوت',
      voiceVolume: 'مستوى الصوت',
      ttsEngine: 'محرك الصوت المفضل',
      ttsEngineDesc: 'اختر بين صوت المتصفح المباشر أو صوت استوديو جيميني عالي الجودة.',
      engineBrowser: 'صوت المتصفح المحلي (سريع وبدون تأخير)',
      engineGeminiHD: 'صوت جيميني فلاش الذكي (HD عالي الدقة)',
      contrastMode: 'وضع التباين اللوني',
      contrastStandard: 'القياسي (أخضر إسلامي مع ذهبي)',
      contrastYellowBlack: 'تباين فائق (أصفر على خلفية سوداء للمكفوفين)',
      contrastDark: 'الوضع الداكن المتناسق',
      fontSize: 'حجم الخط',
      fontSizeNormal: 'عادي (١٠٠٪)',
      fontSizeLarge: 'كبير (١٢٥٪)',
      fontSizeExtraLarge: 'كبير جدًا (١٥٠٪)',
      spokenGuidance: 'إرشادات صوتية للواجهة',
      spokenGuidanceDesc: 'نطق أسماء الأزرار وحالة الشاشة لتسهيل التنقل لمن يعانون من فقد البصر.',
      soundEffects: 'المؤثرات الصوتية للأزرار (النغمات)',
      soundEffectsDesc: 'إصدار صوت خفيف عند الضغط على الكاميرا أو إتمام التحليل للمساعدة الحسية.',
      autoPlay: 'تشغيل الصوت تلقائيًا فور اكتمال التحليل',
      autoPlayDesc: 'قراءة الوصف مباشرة دون الحاجة للبحث عن زر الاستماع.',
      resetSettings: 'إعادة ضبط الإعدادات الافتراضية',
    },
    about: {
      title: 'عن تطبيق نور آي (NURAI)',
      tagline: 'تكنولوجيا تُعين على رؤية العالم بالصوت',
      introParagraph: '«صُمم كمشروع تعليمي لتعزيز مشاعر التعاطف، والإبداع، وحل المشكلات، وتسخير التكنولوجيا في خدمة الخير والإنسانية.»',
      projectBadge: 'مشروع التربية الإسلامية – مهارات إنتل للابتكار (Intel SFI)',
      valuesTitle: 'ركائز وقيم التربية الإسلامية والأخلاق',
      valuesDesc: 'إن تطبيق نور آي ليس مجرد خوارزميات ذكاء اصطناعي، بل تطبيق عملي لأخلاق الإسلام السمحة وإعانة المحتاجين، انطلاقًا من حديث النبي ﷺ: «خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ».',
      privacyTitle: 'الأمان، الأخلاقيات، والخصوصية',
      privacyWarning1: 'لا تستخدم هذا التطبيق لتصوير أو تحليل معلومات شخصية حساسة أو وثائق سرية.',
      privacyWarning2: 'إذا احتوت الصورة على وجه شخص، فإن نور آي لا يفصح عن هويته أو اسمه أو معلوماته الشخصية حفاظًا على الخصوصية والستر. لا تُحفظ الصور بشكل دائم خارج جهازك دون إذنك.',
      educationalGoalTitle: 'الأهداف التربوية للطلاب',
      educationalGoalDesc: 'غرس الوعي لدى المتعلمين بأن التطور التكنولوجي يجب أن يقترن دائمًا بالبُعد الإنساني، والشعور بإخوانهم من ذوي الإعاقة البصرية، وبث روح التآزر والتعاون.',
      intelSkillsTitle: 'التكامل مع برنامج مهارات إنتل للابتكار',
      intelSkillsDesc: 'تطبيق مفاهيم الذكاء الاصطناعي لحل المشكلات الواقعية وجعل التكنولوجيا في متناول الجميع بطرق ميسرة وسلسة.',
      keyboardTitle: 'اختصارات لوحة المفاتيح للتنقل السريع',
      keyboardDesc: 'المسافة: التقاط/تشغيل الصوت | S: مسح سريع | C: كاميرا | U: رفع صورة | H: الرئيسية | R: إعادة الصوت | Esc: رجوع',
    },
    accessibility: {
      screenReaderAnnounce: 'إعلان قارئ الشاشة:',
      skipToContent: 'الانتقال إلى المحتوى الرئيسي',
      closeModal: 'إغلاق',
    },
  },
};
