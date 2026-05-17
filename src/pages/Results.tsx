import { useState } from 'react';
import { TFEXTracker, Calendar, EquityCurve } from '../components';
import { useTradeData } from '../hooks/useTradeData';

export const Results = () => {
  const { trades } = useTradeData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="results-page">
      <div className="results-grid">
        <TFEXTracker filterDate={selectedDate} />
        <aside className="results-sidebar">
          <div className="sidebar-top">
            <EquityCurve trades={trades} />
          </div>
          <Calendar 
            trades={trades} 
            onDateSelect={setSelectedDate} 
            selectedDate={selectedDate}
          />
        </aside>
      </div>
    </div>
  );
};
