
import React from 'react';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleView = () => {
    window.open('/Mohd Saif Khan-Resume.pdf', '_blank');
    onClose();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Mohd Saif Khan-Resume.pdf';
    link.download = 'Mohd Saif Khan-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 2000,
      }}
    >
      <div
        className="card-box"
        style={{
          position: 'relative',
          maxWidth: '420px',
          width: '100%',
          padding: '36px 28px',
          textAlign: 'center',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '1.8rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
        >
          <i className="bx bx-x" />
        </button>

        {/* Modal Header */}
        <h3
          style={{
            color: 'var(--text-primary)',
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: '10px',
          }}
        >
          View or Download Resume
        </h3>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            marginBottom: '28px',
          }}
        >
          Would you like to view the resume online or download it to your device?
        </p>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleView}
            className="btn-primary"
            style={{
              padding: '10px 28px',
              fontSize: '0.92rem',
            }}
          >
            View Online
          </button>
          <button
            onClick={handleDownload}
            className="btn-outline"
            style={{
              padding: '10px 28px',
              fontSize: '0.92rem',
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};