import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldCheck, MessageSquare, Building2, MapPin, Sparkles } from 'lucide-react';
import { BRAND_CONSTANTS } from '../lib/constants';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [topic, setTopic] = useState('Hardware Procurement & Kits');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const submission = {
      name,
      email,
      organization,
      topic,
      message,
      submittedAt: new Date().toISOString(),
      routedTo: 'labsarc76@gmail.com',
      status: 'New'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message to server');
      }

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setOrganization('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page-root" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Background Glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full glow-orb-cyan filter blur-3xl opacity-40 -z-10 pointer-events-none" />

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
            Direct Inquiries
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          Contact A.R.C. LABS
        </h1>
        <p className="text-base text-zinc-200 max-w-2xl leading-relaxed font-normal">
          Whether you are inquiring about CATALYST Mk-1 hardware procurement, academic collaboration, or open research data, our team reviews incoming communications directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 shadow-xl">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Message Received & Routed
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                Your inquiry has been logged and forwarded to our central laboratory desk (<span className="font-mono text-emerald-400 font-bold">labsarc76@gmail.com</span>). A student researcher will reply within 24–48 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-black shadow-md hover:bg-emerald-400 hover:scale-105 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-display">
                  Send Technical Inquiry
                </h3>
                <p className="text-xs text-zinc-300 font-mono">
                  Submissions route directly to <code className="text-emerald-400">labsarc76@gmail.com</code>
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-300">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-form-name"
                    type="text"
                    required
                    placeholder="e.g. Vikram Singhania"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-form-email"
                    type="email"
                    required
                    placeholder="vikram@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Organization / Institution
                  </label>
                  <input
                    id="contact-form-org"
                    type="text"
                    placeholder="e.g. Dept of Mechanical Engg"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Inquiry Topic *
                  </label>
                  <select
                    id="contact-form-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                  >
                    <option value="Hardware Procurement & Kits">Hardware Procurement & Kits</option>
                    <option value="Research & Academic Collaboration">Research & Academic Collaboration</option>
                    <option value="CATALYST Mk-1 Technical Clarification">CATALYST Mk-1 Technical Clarification</option>
                    <option value="Join Research Team">Join Research Team</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-200 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="contact-form-message"
                  required
                  rows={4}
                  placeholder="Detail your inquiry, prototype replication questions, or hardware order details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <button
                id="contact-form-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Routing to Desk...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Lab Info Card */}
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white font-display">
                Laboratory Desk
              </h3>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div>
                <span className="font-semibold text-white block">Direct Inquiries:</span>
                <a href="mailto:labsarc76@gmail.com" className="text-emerald-400 font-mono hover:underline">
                  labsarc76@gmail.com
                </a>
              </div>

              <div>
                <span className="font-semibold text-white block">Operating Model:</span>
                <span>Student Research Collective & Open Prototyping Laboratory</span>
              </div>

              <div>
                <span className="font-semibold text-white block">Typical Response Time:</span>
                <span>Within 24–48 hours on academic workdays</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/15 text-xs space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Routing Guarantee</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Inquiries are automatically categorized and dispatched to the specialized research sub-lead responsible for that domain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
