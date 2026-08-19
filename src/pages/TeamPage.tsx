import React from 'react';
import { TEAM_MEMBERS } from '../lib/data/team';
import { Users, Atom, Cpu, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const TeamPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div id="team-page-root" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Background Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full glow-orb-cyan filter blur-3xl opacity-40 -z-10 pointer-events-none" />

      {/* Header */}
      <div className="space-y-3">
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
            Researchers & Builders
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          The Engineering Collective
        </h1>
        <p className="text-base text-zinc-200 max-w-2xl leading-relaxed font-normal">
          A.R.C. LABS is founded and operated by student engineers combining mechanical hardware fabrication, embedded systems telemetry, and electrochemistry.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            id={`team-card-${member.id}`}
            className="p-6 sm:p-7 rounded-3xl glass-panel glass-panel-hover shadow-xl space-y-5 flex flex-col justify-between border border-white/15"
          >
            <div className="space-y-4">
              {/* Member Avatar Glyph */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-black flex items-center justify-center text-2xl font-black font-display shadow-lg shadow-emerald-500/20">
                {member.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {member.name}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400 block mt-0.5">
                  {member.role}
                </span>
                <span className="text-xs text-zinc-300 font-medium block">
                  {member.team}
                </span>
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed">
                {member.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                Research Focus:
              </span>
              <div className="flex flex-wrap gap-1">
                {member.areasOfInterest.map((area, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/10"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
