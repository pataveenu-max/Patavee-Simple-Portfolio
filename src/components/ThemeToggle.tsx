import React from 'react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle-icon" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? '☼' : '☽'}
    </div>
  );
};
