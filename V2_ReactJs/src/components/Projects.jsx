import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/portfolioData';

export const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1000) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, projectsData.length - cardsPerPage) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= projectsData.length - cardsPerPage ? 0 : prev + 1));
  };

  const visibleProjects = projectsData.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section id="projects" style={{ padding: '60px 0', position: 'relative' }}>
      <div className="section-title-wrap">
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-underline" />
      </div>

      <div style={{ position: 'relative' }}>
        <button onClick={handlePrev} aria-label="Previous Project" className="carousel-nav-btn prev">
          <i className="bx bx-chevron-left" />
        </button>

        <button onClick={handleNext} aria-label="Next Project" className="carousel-nav-btn next">
          <i className="bx bx-chevron-right" />
        </button>

        <div className="projects-grid">
          {visibleProjects.map((project, idx) => {
            const actualIdx = currentIndex + idx;
            return (
              <div key={actualIdx} className="project-card">
                <div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc" style={expandedIndex === actualIdx ? {} : { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.description}
                  </p>
                  <button
                    onClick={() => toggleExpand(actualIdx)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', marginBottom: '14px' }}
                  >
                    {expandedIndex === actualIdx ? 'See Less' : 'See More'}
                  </button>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} style={{ background: 'var(--accent)', color: '#fff', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '20px', fontWeight: 500 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                  {project.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <i className={`bx ${link.icon}`} /> {link.text}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
          {Array.from({ length: Math.max(1, projectsData.length - cardsPerPage + 1) }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              style={{
                height: '8px',
                width: currentIndex === dotIdx ? '24px' : '8px',
                borderRadius: '8px',
                background: currentIndex === dotIdx ? 'var(--accent)' : 'var(--border-color)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};