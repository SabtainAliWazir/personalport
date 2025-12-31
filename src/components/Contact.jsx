export default function Contact() {
  return (
    <footer id="contact" className="contact container">
      <div className="contact-card glass">
        <div className="contact-info">
          <h2 className="glow-text">Let's work together</h2>
          <p>Based in Islamabad, PK. Available for worldwide collaborations.</p>
          <div className="contact-details">
            <div className="detail-item">
              <span className="label">Location</span>
              <p>G-11/1, Islamabad, Pakistan</p>
            </div>
            <div className="detail-item">
              <span className="label">Email</span>
              <p><a href="mailto:sabtainali375@gmail.com">sabtainali375@gmail.com</a></p>
            </div>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/sabtainali123/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.facebook.com/sabtain.ali.129/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://github.com/sabtainali123" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input type="text" placeholder="Name" className="glass" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" className="glass" />
          </div>
          <div className="form-group">
            <textarea placeholder="Message" className="glass" rows="4"></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Sabtain Ali. Built with React & Passion.</p>
      </div>

      <style>{`
        .contact {
          padding: 8rem 2rem 4rem;
        }
        .contact-card {
          padding: 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .contact-info h2 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
        }
        .contact-info p {
          color: var(--text-dim);
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .contact-details {
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .detail-item .label {
          font-family: var(--font-mono);
          color: var(--accent-color);
          font-size: 0.8rem;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.3rem;
        }
        .detail-item p {
          font-size: 1.1rem;
          color: var(--text-color);
          margin-bottom: 0;
        }
        .social-links {
          display: flex;
          gap: 2rem;
        }
        .social-links a {
          font-family: var(--font-mono);
          color: var(--accent-color);
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition);
          border-bottom: 1px solid transparent;
        }
        .social-links a:hover {
          color: var(--text-color);
          border-bottom-color: var(--accent-color);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 1.2rem;
          color: white;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          outline: none;
          transition: var(--transition);
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent-color);
          background: rgba(255, 255, 255, 0.05);
        }
        .submit-btn {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 14px var(--accent-glow);
          font-size: 1rem;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--accent-glow);
        }
        .footer-bottom {
          margin-top: 4rem;
          text-align: center;
          color: var(--text-dim);
          font-size: 0.9rem;
        }
        @media (max-width: 992px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 2.5rem;
            gap: 3rem;
          }
          .contact-info h2 { font-size: 2.5rem; }
        }
      `}</style>
    </footer>
  );
}
