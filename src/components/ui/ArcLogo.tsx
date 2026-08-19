import React from 'react';

interface ArcLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  variant?: 'mark' | 'full' | 'pill' | 'card';
  onClick?: () => void;
}

export const ArcLogo: React.FC<ArcLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = false,
  className = '',
  variant = 'full',
  onClick,
}) => {
  const sizeMap = {
    xs: { img: 'w-6 h-6', text: 'text-xs', sub: 'text-[9px]' },
    sm: { img: 'w-8 h-8', text: 'text-sm', sub: 'text-[10px]' },
    md: { img: 'w-10 h-10', text: 'text-base', sub: 'text-[11px]' },
    lg: { img: 'w-14 h-14', text: 'text-lg', sub: 'text-xs' },
    xl: { img: 'w-20 h-20', text: 'text-xl', sub: 'text-xs' },
    '2xl': { img: 'w-28 h-28', text: 'text-2xl', sub: 'text-sm' },
    hero: { img: 'w-36 h-36 sm:w-44 sm:h-44', text: 'text-3xl sm:text-4xl', sub: 'text-sm' },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  if (variant === 'card') {
    return (
      <div 
        id="arc-logo-card"
        onClick={onClick}
        className={`p-4 rounded-3xl bg-white dark:bg-[#111218] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center space-y-3 ${onClick ? 'cursor-pointer hover:border-blue-500 transition-all' : ''} ${className}`}
      >
        <div className="relative p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-inner overflow-hidden">
          <img
            src="/logo.jpg"
            alt="A.R.C. LABS Official Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 block font-mono text-sm sm:text-base">
            A.R.C. LABS
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider block font-semibold">
            Advanced Research & Catalyst Laboratories
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div
        id="arc-logo-pill"
        onClick={onClick}
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 shadow-sm ${onClick ? 'cursor-pointer hover:scale-105 transition-all' : ''} ${className}`}
      >
        <img
          src="/logo.jpg"
          alt="A.R.C. LABS Mark"
          className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-500/30"
          referrerPolicy="no-referrer"
        />
        <span className="text-xs font-bold font-mono tracking-tight text-zinc-800 dark:text-zinc-200">
          A.R.C. LABS
        </span>
      </div>
    );
  }

  return (
    <div
      id="arc-logo-root"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Official Image Mark */}
      <div className="relative shrink-0 overflow-hidden rounded-xl bg-white dark:bg-zinc-900 ring-1 ring-zinc-200/80 dark:ring-zinc-700/80 shadow-sm p-0.5">
        <img
          src="/logo.jpg"
          alt="A.R.C. LABS Logo"
          className={`${selectedSize.img} object-contain rounded-lg transition-transform group-hover:scale-105`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-mono ${selectedSize.text}`}>
              A.R.C. LABS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          </div>
          {showSubtitle && (
            <span className={`text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase ${selectedSize.sub}`}>
              Advanced Research & Catalyst Laboratories
            </span>
          )}
        </div>
      )}
    </div>
  );
};
