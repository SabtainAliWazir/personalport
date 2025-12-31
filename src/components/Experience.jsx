export default function Experience() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "SysReforms International",
      period: "05/2025 - Present",
      link: "https://sysreforms.com/",
      description: "Refactored codebase for speed and security, optimized APIs, and implemented Redux Toolkit."
    },
    {
      title: "Associate Full Stack Developer",
      company: "Logiqon Solution",
      period: "05/2024 - 04/2025",
      link: "https://logiqon.co/",
      description: "Developed backend logic using Laravel and created responsive designs with Tailwind and Bootstrap."
    },
    {
      title: "Wordpress Freelancer",
      company: "Self",
      period: "01/2023 - Present",
      link: "#",
      description: "Developed websites like Premier Staff and Echelon Growth, optimizing performance and SEO."
    },
    {
      title: "React Developer Intern",
      company: "SPQR",
      period: "11/2021 - 01/2022",
      link: "#",
      description: "Developed modular React components and integrated APIs for data fetching."
    },
    {
      title: "Software Engineer Intern",
      company: "Elixir Technologies Corporation",
      period: "06/2019 - 07/2019",
      link: "#",
      description: "Explored business layout software and JSON-based data modeling."
    }
  ];

  const education = [
    {
      degree: "BS Software Engineering (First Class Honors)",
      school: "INSTITUTE OF MANAGEMENT SCIENCES, Pakistan",
      period: "2016 - 2020",
      link: "https://imsciences.edu.pk/",
      description: "Specialized in Data Structures, OOP, Machine Learning, and Web Engineering."
    }
  ];

  return (
    <section id="experience" className="experience container">
      <div className="experience-grid">
        <div className="exp-column">
          <h3 className="section-title glow-text">Experience</h3>
          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item glass">
                <span className="period">{exp.period}</span>
                <h4 className="job-title">{exp.title}</h4>
                <a href={exp.link} target="_blank" className="company">{exp.company}</a>
                {exp.description && <p className="exp-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="exp-column">
          <h3 className="section-title glow-text">Education</h3>
          <div className="timeline">
            {education.map((edu, i) => (
              <div key={i} className="timeline-item glass">
                <span className="period">{edu.period}</span>
                <h4 className="job-title">{edu.degree}</h4>
                <a href={edu.link} target="_blank" className="company">{edu.school}</a>
                {edu.description && <p className="exp-desc">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .experience {
          padding: 8rem 2rem;
        }
        .experience-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .timeline-item {
          padding: 2rem;
          position: relative;
          transition: var(--transition);
        }
        .timeline-item:hover {
          border-color: var(--accent-color);
          transform: scale(1.02);
        }
        .period {
          font-family: var(--font-mono);
          color: var(--accent-color);
          font-size: 0.9rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .job-title {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .company {
          color: var(--text-dim);
          font-weight: 500;
          display: block;
          margin-bottom: 1rem;
        }
        .company:hover {
          color: var(--text-color);
        }
        .exp-desc {
          font-size: 0.95rem;
          color: var(--text-dim);
        }
        @media (max-width: 992px) {
          .experience-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
