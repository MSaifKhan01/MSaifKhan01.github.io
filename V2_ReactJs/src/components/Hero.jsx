import React, { useEffect, useState } from 'react';

const roles = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Backend Developer',
  'Frontend Developer',
  'Node.js Developer',
  'React Developer',
];

export const Hero = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && text === current) {
      speed = 1800;
    } else if (isDeleting && text === '') {
      speed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-wrapper">
      <h1 className="hero-heading">Mohd Saif Khan</h1>

      <div className="hero-img-box">
        <img
          src="/images/Self-Image-2.jpg"
          alt="Mohd Saif Khan"
          loading="lazy"
        />
      </div>

      <div className="hero-typing">
        <span>{text}</span>
        <span style={{ animation: 'blink 1s infinite' }}>|</span>
      </div>

      <p className="hero-paragraph">
        Full Stack Developer specializing in scalable web & backend APIs, and intuitive user interfaces. Skilled in
        Node.js, React, MongoDB, and Python. Eager to build high-impact products!
      </p>

      <div className="hero-actions">
        <a href="#contact" className="btn-primary">
          Hire Me
        </a>
        <button onClick={onOpenResume} className="btn-outline">
          Resume
        </button>
      </div>

      <div className="hero-socials">
        <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank" rel="noreferrer">
          <i className="bx bxl-linkedin-square" />
        </a>
        <a href="https://github.com/MSaifKhan01" target="_blank" rel="noreferrer">
          <i className="bx bxl-github" />
        </a>
        <a href="mailto:msaifkhan5038@gmail.com">
          <i className="bx bx-envelope" />
        </a>
      </div>
    </section>
  );
};