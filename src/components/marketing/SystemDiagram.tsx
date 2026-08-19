import React, { useState } from 'react';
import { 
  Sun, 
  Battery, 
  FlaskConical, 
  Flame, 
  Zap, 
  Cpu, 
  Radio, 
  ArrowRight, 
  Calculator, 
  Info, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';
import { DataLabelBadge } from '../ui/Badge';
import { CATALYST_PROJECT } from '../../lib/data/projects';

export const SystemDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(5);

  // Seebeck Effect Interactive Calculator State
  const [hotSideTemp, setHotSideTemp] = useState<number>(65);
  const [coldSideTemp, setColdSideTemp] = useState<number>(25);
  const [moduleCount, setModuleCount] = useState<number>(4);

  // Seebeck calculations: V ≈ S · ΔT · N
  // S ≈ 0.04 V/°C per SP1848 module
  const deltaT = Math.max(0, hotSideTemp - coldSideTemp);
  const seebeckCoeff = 0.04; // V/°C
  const calculatedVoc = (deltaT * seebeckCoeff * (moduleCount / 2)).toFixed(2); // series-parallel pair
  const internalResistancePerModule = 2.5; // Ohms
  const netResistance = (internalResistancePerModule * moduleCount) / 4;
  const estimatedPowerMw = deltaT > 0 ? (((parseFloat(calculatedVoc) ** 2) / (4 * netResistance)) * 1000).toFixed(1) : '0';

  return (
    <div id="system-architecture-energy-flow-section" className="space-y-8">
      {/* 1. Header & Scientific Honesty Principle Banner */}
      <div className="p-6 rounded-3xl border border-white/15 bg-black/40 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/30">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-display">
                Core Thermodynamic Principle
              </h3>
              <DataLabelBadge type="ESTIMATED" />
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-normal">
              {CATALYST_PROJECT.scientificPrinciple}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-zinc-200 border border-white/10">
                Stage Efficiencies: 18% × 80% × 90% × 8%
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Overall Composite Efficiency ≈ 0.65% [ESTIMATED]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Energy Flow Cascade Pipeline */}
      <div className="p-6 lg:p-8 rounded-3xl border border-white/15 bg-black/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h4 className="text-base font-bold text-white font-display">
              Multi-Stage Energy Conversion Cascade
            </h4>
            <p className="text-xs text-zinc-300">
              Click any stage to inspect thermodynamic transfer dynamics and measured parameters
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/10 text-emerald-400 font-bold border border-white/10">
            Step {activeStep} of {CATALYST_PROJECT.energyFlow.length}
          </span>
        </div>

        {/* Step Nodes Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {CATALYST_PROJECT.energyFlow.map((flow) => {
            const isCurrent = activeStep === flow.step;
            return (
              <button
                key={flow.step}
                id={`energy-flow-step-${flow.step}`}
                onClick={() => setActiveStep(flow.step)}
                className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between gap-3 ${
                  isCurrent
                    ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-lg ring-2 ring-emerald-400/40'
                    : 'border-white/10 bg-black/40 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold font-mono text-zinc-400">
                    0{flow.step}
                  </span>
                  <DataLabelBadge type={flow.metricLabel} showTooltip={false} className="text-[9px]" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white line-clamp-2">
                    {flow.title}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">
                    {flow.efficiencyEstimate}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        {(() => {
          const current = CATALYST_PROJECT.energyFlow.find(f => f.step === activeStep);
          if (!current) return null;
          return (
            <div
              id="active-flow-step-detail"
              className="p-5 rounded-2xl border border-white/15 bg-black/60 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-black font-mono">
                    Stage 0{current.step}
                  </span>
                  <h5 className="text-base font-bold text-white font-display">
                    {current.title}
                  </h5>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-zinc-300">{current.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-white">{current.to}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                {current.description}
              </p>
            </div>
          );
        })()}
      </div>

      {/* 3. Parallel Control & Authorization Layer */}
      <div className="p-6 lg:p-8 rounded-3xl border border-white/15 bg-black/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400" />
          <h4 className="text-base font-bold text-white font-display">
            Parallel Control & Safety Authorization Layer
          </h4>
        </div>
        <p className="text-xs text-zinc-300">
          Runs concurrently with thermodynamic energy conversion to provide verified arming, sensor telemetry, and automated emergency shutoff.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-200">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="px-2 py-1 rounded bg-white/10 text-zinc-200 border border-white/10">RFID Tag (13.56MHz)</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="px-2 py-1 rounded bg-white/10 text-zinc-200 border border-white/10">RC522 SPI Reader</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="px-2 py-1 rounded bg-white text-zinc-950 font-bold">Arduino UNO Logic</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Optocoupled 5V Relay</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">16x2 LCD Telemetry</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Seebeck Formula & Power Output Calculator */}
      <div
        id="seebeck-calculator-interactive-tool"
        className="p-6 lg:p-8 rounded-3xl border border-white/15 bg-black/40 shadow-xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-bold text-white font-display">
                Seebeck Effect Voltage Calculator
              </h4>
            </div>
            <p className="text-xs text-zinc-300">
              Formula: <span className="font-mono font-bold text-emerald-400">V ≈ S · ΔT</span> (where S ≈ 0.04 V/°C per SP1848 module)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DataLabelBadge type="CALCULATED" />
          </div>
        </div>

        {/* Input Controls Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hot Side Temp Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-200">Hot Side Temp (T_hot)</span>
              <span className="font-mono text-red-400 font-bold">{hotSideTemp} °C</span>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              value={hotSideTemp}
              onChange={(e) => setHotSideTemp(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
            <div className="text-[11px] text-zinc-400">Peak prototype measured: 65 °C</div>
          </div>

          {/* Cold Side Temp Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-200">Cold Side Temp (T_cold)</span>
              <span className="font-mono text-cyan-400 font-bold">{coldSideTemp} °C</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              value={coldSideTemp}
              onChange={(e) => setColdSideTemp(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[11px] text-zinc-400">With active cooling fan: 25 °C</div>
          </div>

          {/* Module Count */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-200">SP1848 TEG Modules</span>
              <span className="font-mono text-emerald-400 font-bold">{moduleCount} Modules</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={moduleCount}
              onChange={(e) => setModuleCount(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="text-[11px] text-zinc-400">CATALYST Mk-1 uses 4 modules</div>
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
            <span className="text-xs text-zinc-300 font-medium">Temperature Differential (ΔT)</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {deltaT} <span className="text-sm font-normal text-zinc-400">°C</span>
            </div>
            <span className="text-[10px] text-zinc-400">T_hot − T_cold</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
            <span className="text-xs text-zinc-300 font-medium">Predicted Open-Circuit Voltage</span>
            <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
              {calculatedVoc} <span className="text-sm font-normal text-zinc-400">V DC</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">V ≈ S · ΔT [CALCULATED]</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
            <span className="text-xs text-zinc-300 font-medium">Est. Max Power Harvested</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {estimatedPowerMw} <span className="text-sm font-normal text-zinc-400">mW</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Measured baseline: 45 mW</span>
          </div>
        </div>
      </div>
    </div>
  );
};
