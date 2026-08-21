

import React, { useState, useRef } from 'react';

export const Contact = ({ onStartSubmission, onSubmissionComplete, onSubmissionError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const abortControllerRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    abortControllerRef.current = new AbortController();

    onStartSubmission(abortControllerRef.current);

    try {
      const res = await fetch("https://m-saif-khan01-github-io.vercel.app/send-email", {
      // const res = await fetch('http://localhost:5000/send-email', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: abortControllerRef.current.signal,
      });

      const data = await res.json();

      if (res.ok) {
        onSubmissionComplete(data.message || "Your message has been sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        onSubmissionError(data.message || "Failed to send message.");
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Submission canceled by user');
      } else {
        onSubmissionError("Error sending message! Please try again later.");
      }
    }
  };

  return (
    <section id="contact" style={{ padding: '60px 0' }}>
      <div className="section-title-wrap">
        <h2 className="section-title">Contact Me</h2>
        <div className="section-underline" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {/* Contact Info Card */}
        <div className="card-box" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="bx bx-user" style={{ fontSize: '1.4rem', color: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>Name:</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Mohd Saif Khan</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="bx bx-envelope" style={{ fontSize: '1.4rem', color: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>Email:</span>
              <a href="mailto:msaifkhan5038@gmail.com" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
                msaifkhan5038@gmail.com
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="bx bx-phone" style={{ fontSize: '1.4rem', color: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>Phone:</span>
              <span style={{ color: 'var(--text-secondary)' }}>+91 9315718415</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="bx bx-map" style={{ fontSize: '1.4rem', color: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>Address:</span>
              <span style={{ color: 'var(--text-secondary)' }}>Jamia Nagar, Okhla, Delhi</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="bx bxl-linkedin" style={{ fontSize: '1.4rem', color: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>LinkedIn:</span>
              <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'none', wordBreak: 'break-all' }}>
                mohd-saif-khan-3b4979202
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <i className="bx bxl-github" style={{ fontSize: '1.4rem', color: 'var(--accent)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>GitHub:</span>
              <a href="https://github.com/MSaifKhan01" target="_blank" rel="noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
                MSaifKhan01
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card-box">
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>Send me a message</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Your Email <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Your Message <span style={{ color: 'red' }}>*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none', resize: 'none' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};