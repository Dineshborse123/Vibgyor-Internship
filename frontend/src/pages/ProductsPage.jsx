import React from 'react';
import { PackageSearch, Filter } from 'lucide-react';

export default function ProductsPage() {
  // No hardcoded data - will be fetched from backend when Product API is ready
  const products = [];

  return (
    <>
      <div className="top-bar">
        <div className="welcome-text">
          <h1>Products Catalog</h1>
          <p>Browse and view all published products in the store.</p>
        </div>
        <button className="btn-primary"><Filter size={16} /> Filters</button>
      </div>

      <div className="widget" style={{padding: 0, overflow: 'hidden'}}>
        <table>
          <thead>
            <tr>
              <th style={{paddingLeft: '1.5rem'}}>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map(p => (
              <tr key={p.id}>
                <td style={{paddingLeft: '1.5rem', fontWeight: 500}}>{p.name}</td>
                <td style={{color: 'var(--text-muted)'}}>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td><span className="status-badge" style={{backgroundColor: p.status === 'Active' ? '#f0fdf4' : '#fef2f2', color: p.status === 'Active' ? '#22c55e' : '#ef4444'}}>{p.status}</span></td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '4rem', color: 'var(--text-muted)'}}>
                  <PackageSearch size={48} color="#cbd5e1" style={{marginBottom: '1rem', display: 'block', margin: '0 auto 1rem'}} />
                  No products available yet. Products will appear here once added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
