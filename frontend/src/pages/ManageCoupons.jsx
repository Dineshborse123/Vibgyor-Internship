import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountPercentage: '' });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/coupons');
      setCoupons(data);
    } catch (err) {
      setError('Failed to fetch coupons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/coupons', newCoupon);
      setSuccess('Coupon created successfully!');
      setNewCoupon({ code: '', discountPercentage: '' });
      setShowAddForm(false);
      fetchCoupons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create coupon.');
    }
  };

  const handleToggle = async (id) => {
    try {
      await API.put(`/coupons/${id}/toggle`);
      fetchCoupons();
    } catch (err) {
      setError('Failed to toggle coupon status.');
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">🎟️ Manage Coupons</h1>
          <p className="page-subtitle">Create and manage discount codes for your store.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : '+ Add New Coupon'}
        </button>
      </div>
      
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Create New Coupon</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Coupon Code</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. SUMMER50"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Discount Percentage (%)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 20"
                min="1" max="100"
                value={newCoupon.discountPercentage}
                onChange={(e) => setNewCoupon({...newCoupon, discountPercentage: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Coupon</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Coupon Code</th>
                <th>Discount (%)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No coupons found.</td>
                </tr>
              ) : (
                coupons.map(coupon => (
                  <tr key={coupon.id}>
                    <td>#{coupon.id}</td>
                    <td style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px', color: 'var(--primary)' }}>
                      {coupon.code}
                    </td>
                    <td><span className="badge badge-info">{coupon.discountPercentage}% OFF</span></td>
                    <td>
                      <span className={`badge ${coupon.active ? 'badge-success' : 'badge-danger'}`}>
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn btn-sm ${coupon.active ? 'btn-danger' : 'btn-primary'}`}
                        onClick={() => handleToggle(coupon.id)}
                      >
                        {coupon.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCoupons;
