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
    answer: "Sabtain Ali is a Senior Full Stack Developer & AI Engineer with 4+ years of enterprise experience architecting scalable web applications for international organizations (WHO, WOAH), React.js & TypeScript frontends, Laravel 11 backends, and autonomous AI & WhatsApp bots."
  },
  {
    keywords: ['project', 'work', 'portfolio', 'sales closer', 'scale wise', 'shopeedo'],
    answer: "Sabtain has engineered high-impact production applications including WHO e-ACR (Polio Eradication Data Pipeline), WOAH PVSIS (Real-Time Sockets & Enterprise Budgeting), Khandowa Law (LegalTech & WhatsApp Bot), Sales Closer (AI Sales Agent), Scale Wise (Autonomous Operations Platform), Shopeedo (High-Volume Ecommerce), Commuters Link (Geospatial Ride Sharing), and Britons Route (Fleet Logistics)."
  },
  {
    keywords: ['stack', 'skills', 'technologies', 'tech', 'language', 'framework', 'react', 'typescript', 'laravel', 'express', 'socket'],
    answer: "Core Technology Stack:\n• Frontend: React.js, TypeScript, Next.js, Vue.js, Tailwind CSS, Framer Motion\n• Backend: Laravel 11, Node.js, Express.js, Socket.io (WebSockets), Python, REST APIs\n• Databases: MySQL, PostgreSQL, Redis\n• AI & Automation: WhatsApp Business API, OpenAI API, Gemini API, Vector Databases, Automated Data Reconciliation Scripting"
  },
  {
    keywords: ['experience', 'job', 'company', 'sysreforms', 'logiqon', 'career'],
    answer: "Sabtain currently serves as Full Stack Developer at SysReforms International (working on major international platforms for WHO and WOAH). He previously worked as Associate Full Stack Developer at Logiqon Solutions and has 2+ years of international client engineering consulting."
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'phone', 'message'],
    answer: "You can reach Sabtain directly at sabtainaliwazir@gmail.com, connect on LinkedIn at https://www.linkedin.com/in/sabtainali123/, or message via WhatsApp at +92 332 9298679. You can also submit an inquiry through the contact form!"
  }
];

const getAIResponse = (query) => {
  const q = query.toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(k => q.includes(k))) {
      return item.answer;
    }
  }
  return `Thanks for asking! Sabtain specializes in mission-critical platforms (WHO, WOAH), React & TypeScript platforms, WebSockets, AI/WhatsApp automation, and Laravel architectures. Feel free to ask about his WHO e-ACR data pipeline, WOAH PVSIS modules, or email him at sabtainaliwazir@gmail.com!`;
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello! I'm Sabtain's Assistant. Ask me anything about his engineering work on WHO e-ACR, WOAH PVSIS, Khandowa Law, or tech stack." }
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
    }, 450);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] bg-[#1a120b] border border-[#f8f5ee]/15 rounded-2xl overflow-hidden shadow-[0_1.5rem_4rem_rgba(16,9,4,0.5)]"
          >
            {/* Header */}
            <div className="bg-[#100904] p-3.5 sm:p-4 flex justify-between items-center border-b border-[#f8f5ee]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#e85a2d]/15 border border-[#e85a2d]/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#e85a2d]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#f8f5ee]">Sabtain Assistant</h3>
                  <span className="text-[10px] font-mono text-[#e85a2d] block -mt-0.5">● Ready to answer</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-[#f8f5ee]/60 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" 
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 pt-2.5 flex gap-1.5 overflow-x-auto text-[10px] font-mono no-scrollbar">
              {['WHO e-ACR', 'WOAH PVSIS', 'Khandowa Law', 'Contact'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/[0.04] border border-[#f8f5ee]/10 hover:border-[#e85a2d] hover:text-[#e85a2d] text-[#f8f5ee]/80 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-56 sm:h-72 overflow-y-auto p-3.5 sm:p-4 space-y-3 font-sans text-xs"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#e85a2d] text-[#f8f5ee] font-medium rounded-tr-none'
                        : 'bg-[#100904] text-[#f8f5ee]/85 rounded-tl-none border border-[#f8f5ee]/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#100904] p-2.5 rounded-xl rounded-tl-none border border-[#f8f5ee]/10 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-[#e85a2d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#e85a2d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#e85a2d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2.5 sm:p-3 border-t border-[#f8f5ee]/10 bg-[#100904]">
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
                  className="flex-1 min-w-0 bg-transparent text-[#f8f5ee] placeholder-[#f8f5ee]/40 text-xs focus:outline-none px-2 font-sans"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#e85a2d] p-2 rounded-xl text-[#f8f5ee] hover:bg-[#ff6937] transition-all disabled:opacity-40 cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#100904] text-[#f8f5ee] flex items-center justify-center shadow-xl border border-[#f8f5ee]/20 hover:border-[#e85a2d] transition-colors z-50 group cursor-pointer"
        aria-label="Open Assistant"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-[#f8f5ee] group-hover:text-[#e85a2d] transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e85a2d] rounded-full animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
