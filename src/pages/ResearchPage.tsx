import React from 'react';
import { RESEARCH_AREAS } from '../lib/data/research';
import { 
  Zap, 
  Sun, 
  FlaskConical, 
  Flame, 
  Bot, 
  Brain, 
  Leaf, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Layers,
  Atom,
  Target,
  Compass
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  Sun,
  FlaskConical,
  Flame,
  Bot,
  Brain,
  Leaf,
  Cpu
};

export const ResearchPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div id="research-page-root" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full glow-orb-cyan filter blur-3xl opacity-40 -z-10 pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel shadow-sm border border-white/20">
            <img
              src="/logo.jpg"
              alt="A.R.C. LABS Logo"
              className="w-4 h-4 rounded object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-mono font-bold text-white">A.R.C. LABS</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-black shadow-sm">
            8 Active Domains
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          Core Research Disciplines
        </h1>
        <p className="text-base text-zinc-200 leading-relaxed font-normal">
          We investigate 8 core technical disciplines centered on solid-state thermoelectric energy recovery, electrochemical hydrogen generation, automated safety architectures, and sustainable hardware engineering.
        </p>
      </div>

      {/* 8 Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESEARCH_AREAS.map((res, idx) => {
          const Icon = ICON_MAP[res.iconName] || Zap;
          return (
            <div
              key={res.id}
              id={`research-card-${res.id}`}
              className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between space-y-6 border border-white/15 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ACTIVE INVESTIGATION
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Domain 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    {res.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400 font-display">
                    {res.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Current Scope:</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    {res.currentScope}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <Compass className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Future Scope:</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    {res.futureScope}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
