import React, { useState } from 'react';
import { CATALYST_PROJECT } from '../lib/data/projects';
import { InteractiveModelViewer } from '../components/marketing/InteractiveModelViewer';
import { SystemDiagram } from '../components/marketing/SystemDiagram';
import { DataMetric } from '../components/ui/DataMetric';
import { DataLabelBadge } from '../components/ui/Badge';
import { 
  Zap, 
  Flame, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  AlertTriangle, 
  BookOpen, 
  Clock, 
  Atom,
  HelpCircle,
  Radio,
  Sparkles,
  Terminal
} from 'lucide-react';

export const CatalystPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedSubsystemId, setSelectedSubsystemId] = useState<string | null>(null);

  return (
    <div id="catalyst-page-root" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-20">
      {/* Background Glow */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] rounded-full glow-orb-cyan filter blur-3xl opacity-50 -z-10 pointer-events-none" />

      {/* 1. Project Title & Executive Summary */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
            {CATALYST_PROJECT.name}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium glass-panel text-zinc-200 border border-white/20">
            {CATALYST_PROJECT.classification}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            {CATALYST_PROJECT.status}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display">
          CATALYST Mk-1
        </h1>
        <p className="text-xl sm:text-2xl text-emerald-400 font-semibold font-display">
          {CATALYST_PROJECT.subtitle}
        </p>

        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          {CATALYST_PROJECT.description}
        </p>
      </section>

      {/* 2. Interactive 3D Model Explorer Stage */}
      <section id="interactive-3d-subsystems" className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Stage 01 • Interactive Topology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Interactive Subsystem Explorer
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
            Rotate the physical benchtop model in 3D to inspect the thermal cascade, Seebeck array, and electrolysis chambers.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-white/15 shadow-2xl">
          <InteractiveModelViewer onSelectSubsystem={(id) => setSelectedSubsystemId(id)} />
        </div>
      </section>

      {/* 3. Thermodynamic Energy Flow Diagram */}
      <section id="energy-flow-diagram" className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Stage 02 • System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Thermodynamic Energy Flow
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
            Mathematical representation of closed-loop water recirculation and Seebeck thermal harvesting.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
          <SystemDiagram />
        </div>
      </section>

      {/* 4. Subsystems Technical Breakdown */}
      <section id="subsystems-breakdown" className="space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Stage 03 • Hardware Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Subsystem Specifications & Benchtop Data
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
            Hardware components, experimental tolerances, and verified instrumentation logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATALYST_PROJECT.subsystems.map((sub, idx) => (
            <div
              key={sub.id}
              id={`subsystem-card-${sub.id}`}
              className={`p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4 border border-white/15 ${
                selectedSubsystemId === sub.id ? 'ring-2 ring-emerald-400 border-emerald-400 shadow-xl' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    0{idx + 1}
                  </span>
                  <DataLabelBadge label={sub.metric.label} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {sub.name}
                  </h3>
                  <span className="text-xs font-medium text-emerald-400 font-mono block mt-0.5">
                    Role: {sub.role}
                  </span>
                </div>

                <p className="text-xs text-zinc-200 leading-relaxed">
                  {sub.specs}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-zinc-400 uppercase font-mono font-semibold">
                    Telemetry:
                  </span>
                  <span className="text-sm font-mono font-black text-white">
                    {sub.metric.value} {sub.metric.unit}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 block truncate">
                  {sub.metric.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Four-Tier Safety Architecture */}
      <section id="safety-architecture" className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Four-Tier Safety Interlock Architecture
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              Automated multi-layer hardware interlocks designed for safe hydrogen and thermal operation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 block">Tier 01</span>
            <h4 className="font-bold text-sm text-white">Flame Arrestor</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Sintered stainless steel flashback mesh preventing flame propagation back to the gas generation manifold.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 block">Tier 02</span>
            <h4 className="font-bold text-sm text-white">MQ-2 Electrochemical Relay</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Continuous atmospheric gas detection with sub-15ms optical relay shutdown when exceeding 100 PPM threshold.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 block">Tier 03</span>
            <h4 className="font-bold text-sm text-white">Mechanical Vent Valve</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Fail-safe spring-loaded pressure relief valve venting safely at 2.5 bar to eliminate over-pressurization risks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 block">Tier 04</span>
            <h4 className="font-bold text-sm text-white">Thermal Cutoff (110°C)</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Solid-state bimetallic thermal breaker directly cutting main DC power if reactor core exceeds maximum rating.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
