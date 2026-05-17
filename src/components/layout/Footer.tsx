import React from 'react';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-inner">
        <div className="logo" style={{ color: 'white' }}>LIVE-STYLE</div>
        <div className="nav-links" style={{ color: 'white' }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
        &copy; 2026 LIVE-STYLE. All rights reserved.
      </p>
    </div>
  </footer>
);
