import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, FileText, 
  CalendarDays, Layers, Settings, LogOut, ArrowRight,
  Users, Calendar, Package, Receipt
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <ShoppingCart size={32} color="#818cf8" />
          <div className="sidebar-title">
            <h2>ShopVibe</h2>
            <p>Ecommerce Platform</p>
          </div>
        </div>

        <div className="sidebar-section">MAIN</div>
        <div className="nav-item active"><LayoutDashboard size={18} /> Dashboard</div>
        <div className="nav-item"><ShoppingBag size={18} /> Products</div>
        <div className="nav-item"><ShoppingCart size={18} /> Cart</div>
        <div className="nav-item"><FileText size={18} /> Orders</div>

        <div className="sidebar-section">HR / ADMIN</div>
        <div className="nav-item"><CalendarDays size={18} color="#94a3b8" /> Leave Requests</div>
        <div className="nav-item"><Layers size={18} color="#d97706" /> Categories</div>
        <div className="nav-item"><Settings size={18} color="#d97706" /> Manage Products</div>

        <div style={{marginTop: 'auto', paddingBottom: '1.5rem'}}>
          <div className="nav-item" style={{gap: '12px'}}>
            <div style={{width: 32, height: 32, borderRadius: '50%', backgroundColor: '#c084fc', display: 'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'14px'}}>A</div>
            <div>
              <div style={{fontSize: '0.9rem', color: 'white', fontWeight: 500}}>Admin User</div>
              <div style={{fontSize: '0.75rem', color: '#94a3b8'}}>Administrator</div>
            </div>
            <LogOut size={16} style={{marginLeft: 'auto'}} color="#94a3b8"/>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <div className="welcome-text">
            <h1>Welcome back, Admin! 👋</h1>
            <p>Here's what's happening in your store today.</p>
          </div>
          <button className="btn-primary">Browse Products <ArrowRight size={16} /></button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon-box icon-purple"><Users size={24} /></div>
            <div className="stat-info">
              <h3>98%</h3>
              <p>Employee Attendance</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon-box icon-pink"><Calendar size={24} /></div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Pending Leaves</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon-box icon-green"><Package size={24} /></div>
            <div className="stat-info">
              <h3>6</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon-box icon-orange"><Receipt size={24} /></div>
            <div className="stat-info">
              <h3>1</h3>
              <p>Recent Orders</p>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">🗓️</span>
              <span style={{color: '#64748b'}}><b>HR:</b> Leave request for 3/27/2026 is approved <span style={{fontSize:'0.8rem'}}>(3/27/2026)</span></span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🛒</span>
              <span style={{color: '#64748b'}}><b>Sales:</b> New order #1 placed for ₹97980.00 <span style={{fontSize:'0.8rem'}}>(3/27/2026)</span></span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📦</span>
              <span style={{color: '#64748b'}}><b>Catalogue:</b> Product 'Sony WH-1000XM5 Headphones' added to store <span style={{fontSize:'0.8rem'}}>(3/27/2026)</span></span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📦</span>
              <span style={{color: '#64748b'}}><b>Catalogue:</b> Product 'Samsung 65" 4K Smart TV' added to store <span style={{fontSize:'0.8rem'}}>(3/27/2026)</span></span>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <h3>Recent Orders</h3>
            <a href="#" className="widget-link">View All</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>₹97980.00</td>
                <td><span className="status-badge">Confirmed</span></td>
                <td style={{color: '#64748b'}}>27/3/2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
