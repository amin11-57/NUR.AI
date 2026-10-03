export interface SampleItem {
  id: string;
  name: {
    id: string;
    en: string;
    ar: string;
  };
  category: string;
  dataUrl: string;
}

// Crisp vector SVG sample images rendered as base64 data URLs for guaranteed offline/instant demo
function createSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

export const SAMPLE_IMAGES: SampleItem[] = [
  {
    id: 'sample-bottle',
    name: {
      id: 'Botol Air Minum di Meja',
      en: 'Water Bottle on Desk',
      ar: 'قارورة ماء على الطاولة',
    },
    category: 'Peralatan Siswa',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="65%" stop-color="#e2e8f0"/>
            <stop offset="65%" stop-color="#b45309"/>
            <stop offset="100%" stop-color="#78350f"/>
          </linearGradient>
          <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#1d4ed8"/>
            <stop offset="35%" stop-color="#3b82f6"/>
            <stop offset="70%" stop-color="#60a5fa"/>
            <stop offset="100%" stop-color="#1e40af"/>
          </linearGradient>
          <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#bg)"/>
        <!-- Desk Surface line -->
        <rect y="390" width="600" height="210" fill="#92400e" opacity="0.9"/>
        <line x1="0" y1="390" x2="600" y2="390" stroke="#f59e0b" stroke-width="6"/>

        <!-- Shadow -->
        <ellipse cx="300" cy="460" rx="90" ry="24" fill="#451a03" opacity="0.4"/>

        <!-- Bottle Body -->
        <path d="M 235 240 C 235 200 260 170 280 160 L 280 130 L 320 130 L 320 160 C 340 170 365 200 365 240 L 365 440 C 365 455 350 465 330 465 L 270 465 C 250 465 235 455 235 440 Z" fill="url(#bottle)"/>
        
        <!-- Grip Ridges -->
        <rect x="250" y="270" width="100" height="8" rx="4" fill="#93c5fd" opacity="0.6"/>
        <rect x="250" y="300" width="100" height="8" rx="4" fill="#93c5fd" opacity="0.6"/>
        <rect x="250" y="330" width="100" height="8" rx="4" fill="#93c5fd" opacity="0.6"/>

        <!-- Label -->
        <rect x="240" y="360" width="120" height="65" rx="6" fill="#ffffff" opacity="0.95"/>
        <text x="300" y="390" font-family="sans-serif" font-weight="bold" font-size="16" fill="#1e3a8a" text-anchor="middle">AIR BERSIH</text>
        <text x="300" y="410" font-family="sans-serif" font-size="12" fill="#2563eb" text-anchor="middle">600 ml • Halal</text>

        <!-- Cap -->
        <rect x="275" y="95" width="50" height="35" rx="5" fill="url(#cap)"/>
        <rect x="270" y="85" width="60" height="12" rx="3" fill="#64748b"/>
      </svg>
    `),
  },
  {
    id: 'sample-quran',
    name: {
      id: 'Buku Al-Qur\'an / Kitab Belajar',
      en: 'Al-Qur\'an / Islamic Book',
      ar: 'المصحف الشريف / كتاب إسلامي',
    },
    category: 'PAI & Ibadah',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <linearGradient id="bgQuran" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#022c22"/>
            <stop offset="100%" stop-color="#064e3b"/>
          </linearGradient>
          <linearGradient id="goldCover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#047857"/>
            <stop offset="50%" stop-color="#065f46"/>
            <stop offset="100%" stop-color="#064e3b"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#bgQuran)"/>
        <!-- Islamic Pattern background stars -->
        <circle cx="300" cy="300" r="240" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="8 8" opacity="0.3"/>
        
        <!-- Book Shadow -->
        <rect x="155" y="145" width="290" height="370" rx="14" fill="#000000" opacity="0.45"/>

        <!-- Book Spine & Pages -->
        <rect x="140" y="130" width="310" height="370" rx="12" fill="#fef3c7"/>
        <rect x="135" y="125" width="310" height="370" rx="12" fill="url(#goldCover)" stroke="#f59e0b" stroke-width="6"/>

        <!-- Gold Islamic Frame Ornament -->
        <rect x="165" y="155" width="250" height="310" rx="8" fill="none" stroke="#fbbf24" stroke-width="4"/>
        <rect x="175" y="165" width="230" height="290" rx="6" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 4"/>

        <!-- Center Medallion -->
        <circle cx="290" cy="305" r="65" fill="#064e3b" stroke="#f59e0b" stroke-width="4"/>
        <polygon points="290,250 305,290 345,290 315,315 325,355 290,330 255,355 265,315 235,290 275,290" fill="#fbbf24" opacity="0.3"/>
        
        <text x="290" y="300" font-family="'Amiri', serif" font-weight="bold" font-size="28" fill="#fbbf24" text-anchor="middle">القرآن الكريم</text>
        <text x="290" y="325" font-family="sans-serif" font-size="12" fill="#fef3c7" text-anchor="middle">AL-QUR'AN AL-KARIM</text>

        <!-- Gold Corner Accents -->
        <circle cx="180" cy="170" r="8" fill="#fbbf24"/>
        <circle cx="400" cy="170" r="8" fill="#fbbf24"/>
        <circle cx="180" cy="450" r="8" fill="#fbbf24"/>
        <circle cx="400" cy="450" r="8" fill="#fbbf24"/>
      </svg>
    `),
  },
  {
    id: 'sample-pencil-case',
    name: {
      id: 'Kotak Pensil & Alat Belajar',
      en: 'Pencil Case & Stationery',
      ar: 'مقلمة وأدوات دراسية',
    },
    category: 'Peralatan Siswa',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <rect width="600" height="600" fill="#f1f5f9"/>
        <!-- Desk Surface -->
        <rect y="360" width="600" height="240" fill="#cbd5e1"/>
        <line x1="0" y1="360" x2="600" y2="360" stroke="#94a3b8" stroke-width="4"/>

        <!-- Shadow -->
        <ellipse cx="300" cy="410" rx="190" ry="35" fill="#64748b" opacity="0.3"/>

        <!-- Ruler on desk -->
        <rect x="140" y="410" width="220" height="30" rx="4" fill="#fbbf24" transform="rotate(-5 250 420)" stroke="#d97706" stroke-width="2"/>
        <text x="180" y="430" font-family="monospace" font-size="14" fill="#78350f" transform="rotate(-5 250 420)">|||||||||||||||||||| 20cm</text>

        <!-- Pencil Case -->
        <rect x="150" y="270" width="310" height="120" rx="28" fill="#059669" stroke="#047857" stroke-width="5"/>
        <rect x="170" y="295" width="270" height="14" rx="7" fill="#fbbf24"/>
        <circle cx="410" cy="302" r="10" fill="#d97706"/>

        <!-- Pencils sticking out -->
        <polygon points="170,270 190,160 205,270" fill="#ef4444"/>
        <polygon points="190,160 185,130 195,130" fill="#fca5a5"/>
        <polygon points="190,130 190,120 190,120" stroke="#1e293b" stroke-width="4"/>

        <polygon points="220,270 235,170 250,270" fill="#3b82f6"/>
        <polygon points="260,270 275,150 290,270" fill="#eab308"/>

        <!-- Eraser -->
        <rect x="420" y="380" width="55" height="32" rx="6" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
        <rect x="420" y="380" width="24" height="32" rx="4" fill="#ffffff"/>
        <text x="432" y="402" font-family="sans-serif" font-weight="bold" font-size="10" fill="#0369a1" text-anchor="middle">JOY</text>
      </svg>
    `),
  },
  {
    id: 'sample-apple',
    name: {
      id: 'Buah Apel Merah Segar',
      en: 'Fresh Red Apple',
      ar: 'تفاحة حمراء طازجة',
    },
    category: 'Makanan & Buah',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
        <defs>
          <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#f87171"/>
            <stop offset="40%" stop-color="#dc2626"/>
            <stop offset="90%" stop-color="#991b1b"/>
            <stop offset="100%" stop-color="#450a0a"/>
          </radialGradient>
        </defs>
        <rect width="600" height="600" fill="#fefce8"/>
        <!-- Table -->
        <rect y="420" width="600" height="180" fill="#fed7aa"/>
        <line x1="0" y1="420" x2="600" y2="420" stroke="#f97316" stroke-width="4"/>

        <!-- Shadow -->
        <ellipse cx="300" cy="460" rx="100" ry="25" fill="#7c2d12" opacity="0.35"/>

        <!-- Apple Body -->
        <path d="M 300 240 C 260 210 180 230 180 320 C 180 410 260 460 300 460 C 340 460 420 410 420 320 C 420 230 340 210 300 240 Z" fill="url(#appleGrad)"/>

        <!-- Highlight -->
        <ellipse cx="250" cy="280" rx="35" ry="55" fill="#fca5a5" opacity="0.55" transform="rotate(-25 250 280)"/>

        <!-- Stem -->
        <path d="M 300 240 Q 305 180 330 170" fill="none" stroke="#78350f" stroke-width="8" stroke-linecap="round"/>

        <!-- Green Leaf -->
        <path d="M 310 210 Q 370 170 380 220 Q 340 230 310 210 Z" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
      </svg>
    `),
  },
];
