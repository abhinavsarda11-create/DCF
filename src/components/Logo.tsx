interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'default', size = 'md', className = '' }: LogoProps) {
  const isWhite = variant === 'white';

  // Responsive scale configurations
  const dimensions = {
    sm: { height: 42, emblemWidth: 46 },
    md: { height: 50, emblemWidth: 54 },
    lg: { height: 64, emblemWidth: 70 },
  }[size];

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 select-none ${className}`}>
      {/* Official Dawn Child Sun & Sleeping Baby Emblem with Radiant Solar Rays */}
      <div
        className="relative flex-shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: dimensions.emblemWidth, height: dimensions.height }}
      >
        <svg
          viewBox="0 0 160 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-xs"
        >
          <defs>
            {/* Sun Disc Gradient */}
            <linearGradient id="dc-sun-glow-grad" x1="16" y1="20" x2="80" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="35%" stopColor="#f25c27" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            {/* Radiant Sun Ray Gradient */}
            <linearGradient id="dc-ray-flame-grad" x1="50" y1="5" x2="160" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* Flame Rays Radiating from Sun towards Text */}
          {/* Ray 1: Upper-most sweeping solar flare */}
          <path
            d="M 58 24 C 68 14, 88 6, 114 14 C 132 19, 146 16, 162 10 C 148 18, 134 24, 112 22 C 92 20, 78 28, 64 34 Z"
            fill="url(#dc-ray-flame-grad)"
          />

          {/* Ray 2: Middle fluid sunbeam */}
          <path
            d="M 68 34 C 84 26, 112 28, 136 38 C 152 45, 168 46, 184 42 C 168 50, 150 52, 130 46 C 108 40, 88 44, 74 48 Z"
            fill="url(#dc-ray-flame-grad)"
          />

          {/* Ray 3: Lower delicate flame tendril */}
          <path
            d="M 74 48 C 90 44, 110 50, 126 58 C 138 64, 148 66, 160 64 C 148 70, 134 70, 120 64 C 104 58, 88 58, 76 60 Z"
            fill="url(#dc-ray-flame-grad)"
          />

          {/* Top Solar Flurry Accents */}
          <path d="M 44 20 C 42 12, 46 6, 50 2 C 51 8, 49 14, 48 20 Z" fill="#ea580c" />
          <path d="M 32 26 C 29 18, 32 12, 36 7 C 37 13, 35 19, 36 25 Z" fill="#ea580c" />
          <path d="M 54 20 C 56 12, 62 6, 68 3 C 67 9, 62 15, 58 21 Z" fill="#f59e0b" />

          {/* Sun Disc */}
          <circle cx="48" cy="54" r="35" fill="url(#dc-sun-glow-grad)" />

          {/* Ambient Inner Crescent Highlight */}
          <path
            d="M 20 44 C 23 28, 38 20, 56 21 C 40 22, 26 32, 23 48 C 21 58, 26 70, 36 78 C 26 71, 18 60, 20 44 Z"
            fill="#ffffff"
            opacity="0.25"
          />

          {/* Sleeping Baby Silhouette inside Sun */}
          {/* Baby Head Contour */}
          <ellipse cx="44" cy="46" rx="13" ry="14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />

          {/* Swirl of Hair on Forehead */}
          <path
            d="M 43 32 C 45 27, 51 28, 49 34 C 47 38, 43 36, 44 33"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sleeping Closed Eye & Eyelash */}
          <path
            d="M 36 45 C 38 48, 42 48, 44 45"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 43 45 L 45 43.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

          {/* Button Nose */}
          <path d="M 33 48 C 34 50, 36 50.5, 38 50" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

          {/* Gentle Resting Smile */}
          <path d="M 36 53 C 38 55, 41 55, 43 53" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

          {/* Tiny Baby Hand curled under chin */}
          <path
            d="M 37 57 C 34 58, 35 63, 38 64 C 41 65, 43 62, 42 58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Swaddled/Curled Baby Body following the sun's contour */}
          <path
            d="M 52 46 C 58 52, 59 66, 49 74 C 41 80, 31 77, 28 68 C 26 62, 29 57, 32 55"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Official Typography: Cursive Script + Subtitle */}
      <div className="flex flex-col justify-center -ml-1 sm:-ml-2">
        <span
          className={`font-normal tracking-wide transition-colors leading-[0.95] ${
            size === 'sm' ? 'text-2xl sm:text-3xl' : size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-[34px]'
          } ${
            isWhite
              ? 'text-white drop-shadow-sm'
              : 'text-[#9a3412] dark:text-[#fbbf24]'
          }`}
          style={{
            fontFamily: "'Alex Brush', 'Great Vibes', 'Brush Script MT', cursive",
          }}
        >
          Dawn Child
        </span>
        <span
          className={`font-semibold tracking-[0.12em] uppercase leading-none mt-1 ${
            size === 'sm' ? 'text-[8px] sm:text-[9px]' : size === 'lg' ? 'text-[11px] sm:text-xs' : 'text-[9px] sm:text-[10px]'
          } ${
            isWhite
              ? 'text-amber-100/95'
              : 'text-[#b45309] dark:text-amber-300'
          }`}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          Early Childhood Care &amp; Education
        </span>
      </div>
    </div>
  );
}

