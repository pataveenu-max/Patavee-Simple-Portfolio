import { TFEXTracker, Calendar } from '../components';

export const Results = () => {
  return (
    <div className="results-page">
      <div className="results-grid">
        <TFEXTracker />
        <aside className="results-sidebar">
          <Calendar />
        </aside>
      </div>
    </div>
  );
};
