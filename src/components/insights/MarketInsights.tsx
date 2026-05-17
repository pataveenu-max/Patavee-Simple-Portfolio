import React from 'react';

export const MarketInsights: React.FC = () => {
  const trends = [
    { category: 'Stocks', status: 'Bearish', icon: '📉', detail: 'Nasdaq down 1.54% as AI rally takes a breather.' },
    { category: 'Crypto', status: 'Fear', icon: '₿', detail: 'BTC at $79,071; struggling with $80k resistance.' },
    { category: 'Commodities', status: 'Volatile', icon: '🛢️', detail: 'Oil surges to $105 on geopolitical risks.' },
  ];

  return (
    <section className="market-section">
      <h2 className="section-title">Market Insights — May 16, 2026</h2>
      <div className="market-grid">
        {trends.map((item) => (
          <div key={item.category} className="insight-card">
            <div className="insight-header">
              <span className="insight-icon">{item.icon}</span>
              <span className="insight-category">{item.category}</span>
              <span className={`insight-status status-${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
            <p className="insight-detail">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="strategy-note">
        <h3>Benz's Strategy Note</h3>
        <p>
          Yields are rising and tech is cooling. The market is shifting to "risk-off". 
          Stay patient and watch the $79k support level for Bitcoin. Success favors the disciplined.
        </p>
      </div>
    </section>
  );
};
