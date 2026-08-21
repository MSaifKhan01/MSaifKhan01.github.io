
import React, { useEffect, useState, useRef } from 'react';

export const FormStatusModal = ({ isOpen, status, message, onClose, onCancel }) => {
  const [seconds, setSeconds] = useState(0);
  const maxWait = 120;
  const autoCloseTimeoutRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isOpen && status === 'loading') {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev + 1 >= maxWait) {
            clearInterval(interval);
            return maxWait;
          }
          return prev + 1;
        });
      }, 1000);
    }

    if (isOpen && (status === 'success' || status === 'error')) {
      const delay = status === 'success' ? 3000 : 5000;
      autoCloseTimeoutRef.current = setTimeout(() => {
        onClose();
      }, delay);
    }

    return () => {
      clearInterval(interval);
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current);
      }
    };
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  const progressPercent = Math.min((seconds / maxWait) * 100, 100);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && (status === 'loading' ? onCancel() : onClose())}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999,
      }}
    >
      <div
        className="card-box"
        style={{
          position: 'relative',
          maxWidth: '500px',
          width: '90%',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Close (X) Button */}
        <button
          onClick={status === 'loading' ? onCancel : onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
        >
          <i className="bx bx-x" />
        </button>

        {/* Dynamic Icon */}
        <div style={{ fontSize: '3rem', color: status === 'error' ? '#dc3545' : 'var(--accent)', marginBottom: '15px' }}>
          {status === 'loading' && <i className="bx bx-time" />}
          {status === 'success' && <i className="bx bx-check-circle" />}
          {status === 'error' && <i className="bx bx-error" />}
        </div>

        {/* Dynamic Title */}
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '15px' }}>
          {status === 'loading' && (seconds >= maxWait ? 'Server Timeout' : 'Sending Your Message')}
          {status === 'success' && 'Message Sent Successfully!'}
          {status === 'error' && 'Error Sending Message'}
        </h3>

        {/* Dynamic Message */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
          {status === 'loading' &&
            (seconds >= maxWait
              ? 'The server is taking longer than expected to respond. Please try again in a few moments.'
              : "Please wait while we process your request. This may take up to 2 minutes because we are using a free hosting server, which is why it takes longer.")}
          {(status === 'success' || status === 'error') && message}
        </p>

        {/* Time Elapsed & Progress Bar (Only during Loading) */}
        {status === 'loading' && (
          <div style={{ margin: '20px 0' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '15px' }}>
              Time elapsed: {seconds}s
            </div>
            <div
              style={{
                height: '6px',
                background: 'var(--border-color)',
                borderRadius: '3px',
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'var(--accent)',
                  width: `${progressPercent}%`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
          {status === 'loading' && seconds < maxWait && (
            <button
              onClick={onCancel}
              className="btn-outline"
              style={{ padding: '10px 24px', fontSize: '0.95rem' }}
            >
              Cancel
            </button>
          )}

          {(status === 'success' || status === 'error' || seconds >= maxWait) && (
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '10px 30px', fontSize: '0.95rem' }}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};