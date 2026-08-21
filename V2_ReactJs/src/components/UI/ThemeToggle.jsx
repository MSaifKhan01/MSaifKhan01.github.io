import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="floating-theme-btn"
    >
      <i className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'}`} />
    </button>
  );
};