import React from 'react';
import { BRAND_CONSTANTS } from '../../lib/constants';
import { Atom, ArrowUpRight, ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-site-footer" className="relative border-t border-white/10 glass-panel text-zinc-300 transition-colors mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-black/40 border border-white/15 shadow-md p-0.5">
                <img
                  src="/logo.jpg"
                  alt="A.R.C. LABS Logo"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white font-display block">
                  {BRAND_CONSTANTS.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block font-mono">
                  {BRAND_CONSTANTS.nature}
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-300 max-w-md leading-relaxed">
              {BRAND_CONSTANTS.fullName} — <span className="font-serif-accent italic text-emerald-300">{BRAND_CONSTANTS.tagline}</span>
            </p>
            <div className="p-4 rounded-2xl border border-white/10 bg-black/40 text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Mock Scientific Standard</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Every measurement is strictly tagged as <span className="font-mono text-emerald-400 font-bold">MEASURED</span>, <span className="font-mono text-cyan-400 font-bold">CALCULATED</span>, <span className="font-mono text-amber-400 font-bold">ESTIMATED</span>, or <span className="font-mono text-purple-400 font-bold">THEORETICAL</span>.
              </p>
            </div>
          </div>

          {/* Col 2: Engineering & Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Projects & Hardware
            </h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <button
                  id="footer-link-catalyst"
                  onClick={() => onNavigate('/catalyst')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>CATALYST Mk-1</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">v1.0</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-store"
                  onClick={() => onNavigate('/store')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Hardware Catalog
                </button>
              </li>
              <li>
                <button
                  id="footer-link-cad-model"
                  onClick={() => onNavigate('/catalyst')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  3D CAD Interactive Stage
                </button>
              </li>
              <li>
                <button
                  id="footer-link-sensors"
                  onClick={() => onNavigate('/store')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sensors & Interlocks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Organization */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Research & Lab
            </h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <button
                  id="footer-link-research"
                  onClick={() => onNavigate('/research')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Research Areas (8 Active)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About the Collective
                </button>
              </li>
              <li>
                <button
                  id="footer-link-team"
                  onClick={() => onNavigate('/team')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Founders & Contributors
                </button>
              </li>
              <li>
                <button
                  id="footer-link-blog"
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Engineering Logbook
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              Contact & Inquiries
            </h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>
                <a
                  href="mailto:labsarc76@gmail.com"
                  className="hover:text-emerald-400 transition-colors font-mono text-xs block text-emerald-400"
                >
                  labsarc76@gmail.com
                </a>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sponsor & Collaboration Form
                </button>
              </li>
              <li>
                <button
                  id="footer-link-settings"
                  onClick={() => onNavigate('/settings')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs opacity-75"
                >
                  <span>Appearance & Themes</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-admin-gateway"
                  onClick={() => onNavigate('/admin')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs opacity-75"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Admin Terminal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Status Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>© {new Date().getFullYear()} A.R.C. LABS. Open Science & Engineering.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Benchtop Stage: Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
