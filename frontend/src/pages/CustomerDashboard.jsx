import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart, ShoppingBag, ClipboardList } from 'lucide-react';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('Customer');

  React.useEffect(() => {
    const savedUserStr = localStorage.getItem('currentUser');
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (savedUser.name) setUserName(savedUser.name.split(' ')[0]);
    }
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="welcome-text">
          <h1>Welcome back, {userName}! 👋</h1>
          <p>Here's what's happening in your store today.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/products')}>Browse Products <ArrowRight size={16} /></button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-box icon-orange"><ShoppingCart size={24} /></div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Items in Cart</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box icon-green"><ShoppingBag size={24} /></div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Total Orders</p>
          </div>
        </div>
      </div>

      <div className="widget">
        <div className="widget-header">
          <h3>Recent Orders</h3>
          <a href="#" className="widget-link" onClick={() => navigate('/orders')}>View All</a>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--text-muted)'}}>
          <ClipboardList size={48} color="#cbd5e1" style={{marginBottom: '1rem'}} />
          <p>No orders yet. Start shopping!</p>
        </div>
      </div>
    </>
  );
}
