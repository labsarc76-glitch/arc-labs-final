import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  HelpCircle, 
  ShoppingBag, 
  Building2, 
  FlaskConical, 
  Users, 
  IndianRupee, 
  Settings, 
  Sun, 
  Moon, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface LeftDockProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenAiChat: () => void;
}

export const LeftDock: React.FC<LeftDockProps> = ({ currentPath, onNavigate, onOpenAiChat }) => {
  const { isDark, toggleTheme, isSidebarExpanded, toggleSidebar } = useTheme();

  const NAV_ITEMS = [
    { id: 'home', path: '/', label: 'Overview', icon: LayoutDashboard },
    { id: 'catalyst', path: '/catalyst', label: 'CATALYST Mk-1 3D', icon: Scan },
    { id: 'store', path: '/store', label: 'Hardware Store', icon: ShoppingBag },
    { id: 'research', path: '/research', label: 'Research Tracks', icon: FlaskConical },
    { id: 'team', path: '/team', label: 'Engineering Team', icon: Users },
    { id: 'blog', path: '/blog', label: 'Lab Notes', icon: HelpCircle },
    { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      id="bhoomix-left-dock"
      className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col justify-between items-center py-4 px-2 rounded-full glass-capsule transition-all duration-300 ${
        isSidebarExpanded ? 'w-56 px-4 rounded-3xl' : 'w-14 sm:w-16'
      } max-h-[92vh] overflow-y-auto no-scrollbar`}
    >
      {/* Top Logo / Brand Glyph */}
      <div className="flex flex-col items-center gap-3 w-full pb-2 border-b border-white/10 dark:border-white/10">
        <button
          onClick={() => onNavigate('/')}
          className="relative group p-1 rounded-full overflow-hidden hover:scale-105 transition-transform"
          title="A.R.C. LABS Home"
        >
          <img
            src="/logo.jpg"
            alt="A.R.C. LABS Official Seal"
            className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full ring-2 ring-emerald-500/40"
            referrerPolicy="no-referrer"
          />
        </button>

        {isSidebarExpanded && (
          <div className="text-center">
            <span className="text-xs font-mono font-bold text-white tracking-wide block">A.R.C. LABS</span>
            <span className="text-[10px] text-zinc-400 font-mono">Thermodynamics</span>
          </div>
        )}

        {/* Expand / Collapse Button */}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
          title={isSidebarExpanded ? 'Collapse Dock' : 'Expand Dock'}
        >
          {isSidebarExpanded ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Center Nav Icons */}
      <div className="flex flex-col items-center gap-2 py-3 w-full">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? currentPath === '/'
              : currentPath.startsWith(item.path);

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`relative group flex items-center ${
                isSidebarExpanded ? 'justify-start px-3 w-full' : 'justify-center w-10 sm:w-11'
              } h-10 sm:h-11 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              {/* Active Left Indicator Notch */}
              {isActive && !isSidebarExpanded && (
                <span className="absolute -left-2 w-1 h-5 rounded-r-full bg-emerald-400" />
              )}

              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />

              {isSidebarExpanded && (
                <span className="ml-3 text-xs font-medium text-zinc-200 truncate">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom User Avatar & Theme Switcher */}
      <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/10 dark:border-white/10 w-full">
        {/* User Initial Badge */}
        <button
          onClick={() => onNavigate('/admin')}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/40 hover:scale-105 transition-all"
          title="Laboratory Admin Gate"
        >
          ARC
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>
      </div>
    </aside>
  );
};
