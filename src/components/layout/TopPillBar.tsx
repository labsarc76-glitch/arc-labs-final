import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  Sparkles, 
  Layers,
  Sliders,
  Check,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

interface TopPillBarProps {
  onNavigate: (path: string) => void;
  onOpenAiChat: () => void;
}

export const TopPillBar: React.FC<TopPillBarProps> = ({ onNavigate, onOpenAiChat }) => {
  const { totalCount, setIsCartOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [isStationMenuOpen, setIsStationMenuOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState('Core Lab Bench • Station 01');

  const STATIONS = [
    'Core Lab Bench • Station 01',
    'Thermodynamic Rig • Station 02',
    'Hydrogen Cell • Station 03',
    'Cleanroom Optics • Station 04'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onNavigate('/store');
    }
  };

  return (
    <header
      id="bhoomix-top-pill-bar"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl rounded-full glass-capsule px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-3"
    >
      {/* 1. Location / Station Selector Pill */}
      <div className="relative shrink-0">
        <button
          id="station-selector-btn"
          onClick={() => setIsStationMenuOpen(!isStationMenuOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-zinc-200 border border-white/10 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden md:inline truncate max-w-[130px]">{selectedStation}</span>
          <span className="md:hidden">Bench 01</span>
          <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
        </button>

        {isStationMenuOpen && (
          <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl glass-panel p-2 shadow-2xl space-y-1 z-50 border border-white/15">
            <span className="text-[10px] font-mono uppercase text-zinc-400 px-2 py-1 block font-bold">
              Select Active Station:
            </span>
            {STATIONS.map((station) => (
              <button
                key={station}
                onClick={() => {
                  setSelectedStation(station);
                  setIsStationMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  selectedStation === station
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                    : 'text-zinc-300 hover:bg-white/10'
                }`}
              >
                <span>{station}</span>
                {selectedStation === station && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Omnibar Search Input (⌘K) */}
      <form onSubmit={handleSearchSubmit} className="flex-1 relative max-w-xl mx-1 sm:mx-2">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          id="global-search-input"
          type="text"
          placeholder="Search research, components, CAD models..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-9 pr-12 py-1.5 rounded-full bg-black/30 dark:bg-white/10 text-xs sm:text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 border border-white/10"
        />
        <kbd className="hidden sm:inline absolute right-3.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/40 text-zinc-400 border border-white/10">
          ⌘K
        </kbd>
      </form>

      {/* 3. Action Buttons & Profile Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Hardware Store Cart Pill */}
        <button
          id="top-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-full text-zinc-300 hover:text-white bg-black/30 dark:bg-white/10 border border-white/10 hover:bg-black/50 transition-colors"
          title="Hardware Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center animate-pulse">
              {totalCount}
            </span>
          )}
        </button>

        {/* Labs Mode Badge */}
        <button
          onClick={() => onNavigate('/catalyst')}
          className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Labs Mode</span>
        </button>

        {/* Settings Pill */}
        <button
          id="top-settings-btn"
          onClick={() => onNavigate('/settings')}
          className="p-2 rounded-full text-zinc-300 hover:text-white bg-black/30 dark:bg-white/10 border border-white/10 hover:bg-black/50 transition-colors"
          title="Appearance & Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User / Org Avatar */}
        <button
          onClick={() => onNavigate('/about')}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          title="A.R.C. LABS Profile"
        >
          LA
        </button>
      </div>
    </header>
  );
};
