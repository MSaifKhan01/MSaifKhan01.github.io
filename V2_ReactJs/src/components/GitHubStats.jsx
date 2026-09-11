

import React from 'react';

export const GitHubStats = () => {
  const languages = [
    { name: 'JavaScript', percent: '65%', width: '85%', color: '#f7df1e' },
    { name: 'HTML', percent: '18%', width: '70%', color: '#e34c26' },
    { name: 'CSS', percent: '9%', width: '60%', color: '#264de4' },
    { name: 'Python', percent: '8%', width: '40%', color: '#306998' },
  ];

  return (
    <section id="github" style={{ padding: '60px 0' }}>
      <div className="section-title-wrap">
        <h2 className="section-title">GitHub & NPM Statistics</h2>
        <div className="section-underline" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card-box">
          <h3 style={{ color: 'var(--secondary)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bx bx-stats" style={{ color: 'var(--accent)' }} /> GitHub Stats
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Contributions</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)' }}>1,783</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contributions Period</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>29 Nov 2022 - Present</span>
          </div>
        </div>

        <div className="card-box">
          <h3 style={{ color: 'var(--secondary)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bx bx-code-alt" style={{ color: 'var(--accent)' }} /> Top Languages
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {languages.map((lang, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '80px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lang.name}</span>
                <div style={{ flex: 1, height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: lang.width, height: '100%', backgroundColor: lang.color }} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{lang.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card-box" style={{ background: 'linear-gradient(135deg, rgba(0,184,148,0.1), rgba(0,184,148,0.04))' }}>
          <h3 style={{ color: 'var(--secondary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bx bx-trophy" style={{ color: 'var(--accent)' }} /> Longest Streak
          </h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent)' }}>61</span>
            <span style={{ color: 'var(--text-muted)' }}>days</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>10 Jul 2023 - 8 Sep 2023</p>
        </div>

        <div className="card-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--secondary)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bx bx-show" style={{ color: 'var(--accent)' }} /> Profile Views
          </h3>
          <div style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary))', padding: '10px 36px', borderRadius: '50px' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>3,366</span>
          </div>
        </div>
      </div>

      {/* Published NPM Package Section */}
      <div className="card-box" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
        {/* Side-by-Side Grid: Left Description & Actions | Right Graph Image */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="bx bxl-nodejs" style={{ color: '#cb3837', fontSize: '1.8rem' }} />
                <h3 style={{ color: 'var(--secondary)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                  jsa-webdev-kit
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href="https://www.npmjs.com/package/jsa-webdev-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    background: '#cb3837',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  <i className="bx bx-link-external" /> npm Package
                </a>
                <a
                  href="https://github.com/MSaifKhan01/JSA-webdev-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  <i className="bx bxl-github" /> GitHub
                </a>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 10px 0' }}>
              jsa-webdev-kit is a lightweight utility library designed to simplify web development. It includes functions for generating unique IDs, formatting dates, and interacting with OpenAI's GPT models for generative AI tasks.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              I am working to enhance this library and add more functionality.
            </p>
          </div>

          {/* Right-side Graph Image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="../../images/NPM_Graph_SS.jpg"
              alt="jsa-webdev-kit NPM Stats Graph"
              style={{
                width: '100%',
                maxWidth: '460px',
                height: 'auto',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            />
          </div>
        </div>

        {/* Highlighted Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', background: 'rgba(0,0,0,0.02)', padding: '14px', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Current Version</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)' }}>v1.4.1</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Weekly Downloads</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)' }}>37+</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>License</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-secondary)' }}>MIT</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block' }}>Status</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)' }}>Active Development</span>
          </div>
        </div>
      </div>
    </section>
  );
};