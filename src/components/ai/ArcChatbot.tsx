import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  ArrowRight, 
  Terminal 
} from 'lucide-react';
import { BRAND_CONSTANTS } from '../../lib/constants';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  'Explain the CATALYST Mk-1 energy conversion cascade.',
  'What is the Seebeck effect formula used in the prototype?',
  'Why is the composite efficiency 0.65% and labeled ESTIMATED?',
  'What hardware components are available in the store?',
  'Tell me about the four-tier safety architecture.',
];

export const ArcChatbot: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: `Hello! I am the A.R.C. LABS Technical Assistant. I can answer questions regarding the CATALYST Mk-1 experimental hybrid energy prototype, our 8 research areas, hardware specifications in our catalog, or our scientific data labeling methodology. How can I assist your inquiry today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Data point retrieved from A.R.C. LABS technical corpus.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('AI chat error:', err);
      // Fallback offline scientific response
      const fallbackMessage: Message = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        text: `[Offline Benchtop Mode]: The CATALYST Mk-1 incorporates multi-stage energy conversion combining Seebeck effect thermoelectric generation (Pmax = 12.8W), electrolysis gas storage (1.45 L/min @ 12V 5A), and automated MQ-2 safety interlocks. All data points are strictly governed by our Zero-Mock validation rubric.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="arc-ai-chatbot-drawer-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="arc-ai-chatbot-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl h-[90vh] sm:h-[660px] bg-[#131b18] text-white rounded-t-3xl sm:rounded-3xl border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Chatbot Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden bg-black/50 border border-white/15 shadow-sm p-0.5">
              <img
                src="/logo.jpg"
                alt="A.R.C. LABS Official Logo"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white font-display">
                  A.R.C. LABS Technical AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ONLINE
                </span>
              </div>
              <span className="text-[11px] text-zinc-300 font-medium">
                CATALYST Mk-1 & Thermodynamic Knowledge Base
              </span>
            </div>
          </div>

          <button
            id="close-ai-chatbot-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-emerald-500 text-black font-semibold rounded-br-none shadow-md shadow-emerald-500/20'
                    : 'bg-black/50 text-zinc-100 rounded-bl-none border border-white/15'
                }`}
              >
                {msg.text}
                <div
                  className={`mt-2 text-[10px] ${
                    msg.role === 'user' ? 'text-black/70 font-mono' : 'text-zinc-400 font-mono'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-white text-zinc-950 flex items-center justify-center flex-shrink-0 font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-zinc-300 font-mono">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <span>Formulating scientific response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Questions */}
        {messages.length < 3 && (
          <div className="p-3 px-4 border-t border-white/10 bg-black/40 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1 rounded-xl text-[11px] font-medium bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white border border-white/10 whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl flex items-center gap-2"
        >
          <input
            id="ai-chat-text-input"
            type="text"
            placeholder="Ask anything about CATALYST Mk-1, TEG, or lab safety..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-black/50 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
          />

          <button
            id="ai-chat-send-btn"
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
