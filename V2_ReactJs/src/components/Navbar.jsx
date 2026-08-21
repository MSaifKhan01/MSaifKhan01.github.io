
import React, { useState, useEffect } from 'react';

export const Navbar = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach((section) => {
        const top = section.offsetTop;
        if (window.scrollY >= top - 200) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav-wrap">
      <div className="nav-inner" style={{ position: 'relative' }}>
        {/* Brand Logo */}
        <a href="#home" className="nav-logo">
          Saif Khan
        </a>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-item-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={onOpenResume} className="nav-resume-btn">
              Resume
            </button>
          </li>
        </ul>

        {/* Mobile Burger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-burger-btn"
          aria-label="Toggle menu"
        >
          <i className={isOpen ? 'bx bx-x' : 'bx bx-menu'} />
        </button>

        {/* Mobile Dropdown Menu (Flush to Top and Right edge) */}
        {isOpen && (
          <>
            {/* Click-outside Backdrop */}
            <div
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                top: '65px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(3px)',
                zIndex: 998,
              }}
            />

            {/* Menu Container: 0 top offset, 0 right offset */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                width: '240px',
                backgroundColor: 'var(--card-bg)',
                borderLeft: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                borderBottomLeftRadius: '18px',
                padding: '18px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '-4px 10px 25px rgba(0, 0, 0, 0.15)',
                zIndex: 999,
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Outlined Resume Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume();
                }}
                style={{
                  marginTop: '6px',
                  width: '100%',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: '2px solid var(--accent)',
                  backgroundColor: 'transparent',
                  color: 'var(--accent)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
              >
                Resume
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};