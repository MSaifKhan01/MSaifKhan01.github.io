import React from 'react';
import { skillsData } from '../data/portfolioData';

export const Skills = () => {
  return (
    <section id="skills" style={{ padding: '60px 0' }}>
      <div className="section-title-wrap">
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-underline" />
      </div>

      <div className="skills-grid">
        {skillsData.map((skill, idx) => (
          <div key={idx} className="skill-card">
            <img src={skill.icon} alt={skill.name} loading="lazy" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};