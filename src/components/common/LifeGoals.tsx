import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTradeData } from '../../hooks/useTradeData';

export const LifeGoals: React.FC = () => {
  const { trades } = useTradeData();
  const navigate = useNavigate();
  const [showCashFlowMenu, setShowCashFlowMenu] = useState(false);
  
  const totalNetPL = trades.reduce((sum, t) => sum + t.netPL, 0);
  const winRate = trades.length > 0 
    ? ((trades.filter(t => t.netPL > 0).length / trades.length) * 100).toFixed(1) 
    : 0;

  const goalCategories = [
    { title: 'Health', goals: ['Daily 30m Workout', '8 Hours Sleep', 'Clean Diet'] },
    { 
      title: 'Wealth', 
      goals: [
        `Net P/L: ${totalNetPL >= 0 ? '+' : ''}${totalNetPL.toLocaleString()} THB`,
        `Win Rate: ${winRate}%`,
        'Master Technical Analysis'
      ] 
    },
    { 
      title: 'Cash Flow', 
      goals: ['Maximize Passive Income', 'Optimize Expenses', 'Monthly Dividend Review'],
      isInteractive: true 
    },
    { title: 'Target', goals: ['Reach $100k Portfolio', 'Achieve Consistent Monthly %', 'Own First Asset'] },
  ];

  return (
    <section className="goals-section">
      <h2 className="section-title">Life Goals Tracker</h2>
      <div className="goals-grid">
        {goalCategories.map((category) => (
          <div 
            key={category.title} 
            className={`goal-card ${category.isInteractive ? 'interactive' : ''} ${category.title === 'Cash Flow' && showCashFlowMenu ? 'expanded' : ''}`}
            onClick={() => category.isInteractive && setShowCashFlowMenu(!showCashFlowMenu)}
          >
            <h3 className="goal-category-title">
              {category.title}
              {category.isInteractive && <span className="interact-hint">{showCashFlowMenu ? '−' : '+'}</span>}
            </h3>
            
            {!showCashFlowMenu || category.title !== 'Cash Flow' ? (
              <ul className="goal-list">
                {category.goals.map((goal, index) => (
                  <li key={index} className="goal-item">
                    <span className="goal-bullet">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="cash-flow-sub-menu">
                <button 
                  className="sub-menu-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/results');
                  }}
                >
                  TFEX Tracking
                </button>
                <button 
                  className="sub-menu-btn disabled" 
                  onClick={(e) => e.stopPropagation()}
                  title="Coming Soon"
                >
                  Forex Tracking (Soon)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mantra-section">
        <p className="mantra-text">"Health is wealth, flow is freedom, target is focus."</p>
      </div>
    </section>
  );
};
