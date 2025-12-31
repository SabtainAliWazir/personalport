export default function Hero() {
  return (
    <section id="home" className="hero container">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="greeting">Hello, I'm</span>
          <br />
          <span className="name glow-text">Sabtain Ali</span>
        </h1>
        <p className="hero-subtitle">
          Software Engineer | Laravel & React Developer
        </p>
        <p className="hero-description">
          Full Stack Developer with **3+ years of experience** in Laravel, React.js, and MySQL. 
          Expert in building scalable web applications and AI-driven solutions.
        </p>
        <div className="hero-cta">
          <a href="#work" className="btn-primary">View My Work</a>
          <a href="/documents/sabainali_resume.pdf" target="_blank" className="btn-secondary">Download CV</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="image-blob">
           <img src="/images/sabtain-image.png" alt="Sabtain Ali" className="profile-img" />
        </div>
      </div>
      <style>{`
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 4rem;
          padding-top: 6rem;
        }
        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .greeting {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--accent-color);
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .hero-description {
          font-size: 1.15rem;
          color: var(--text-dim);
          max-width: 550px;
          margin-bottom: 2.5rem;
        }
        .hero-description b, .hero-description strong {
          color: var(--text-color);
        }
        .hero-cta {
          display: flex;
          gap: 1.5rem;
        }
        .btn-primary {
          background: var(--accent-color);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 4px 20px var(--accent-glow);
        }
        .btn-secondary {
          border: 1px solid var(--glass-border);
          color: var(--text-color);
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          background: var(--glass-bg);
          backdrop-filter: blur(5px);
        }
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .image-blob {
          width: 380px;
          height: 380px;
          background: var(--accent-color);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: blob 8s infinite alternate;
          overflow: hidden;
          box-shadow: 0 0 50px var(--accent-glow);
        }
        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%);
          transition: var(--transition);
        }
        .profile-img:hover {
          filter: grayscale(0%);
          transform: scale(1.05);
        }
        @keyframes blob {
          from { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          to { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
        }
        @media (max-width: 992px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
            padding-bottom: 4rem;
          }
          .hero-description {
            margin: 0 auto 2.5rem;
          }
          .hero-cta {
            justify-content: center;
          }
          .hero-title { font-size: 3.5rem; }
          .image-blob { width: 300px; height: 300px; }
        }
      `}</style>
    </section>
  );
}
