import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { LeftDock } from './components/layout/LeftDock';
import { TopPillBar } from './components/layout/TopPillBar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CatalystPage } from './pages/CatalystPage';
import { StorePage } from './pages/StorePage';
import { ResearchPage } from './pages/ResearchPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { ArcChatbot } from './components/ai/ArcChatbot';
import { Product } from './types';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') || '/';
      return hash.startsWith('/') ? hash : `/${hash}`;
    }
    return '/';
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const { notification } = useCart();
  const { currentBgPreset, isSidebarExpanded } = useTheme();

  // Listen to hash changes for browser history and deep links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      const cleanPath = hash.startsWith('/') ? hash : `/${hash}`;
      setCurrentPath(cleanPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching logic
  const renderCurrentPage = () => {
    if (currentPath === '/admin') {
      return <AdminProtectedRoute onExit={() => navigateTo('/')} />;
    }
    if (currentPath.startsWith('/settings')) {
      return <SettingsPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/catalyst')) {
      return <CatalystPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/store')) {
      return <StorePage onSelectProduct={(p) => setSelectedProduct(p)} />;
    }
    if (currentPath.startsWith('/research')) {
      return <ResearchPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/about')) {
      return <AboutPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/team')) {
      return <TeamPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/lab-notes') || currentPath.startsWith('/blog')) {
      return <BlogPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/contact')) {
      return <ContactPage />;
    }
    return (
      <HomePage
        onNavigate={navigateTo}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />
    );
  };

  const isAdminRoute = currentPath === '/admin';

  return (
    <div className="relative min-h-screen text-zinc-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* 1. Atmospheric Full-Bleed Background Viewport Wallpaper */}
      <div
        className="app-bg-wrapper"
        style={{
          backgroundImage: currentBgPreset.imageSrc ? `url("${currentBgPreset.imageSrc}")` : 'none',
        }}
      />

      {/* 2. Backdrop Overlay */}
      <div className={`app-bg-overlay ${currentBgPreset.overlayClass}`} />

      {/* Toast Notification */}
      {notification && (
        <div
          id="global-toast-notification"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Left Floating Capsule Dock */}
      {!isAdminRoute && (
        <LeftDock
          currentPath={currentPath}
          onNavigate={navigateTo}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />
      )}

      {/* Top Floating Capsule Search & Action Pill */}
      {!isAdminRoute && (
        <TopPillBar
          onNavigate={navigateTo}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />
      )}

      {/* Main Page Content Container (Padded on left for Left Dock and top for Top Pill) */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isAdminRoute
            ? 'pt-8'
            : isSidebarExpanded
            ? 'pt-24 pl-16 sm:pl-60 pr-4 sm:pr-8'
            : 'pt-24 pl-16 sm:pl-20 pr-4 sm:pr-8'
        }`}
      >
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      {!isAdminRoute && (
        <div className={isSidebarExpanded ? 'pl-16 sm:pl-60' : 'pl-16 sm:pl-20'}>
          <Footer onNavigate={navigateTo} />
        </div>
      )}

      {/* Floating AI Assistant Trigger Pill */}
      {!isAdminRoute && (
        <button
          id="floating-ai-chat-launcher"
          onClick={() => setIsAiChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 text-xs font-bold"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask ARC AI</span>
        </button>
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <ArcChatbot
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
