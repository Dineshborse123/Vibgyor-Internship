import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Package, Receipt, ClipboardList } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    // Fetch category count from backend
    fetch('http://localhost:8080/api/categories')
      .then(res => res.json())
      .then(data => {
        const activeCount = data.filter(c => c.status).length;
        setCategoryCount(activeCount);
      })
      .catch(() => setCategoryCount(0));
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="welcome-text">
          <h1>Welcome back, Admin! 👋</h1>
          <p>Here's what's happening in your store today.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/admin/products')}>Browse Products <ArrowRight size={16} /></button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-box icon-purple"><Users size={24} /></div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box icon-pink"><Calendar size={24} /></div>
          <div className="stat-info">
            <h3>{categoryCount}</h3>
            <p>Active Categories</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box icon-green"><Package size={24} /></div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box icon-orange"><Receipt size={24} /></div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Recent Orders</p>
          </div>
        </div>
      </div>

      <div className="widget">
        <div className="widget-header">
          <h3>Recent Activities</h3>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', color: 'var(--text-muted)'}}>
          <ClipboardList size={48} color="#cbd5e1" style={{marginBottom: '1rem'}} />
          <p>No recent activities yet.</p>
        </div>
      </div>

      <div className="widget">
        <div className="widget-header">
          <h3>Recent Orders</h3>
          <a href="#" className="widget-link" onClick={() => navigate('/orders')}>View All</a>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', color: 'var(--text-muted)'}}>
          <Receipt size={48} color="#cbd5e1" style={{marginBottom: '1rem'}} />
          <p>No orders yet.</p>
        </div>
      </div>
    </>
  );
}
