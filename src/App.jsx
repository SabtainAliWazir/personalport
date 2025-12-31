import './styles/global.css';
import { useEffect, useRef, useState } from 'react';

// Custom hook for counting animation
function useCountUp(end, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);
  
  return count;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  
  // Counting stats
  const yearsCount = useCountUp(3, 1500, statsVisible);
  const projectsCount = useCountUp(15, 1500, statsVisible);
  
  // Loading screen effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (loading) return;
    
    setMounted(true);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Trigger stats counting when stats card is visible
          if (entry.target.classList.contains('stats-card')) {
            setStatsVisible(true);
          }
        }
      });
    }, observerOptions);
    
    // Observe all bento cards
    document.querySelectorAll('.bento-card, .project-card-item').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [loading]);

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-content">
          <div className="loader-orbit-container">
            <div className="loader-orbit">
              <span style={{'--i': 0}}>Laravel</span>
              <span style={{'--i': 1}}>React</span>
              <span style={{'--i': 2}}>Node.js</span>
              <span style={{'--i': 3}}>MySQL</span>
              <span style={{'--i': 4}}>Express</span>
              <span style={{'--i': 5}}>Git</span>
            </div>
            <div className="loader-logo">SA</div>
          </div>
          <div className="loader-text">INITIALIZING SYSTEM</div>
          <div className="loader-bar">
            <div className="loader-progress" style={{width: `${Math.min(loadingProgress, 100)}%`}}></div>
          </div>
          <div className="loader-percent">{Math.min(Math.floor(loadingProgress), 100)}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <a href="#" className="logo">SA</a>
          <nav className="nav">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact" className="btn-accent">Let's Talk</a>
          </nav>
        </div>
      </header>

      {/* Bento Grid */}
      <main className="bento-grid">
        
        {/* Hero Card - Large */}
        <section className="bento-card hero-card">
          <span className="section-label">Full Stack Developer</span>
          <h1 className="heading-lg">
            Hi, I'm <span style={{color: 'var(--accent)'}}>Sabtain Ali</span>
          </h1>
          <p className="hero-desc text-dim">
            3+ years crafting high-performance web applications with Laravel, React, and AI-driven solutions.
          </p>
          <div className="hero-cta">
            <a href="#work" className="btn-accent">View Projects</a>
            <a href="/documents/sabainali_resume.pdf" target="_blank" className="btn-ghost">Resume ↗</a>
          </div>
        </section>

        {/* Profile Image Card */}
        <section className="bento-card profile-card">
          <img src="/images/sabtain-image.png" alt="Sabtain Ali" />
        </section>

        {/* Tech Stack Card */}
        <section className="bento-card stack-card">
          <span className="section-label">Skills & Expertises</span>
          <div className="stack-icons">
            <span>Laravel</span> <span>React.js</span> <span>MySQL</span> <span>Tailwind CSS</span>
            <span>WordPress</span> <span>Webflow</span> <span>GitHub</span> <span>Frontend</span>
            <span>Backend</span> <span>REST APIs</span> <span>JavaScript</span>
          </div>
        </section>

        {/* Stats Card */}
        <section className="bento-card stats-card">
          <div className="stat">
            <span className="stat-number">{yearsCount}+</span>
            <span className="stat-label text-dim">Years Exp</span>
          </div>
          <div className="stat">
            <span className="stat-number">{projectsCount}+</span>
            <span className="stat-label text-dim">Projects</span>
          </div>
        </section>

      </main>

      {/* Scrolling Ticker - Outside of grid */}
      <div className="ticker-wrapper">
        <div className="ticker-container">
          <div className="ticker-track">
            <div className="ticker-content">
              <span>LARAVEL</span><span className="ticker-dot">•</span>
              <span>REACT</span><span className="ticker-dot">•</span>
              <span>INNOVATION</span><span className="ticker-dot">•</span>
              <span>FULL STACK</span><span className="ticker-dot">•</span>
              <span>AI SOLUTIONS</span><span className="ticker-dot">•</span>
              <span>WEB DEVELOPMENT</span><span className="ticker-dot">•</span>
              <span>LARAVEL</span><span className="ticker-dot">•</span>
              <span>REACT</span><span className="ticker-dot">•</span>
              <span>INNOVATION</span><span className="ticker-dot">•</span>
              <span>FULL STACK</span><span className="ticker-dot">•</span>
              <span>AI SOLUTIONS</span><span className="ticker-dot">•</span>
              <span>WEB DEVELOPMENT</span><span className="ticker-dot">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects and Lower Content */}
      <main className="bento-grid bento-grid-lower">

        {/* Projects Section - Moved Up */}
        <section id="work" className="bento-card projects-card">
          <span className="section-label">Featured Work</span>
          <h2 className="heading-md">Selected Projects</h2>
          <div className="projects-grid">
            <ProjectCard title="Sales Closer" category="AI Sales Agent" image="/images/salescloseai.png" link="https://salescloser.com/" />
            <ProjectCard title="Scale Wise" category="AI Agent" image="/images/scalewiseai.png" link="https://scalewise.ai/" />
            <ProjectCard title="Shopeedo" category="Ecommerce" image="/images/shopeedo_image.PNG" link="http://shopeedo.com/" />
            <ProjectCard title="Commuters Link" category="Car Pooling" image="/images/commuterslinks.png" link="https://commuterslink.com/" />
            <ProjectCard title="Britons Route" category="Transport" image="/images/britons.png" link="https://britonsroute.co.uk/" />
            <ProjectCard title="Premier Staff" category="Staffing" image="/images/Premier_Staff.PNG" link="https://premierstaff.com/" />
          </div>
        </section>

        {/* Experience Section - Single Column Chronological */}
        <section id="experience" className="bento-card experience-card full-width">
          <span className="section-label">Experience</span>
          <div className="exp-timeline-vertical">
            <div className="exp-group">
              <div className="exp-meta">
                <span className="exp-date">05/2025 – Present</span>
                <h4 className="exp-role">Full Stack Developer</h4>
                <a href="https://sysreforms.com/" target="_blank" className="exp-company">SysReforms International</a>
              </div>
              <ul className="exp-bullets text-dim">
                <li>Developed and maintained mission-critical applications for health and social sectors.</li>
                <li>Refactored legacy codebases to improve <b>speed and security</b>, achieving significant performance gains.</li>
                <li>Optimized high-traffic <b>RESTful API</b> endpoints and significantly reduced memory utilization.</li>
                <li>Implemented <b>Redux Toolkit</b> for efficient and predictable state management across complex platforms.</li>
              </ul>
            </div>

            <div className="exp-group">
              <div className="exp-meta">
                <span className="exp-date">05/2024 – 04/2025</span>
                <h4 className="exp-role">Associate Full Stack Developer</h4>
                <p className="exp-company">Logiqon Solution</p>
              </div>
              <ul className="exp-bullets text-dim">
                <li>Collaborated on building and optimizing backend logic using <b>Laravel</b> and Eloquent ORM.</li>
                <li>Developed pixel-perfect, mobile-first responsive interfaces using <b>Tailwind CSS</b> and Bootstrap.</li>
                <li>Managed relational databases and optimized queries for better application scalability.</li>
              </ul>
            </div>

            <div className="exp-group">
              <div className="exp-meta">
                <span className="exp-date">01/2023 – Present</span>
                <h4 className="exp-role">WordPress Freelancer</h4>
                <p className="exp-company">Self-Employed (Remote)</p>
              </div>
              <ul className="exp-bullets text-dim">
                <li>Designed and deployed high-performance custom websites for a diverse range of international clients.</li>
                <li>Optimized websites for <b>speed, performance, and SEO</b>, achieving top Lighthouse scores.</li>
                <li>Managed complete project lifecycles for platforms like <i>Premier Staff</i> and <i>Scale Wise</i>.</li>
              </ul>
            </div>

            <div className="exp-group">
              <div className="exp-meta">
                <span className="exp-date">11/2021 – 01/2022</span>
                <h4 className="exp-role">React Developer Intern</h4>
                <p className="exp-company">SPQR</p>
              </div>
              <ul className="exp-bullets text-dim">
                <li>Developed modular and reusable <b>React.js</b> components for scalable frontend architectures.</li>
                <li>Integrated third-party APIs and focused on enhancing user interface interactivity.</li>
              </ul>
            </div>

            <div className="exp-group">
              <div className="exp-meta">
                <span className="exp-date">06/2019 – 07/2019</span>
                <h4 className="exp-role">Software Engineer Intern</h4>
                <p className="exp-company">Elixir Technologies Corporation</p>
              </div>
              <ul className="exp-bullets text-dim">
                <li>Gained hands-on experience in <b>SDLC</b> within a professional enterprise environment.</li>
                <li>Explored business layout design software and JSON-based data modeling techniques.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section - Full Width */}
        <section className="bento-card education-card full-width">
          <span className="section-label">Education</span>
          <div className="edu-content">
            <h4 className="heading-sm">BS Software Engineering</h4>
            <p className="edu-school">Institute of Management Sciences (IMSciences), Pakistan</p>
            <span className="exp-date">2016 - 2020 • First Class Honors</span>
            <div className="edu-details-grid">
              <div className="edu-modules">
                <p className="text-dim"><b>Core Modules:</b></p>
                <div className="stack-icons" style={{marginTop: '0.5rem'}}>
                  <span>Data Structures</span> <span>Algorithms</span> <span>OOP</span> <span>OS</span> 
                  <span>Machine Learning</span> <span>Web Engineering</span> <span>AI & Data Science</span>
                </div>
              </div>
              <div className="fyp-box glass-sm">
                <span className="label-xs">Final Year Project</span>
                <p style={{fontSize: '0.9rem'}}>Incubation center and startup management system built with <b>Laravel & Vue.js</b>. Features included startup tracking and mentor assignment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section - Full Width */}
        <section className="bento-card certification-card full-width">
          <span className="section-label">Professional Certifications</span>
          <div className="certs-grid">
            {[
              { title: "Programming with JavaScript", org: "Meta (Coursera)" },
              { title: "HTML, CSS, and JavaScript for Web Developers", org: "Johns Hopkins University (Coursera)" },
              { title: "Fundamentals of Digital Marketing", org: "Google Digital Garage" },
              { title: "Create a No-Code Responsive Website with Webflow", org: "Coursera Project Network" },
              { title: "Introduction to Front-end Development", org: "Meta (Coursera)" },
              { title: "Database Structures and Management with MySQL", org: "Meta (Coursera)" },
              { title: "Webflow 101 Certification Exam", org: "Webflow University" },
              { title: "Blockchain Basics", org: "State University of New York (Coursera)" }
            ].map((cert, i) => (
              <div key={i} className="cert-item-box">
                <p className="cert-title">{cert.title}</p>
                <span className="cert-org text-dim">{cert.org}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Card */}
        <section id="contact" className="bento-card contact-card">
          <div className="contact-grid">
            <div className="contact-info-text">
              <span className="section-label">Available for hire</span>
              <h2 className="heading-md">Let's build something great.</h2>
              <p className="text-dim" style={{marginBottom: '2rem'}}>Have a project in mind? reach out and let's discuss how I can help.</p>
              <div className="contact-links-list">
                <a href="mailto:sabtainali375@gmail.com" className="contact-link-item">
                  <span className="contact-icon">✉</span> sabtainali375@gmail.com
                </a>
                <a href="https://linkedin.com/in/sabtainali123" target="_blank" className="contact-link-item">
                  <span className="contact-icon">in</span> LinkedIn
                </a>
            </div>
            </div>
            
            <form 
              className="contact-form" 
              onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.name.value;
                const email = e.target.email.value;
                const message = e.target.message.value;
                const subject = `Portfolio Contact from ${name}`;
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                window.location.href = `mailto:sabtainali375@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
              }}
            >
              <div className="form-row">
                <input type="text" name="name" placeholder="Your Name" className="bento-input" required />
                <input type="email" name="email" placeholder="Your Email" className="bento-input" required />
              </div>
              <textarea name="message" placeholder="Tell me about your project..." className="bento-input" rows="4" required></textarea>
              <button type="submit" className="btn-accent" style={{width: '100%', justifyContent: 'center'}}>Send Message</button>
            </form>
          </div>
        </section>

      </main>

      {/* Animated Background Orbs */}
      <div className="orb-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <style>{`
        /* ✨ LOADING SCREEN */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loader-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .loader-orbit-container {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .loader-orbit {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 50%;
          animation: orbitSpin 10s linear infinite;
        }
        .loader-orbit span {
          position: absolute;
          left: 50%;
          top: 0;
          transform-origin: 0 140px;
          transform: rotate(calc(var(--i) * 60deg)) translateX(-50%);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          background: var(--bg-color);
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          white-space: nowrap;
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .loader-logo {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--accent);
          animation: pulse 1.5s ease-in-out infinite;
          z-index: 1;
        }
        .loader-text {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          color: var(--text-dim);
          margin-bottom: 1.5rem;
        }
        .loader-bar {
          width: 200px;
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          margin: 0 auto 1rem;
        }
        .loader-progress {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), #a855f7);
          border-radius: 10px;
          transition: width 0.1s ease-out;
        }
        .loader-percent {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          color: var(--accent);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }

        /* ✨ SCROLLING TICKER - Now outside of grid */
        .ticker-wrapper {
          max-width: 1400px;
          margin: 1.25rem auto;
          padding: 0 1.5rem;
        }
        .ticker-container {
          overflow: hidden;
          padding: 0.75rem 0;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .bento-grid-lower {
          margin-top: 0;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 25s linear infinite;
        }
        .ticker-content {
          display: flex;
          gap: 2rem;
          align-items: center;
          padding-right: 2rem;
        }
        .ticker-content span {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dim);
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ticker-dot {
          color: var(--accent) !important;
          font-size: 1.2rem !important;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ✨ GRID PATTERN BACKGROUND */
        .app::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: -2;
        }

        .app {
          min-height: 100vh;
          padding: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .header {
          margin-bottom: 2rem;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }
        .logo {
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--accent);
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav a:not(.btn-accent) {
          color: var(--text-dim);
          font-weight: 500;
          transition: var(--transition);
        }
        .nav a:not(.btn-accent):hover {
          color: var(--text-color);
        }

        /* Bento Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(180px, auto);
          gap: 1.25rem;
        }

        /* Hero Card */
        .hero-card {
          grid-column: span 2;
          grid-row: span 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-desc {
          font-size: 1.1rem;
          margin: 1.5rem 0 2rem;
          max-width: 400px;
        }
        .hero-cta {
          display: flex;
          gap: 1rem;
        }

        /* Profile Card */
        .profile-card {
          grid-column: span 1;
          grid-row: span 2;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--accent-soft), transparent);
        }
        .profile-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius);
        }

        /* Stack Card */
        .stack-card {
          grid-column: span 1;
        }
        .stack-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .stack-icons span {
          background: var(--accent-soft);
          color: var(--accent);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Stats Card */
        .stats-card {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .stat {
          text-align: center;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent);
          display: block;
        }
        .stat-label {
          font-size: 0.85rem;
        }

        /* Projects Card */
        .projects-card {
          grid-column: span 4;
          padding: 2.5rem;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 2rem;
        }

        /* Experience Card Vertical */
        .experience-card, .education-card, .certification-card {
          grid-column: span 4;
        }
        .full-width {
          grid-column: span 4 !important;
        }
        .exp-timeline-vertical {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .exp-group {
          position: relative;
          padding-left: 1.5rem;
          border-left: 1px solid var(--border);
        }
        .exp-group::after {
          content: '';
          position: absolute;
          left: -4.5px;
          top: 0;
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent);
        }
        .exp-date {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          display: block;
          margin-bottom: 0.3rem;
        }
        .exp-role {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .exp-company {
          font-size: 0.85rem;
          color: var(--text-color);
          margin-bottom: 0.75rem;
          display: block;
          text-decoration: underline rgba(255,255,255,0.1);
        }
        .exp-bullets {
          padding-left: 1.2rem;
          font-size: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .exp-bullets li b {
          color: var(--text-color);
        }

        /* Education Card Modern Layout */
        .edu-content { margin-top: 1rem; }
        .edu-school { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.25rem; }
        .edu-details-grid {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .fyp-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          padding: 1.25rem;
          border-radius: 16px;
        }
        .label-xs {
          font-family: var(--font-mono); font-size: 0.65rem; text-transform: uppercase;
          color: var(--accent); display: block; margin-bottom: 0.5rem;
        }

        /* Certifications Grid */
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        .cert-item-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          padding: 1.25rem;
          border-radius: 16px;
          transition: var(--transition);
        }
        .cert-item-box:hover {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }
        .cert-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem; }
        .cert-org { font-size: 0.8rem; }

        /* Contact Card */
        .contact-card {
          grid-column: span 4;
          padding: 3rem;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }
        .contact-links-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-link-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--text-dim);
          font-weight: 500;
          transition: var(--transition);
        }
        .contact-link-item:hover {
          color: var(--accent);
        }
        .contact-icon {
          width: 32px;
          height: 32px;
          background: var(--accent-soft);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 0.9rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .bento-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
          color: white;
          font-family: inherit;
          outline: none;
          transition: var(--transition);
        }
        .bento-input:focus {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.08);
        }

        /* ✨ ANIMATED BACKGROUND ORBS */
        .orb-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }
        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          top: -10%;
          left: -10%;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          bottom: -10%;
          right: -10%;
          animation-delay: -7s;
        }
        .orb-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          top: 40%;
          right: 20%;
          animation-delay: -14s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* ✨ SCROLL REVEAL ANIMATIONS */
        .bento-card, .project-card-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bento-card.animate-in, .project-card-item.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        /* Staggered animation delays */
        .bento-card:nth-child(1) { transition-delay: 0s; }
        .bento-card:nth-child(2) { transition-delay: 0.1s; }
        .bento-card:nth-child(3) { transition-delay: 0.2s; }
        .bento-card:nth-child(4) { transition-delay: 0.3s; }
        .bento-card:nth-child(5) { transition-delay: 0.4s; }

        /* ✨ ENHANCED HOVER EFFECTS */
        .bento-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bento-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);
        }
        .bento-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          padding: 2px;
          background: linear-gradient(135deg, var(--accent), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .bento-card:hover::after {
          opacity: 0.3;
        }

        /* Enhanced Project Card Hover */
        .project-card-item {
          position: relative;
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card-item:hover {
          transform: translateY(-12px) rotateX(5deg);
          box-shadow: 0 30px 80px rgba(99, 102, 241, 0.3);
        }

        /* ✨ GLOWING TEXT EFFECT */
        .heading-lg {
          background: linear-gradient(135deg, #fff, var(--accent), #fff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradientShift 8s ease infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Button Hover Glow */
        .btn-accent {
          position: relative;
          overflow: hidden;
        }
        .btn-accent::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .btn-accent:hover::before {
          width: 300px;
          height: 300px;
        }

        /* Stats Number Animation */
        .stat-number {
          animation: countUp 2s ease-out forwards;
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Experience Timeline Glow */
        .exp-group::after {
          transition: all 0.3s;
        }
        .exp-group:hover::after {
          width: 12px;
          height: 12px;
          left: -6px;
          box-shadow: 0 0 20px var(--accent), 0 0 40px var(--accent);
        }

        /* Skill Tags Float */
        .stack-icons span {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        .stack-icons span:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        /* Certification Cards */
        .cert-item-box {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cert-item-box:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.25);
        }

        /* Mobile: Disable heavy animations */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .bento-grid { 
            grid-template-columns: repeat(2, 1fr); 
            grid-auto-rows: minmax(160px, auto);
          }
          .hero-card, .projects-card, .contact-card, .experience-card, .education-card, .certification-card { 
            grid-column: span 2 !important; 
          }
          .profile-card { grid-column: span 1; grid-row: span 1; }
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        @media (max-width: 768px) {
          .app { padding: 1rem; }
          .bento-card { padding: 1.5rem !important; }
          .edu-details-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .contact-card { padding: 2rem !important; }
          .form-row { grid-template-columns: 1fr; }
          .heading-lg { font-size: 2.8rem; }
        }

        @media (max-width: 640px) {
          .bento-grid { 
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem;
          }
          .bento-card {
            width: 100% !important;
            min-height: auto !important;
          }
          .hero-card, .profile-card, .stack-card, .stats-card, .projects-card, .experience-card, .education-card, .certification-card { 
            grid-column: unset !important; 
            grid-row: unset !important;
          }
          .projects-grid { grid-template-columns: 1fr; }
          .nav a:not(.btn-accent) { display: none; }
          
          .hero-card {
            text-align: center;
            align-items: center;
            padding: 2rem 1.5rem !important;
            min-height: auto !important;
          }
          .heading-lg { 
            font-size: 2rem !important; 
            word-break: normal !important;
            white-space: normal !important;
            overflow-wrap: normal !important;
            line-height: 1.2 !important;
          }
          .hero-desc {
            font-size: 0.95rem;
            margin: 1rem 0 1.5rem;
            max-width: 100%;
          }
          .hero-cta { 
            flex-direction: column; 
            width: 100%;
            gap: 0.75rem;
          }
          .hero-cta .btn-accent, .hero-cta .btn-ghost {
            width: 100%;
            justify-content: center;
          }
          .profile-card {
            height: 350px !important;
            min-height: 350px !important;
            order: -1;
          }
          .profile-card img {
            object-fit: cover;
            object-position: top;
            height: 100%;
            width: 100%;
          }
          .exp-timeline-vertical {
            gap: 1.5rem;
          }
          .exp-role {
            font-size: 1rem;
          }
          .stack-icons {
            justify-content: center;
          }
          .stats-card {
            padding: 1.5rem !important;
          }
          .stat-number {
            font-size: 2rem;
          }

          /* Mobile: Simplify animations */
          .orb-1, .orb-2, .orb-3 {
            width: 200px !important;
            height: 200px !important;
            opacity: 0.15;
          }
          .bento-card:hover {
            transform: none !important;
          }
          .project-card-item:hover {
            transform: none;
          }
        }

        @media (max-width: 480px) {
          .heading-lg { font-size: 2rem; }
          .bento-card { padding: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ title, category, image, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="project-card-item">
      <div className="project-img-wrap">
        <img src={image} alt={title} onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=' + title }} />
      </div>
      <div className="project-info">
        <span className="project-cat">{category}</span>
        <h4>{title}</h4>
      </div>
      <style>{`
        .project-card-item {
          background: var(--bg-color);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: var(--transition);
        }
        .project-card-item:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
        }
        .project-img-wrap {
          height: 160px;
          overflow: hidden;
        }
        .project-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        .project-card-item:hover .project-img-wrap img {
          transform: scale(1.05);
        }
        .project-info {
          padding: 1rem;
        }
        .project-cat {
          font-size: 0.75rem;
          color: var(--accent);
          font-family: var(--font-mono);
          text-transform: uppercase;
        }
        .project-info h4 {
          font-size: 1rem;
          margin-top: 0.3rem;
        }
      `}</style>
    </a>
  );
}

export default App;
