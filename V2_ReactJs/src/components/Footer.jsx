import React from 'react';

export const Footer = () => {
  return (
    <footer style={{ padding: '35px 0', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', marginTop: '60px' }}>
      <p>&copy; {new Date().getFullYear()} Mohd Saif Khan. All rights reserved. | Designed with ❤️ by Saif Khan</p>
    </footer>
  );
};