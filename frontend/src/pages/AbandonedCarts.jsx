import React from 'react';

const AbandonedCarts = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🛒 Abandoned Carts</h1>
        <button className="btn btn-primary">+ Add New</button>
      </div>
      
      <div className="card" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>🛒</div>
        <h2 style={{ marginBottom: '1rem' }}>Coming Soon</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Track and recover abandoned shopping carts.</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
          This module is currently under development and will be available in the next major update.
        </p>
      </div>
    </div>
  );
};

export default AbandonedCarts;
