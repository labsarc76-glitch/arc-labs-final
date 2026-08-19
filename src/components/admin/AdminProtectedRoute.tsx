import React, { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { ArcLogo } from '../ui/ArcLogo';
import { 
  Lock, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Terminal,
  Cpu
} from 'lucide-react';

interface AdminProtectedRouteProps {
  onExit: () => void;
}

const AUTH_STORAGE_KEY = 'arc_labs_admin_session_auth_token';
const REQUIRED_PASSWORD = 'ARCLABS';
// We also accept known valid aliases like 'ARC' or 'ADMIN@ARC_LABS' for developer convenience
const VALID_PASSWORDS = [REQUIRED_PASSWORD, 'ARC', 'ADMIN@ARC_LABS'];

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ onExit }) => {
  // Completely isolated authentication state - separate from main application state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsVerifying(true);

    setTimeout(() => {
      const trimmed = passwordInput.trim();
      if (VALID_PASSWORDS.includes(trimmed)) {
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        } catch (err) {
          console.warn('Session storage write failed', err);
        }
        setIsAuthenticated(true);
        setPasswordInput('');
        setAttempts(0);
      } else {
        setAttempts(prev => prev + 1);
        setErrorMessage(
          `Invalid security key (Attempt ${attempts + 1}). Hint: The default lab key is ARCLABS`
        );
      }
      setIsVerifying(false);
    }, 300);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn('Session storage delete failed', err);
    }
    setIsAuthenticated(false);
    setPasswordInput('');
    setErrorMessage(null);
  };

  // If successfully authenticated, render the full AdminDashboard
  if (isAuthenticated) {
    return (
      <div id="admin-authenticated-wrapper" className="relative min-h-screen">
        {/* Top Session Security Bar with Sign Out */}
        <div className="bg-zinc-950 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-bold text-white">A.R.C. LABS Secure Session Active</span>
            <span className="text-zinc-400 hidden sm:inline">• Auth: [ARCLABS Key]</span>
          </div>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white transition-colors text-[11px] font-bold flex items-center gap-1.5 border border-white/10"
          >
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Lock & Sign Out</span>
          </button>
        </div>

        <AdminDashboard onExit={onExit} />
      </div>
    );
  }

  // Otherwise, render the isolated, high-security password prompt screen
  return (
    <div 
      id="admin-security-gate" 
      className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-md space-y-6">
        {/* Official Logo Banner */}
        <div className="text-center space-y-3">
          <div className="inline-block p-3 rounded-3xl bg-black/60 border border-white/15 shadow-2xl">
            <img
              src="/logo.jpg"
              alt="A.R.C. LABS Official Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl mx-auto ring-2 ring-emerald-500/30"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-mono">
              A.R.C. LABS
            </h1>
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-400 font-mono">
              Administrative Command Gateway
            </p>
          </div>
        </div>

        {/* Security Access Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#131b18] text-white shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Restricted Terminal Access
              </h2>
              <p className="text-xs text-zinc-300">
                Enter authorized laboratory master key
              </p>
            </div>
          </div>

          {errorMessage && (
            <div 
              id="admin-auth-error"
              className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-xs text-red-300 flex items-start gap-2 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-semibold block">{errorMessage}</span>
                <span className="text-[11px] opacity-80">Default lab master key: ARCLABS</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label 
                htmlFor="admin-password-input"
                className="block text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono mb-1.5"
              >
                Security Passcode (ARCLABS)
              </label>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter passcode (e.g. ARCLABS)..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/15 bg-black/50 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-submit-passcode-btn"
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 disabled:opacity-50"
            >
              <span>{isVerifying ? 'Authenticating...' : 'Unlock Terminal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Prompt Information & Back */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <button
              onClick={onExit}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </button>

            <span className="font-mono text-[10px] text-zinc-400">
              Key: <code className="text-emerald-400 font-bold">ARCLABS</code>
            </span>
          </div>
        </div>

        {/* Security Disclaimers */}
        <div className="text-center">
          <p className="text-[11px] text-zinc-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authorized access logs are recorded for academic audit.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
