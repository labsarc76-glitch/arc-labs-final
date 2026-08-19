import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { 
  Sun, 
  Moon, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Atom,
  Lock,
  ArrowRight,
  Terminal,
  Layers
} from 'lucide-react';
import { BRAND_CONSTANTS, NAV_LINKS } from '../../lib/constants';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenAiChat }) => {
  const { isDark, toggleTheme } = useTheme();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret admin trigger via 3 rapid clicks on the status pill or Ctrl+Shift+A
  const handleStatusClick = () => {
    const next = adminClickCount + 1;
    setAdminClickCount(next);
    if (next >= 3) {
      setAdminClickCount(0);
      onNavigate('/admin');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        onNavigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate]);

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2 sm:py-3'
          : 'py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-14 sm:h-16 px-3 sm:px-5 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl border border-zinc-200/80 dark:border-white/10'
            : 'bg-white/40 dark:bg-[#0E1118]/40 backdrop-blur-md border border-zinc-200/50 dark:border-white/5'
        }`}>
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              id="navbar-logo-btn"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-sm p-0.5 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.jpg"
                  alt="A.R.C. LABS Official Logo"
                  className="w-full h-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight text-lg text-zinc-900 dark:text-zinc-50 font-display">
                    A.R.C.
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-600/10 dark:bg-cyan-500/15 text-blue-600 dark:text-cyan-400 border border-blue-500/20 dark:border-cyan-500/30">
                    LABS
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-zinc-500 dark:text-zinc-400 hidden sm:block tracking-widest uppercase">
                  RESEARCH COLLECTIVE
                </span>
              </div>
            </button>

            {/* Subtle Live Hardware Status Indicator (Secret Admin Gate) */}
            <button
              id="navbar-status-indicator"
              onClick={handleStatusClick}
              title="Click 3 times for Admin Gateway"
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all hover:scale-105"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Mk-1 TEG: 45mW</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
              return (
                <button
                  key={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => onNavigate(link.href)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md scale-105'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (AI Chat, Cart, Theme Switcher) */}
          <div className="flex items-center gap-2">
            {/* ARC LABS AI Assistant Launcher */}
            <button
              id="navbar-ai-assistant-btn"
              onClick={onOpenAiChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="hidden sm:inline">AI Engineer</span>
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-white/10"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-md animate-bounce"
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Cosmic Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-transform active:scale-90"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden mt-2 p-4 rounded-2xl glass-panel shadow-2xl border border-zinc-200/80 dark:border-white/10 animate-fadeIn space-y-2"
          >
            <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
              {NAV_LINKS.map(link => {
                const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
                return (
                  <button
                    key={link.href}
                    id={`mobile-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => {
                      onNavigate(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                id="mobile-admin-access-btn"
                onClick={() => {
                  onNavigate('/admin');
                  setMobileMenuOpen(false);
                }}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 font-medium"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Terminal</span>
              </button>

              <span className="font-mono text-[10px] text-zinc-400">
                A.R.C. LABS Mk-1
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
