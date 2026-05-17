import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation, ThemeToggle } from './components';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import './index.css';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      <header className="header">
        <Navigation />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
