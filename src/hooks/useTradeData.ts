import { useState, useEffect } from 'react';

export interface Trade {
  id: string;
  date: string;
  series: string;
  side: 'Long' | 'Short';
  entry: number;
  exit: number;
  contracts: number;
  netPL: number;
}

export const useTradeData = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('life-plan-trades');
    if (saved) {
      setTrades(JSON.parse(saved));
    } else {
      // Add sample trades for Benz to see the graph initially
      const sampleTrades: Trade[] = [
        { id: '1', date: '2026-05-10', series: 'S50M24', side: 'Long', entry: 845.0, exit: 852.5, contracts: 2, netPL: 2900 },
        { id: '2', date: '2026-05-12', series: 'S50M24', side: 'Short', entry: 855.0, exit: 858.0, contracts: 1, netPL: -650 },
        { id: '3', date: '2026-05-14', series: 'S50M24', side: 'Long', entry: 850.2, exit: 856.4, contracts: 3, netPL: 3570 },
      ];
      setTrades(sampleTrades);
      localStorage.setItem('life-plan-trades', JSON.stringify(sampleTrades));
    }
  }, []);

  const addTrade = (trade: Omit<Trade, 'id' | 'netPL'>) => {
    // TFEX Multiplier for SET50 is 200, assume SET50 for now
    const multiplier = 200;
    const grossPL = (trade.exit - trade.entry) * multiplier * trade.contracts * (trade.side === 'Long' ? 1 : -1);
    const fees = trade.contracts * 50; // Simple estimate: 50 THB per contract round turn
    const netPL = grossPL - fees;

    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
      netPL,
    };

    const updated = [...trades, newTrade];
    setTrades(updated);
    localStorage.setItem('life-plan-trades', JSON.stringify(updated));
  };

  const deleteTrade = (id: string) => {
    const updated = trades.filter(t => t.id !== id);
    setTrades(updated);
    localStorage.setItem('life-plan-trades', JSON.stringify(updated));
  };

  return { trades, addTrade, deleteTrade };
};
