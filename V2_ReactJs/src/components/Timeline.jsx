import React from 'react';

export const Timeline = ({ data, id }) => {
  return (
    <div className="timeline-container" id={id}>
      <div className="timeline-vertical-line" />

      {data.map((item, idx) => (
        <div key={idx} className="timeline-card" style={{ position: 'relative' }}>
          <div className="timeline-node-circle" />

          <div className="timeline-date">
            <span>📅</span> {item.date}
          </div>

          <div className="timeline-header">
            <h3 className="timeline-role">{item.role}</h3>
            {item.actions?.map((act, i) => (
              <a key={i} href={act.href} target="_blank" rel="noreferrer" className="timeline-cert-btn">
                <i className={`bx ${act.icon}`} /> {act.text}
              </a>
            ))}
          </div>

          <div className="timeline-company">
            <a href={item.companyUrl} target="_blank" rel="noreferrer">
              {item.company}
            </a>
            <span>• {item.location}</span>
          </div>

          {item.achievements ? (
            <div style={{ margin: '14px 0' }}>
              {item.achievements.map((ach, aIdx) =>
                typeof ach === 'object' ? (
                  <div key={aIdx} className="timeline-achievement-box">
                    <a href={ach.link} target="_blank" rel="noreferrer">
                      {ach.text} <i className="bx bx-link-external" style={{ fontSize: '0.85rem' }} />
                    </a>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                      {ach.description}
                    </p>
                  </div>
                ) : (
                  <div key={aIdx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <i className="bx bx-check-circle" style={{ color: 'var(--accent)', fontSize: '1.2rem', marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>{ach}</span>
                  </div>
                )
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: '12px 0' }}>
              {item.description}
            </p>
          )}

          {item.technologies && (
            <div className="timeline-tech-wrap">
              <span style={{ width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Technologies Used:
              </span>
              {item.technologies.map((t, tIdx) => (
                <span key={tIdx} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};