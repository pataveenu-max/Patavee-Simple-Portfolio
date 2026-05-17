import React from 'react';
import type { Trade } from '../../hooks/useTradeData';

interface EquityCurveProps {
  trades: Trade[];
}

export const EquityCurve: React.FC<EquityCurveProps> = ({ trades }) => {
  if (trades.length === 0) return <div className="no-data">No data to show curve.</div>;

  let cumulativePL = 0;
  const dataPoints = [0, ...trades.map(t => {
    cumulativePL += t.netPL;
    return cumulativePL;
  })];

  const width = 400;
  const height = 150;
  const padding = 20;

  const minPL = Math.min(...dataPoints);
  const maxPL = Math.max(...dataPoints);
  const range = maxPL - minPL || 1;

  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * (width - 2 * padding) + padding;
    const y = height - padding - ((val - minPL) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="equity-curve-container">
      <h4 style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Equity Curve</h4>
      <svg viewBox={`0 0 ${width} ${height}`} className="equity-svg">
        <polyline
          fill="none"
          stroke="var(--text-color)"
          strokeWidth="2"
          points={points}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Baseline at zero */}
        {minPL < 0 && (
          <line 
            x1={padding} 
            y1={height - padding - ((-minPL) / range) * (height - 2 * padding)} 
            x2={width - padding} 
            y2={height - padding - ((-minPL) / range) * (height - 2 * padding)} 
            stroke="var(--text-color)" 
            strokeOpacity="0.1" 
            strokeDasharray="4"
          />
        )}
      </svg>
      <div className="curve-summary">
        Total Net P/L: <span className={cumulativePL >= 0 ? 'text-green' : 'text-red'}>
          {cumulativePL.toLocaleString()} THB
        </span>
      </div>
    </div>
  );
};
