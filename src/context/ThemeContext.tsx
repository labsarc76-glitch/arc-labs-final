import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';
export type BackgroundTheme = 'lab' | 'cleanroom' | 'solar' | 'cyber-grid';

export interface BackgroundPreset {
  id: BackgroundTheme;
  name: string;
  subtitle: string;
  imageSrc?: string;
  overlayClass: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'lab',
    name: 'Thermodynamics Lab',
    subtitle: 'Experimental energy test bench & copper heat sinks',
    imageSrc: '/src/assets/images/hero_lab_bg_1787116309715.jpg',
    overlayClass: 'bg-black/50 backdrop-blur-[2px]'
  },
  {
    id: 'cleanroom',
    name: 'Quantum Cleanroom',
    subtitle: 'Semiconductor optics & cyan laser instrumentation',
    imageSrc: '/src/assets/images/cleanroom_bg_1787116324187.jpg',
    overlayClass: 'bg-black/45 backdrop-blur-[2px]'
  },
  {
    id: 'solar',
    name: 'Solar Energy Array',
    subtitle: 'Twilight photovoltaic & thermoelectric collectors',
    imageSrc: '/src/assets/images/solar_thermal_bg_1787116342573.jpg',
    overlayClass: 'bg-black/50 backdrop-blur-[2px]'
  },
  {
    id: 'cyber-grid',
    name: 'Deep Cybernetic Grid',
    subtitle: 'Minimalist vector mesh & ambient particles',
    imageSrc: undefined,
    overlayClass: 'bg-tech-grid bg-[#0a0c10]'
  }
];

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (bg: BackgroundTheme) => void;
  currentBgPreset: BackgroundPreset;
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arc_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'; // Default dark for BhoomiX aesthetic
    }
    return 'dark';
  });

  const [backgroundTheme, setBackgroundThemeState] = useState<BackgroundTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arc_bg_theme') as BackgroundTheme;
      if (saved && BACKGROUND_PRESETS.some(p => p.id === saved)) return saved;
    }
    return 'lab';
  });

  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('arc_sidebar_expanded') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('arc_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('arc_bg_theme', backgroundTheme);
  }, [backgroundTheme]);

  useEffect(() => {
    localStorage.setItem('arc_sidebar_expanded', String(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const setBackgroundTheme = (bg: BackgroundTheme) => {
    setBackgroundThemeState(bg);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  const currentBgPreset = BACKGROUND_PRESETS.find(p => p.id === backgroundTheme) || BACKGROUND_PRESETS[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme,
        backgroundTheme,
        setBackgroundTheme,
        currentBgPreset,
        isSidebarExpanded,
        toggleSidebar
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
