import React, { useState } from 'react';
import { useTradeData } from '../../hooks/useTradeData';
import { EquityCurve } from './EquityCurve';

interface TFEXTrackerProps {
  filterDate: string | null;
}

export const TFEXTracker: React.FC<TFEXTrackerProps> = ({ filterDate }) => {
  const { trades, addTrade, deleteTrade } = useTradeData();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    series: 'S50M24',
    side: 'Long' as 'Long' | 'Short',
    entry: 0,
    exit: 0,
    contracts: 1,
    buyReason: '',
    sellReason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.entry > 0 && formData.exit > 0) {
      addTrade(formData);
      setFormData({ 
        ...formData, 
        date: new Date().toISOString().split('T')[0],
        buyReason: '',
        sellReason: '',
      });
    }
  };

  const displayedTrades = filterDate 
    ? trades.filter(t => t.date === filterDate)
    : trades;

  return (
    <div className="tfex-tracker">
      <div className="tracker-header">
        <h2 className="section-title">
          TFEX Patavee Track Record {filterDate && `(${filterDate})`}
        </h2>
        <div className="startup-cost">
          <span className="label">Start-up cost:</span>
          <span className="value">100,000 THB</span>
        </div>
      </div>

      <form className="trade-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          <select value={formData.side} onChange={e => setFormData({ ...formData, side: e.target.value as any })}>
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
          <input type="number" placeholder="Entry" value={formData.entry || ''} onChange={e => setFormData({ ...formData, entry: parseFloat(e.target.value) })} />
          <input type="number" placeholder="Exit" value={formData.exit || ''} onChange={e => setFormData({ ...formData, exit: parseFloat(e.target.value) })} />
          <input type="number" placeholder="Qty" value={formData.contracts} onChange={e => setFormData({ ...formData, contracts: parseInt(e.target.value) })} />
        </div>
        <div className="form-row" style={{ marginTop: '0.5rem' }}>
          <input type="text" placeholder="Reason for Buy" style={{ flex: 2 }} value={formData.buyReason} onChange={e => setFormData({ ...formData, buyReason: e.target.value })} />
          <input type="text" placeholder="Reason for Sell" style={{ flex: 2 }} value={formData.sellReason} onChange={e => setFormData({ ...formData, sellReason: e.target.value })} />
          <button type="submit" style={{ flex: 1 }}>Log Trade</button>
        </div>
      </form>

      <div className="trade-log-container">
        <table className="trade-log">
          <thead>
            <tr>
              <th>Date</th>
              <th>Side</th>
              <th>Entry</th>
              <th>Exit</th>
              <th>Net P/L</th>
              <th>Buy Reason</th>
              <th>Sell Reason</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...displayedTrades].reverse().map(trade => (
              <tr key={trade.id}>
                <td>{trade.date}</td>
                <td className={trade.side === 'Long' ? 'text-green' : 'text-red'}>{trade.side}</td>
                <td>{trade.entry}</td>
                <td>{trade.exit}</td>
                <td className={trade.netPL >= 0 ? 'text-green' : 'text-red'}>
                  {trade.netPL.toLocaleString()}
                </td>
                <td className="reason-cell">{trade.buyReason}</td>
                <td className="reason-cell">{trade.sellReason}</td>
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
