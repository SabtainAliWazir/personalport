import './styles/global.css';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Database, Code, Globe, Zap, Menu, X, ArrowUpRight, 
  ChevronLeft, ChevronRight, Layers, Sparkles, CheckCircle2, 
  Briefcase, GraduationCap, Award, Mail, ExternalLink, ShieldCheck,
  Cpu, Rocket, Laptop, Copy, Check, MessageSquareCode, Calculator, Scale, Activity
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GlitchText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import InitialLoader from './components/InitialLoader';

// Project Showcase Data
const PROJECTS = [
  { 
    id: 'who-eacr', 
    title: 'WHO • e-ACR System', 
    category: 'Global Health GovTech', 
    subtitle: 'Polio Eradication Certification & Data Pipeline',
    image: '/images/who_eacr.png', 
    link: 'https://polmis.emro.who.int/eacr', 
    description: 'Maintained and engineered mission-critical data integrity pipelines for the World Health Organization (WHO EMRO - Global Polio Eradication Initiative). Resolved complex real-time surveillance data discrepancies by developing robust automated backend data reconciliation scripts in Laravel and MySQL, ensuring 100% mathematical consistency across epidemiological reports and official regional certification generation.',
    tech: ['Laravel', 'MySQL', 'PHP', 'Data Integrity Scripts', 'RESTful APIs', 'Automated Reporting'],
    deliverables: [
      'Engineered automated SQL & Laravel data reconciliation scripts to resolve real-time surveillance anomalies',
      'Guaranteed 100% data consistency across multi-country epidemiological reporting tiers',
      'Optimized final certification generation pipeline for international public health compliance'
    ]
  },
  { 
    id: 'woah-pvsis', 
    title: 'WOAH PVSIS', 
    category: 'Enterprise Platform', 
    subtitle: 'Real-Time Socket Chat & Mission Budgeting Engine',
    image: '/images/woah_pvsis.png', 
    link: 'https://pvs.woah.org/', 
    description: 'Architected and engineered core mission-critical modules for the World Organisation for Animal Health (WOAH PVS Information System). Implemented the high-throughput real-time WebSocket communication infrastructure for international delegates across 180+ member countries, alongside the dynamic enterprise multi-phase mission budgeting and financial resource allocation engine.',
    tech: ['React.js', 'Express.js', 'Node.js', 'Socket.io', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    deliverables: [
      'Real-Time Socket.io chat engine with live presence detection, typing awareness & encrypted document streaming',
      'Enterprise multi-phase mission budgeting & multi-currency resource allocation models',
      'Multi-tiered fiscal authorization workflows & automated relational data audit exports'
    ]
  },
  { 
    id: 'khandowa-law', 
    title: 'Khandowa Law', 
    category: 'LegalTech & Bot', 
    subtitle: 'High-Conversion Legal Portal & WhatsApp Automation',
    image: '/images/khandowa_law.png', 
    link: 'https://www.khandowalaw.com/', 
    description: 'Architected and developed an authoritative, high-conversion digital web platform for Khandowa Law Associates. Engineered with React.js, TypeScript, and modern component architecture, featuring an automated WhatsApp Business API lead routing bot for instant client consultation intake and schedule dispatch.',
    tech: ['React.js', 'TypeScript', 'WhatsApp API', 'Tailwind CSS', 'Framer Motion', 'SEO Optimization'],
    deliverables: [
      'Type-safe, component-driven frontend architecture in React.js & TypeScript',
      'Integrated automated WhatsApp Bot for instant legal case inquiry dispatch & intake',
      'Lighthouse 99+ Core Web Vitals score & comprehensive local SEO optimization'
    ]
  },
  { 
    id: '1', 
    title: 'Sales Closer', 
    category: 'AI Sales Agent', 
    subtitle: 'Autonomous Lead Qualifier & Booking',
    image: '/images/salescloseai.png', 
    link: 'https://salescloser.com/', 
    description: 'An enterprise-grade autonomous AI sales agent engineered to qualify high-intent inbound leads, engage prospects via natural language voice/text conversations, and automate closing workflows.',
    tech: ['React.js', 'Node.js', 'OpenAI API', 'Tailwind CSS', 'WebSockets', 'PostgreSQL'],
    deliverables: [
      'Real-time audio/text conversation pipeline', 
      'Automated calendar booking & CRM synchronization', 
      'Sub-400ms end-to-end response latency'
    ]
  },
  { 
    id: '2', 
    title: 'Scale Wise', 
    category: 'AI Agent Platform', 
    subtitle: 'Autonomous Workflow Engine',
    image: '/images/scalewiseai.png', 
    link: 'https://scalewise.ai/', 
    description: 'An AI-native operations automation platform designed to empower hyper-growth teams with autonomous multi-step reasoning agents, knowledge base synthesis, and automated business reporting.',
    tech: ['Vue.js', 'Laravel 11', 'Python', 'Redis', 'Docker', 'MySQL'],
    deliverables: [
      'Custom LLM workflow orchestration', 
      'Multi-tenant enterprise access control', 
      'Automated document extraction & semantic search'
    ]
  },
  { 
    id: '3', 
    title: 'Shopeedo', 
    category: 'Ecommerce Portal', 
    subtitle: 'High-Volume Retail Platform',
    image: '/images/shopeedo_image.PNG', 
    link: 'http://shopeedo.com/', 
    description: 'A lightning-fast ecommerce engine built with modular micro-frontends, real-time inventory management, payment gateway integrations, and optimized conversion funnels.',
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Redux Toolkit'],
    deliverables: [
      'Sub-second catalog search & filtering', 
      'Zero-downtime cart state synchronization', 
      'Comprehensive seller analytics dashboard'
    ]
  },
  { 
    id: '4', 
    title: 'Commuters Link', 
    category: 'Ride Sharing', 
    subtitle: 'Urban Transit Network',
    image: '/images/commuterslinks.png', 
    link: 'https://commuterslink.com/', 
    description: 'A shared transit routing and carpooling platform designed to reduce urban congestion by dynamically matching daily commuters based on geospatial routing algorithms.',
    tech: ['React Native', 'Firebase', 'Google Maps API', 'Node.js', 'Socket.io'],
    deliverables: [
      'Live GPS driver/rider telemetry', 
      'Automated cost-splitting algorithm', 
      'Instant push notification dispatch'
    ]
  },
  { 
    id: '5', 
    title: 'Britons Route', 
    category: 'Transport & Logistics', 
    subtitle: 'Fleet Scheduling Suite',
    image: '/images/britons.png', 
    link: 'https://britonsroute.co.uk/', 
    description: 'A nationwide UK transport logistics suite providing real-time fleet scheduling, driver manifest generation, parcel tracking, and multi-depot operational management.',
    tech: ['Laravel', 'MySQL', 'Vue.js', 'REST APIs', 'Bootstrap', 'Chart.js'],
    deliverables: [
      'Complex waypoint route optimization', 
      'Automated invoicing & billing export', 
      'Custom depot manager permissions'
    ]
  },
  { 
    id: '6', 
    title: 'Premier Staff', 
    category: 'Staffing & HR', 
    subtitle: 'Talent Management Hub',
    image: '/images/Premier_Staff.PNG', 
    link: 'https://premierstaff.com/', 
    description: 'A premier luxury event staffing platform connecting elite event producers with verified brand ambassadors, hospitality personnel, and management teams across major US markets.',
    tech: ['WordPress', 'PHP', 'Tailwind CSS', 'Custom Post Types', 'REST APIs', 'SEO'],
    deliverables: [
      'Custom candidate booking engine', 
      'Lighthouse 98+ performance score', 
      'Integrated client review & rating system'
    ]
  }
];

const EXPERIENCE = [
  { 
    date: '05/2025 – Present', 
    role: 'Full Stack Developer', 
    company: 'SysReforms International', 
    icon: Terminal,
    desc: 'Architecting and maintaining mission-critical global health systems for the World Health Organization (WHO e-ACR Polio Eradication) and World Organisation for Animal Health (WOAH PVSIS). Engineered high-throughput real-time WebSocket messaging, automated data reconciliation scripts, and enterprise financial budgeting engines in Laravel, Node.js, Express, React, and MySQL.'
  },
  { 
    date: '05/2024 – 04/2025', 
    role: 'Associate Full Stack Developer', 
    company: 'Logiqon Solution', 
    icon: Database,
    desc: 'Collaborated on end-to-end backend microservices and relational database schemas with Laravel and MySQL. Crafted pixel-perfect, mobile-first responsive interfaces using Tailwind CSS, TypeScript, and modern React.'
  },
  { 
    date: '01/2023 – Present', 
    role: 'Full Stack & CMS Consultant', 
    company: 'Self-Employed (International)', 
    icon: Globe,
    desc: 'Delivered 18+ custom client solutions globally. Engineered custom web apps, API integrations, automated WhatsApp bots, and SEO-optimized web portals for brands like Khandowa Law, Premier Staff, and Scale Wise with top Lighthouse scores.'
  },
  { 
    date: '11/2021 – 01/2022', 
    role: 'React Developer Intern', 
    company: 'SPQR', 
    icon: Code,
    desc: 'Engineered modular, reusable UI component libraries in React.js. Integrated third-party GraphQL/REST services and accelerated user interface responsiveness.'
  },
  { 
    date: '06/2019 – 07/2019', 
    role: 'Software Engineer Intern', 
    company: 'Elixir Technologies', 
    icon: Layers,
    desc: 'Gained hands-on software development lifecycle (SDLC) experience in enterprise software. Explored JSON-based schema modelling and document layout architectures.'
  }
];

const CERTIFICATIONS = [
  { title: "Programming with JavaScript", org: "Meta (Coursera)" },
  { title: "HTML, CSS, and JS for Web Developers", org: "Johns Hopkins University" },
  { title: "Fundamentals of Digital Marketing", org: "Google Digital Garage" },
  { title: "Create a No-Code Responsive Website", org: "Coursera Project Network" },
  { title: "Introduction to Front-end Development", org: "Meta (Coursera)" },
  { title: "Database Structures & MySQL", org: "Meta (Coursera)" },
  { title: "Webflow 101 Certification Exam", org: "Webflow University" },
  { title: "Blockchain Basics", org: "State University of New York" }
];

const SERVICES = [
  { 
    name: 'Full Stack Engineering', 
    tagline: 'SCALABLE ARCHITECTURE', 
    accent: 'border-white/10 hover:border-white/30',
    color: 'white',
    desc: 'End-to-end web applications engineered for speed, clean architectural patterns, and maintainability.',
    features: [
      'Laravel 11, Node.js & Express Architecture',
      'React.js, TypeScript & Next.js Frontends',
      'Relational Database (MySQL, Postgres) & Query Optimization',
      'Real-Time WebSockets & Secure RESTful APIs'
    ]
  },
  { 
    name: 'Data Pipelines & Integrity', 
    tagline: 'MISSION-CRITICAL SYSTEMS', 
    accent: 'border-[#3BFFB9]/30 hover:border-[#3BFFB9]/60 shadow-[0_0_30px_rgba(59,255,185,0.08)]',
    color: 'mint',
    desc: 'Automated backend data reconciliation, real-time sync, and official certification generation for global bodies (WHO/WOAH).',
    features: [
      'Automated Data Reconciliation & Scripting',
      'Surveillance & Epidemiological Reporting',
      'Multi-Phase Mission Budgeting Engines',
      'Official Certification & Audit Generation'
    ]
  },
  { 
    name: 'AI Agents & Automation', 
    tagline: 'INTELLIGENT SYSTEMS', 
    accent: 'border-[#00E5FF]/30 hover:border-[#00E5FF]/60 shadow-[0_0_30px_rgba(0,229,255,0.08)]',
    color: 'cyan',
    desc: 'Autonomous AI sales agents, WhatsApp Business Bots, and custom LLM workflows.',
    features: [
      'Autonomous Inbound & Sales AI Agents',
      'WhatsApp Business API Lead Routing Bots',
      'OpenAI & Gemini API Pipeline Integrations',
      'Vector Databases & Semantic Search'
    ]
  }
];

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('work');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scrollspy to detect active section dynamically on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // optimal threshold for fixed header
      const sections = ['work', 'capabilities', 'experience', 'about', 'contact'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('work');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for project modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navigateProject = (direction) => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sabtainali375@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-[#3BFFB9] selection:text-black cursor-auto md:cursor-none overflow-x-clip max-w-[100vw] w-full bg-[#06070a]">
      {/* First-Load Preloader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <InitialLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 bg-[#06070a]/80 backdrop-blur-xl border-b border-white/[0.06] max-w-[100vw]">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-tighter text-white cursor-pointer z-50 flex items-center gap-1"
        >
          SABTAIN<span className="text-[#3BFFB9]">.</span>ALI
        </a>
        
        {/* Desktop Menu with Animated Active Pill Indicator */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer bg-transparent border-none rounded-full ${
                  isActive ? 'text-[#3BFFB9] font-bold' : 'text-slate-400 hover:text-white'
                }`}
                data-hover="true"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#3BFFB9]/10 border border-[#3BFFB9]/35 rounded-full -z-10 shadow-[0_0_15px_rgba(59,255,185,0.18)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3BFFB9] shadow-[0_0_6px_#3BFFB9]" />}
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Desktop Actions with Perfect Padding & Height Symmetry */}
        <div className="hidden md:flex items-center gap-3.5">
          <a 
            href="/documents/sabainali_resume.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="h-10 px-5 rounded-xl border border-white/15 hover:border-white/40 hover:bg-white/[0.04] text-slate-300 hover:text-white text-xs font-mono tracking-wider uppercase inline-flex items-center justify-center transition-all duration-300 cursor-pointer"
            data-hover="true"
          >
            Resume ↗
          </a>
          <button 
            onClick={() => scrollToSection('contact')}
            className="h-10 px-6 rounded-xl bg-[#3BFFB9] hover:bg-[#00F5A0] text-black text-xs font-mono font-bold tracking-wider uppercase inline-flex items-center justify-center transition-all duration-300 cursor-pointer border-none shadow-[0_0_20px_rgba(59,255,185,0.3)] hover:shadow-[0_0_30px_rgba(59,255,185,0.5)] hover:scale-[1.02]"
            data-hover="true"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center cursor-pointer bg-transparent border-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
           {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#06070a]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 sm:gap-7 md:hidden px-6"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xl sm:text-2xl font-heading font-bold uppercase transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-[#3BFFB9]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#3BFFB9] shadow-[0_0_8px_#3BFFB9]" />}
                  {item.label}
                </button>
              );
            })}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full max-w-xs">
              <a 
                href="/documents/sabainali_resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="h-11 w-full flex items-center justify-center border border-white/30 px-6 text-xs font-mono tracking-widest uppercase bg-white text-black rounded-xl font-bold"
              >
                Resume ↗
              </a>
              <button 
                onClick={() => scrollToSection('contact')}
                className="h-11 w-full flex items-center justify-center border border-[#3BFFB9] px-6 text-xs font-mono font-bold tracking-widest uppercase bg-[#3BFFB9] text-black rounded-xl shadow-[0_0_20px_rgba(59,255,185,0.3)]"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative min-h-[92svh] sm:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-20 md:pb-24 max-w-[100vw]">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-5xl"
        >
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center flex-wrap gap-2 text-[10px] sm:text-xs md:text-sm font-mono text-[#3BFFB9] tracking-wider sm:tracking-[0.18em] uppercase mb-3 sm:mb-4 bg-white/[0.03] border border-white/[0.08] px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-md max-w-full text-center"
          >
            <span>FULL STACK ARCHITECT</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3BFFB9] rounded-full animate-pulse shadow-[0_0_8px_#3BFFB9] shrink-0"/>
            <span>WHO & WOAH PLATFORMS • AI</span>
          </motion.div>

          {/* Main Glitch Text Title */}
          <div className="relative w-full flex justify-center items-center my-2 sm:my-3 max-w-full overflow-hidden">
            <GlitchText 
              text="SABTAIN ALI" 
              as="h1" 
              className="text-3xl sm:text-6xl md:text-[9vw] lg:text-[8vw] leading-[0.95] font-black tracking-tight text-center" 
            />
            {/* Luminous Glow Aura */}
            <motion.div 
               className="absolute -z-20 w-[60vw] h-[60vw] bg-[#00F5A0]/10 blur-[60px] md:blur-[90px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 7, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
             className="w-full max-w-xs sm:max-w-md h-px bg-gradient-to-r from-transparent via-[#3BFFB9]/50 to-transparent mt-2 sm:mt-4 mb-4 sm:mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-xl font-light max-w-2xl mx-auto text-slate-300 leading-relaxed px-2 sm:px-4"
          >
            3+ years engineering enterprise web systems, global health data integrity pipelines (WHO & WOAH), and autonomous AI agents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto px-4"
          >
            <button
              onClick={() => scrollToSection('work')}
              className="h-12 w-full sm:w-auto bg-[#3BFFB9] text-black font-mono font-bold px-8 text-xs tracking-wider uppercase hover:bg-[#00F5A0] transition-all duration-300 shadow-[0_0_25px_rgba(59,255,185,0.3)] cursor-pointer border-none rounded-xl inline-flex items-center justify-center"
              data-hover="true"
            >
              Explore Production Work ↓
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="h-12 w-full sm:w-auto border border-white/20 text-slate-200 font-mono px-8 text-xs tracking-wider uppercase hover:border-white hover:text-white transition-all duration-300 cursor-pointer bg-white/[0.02] rounded-xl inline-flex items-center justify-center"
              data-hover="true"
            >
              Capabilities
            </button>
          </motion.div>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-10 left-0 w-full py-2.5 sm:py-3.5 bg-[#0a0c13] text-white z-20 overflow-hidden border-y border-white/[0.08] max-w-[100vw]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="text-base sm:text-xl md:text-3xl font-heading font-bold px-4 sm:px-8 flex items-center gap-3 sm:gap-6 text-slate-200">
                    WHO & WOAH PLATFORMS <span className="text-[#3BFFB9] text-sm sm:text-lg">●</span> 
                    LARAVEL & MYSQL <span className="text-[#00E5FF] text-sm sm:text-lg">●</span> 
                    REACT.JS & TYPESCRIPT <span className="text-[#818CF8] text-sm sm:text-lg">●</span> 
                    REAL-TIME WEBSOCKETS <span className="text-[#3BFFB9] text-sm sm:text-lg">●</span>
                    AI AGENTS & BOTS <span className="text-[#00E5FF] text-sm sm:text-lg">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* STATS COUNTER STRIP */}
      <section className="relative z-20 border-b border-white/[0.08] bg-[#0c0e17]/80 backdrop-blur-xl py-8 sm:py-12 px-4 sm:px-6 max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { num: '3+', label: 'Years Experience', sub: 'Enterprise Architecture' },
            { num: '18+', label: 'Delivered Projects', sub: 'Global Deployments' },
            { num: '100%', label: 'Data Consistency', sub: 'WHO & WOAH Compliance' },
            { num: '8+', label: 'Certifications', sub: 'Meta, Google & SUNY' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#3BFFB9] to-[#00E5FF]">
                {stat.num}
              </span>
              <span className="font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase text-white mt-1">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* WORK / PROJECTS SECTION */}
      <section id="work" className="relative z-10 py-16 sm:py-24 md:py-36 px-3 sm:px-6 md:px-8 max-w-[100vw] overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 md:mb-18 px-1 sm:px-2">
             <div>
               <span className="font-mono text-[11px] sm:text-xs text-[#3BFFB9] tracking-widest uppercase block mb-1 sm:mb-2">// SELECTED PORTFOLIO & CLIENT WORK</span>
               <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold uppercase leading-tight text-white">
                Featured <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#3BFFB9] to-[#00E5FF]">Projects</span>
              </h2>
             </div>
             <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-md mt-3 md:mt-0 font-light leading-relaxed">
               Featuring mission-critical United Nations / WHO & WOAH systems, high-conversion legal platforms, and autonomous AI agents.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES / SERVICES */}
      <section id="capabilities" className="relative z-10 py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#0c0e17]/50 backdrop-blur-lg border-t border-white/[0.08] max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
             <span className="font-mono text-[11px] sm:text-xs text-[#3BFFB9] tracking-widest uppercase block mb-1 sm:mb-2">// TECHNICAL SCOPE</span>
             <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-2 sm:mb-3">
               CAPABILITIES
             </h2>
             <p className="text-slate-400 font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-widest">
               Engineered for high throughput, data integrity, and enterprise scale
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className={`relative p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0e101a]/80 border backdrop-blur-xl flex flex-col min-h-[420px] sm:min-h-[480px] transition-all duration-300 ${service.accent} will-change-transform group shadow-xl`}
                data-hover="true"
              >
                <div className="flex-1">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#3BFFB9] block mb-2">
                    {service.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4 text-white">
                    {service.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 sm:mb-8 font-light">
                    {service.desc}
                  </p>

                  <div className="h-px w-full bg-white/[0.08] mb-6 sm:mb-8" />
                  
                  <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-200">
                    {service.features.map((feat, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2.5 sm:gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#3BFFB9] shrink-0 mt-0.5" />
                        <span className="font-light text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-3.5 text-xs font-mono font-bold uppercase tracking-wider border border-white/20 rounded-xl transition-all duration-300 mt-8 text-white cursor-pointer bg-white/[0.03] hover:bg-[#3BFFB9] hover:text-black hover:border-[#3BFFB9] shadow-sm"
                >
                  Discuss Project Scope →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE & TECH SHOWCASE */}
      <section id="experience" className="relative z-10 py-16 sm:py-24 md:py-36 bg-[#06070a] border-t border-white/[0.08] overflow-hidden max-w-[100vw]">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#00F5A0]/10 rounded-full blur-[100px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center">
            
            {/* Left Column: Career Timeline */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <span className="font-mono text-[11px] sm:text-xs text-[#3BFFB9] tracking-widest uppercase block mb-1 sm:mb-2">// TRACK RECORD</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 sm:mb-8 leading-tight text-white">
                Beyond <br/> <GlitchText text="THE CODE" className="text-3xl sm:text-5xl md:text-7xl" />
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-10 font-light leading-relaxed">
                Over 3 years of building production web systems, maintaining mission-critical global health databases (WHO & WOAH), and bridging enterprise engineering with modern AI capabilities.
              </p>
              
              <div className="space-y-4 sm:space-y-5">
                {EXPERIENCE.map((exp, i) => (
                  <div
                    key={i} 
                    className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#0c0e17] border border-white/[0.08] hover:border-[#3BFFB9]/40 transition-colors group"
                  >
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-[#3BFFB9]/10 group-hover:border-[#3BFFB9]/30 transition-colors shrink-0">
                      <exp.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3BFFB9]" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#3BFFB9] tracking-wider uppercase block">
                        {exp.date}
                      </span>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-white font-heading mt-0.5">
                        {exp.role}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-400 font-medium mb-1">
                        {exp.company}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Profile Card */}
            <div className="lg:col-span-6 relative h-[360px] sm:h-[480px] md:h-[600px] lg:h-[720px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#00F5A0]/20 rounded-3xl rotate-1 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-[#0b0d14]">
                <img 
                  src="/images/sabtain-image.png" 
                  alt="Sabtain Ali" 
                  className="h-full w-full object-cover blend-portrait transition-transform duration-[1.5s] group-hover:scale-105 will-change-transform opacity-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent opacity-95 pointer-events-none" />
                
                <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 z-10">
                  <div className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                    03+
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-heading font-bold tracking-wider sm:tracking-widest uppercase mt-1 text-white">
                    Years of Engineering
                  </div>
                  <p className="text-[11px] sm:text-xs font-mono text-[#3BFFB9] uppercase tracking-wider mt-1">
                    WHO & WOAH Platforms ● Laravel ● React ● AI
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <section id="about" className="relative z-10 py-16 sm:py-24 md:py-36 bg-[#0c0e17]/60 backdrop-blur-md border-t border-white/[0.08] max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Education Summary */}
            <div className="lg:col-span-5">
              <span className="font-mono text-[11px] sm:text-xs text-[#3BFFB9] tracking-widest uppercase block mb-1 sm:mb-2">// ACADEMIC FOUNDATION</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
                Education
              </h3>
              
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0e101a] border border-white/[0.08] space-y-4 shadow-xl">
                <div className="flex items-center gap-2.5 text-[#3BFFB9]">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider">2016 – 2020 • First Class Honors</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  BS Software Engineering
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  Institute of Management Sciences (IMSciences), Pakistan
                </p>
                
                <div className="pt-3 border-t border-white/[0.08]">
                  <span className="text-[11px] sm:text-xs font-mono text-[#3BFFB9] uppercase block mb-2">Core Disciplines:</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
                    {['Data Structures', 'Algorithms', 'OOP', 'Web Engineering', 'Machine Learning', 'AI'].map(m => (
                      <span key={m} className="px-2 sm:px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white block mb-1">Final Year Project:</span>
                  Startup Incubation & Acceleration Management Portal built with Laravel, Vue.js, and automated mentor-matching.
                </div>
              </div>
            </div>

            {/* Certifications Grid */}
            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] sm:text-xs text-[#3BFFB9] tracking-widest uppercase block mb-1 sm:mb-2">// VERIFIED CREDENTIALS</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
                Certifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <div 
                    key={i} 
                    className="p-4 sm:p-5 rounded-2xl bg-[#0e101a] border border-white/[0.08] hover:border-[#3BFFB9]/40 transition-colors flex items-start gap-3 group shadow-sm"
                  >
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#3BFFB9] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white leading-snug mb-1">
                        {cert.title}
                      </h5>
                      <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                        {cert.org}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-16 sm:py-24 md:py-36 border-t border-white/[0.08] bg-[#06070a]/90 backdrop-blur-2xl max-w-[100vw] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14 md:mb-18">
             <span className="font-mono text-[11px] sm:text-xs text-[#3BFFB9] tracking-widest uppercase block mb-1 sm:mb-2">// INITIATE ENGAGEMENT</span>
             <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-2 sm:mb-3">
               CONNECT
             </h2>
             <p className="text-slate-400 font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-widest">
               Let's engineer your next breakthrough platform
             </p>
          </div>
          
          <form 
            className="space-y-4 sm:space-y-6 bg-[#0c0e17] p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/[0.08] shadow-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const projectType = e.target.projectType.value;
              const message = e.target.message.value;
              const subject = `Portfolio Inquiry: ${projectType} from ${name}`;
              const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AProject Type: ${projectType}%0D%0A%0D%0AMessage:%0D%0A${message}`;
              window.location.href = `mailto:sabtainali375@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input type="text" name="name" placeholder="Alexander Wright" className="bento-input text-xs sm:text-sm" required />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Email</label>
                <input type="email" name="email" placeholder="alex@company.com" className="bento-input text-xs sm:text-sm" required />
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Project Scope / Engagement</label>
              <input type="text" name="projectType" placeholder="WHO / Enterprise Architecture / Data Reconciliation / AI Agents" className="bento-input text-xs sm:text-sm" required />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Message & Technical Details</label>
              <textarea name="message" placeholder="Describe your timeline, core requirements, and technology goals..." className="bento-input text-xs sm:text-sm" rows="4" required></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3.5 sm:py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] bg-[#3BFFB9] text-black hover:bg-[#00F5A0] transition-all duration-300 mt-4 sm:mt-6 cursor-pointer border-none rounded-xl shadow-[0_0_25px_rgba(59,255,185,0.3)]" 
              data-hover="true"
            >
              Dispatch Inquiry →
            </button>
          </form>

          {/* Quick Contact Bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/[0.08] text-xs font-mono text-center">
            <button 
              onClick={handleCopyEmail}
              className="flex items-center gap-2 text-slate-300 hover:text-[#3BFFB9] transition-colors cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-[#3BFFB9]" /> : <Copy className="w-4 h-4 text-[#3BFFB9]" />}
              <span className="break-all">{copiedEmail ? 'Email Copied!' : 'sabtainali375@gmail.com'}</span>
            </button>

            <a href="https://linkedin.com/in/sabtainali123" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-[#3BFFB9] transition-colors" data-hover="true">
              <ExternalLink className="w-4 h-4 text-[#3BFFB9]" /> LinkedIn Profile
            </a>

            <a href="/documents/sabainali_resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-[#3BFFB9] transition-colors" data-hover="true">
              <ShieldCheck className="w-4 h-4 text-[#3BFFB9]" /> Official CV (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.08] py-8 sm:py-12 md:py-16 bg-[#040507] max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
          <div>
             <div className="font-heading text-lg sm:text-xl font-bold tracking-tighter mb-1 text-white">
               SABTAIN ALI<span className="text-[#3BFFB9]">.</span>
             </div>
             <div className="text-[11px] sm:text-xs font-mono text-slate-400">
               <span>© {new Date().getFullYear()} Sabtain Ali • Built with React, Tailwind & Framer Motion</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 md:p-8 bg-black/80 backdrop-blur-md cursor-auto overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[calc(100vw-1.5rem)] md:max-w-5xl bg-[#0c0e17] border border-white/15 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#3BFFB9]/15 rounded-2xl md:rounded-3xl max-h-[88vh] overflow-y-auto my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/80 text-white hover:bg-[#3BFFB9] hover:text-black transition-colors cursor-pointer border border-white/10"
                data-hover="true"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Navigation Buttons (Desktop only or clean bottom bar on mobile) */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateProject('prev'); }}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 text-white hover:bg-[#3BFFB9] hover:text-black transition-colors border border-white/10 backdrop-blur-sm cursor-pointer shadow-lg"
                data-hover="true"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateProject('next'); }}
                className="hidden md:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 text-white hover:bg-[#3BFFB9] hover:text-black transition-colors border border-white/10 backdrop-blur-sm cursor-pointer shadow-lg"
                data-hover="true"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-52 sm:h-72 md:h-auto min-h-[200px] sm:min-h-[300px] relative overflow-hidden bg-[#040508] flex items-center justify-center p-4 sm:p-6 border-b md:border-b-0 md:border-r border-white/[0.08] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedProject.id}
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain rounded-xl shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <div className="flex items-center gap-2.5 text-[#3BFFB9] mb-2 sm:mb-3">
                     <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                     <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase truncate">{selectedProject.category}</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-1.5 text-white">
                    {selectedProject.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs font-mono text-[#3BFFB9] uppercase tracking-wider mb-3 sm:mb-5">
                    {selectedProject.subtitle}
                  </p>
                  
                  <p className="text-slate-300 leading-relaxed text-xs sm:text-sm md:text-base font-light mb-4 sm:mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Key Deliverables:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                      {selectedProject.deliverables?.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#3BFFB9] rounded-full shrink-0 mt-1" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="text-[10px] sm:text-xs font-mono border border-white/10 px-2.5 sm:px-3 py-1 rounded-full text-[#3BFFB9] bg-white/[0.04]">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#3BFFB9] text-black px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#00F5A0] transition-all duration-300 cursor-pointer border-none shadow-[0_0_20px_rgba(59,255,185,0.25)] rounded-xl w-full sm:w-auto text-center"
                      data-hover="true"
                    >
                      Visit Live Production Platform <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </div>

                  {/* Mobile Prev / Next Controls */}
                  <div className="flex md:hidden items-center justify-between mt-4 pt-3 border-t border-white/[0.08]">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigateProject('prev'); }}
                      className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-[#3BFFB9] bg-transparent border-none cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev Project
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigateProject('next'); }}
                      className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-[#3BFFB9] bg-transparent border-none cursor-pointer"
                    >
                      Next Project <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
