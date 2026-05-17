import React from 'react';

export const Header: React.FC = () => (
  <header className="header">
    <div className="container header-inner">
      <div className="logo">LIVE-STYLE</div>
      <nav className="nav-links">
        <a href="#">Journal</a>
        <a href="#">Objects</a>
        <a href="#">Spaces</a>
        <a href="#">About</a>
      </nav>
      <div className="nav-links">
        <a href="#">Search</a>
        <a href="#">Cart (0)</a>
      </div>
    </div>
  </header>
);
