import React from 'react';

export const About = () => {
  
  return (
    <section id="about" style={{ padding: '15px 0' }}>
      <div className="section-title-wrap">
        <h2 className="section-title">About Me</h2>
        <div className="section-underline" />
      </div>

      {/* <div className="card-box" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
          I'm a Full Stack Developer with <strong>over 2 years</strong> of hands-on experience passionate about building scalable backends and engaging frontends. At Labrys
          Solutions (Gurgaon), I've contributed to impactful products, robust APIs, and UI-rich applications using
          JavaScript, TypeScript, Node.js, and React. With a background in Electrical Engineering, I blend
          analytical thinking with creative problem-solving to turn complex problems into simple, effective solutions.
        </p>
      </div> */}

      
<div
  className="card-box"
  style={{
    maxWidth: "850px",
    margin: "0 auto",
    textAlign: "center",
  }}
>
  <p
    style={{
      color: "var(--text-secondary)",
      fontSize: "1.08rem",
      lineHeight: "1.9",
      letterSpacing: "0.2px",
    }}
  >
    I'm a <strong>Full Stack Developer</strong> with{" "}
    <strong>2+ years of hands-on experience</strong> building scalable
    web applications, robust backend APIs, and intuitive user
    experiences. Proficient in{" "}
    <strong>Node.js, React, TypeScript, MongoDB, and Python</strong>,
    I combine engineering expertise with creative problem-solving to
    deliver efficient, reliable, and user-focused solutions.
    Passionate about turning complex challenges into impactful
    products that make a difference.
  </p>
</div>
    </section>
  );
};