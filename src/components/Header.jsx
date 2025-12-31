export default function Header() {
  return (
    <header className="header glass">
      <div className="container header-content">
        <div className="logo">
          <span className="glow-text">SAW</span>
        </div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact" className="contact-btn">Hire Me</a>
        </nav>
      </div>
      <style>{`
        .header {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1000px;
          z-index: 1000;
          padding: 0.8rem 1.5rem;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-weight: 800;
          font-size: 1.5rem;
        }
        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav a {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-dim);
        }
        .nav a:hover {
          color: var(--text-color);
        }
        .contact-btn {
          background: var(--accent-color);
          color: white !important;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          box-shadow: 0 4px 14px var(--accent-glow);
        }
        @media (max-width: 600px) {
          .nav { display: none; }
        }
      `}</style>
    </header>
  );
}
