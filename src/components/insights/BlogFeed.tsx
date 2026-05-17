import React from 'react';

export const BlogFeed: React.FC = () => (
  <section className="container section-padding">
    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Latest Stories</h2>
    <div className="blog-feed">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <article key={i} className="blog-card">
          <div style={{ background: '#f0f0f0', width: '100%', aspectRatio: '4/5' }}></div>
          <span className="category">Journal</span>
          <h3>Modern Essentials: Issue 0{i}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Exploring the intersection of tradition and technology.</p>
        </article>
      ))}
    </div>
  </section>
);
