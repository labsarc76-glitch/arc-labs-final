import React, { useState } from 'react';
import { BLOG_POSTS } from '../lib/data/blog';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, X, ShieldCheck, Sparkles } from 'lucide-react';
import { DataLabelBadge } from '../components/ui/Badge';

export const BlogPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div id="blog-page-root" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full glow-orb-blue filter blur-3xl opacity-40 -z-10 pointer-events-none" />

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
            Engineering Logs
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          Field Dispatches & Lab Notes
        </h1>
        <p className="text-base text-zinc-200 max-w-2xl leading-relaxed font-normal">
          Technical dispatches, physical test logs, and failure post-mortems straight from our benchtop experimentation.
        </p>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            id={`post-card-${post.slug}`}
            className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover transition-all space-y-4 border border-white/15 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-300 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-300" />
                  {post.readingTime}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {post.tags.map((t, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-zinc-200 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs text-zinc-300 font-medium">
                By <strong className="text-white">{post.author}</strong>
              </span>

              <button
                onClick={() => setSelectedPost(post)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/30 transition-all flex items-center gap-1.5"
              >
                <span>Read Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Post Modal Reader */}
      {selectedPost && (
        <div
          id="blog-post-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            id="blog-post-modal"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[85vh] glass-panel rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl overflow-y-auto space-y-6 bg-[#121916]/95 text-white"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readingTime}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {selectedPost.title}
              </h2>
              <div className="text-xs text-zinc-300">
                Authored by <span className="font-bold text-emerald-400">{selectedPost.author}</span>
              </div>
            </div>

            <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
              {selectedPost.content}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
