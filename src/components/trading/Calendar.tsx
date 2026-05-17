import React from 'react';

export const Calendar: React.FC = () => {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  
  const monthName = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  // Mock success days for demonstration
  const successDays = [2, 5, 8, 10, 12, 14, 15];

  const days = [];
  // Fill empty slots for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Fill actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const isSuccess = successDays.includes(d);
    const isToday = d === now.getDate();
    days.push(
      <div key={d} className={`calendar-day ${isSuccess ? 'success' : ''} ${isToday ? 'today' : ''}`}>
        {d}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3 className="calendar-title">{monthName} {year}</h3>
        <div className="calendar-legend">
          <span className="legend-item"><span className="dot success"></span> Discipline Met</span>
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
    </div>
  );
};
