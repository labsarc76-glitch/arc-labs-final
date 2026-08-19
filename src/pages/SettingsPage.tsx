import React, { useState } from 'react';
import { 
  Palette, 
  Bell, 
  HelpCircle, 
  Package, 
  Info, 
  Sun, 
  Moon, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Image as ImageIcon,
  Activity
} from 'lucide-react';
import { useTheme, BACKGROUND_PRESETS, BackgroundTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { BRAND_CONSTANTS } from '../lib/constants';

interface SettingsPageProps {
  onNavigate: (path: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const { theme, isDark, setTheme, backgroundTheme, setBackgroundTheme } = useTheme();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState<'appearance' | 'notifications' | 'support' | 'orders' | 'about'>('appearance');

  const [telemetryUnit, setTelemetryUnit] = useState<'metric' | 'imperial'>('metric');
  const [soundAlerts, setSoundAlerts] = useState<boolean>(true);
  const [autoRotate3D, setAutoRotate3D] = useState<boolean>(true);

  return (
    <div id="settings-page-root" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8">
      {/* Back Button */}
      <div>
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/20 text-xs font-bold text-zinc-100 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white font-serif-display">
          Settings
        </h1>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Vertical Pill Navigation (4 cols) */}
        <div className="md:col-span-4 glass-panel rounded-3xl p-4 space-y-2">
          {[
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'support', label: 'Support & Docs', icon: HelpCircle },
            { id: 'orders', label: 'Orders & Hardware', icon: Package },
            { id: 'about', label: 'About Laboratory', icon: Info },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-400 text-zinc-950 font-bold shadow-lg shadow-emerald-500/25 scale-[1.02]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Content Panel (8 cols) */}
        <div className="md:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 space-y-8">
          {activeTab === 'appearance' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Header */}
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Palette className="w-5 h-5" />
                  <h2 className="text-xl sm:text-2xl font-normal text-white font-serif-display">
                    Appearance
                  </h2>
                </div>
                <p className="text-xs text-zinc-400">
                  Customize how A.R.C. LABS looks and feels across laboratory viewports.
                </p>
              </div>

              {/* Theme Selector (Light vs Dark) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Theme Mode
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Light Theme Card */}
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 text-center ${
                      theme === 'light'
                        ? 'bg-white/20 border-emerald-400 ring-2 ring-emerald-400/40 shadow-xl'
                        : 'bg-black/30 border-white/10 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <Sun className="w-7 h-7 text-amber-400" />
                    <span className="font-bold text-sm text-white">Light</span>
                  </button>

                  {/* Dark Theme Card */}
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 text-center ${
                      theme === 'dark'
                        ? 'bg-white/20 border-emerald-400 ring-2 ring-emerald-400/40 shadow-xl'
                        : 'bg-black/30 border-white/10 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <Moon className="w-7 h-7 text-cyan-400" />
                    <span className="font-bold text-sm text-white">Dark</span>
                  </button>
                </div>
              </div>

              {/* Relatable Background Theme Selector */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Relatable Background Atmosphere
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Select the high-fidelity background image displayed behind your glassmorphic interface.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BACKGROUND_PRESETS.map((preset) => {
                    const isSelected = backgroundTheme === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => setBackgroundTheme(preset.id)}
                        className={`relative group rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 p-3 space-y-2 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/50 shadow-xl scale-[1.02]'
                            : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60'
                        }`}
                      >
                        {/* Image Preview Thumbnail */}
                        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 relative">
                          {preset.imageSrc ? (
                            <img
                              src={preset.imageSrc}
                              alt={preset.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full bg-tech-grid bg-zinc-900 flex items-center justify-center">
                              <Layers className="w-8 h-8 text-zinc-500" />
                            </div>
                          )}

                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg font-bold">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-white font-display">
                            {preset.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">
                            {preset.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Telemetry Display Preferences */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Telemetry Units & Defaults
                </h3>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setTelemetryUnit('metric')}
                    className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-colors ${
                      telemetryUnit === 'metric'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-black/30 border-white/10 text-zinc-400'
                    }`}
                  >
                    Metric Units (°C, W, V, mA, mm)
                  </button>

                  <button
                    onClick={() => setTelemetryUnit('imperial')}
                    className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-colors ${
                      telemetryUnit === 'imperial'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-black/30 border-white/10 text-zinc-400'
                    }`}
                  >
                    Imperial Units (°F, BTU/hr, V, in)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Bell className="w-5 h-5" />
                  <h2 className="text-2xl font-normal text-white font-serif-display">
                    Telemetry & Alert Notifications
                  </h2>
                </div>
                <p className="text-xs text-zinc-400">
                  Configure real-time laboratory alerts and sensor safety triggers.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/10">
                  <div>
                    <h4 className="font-bold text-sm text-white">Tier-2 Gas Interlock Audio Alert</h4>
                    <p className="text-xs text-zinc-400">Play acoustic pulse when MQ-2 sensor exceeds 100 PPM threshold.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/10">
                  <div>
                    <h4 className="font-bold text-sm text-white">3D CAD Model Auto-Rotation</h4>
                    <p className="text-xs text-zinc-400">Slow 60fps orbital rotation on CATALYST Mk-1 topology stage.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoRotate3D}
                    onChange={(e) => setAutoRotate3D(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <HelpCircle className="w-5 h-5" />
                  <h2 className="text-2xl font-normal text-white font-serif-display">
                    Documentation & Support
                  </h2>
                </div>
                <p className="text-xs text-zinc-400">
                  Get assistance with prototype replication, CAD files, and academic inquiry.
                </p>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
                <p>
                  Direct laboratory support desk:{' '}
                  <a href="mailto:labsarc76@gmail.com" className="text-emerald-400 font-mono underline">
                    labsarc76@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
                >
                  Open Contact Desk
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Package className="w-5 h-5" />
                  <h2 className="text-2xl font-normal text-white font-serif-display">
                    Registered Orders
                  </h2>
                </div>
                <p className="text-xs text-zinc-400">
                  Track your hardware kit dispatches and benchmark module deliveries.
                </p>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-white">{o.orderNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                          {o.status}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400">
                        Total: <strong className="text-white font-mono">₹{o.total.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-400">No registered hardware orders yet.</p>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Info className="w-5 h-5" />
                  <h2 className="text-2xl font-normal text-white font-serif-display">
                    About A.R.C. LABS
                  </h2>
                </div>
                <p className="text-xs text-zinc-400">
                  {BRAND_CONSTANTS.fullName}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                A.R.C. LABS (Advanced Research & Catalyst Laboratories) is an open research collective investigating multi-stage energy conversion dynamics and solid-state thermoelectric generation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
