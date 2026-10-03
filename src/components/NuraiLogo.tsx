import React from 'react';

interface NuraiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const NuraiLogo: React.FC<NuraiLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 32, text: 'text-xl', badge: 'text-[10px]' },
    md: { icon: 44, text: 'text-2xl', badge: 'text-xs' },
    lg: { icon: 64, text: 'text-4xl', badge: 'text-sm' },
    xl: { icon: 84, text: 'text-5xl', badge: 'text-base' },
  };

  const dim = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* Radiant golden light pulse */}
        <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md scale-110" />
        <svg
          width={dim.icon}
          height={dim.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-md"
          aria-hidden="true"
        >
          <defs>
            {/* Islamic Green Emerald Gradient */}
            <linearGradient id="nuraiGreen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#047857" />
              <stop offset="0.55" stopColor="#065f46" />
              <stop offset="1" stopColor="#022c22" />
            </linearGradient>

            {/* Radiant Nur Gold Gradient */}
            <linearGradient id="nuraiGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.4" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="nurGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Shield / Rounded Polygon */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="26"
            fill="url(#nuraiGreen)"
            stroke="url(#nuraiGold)"
            strokeWidth="3.5"
          />

          {/* Radiant Sunburst Rays (Simbol Cahaya / Nur) */}
          <g stroke="url(#nuraiGold)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            <line x1="50" y1="16" x2="50" y2="24" />
            <line x1="50" y1="76" x2="50" y2="84" />
            <line x1="16" y1="50" x2="24" y2="50" />
            <line x1="76" y1="50" x2="84" y2="50" />
            <line x1="26" y1="26" x2="32" y2="32" />
            <line x1="68" y1="68" x2="74" y2="74" />
            <line x1="26" y1="74" x2="32" y2="68" />
            <line x1="68" y1="32" x2="74" y2="26" />
          </g>

          {/* Central Eye / Lens with AI Neural Nodes */}
          {/* Eye Outline (Melihat) */}
          <path
            d="M26 50 C 34 38, 66 38, 74 50 C 66 62, 34 62, 26 50 Z"
            fill="#064e3b"
            stroke="url(#nuraiGold)"
            strokeWidth="2.8"
          />

          {/* Central Sun / Pupil */}
          <circle cx="50" cy="50" r="10" fill="url(#nuraiGold)" filter="url(#nurGlow)" />
          <circle cx="50" cy="50" r="5" fill="#ffffff" />

          {/* Sound / Wave Arc on the right (Suara) */}
          <path
            d="M 68 40 C 72 45, 72 55, 68 60"
            stroke="#fef08a"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 74 36 C 80 43, 80 57, 74 64"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* AI Neural Circuit Points */}
          <circle cx="34" cy="45" r="2" fill="#6ee7b7" />
          <circle cx="38" cy="55" r="2" fill="#6ee7b7" />
          <line x1="34" y1="45" x2="38" y2="55" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="1 1" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-extrabold tracking-tight ${dim.text} text-emerald-950 dark:text-emerald-50`}>
              NUR<span className="text-amber-500">AI</span>
            </span>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded font-semibold tracking-wide bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700/50 ${dim.badge}`}>
              PAI & BP
            </span>
          </div>
          <span className="text-xs font-medium text-emerald-800/80 dark:text-emerald-300/80 leading-none mt-0.5">
            Melihat Dunia dengan Suara
          </span>
        </div>
      )}
    </div>
  );
};
