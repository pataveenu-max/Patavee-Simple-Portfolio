import React from 'react';
import type { Trade } from '../../hooks/useTradeData';

interface CalendarProps {
  trades: Trade[];
  onDateSelect: (date: string | null) => void;
  selectedDate: string | null;
}

export const Calendar: React.FC<CalendarProps> = ({ trades, onDateSelect, selectedDate }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthName = now.toLocaleString('default', { month: 'long' });

  const getDayStatus = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTrades = trades.filter(t => t.date === dateStr);
    
    if (dayTrades.length === 0) return null;
    
    const dailyNetPL = dayTrades.reduce((sum, t) => sum + t.netPL, 0);
    return dailyNetPL >= 0 ? 'win' : 'loss';
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const status = getDayStatus(d);
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSelected = selectedDate === dateStr;
    const isToday = d === now.getDate();

    days.push(
      <div 
        key={d} 
        className={`calendar-day ${status || ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => onDateSelect(isSelected ? null : dateStr)}
      >
        {d}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3 className="calendar-title">{monthName} {currentYear}</h3>
        <div className="calendar-legend">
          <div className="legend-item"><span className="dot win"></span> Profit</div>
          <div className="legend-item"><span className="dot loss"></span> Loss</div>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
        {days}
      </div>
      {selectedDate && (
        <button className="clear-filter-btn" onClick={() => onDateSelect(null)}>
          Clear Filter ({selectedDate})
        </button>
      )}
    </div>
  );
};
