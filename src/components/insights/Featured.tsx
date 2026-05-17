import React from 'react';

export const Featured: React.FC = () => (
  <section className="container section-padding">
    <div className="featured-grid">
      <div className="featured-item">
        <span className="category">Mindset</span>
        <h3>Morning Rituals</h3>
        <p>How the world's most creative minds start their day.</p>
      </div>
      <div className="featured-item">
        <span className="category">Design</span>
        <h3>The Minimal Home</h3>
        <p>Creating space for what truly matters.</p>
      </div>
      <div className="featured-item">
        <span className="category">Wellbeing</span>
        <h3>Silent Retreats</h3>
        <p>The profound impact of disconnecting.</p>
      </div>
    </div>
  </section>
);
