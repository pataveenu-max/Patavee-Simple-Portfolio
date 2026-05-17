import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-container">
      <div className="nav-icon" onClick={() => setIsOpen(!isOpen)} title="Menu">
        ☰
      </div>
      {isOpen && (
        <div className="nav-overlay" onClick={() => setIsOpen(false)}>
          <nav className="nav-menu" onClick={e => e.stopPropagation()}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/results" onClick={() => setIsOpen(false)}>Results</Link>
          </nav>
        </div>
      )}
    </div>
  );
};
