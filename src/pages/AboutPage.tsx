import React from 'react';
import { BRAND_CONSTANTS, GROWTH_STAGES } from '../lib/constants';
import { ShieldCheck, CheckCircle2, Atom, ArrowRight, Target, Award, Users, Compass, Sparkles } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div id="about-page-root" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full glow-orb-blue filter blur-3xl opacity-40 -z-10 pointer-events-none" />

      {/* 1. Header & Identity */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-black shadow-sm">
                Organization Profile
              </span>
              <span className="text-xs font-semibold text-zinc-300 font-mono">
                Est. 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              About A.R.C. LABS
            </h1>
            <p className="text-lg text-emerald-400 font-semibold font-display">
              {BRAND_CONSTANTS.fullName}
            </p>
            <p className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-mono">
              {BRAND_CONSTANTS.tagline}
            </p>
          </div>

          <div className="shrink-0 p-3 rounded-2xl glass-panel border border-white/15 shadow-inner flex flex-col items-center text-center">
            <img
              src="/logo.jpg"
              alt="A.R.C. LABS Official Logo"
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl ring-2 ring-emerald-500/40"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] font-mono text-zinc-300 mt-2 uppercase font-bold">Official Seal</span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
          A.R.C. LABS is a student-founded research and experimental engineering collective. We build benchtop hardware prototypes to investigate multi-stage thermodynamic energy cascades, direct Seebeck thermoelectric harvesting, electrochemical hydrogen generation, and automated embedded safety routines.
        </p>
      </section>

      {/* 2. Core Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover space-y-3 border border-white/15">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
            <Atom className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">First Principles</h3>
          <p className="text-xs text-zinc-200 leading-relaxed">
            Every design is grounded in the First and Second Laws of Thermodynamics. We model theoretical maximums before bending metal or machining plates.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover space-y-3 border border-white/15">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold border border-cyan-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Radical Transparency</h3>
          <p className="text-xs text-zinc-200 leading-relaxed">
            No marketing hype, no over-unity claims. Every experimental data point is labeled with its exact precision and source methodology.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover space-y-3 border border-white/15">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold border border-amber-500/30">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Open Prototyping</h3>
          <p className="text-xs text-zinc-200 leading-relaxed">
            We publish full schematics, CAD files, calibration logs, and failure post-mortems so other researchers can replicate and improve our work.
          </p>
        </div>
      </section>

      {/* 3. Growth & Roadmap Stages */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Evolution & Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Laboratory Growth Trajectory
          </h2>
        </div>

        <div className="space-y-4">
          {GROWTH_STAGES.map((stage, idx) => (
            <div
              key={stage.stage}
              className={`p-6 rounded-3xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/15 ${
                stage.status === 'Completed'
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : stage.status === 'Current Focus' || stage.status === 'Active'
                  ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-950/30 shadow-lg'
                  : 'opacity-80'
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Stage 0{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      stage.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : stage.status === 'Current Focus' || stage.status === 'Active'
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white font-display">{stage.title}</h4>
                <p className="text-xs text-zinc-200 leading-relaxed">{stage.desc}</p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('/catalyst')}
                  className="px-4 py-2 rounded-xl text-xs font-bold glass-capsule text-white hover:bg-white/10"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
