import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KNOWLEDGE_BASE = [
  {
    keywords: ['who', 'eacr', 'polio', 'eradication', 'data reconciliation', 'scripts', 'certification'],
    answer: "For the World Health Organization (WHO EMRO - https://polmis.emro.who.int/eacr), Sabtain maintained and engineered mission-critical data integrity pipelines for the Polio Eradication Certification Database (e-ACR). He developed automated backend reconciliation scripts in Laravel & MySQL to resolve real-time surveillance anomalies, ensuring 100% mathematical consistency across epidemiological reports and official regional certification generation."
  },
  {
    keywords: ['woah', 'pvs', 'socket', 'chat', 'budget', 'realtime', 'real time'],
    answer: "At the World Organisation for Animal Health (WOAH PVSIS - https://pvs.woah.org/), Sabtain engineered two flagship modules:\n1. Real-Time Collaboration & Socket Chat Engine (React, Node.js, Express, Socket.io, MySQL) for 180+ global member country delegates.\n2. Enterprise Mission Budgeting & Financial Allocation Module (React, Express, Node.js, MySQL) for dynamic multi-currency forecasting and multi-tier approval workflows."
  },
  {
    keywords: ['khandowa', 'law', 'whatsapp', 'bot', 'legal'],
    answer: "For Khandowa Law Associates (https://www.khandowalaw.com/), Sabtain engineered a high-conversion digital web platform in React.js and TypeScript, integrating an intelligent automated WhatsApp Business API bot for instant client consultation intake, schedule dispatch, and lead routing."
  },
  {
    keywords: ['about', 'sabtain', 'intro', 'background', 'engineer'],
    answer: "Sabtain Ali is a Senior Full Stack Developer & AI Engineer with 3+ years of enterprise experience architecting scalable web applications for international organizations (WHO, WOAH), React.js & TypeScript frontends, Laravel 11 backends, and autonomous AI & WhatsApp bots."
  },
  {
    keywords: ['project', 'work', 'portfolio', 'sales closer', 'scale wise', 'shopeedo'],
    answer: "Sabtain has engineered high-impact production applications including WHO e-ACR (Polio Eradication Data Pipeline), WOAH PVSIS (Real-Time Sockets & Enterprise Budgeting), Khandowa Law (LegalTech & WhatsApp Bot), Sales Closer (AI Sales Agent), Scale Wise (Autonomous Operations Platform), Shopeedo (High-Volume Ecommerce), Commuters Link (Geospatial Ride Sharing), and Britons Route (Fleet Logistics)."
  },
  {
    keywords: ['stack', 'skills', 'technologies', 'tech', 'language', 'framework', 'react', 'typescript', 'laravel', 'express', 'socket'],
    answer: "Core Technology Stack:\n• Frontend: React.js, TypeScript, Next.js, Vue.js, Tailwind CSS, Redux Toolkit, Framer Motion\n• Backend: Laravel 11, Node.js, Express.js, Socket.io (WebSockets), Python, REST APIs\n• Databases: MySQL, PostgreSQL, MongoDB, Redis\n• AI & Automation: WhatsApp Business API, OpenAI API, Gemini API, Vector Databases, Automated Data Reconciliation Scripting"
  },
  {
    keywords: ['experience', 'job', 'company', 'sysreforms', 'logiqon', 'career'],
    answer: "Sabtain currently serves as Full Stack Developer at SysReforms International (working on major international platforms for WHO and WOAH). He previously worked as Associate Full Stack Developer at Logiqon Solutions and has 2+ years of international client engineering consulting."
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'phone', 'message'],
    answer: "You can reach Sabtain directly at sabtainali375@gmail.com or connect on LinkedIn at linkedin.com/in/sabtainali123. You can also submit an inquiry through the contact form!"
  },
  {
    keywords: ['education', 'degree', 'university', 'college', 'imsciences'],
    answer: "Sabtain holds a Bachelor of Science in Software Engineering (First Class Honors, 2016–2020) from the Institute of Management Sciences (IMSciences)."
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer: "You can download Sabtain's official resume by clicking the 'Resume' button in the navigation header or visiting /documents/sabainali_resume.pdf."
  }
];

const getAIResponse = (query) => {
  const q = query.toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(k => q.includes(k))) {
      return item.answer;
    }
  }
  return `Thanks for asking! Sabtain specializes in mission-critical platforms (WHO, WOAH), React & TypeScript platforms, WebSockets, AI/WhatsApp automation, and Laravel architectures. Feel free to ask about his WHO e-ACR data pipeline, WOAH PVSIS modules, or email him at sabtainali375@gmail.com!`;
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm Sabtain's AI Assistant. Ask me anything about his engineering work on WHO e-ACR, WOAH PVSIS, Khandowa Law, or tech stack! ⚡" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const reply = getAIResponse(currentInput);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end pointer-events-auto max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] bg-[#0c0e17]/98 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-[#3BFFB9]/15"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#111422] to-[#0c0e17] p-3.5 sm:p-4 flex justify-between items-center border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#3BFFB9]/10 border border-[#3BFFB9]/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#3BFFB9] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading text-xs font-bold text-white tracking-wider">SABTAIN AI</h3>
                  <span className="text-[10px] font-mono text-[#3BFFB9] block -mt-0.5">● Online & Ready</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" 
                data-hover="true"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 pt-2.5 flex gap-1.5 overflow-x-auto text-[10px] sm:text-[11px] font-mono no-scrollbar">
              {['WHO e-ACR', 'WOAH PVSIS', 'Khandowa Law', 'Contact'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  className="whitespace-nowrap px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#3BFFB9]/50 hover:text-[#3BFFB9] text-slate-300 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-56 sm:h-72 md:h-80 overflow-y-auto p-3.5 sm:p-4 space-y-3 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 sm:p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#3BFFB9] text-black font-medium rounded-tr-none shadow-md'
                        : 'bg-white/[0.04] text-slate-200 rounded-tl-none border border-white/[0.08]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] p-3 rounded-2xl rounded-tl-none border border-white/[0.08] flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-[#3BFFB9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#818CF8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2.5 sm:p-3 border-t border-white/[0.08] bg-black/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about WHO, WOAH, stack..."
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none px-2"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#3BFFB9] p-2 sm:p-2.5 rounded-xl hover:bg-[#00F5A0] text-black transition-all disabled:opacity-40 cursor-pointer shadow-md shrink-0"
                  data-hover="true"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#0c0e17] via-[#161a29] to-[#00F5A0]/30 flex items-center justify-center shadow-xl shadow-[#00F5A0]/20 border border-[#3BFFB9]/40 z-50 group cursor-pointer"
        data-hover="true"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#3BFFB9] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#3BFFB9] rounded-full animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
