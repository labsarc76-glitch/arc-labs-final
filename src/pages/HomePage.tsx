import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Cpu, 
  ShoppingBag, 
  Layers, 
  Atom, 
  CheckCircle2,
  Activity,
  ArrowUpRight,
  Sliders,
  Radio,
  RotateCcw,
  Gauge,
  Workflow,
  ThermometerSnowflake,
  BookOpen,
  Droplets,
  CloudRain,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BRAND_CONSTANTS } from '../lib/constants';
import { CATALYST_PROJECT } from '../lib/data/projects';
import { PRODUCTS } from '../lib/data/products';
import { RESEARCH_AREAS } from '../lib/data/research';
import { InteractiveModelViewer } from '../components/marketing/InteractiveModelViewer';
import { SystemDiagram } from '../components/marketing/SystemDiagram';
import { DataMetric } from '../components/ui/DataMetric';
import { ProductCard } from '../components/store/ProductCard';
import { DataLabelBadge } from '../components/ui/Badge';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenAiChat: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct, onOpenAiChat }) => {
  const flagshipProducts = PRODUCTS.filter(p => p.isFlagship);

  // Live Seebeck Interactive Calculator State
  const [hotSideTemp, setHotSideTemp] = useState<number>(65);
  const [coldSideTemp, setColdSideTemp] = useState<number>(25);
  const seebeckCoeff = 0.04; // V/°C per module
  const numModules = 4;
  const deltaT = Math.max(0, hotSideTemp - coldSideTemp);
  const calculatedVoltage = (deltaT * seebeckCoeff * (numModules / 4) * 1.5).toFixed(2);
  const estimatedPower = ((deltaT * deltaT) * 0.028).toFixed(1);

  // Interactive Gas Sensor Relay Simulation State
  const [gasPpm, setGasPpm] = useState<number>(45);
  const isSafetyTripped = gasPpm > 100;

  // 6 Live Telemetry Channels (Matching BhoomiX 7-day weather strip design)
  const TELEMETRY_STAGES = [
    { id: 'ch1', day: 'Stage 1', name: 'PEM Electrolyzer', temp: '29°C', metric: '1.8 V', sub: '250 mA', icon: Droplets, status: 'Active' },
    { id: 'ch2', day: 'Stage 2', name: 'Reaction Core', temp: '65°C', metric: '1.2 bar', sub: 'Combustion', icon: Flame, status: 'Optimal' },
    { id: 'ch3', day: 'Stage 3', name: 'Seebeck TEG', temp: '28°C', metric: '0.85 V', sub: '45 mW DC', icon: Zap, status: 'Harvesting' },
    { id: 'ch4', day: 'Stage 4', name: 'Water Sump', temp: '24°C', metric: '0.95 L', sub: 'Condensing', icon: CloudRain, status: 'Circulating' },
    { id: 'ch5', day: 'Stage 5', name: 'MQ-2 Relay', temp: '22°C', metric: '42 ppm', sub: '< 15ms Interlock', icon: ShieldCheck, status: 'Secured' },
    { id: 'ch6', day: 'Stage 6', name: 'Supercap Bank', temp: '21°C', metric: '5.2 V', sub: '100 F Reserve', icon: Cpu, status: 'Charged' },
  ];

  return (
    <div id="home-page-root" className="relative space-y-24 sm:space-y-36 pb-24 overflow-hidden">
      {/* 1. High-Impact BhoomiX-Inspired Hero Section */}
      <section id="hero-section" className="relative pt-8 sm:pt-16 lg:pt-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {/* Eyebrow Label */}
          <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-zinc-300 dark:text-zinc-300 block">
            TOOLS & ADVISORY FOR EXPERIMENTAL ENERGY CONVERSION
          </span>

          {/* Large Serif Title (Matching BhoomiX 'GROW SMARTER') */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white font-serif-display uppercase leading-[0.95]">
              CATALYZE <br />
              SMARTER
            </h1>
            <p className="text-2xl sm:text-3xl text-emerald-400 font-serif-accent font-normal italic">
              with A.R.C. LABS
            </p>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
            Tools, benchtop telemetry, and solid-state hardware for every thermodynamics researcher. Transparent data from benchtop to field.
          </p>

          {/* Action Capsule Buttons & Floating Callout Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-explore-catalyst-btn"
                onClick={() => onNavigate('/catalyst')}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#FAF8F5] text-zinc-950 hover:bg-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                CATALYST Mk-1 3D
              </button>

              <button
                id="hero-browse-store-btn"
                onClick={() => onNavigate('/store')}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold glass-capsule text-white hover:bg-white/10 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Explore Hardware
              </button>
            </div>

            {/* Floating Glass Callout Box (Right Side) */}
            <div className="glass-panel rounded-3xl p-5 sm:p-6 max-w-md border border-white/15 shadow-2xl space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif-display text-lg sm:text-xl text-white font-normal">
                  Verified by 1,200+ Benchmark Runs
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Direct thermoelectric Seebeck harvesting, sub-15ms electrochemical gas safety interlocks, and 8 active research tracks across open science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Telemetry 6-Channel Strip (Matching BhoomiX 'Next 7 Days' weather bar) */}
      <section id="telemetry-channel-strip" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Live Stage Telemetry (6 Active Channels)</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">
              Auto-Polling @ 10Hz
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TELEMETRY_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  className="p-4 rounded-2xl bg-black/40 dark:bg-black/50 border border-white/10 text-center space-y-2 hover:border-emerald-400/40 transition-colors"
                >
                  <span className="text-[11px] font-mono text-zinc-400 font-bold block">
                    {stage.day}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="text-lg font-black font-tech-mono text-white">
                      {stage.temp}
                    </div>
                    <div className="text-xs font-bold text-emerald-400 font-tech-mono">
                      {stage.metric}
                    </div>
                  </div>

                  <span className="text-[10px] text-zinc-400 font-medium block truncate">
                    {stage.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 'Everything in One Place' Bento Section (Matching Screenshot 3) */}
      <section id="everything-bento-section" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl font-normal text-white font-serif-display">
            Everything in One Place
          </h2>
          <p className="text-sm text-zinc-300">
            From core physics to benchtop deployment — explore every tool and subsystem.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 3D CAD Stage (8 cols) */}
          <div className="md:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <InteractiveModelViewer onSelectSubsystem={() => onNavigate('/catalyst')} />
          </div>

          {/* Card 2: Seebeck Math Rig (4 cols) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <ThermometerSnowflake className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-white font-display">
                    Seebeck Telemetry
                  </span>
                </div>
                <DataLabelBadge label="CALCULATED" />
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Direct solid-state thermodynamic harvesting via <span className="font-mono text-emerald-400 font-bold">V ≈ S · ΔT</span>.
              </p>

              {/* Temperature Sliders */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-zinc-300 font-mono mb-1">
                    <span>Hot Side (T_hot):</span>
                    <span className="font-bold text-amber-400">{hotSideTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={hotSideTemp}
                    onChange={(e) => setHotSideTemp(Number(e.target.value))}
                    className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300 font-mono mb-1">
                    <span>Cold Side (T_cold):</span>
                    <span className="font-bold text-cyan-400">{coldSideTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={coldSideTemp}
                    onChange={(e) => setColdSideTemp(Number(e.target.value))}
                    className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">
                Computed Seebeck Output (ΔT = {deltaT}°C):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-tech-mono text-emerald-400">
                  {calculatedVoltage} V
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  (~{estimatedPower} mW DC)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Flagship Hardware Section */}
      <section id="flagship-hardware-section" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-normal text-white font-serif-display">
              Open Research Hardware & Kits
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              Laboratory-tested modules and replication kits built for university and independent laboratories.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/store')}
            className="px-5 py-2.5 rounded-full text-xs font-bold glass-capsule text-white hover:bg-white/10 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flagshipProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => onSelectProduct(product)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
