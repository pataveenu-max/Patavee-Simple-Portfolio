import React, { useState } from 'react';
import { useTradeData } from '../hooks/useTradeData';
import { EquityCurve } from './EquityCurve';

export const TFEXTracker: React.FC = () => {
  const { trades, addTrade, deleteTrade } = useTradeData();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    series: 'S50M24',
    side: 'Long' as 'Long' | 'Short',
    entry: 0,
    exit: 0,
    contracts: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.entry > 0 && formData.exit > 0) {
      addTrade(formData);
      setFormData({ ...formData, date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="tfex-tracker">
      <div className="tracker-header">
        <h2 className="section-title">TFEX Patavee Track Record</h2>
        <EquityCurve trades={trades} />
      </div>

      <form className="trade-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          <select value={formData.side} onChange={e => setFormData({ ...formData, side: e.target.value as any })}>
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
          <input type="number" placeholder="Entry Price" value={formData.entry || ''} onChange={e => setFormData({ ...formData, entry: parseFloat(e.target.value) })} />
          <input type="number" placeholder="Exit Price" value={formData.exit || ''} onChange={e => setFormData({ ...formData, exit: parseFloat(e.target.value) })} />
          <input type="number" placeholder="Contracts" value={formData.contracts} onChange={e => setFormData({ ...formData, contracts: parseInt(e.target.value) })} />
          <button type="submit">Log Trade</button>
        </div>
      </form>

      <div className="trade-log-container">
        <table className="trade-log">
          <thead>
            <tr>
              <th>Date</th>
              <th>Series</th>
              <th>Side</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Size</th>
              <th>Net P/L</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...trades].reverse().map(trade => (
              <tr key={trade.id}>
                <td>{trade.date}</td>
                <td>{trade.series}</td>
                <td className={trade.side === 'Long' ? 'text-green' : 'text-red'}>{trade.side}</td>
                <td>{trade.entry}</td>
                <td>{trade.exit}</td>
                <td>{trade.contracts}</td>
                <td className={trade.netPL >= 0 ? 'text-green' : 'text-red'}>
                  {trade.netPL.toLocaleString()}
                </td>
                <td>
                  <button onClick={() => deleteTrade(trade.id)} className="delete-btn">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
