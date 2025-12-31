import React from 'react';

const projects = [
  {
    title: "Sales Closer",
    category: "AI Sales Agent",
    image: "/images/salescloseai.png",
    link: "https://salescloser.com/"
  },
  {
    title: "Scale Wise",
    category: "AI Agent",
    image: "/images/scalewiseai.png",
    link: "https://scalewise.ai/"
  },
  {
    title: "Shopeedo",
    category: "Ecommerce | Laravel",
    image: "/images/shopeedo_image.PNG",
    link: "http://shopeedo.com/"
  },
  {
    title: "Commuters Link",
    category: "Car Pooling",
    image: "/images/commuterslinks.png",
    link: "https://commuterslink.com/"
  },
  {
    title: "Britons Route",
    category: "Bus Hiring Service",
    image: "/images/britons.png",
    link: "https://www.britonsroute.co.uk/"
  },
  {
    title: "Great Brit",
    category: "Bus Hiring Service",
    image: "/images/greatbrit.png",
    link: "https://greatbrittravels.co.uk/"
  },
  {
    title: "Premiere Staff",
    category: "Event Staffing | Wordpress",
    image: "/images/Premier_Staff.PNG",
    link: "https://premierstaff.com/"
  },
  {
    title: "Wishpond",
    category: "Marketing Automation",
    image: "/images/wishpond.png",
    link: "https://wishpond.com/"
  },
  {
    title: "Provencis",
    category: "Virtual Assistance",
    image: "/images/provencis.png",
    link: "https://provencis.com/"
  }
];

export default function Work() {
  return (
    <section id="work" className="work container">
      <div className="section-header">
        <h3 className="section-title glow-text">Featured Projects</h3>
        <p className="section-desc">Innovative solutions built with Laravel, React, and AI technology.</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card glass">
            <div className="project-img-container">
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=' + project.title }} 
              />
              <div className="project-overlay">
                <span>View Project</span>
              </div>
            </div>
            <div className="project-info">
              <span className="project-cat">{project.category}</span>
              <h4 className="project-name">{project.title}</h4>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .work {
          padding: 8rem 2rem;
        }
        .section-header {
          margin-bottom: 4rem;
          text-align: center;
        }
        .section-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .section-desc {
          color: var(--text-dim);
          font-size: 1.1rem;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        .project-card {
          padding: 1rem;
          transition: var(--transition);
          overflow: hidden;
        }
        .project-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .project-img-container {
          position: relative;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: #1a1a1a;
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        .project-overlay span {
          background: white;
          color: black;
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          transform: translateY(20px);
          transition: var(--transition);
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        .project-card:hover .project-overlay span {
          transform: translateY(0);
        }
        .project-card:hover .project-img {
          transform: scale(1.1);
        }
        .project-cat {
          font-size: 0.8rem;
          color: var(--accent-color);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .project-name {
          font-size: 1.4rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 500px) {
          .projects-grid { grid-template-columns: 1fr; }
          .project-img-container { height: 200px; }
        }
      `}</style>
    </section>
  );
}
