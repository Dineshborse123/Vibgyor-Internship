import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, FileText, 
  CalendarDays, Layers, Settings, LogOut
} from 'lucide-react';

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const isAdmin = role === 'ADMIN';

  // State to hold dynamic user info
  const [userName, setUserName] = useState(isAdmin ? 'Admin User' : 'Customer');
  const [userInitial, setUserInitial] = useState(isAdmin ? 'A' : 'C');

  useEffect(() => {
    // Load dynamic user data from localStorage
    const savedUserStr = localStorage.getItem('currentUser');
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (savedUser.name) setUserName(savedUser.name);
      if (savedUser.initial) setUserInitial(savedUser.initial);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const userTitle = isAdmin ? 'Administrator' : 'Customer';

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{cursor: 'pointer'}} onClick={() => navigate(isAdmin ? '/admin' : '/customer')}>
        <ShoppingCart size={32} color="#818cf8" />
        <div className="sidebar-title">
          <h2>ShopVibe</h2>
          <p>Ecommerce Platform</p>
        </div>
      </div>

      <div className="sidebar-section">MAIN</div>
      <NavLink to={isAdmin ? "/admin" : "/customer"} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        <ShoppingBag size={18} /> Products
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        <ShoppingCart size={18} /> Cart
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
        <FileText size={18} /> Orders
      </NavLink>

      {isAdmin && (
        <>
          <div className="sidebar-section">HR / ADMIN</div>
          <NavLink to="/leave-requests" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
            <CalendarDays size={18} color="#94a3b8" /> Leave Requests
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
            <Layers size={18} color="#d97706" /> Categories
          </NavLink>
          <NavLink to="/manage-products" className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
            <Settings size={18} color="#d97706" /> Manage Products
          </NavLink>
        </>
      )}

      <div style={{marginTop: 'auto', paddingBottom: '1.5rem'}}>
        <div className="nav-item" style={{gap: '12px'}} onClick={handleLogout} title="Click to Logout">
          <div style={{width: 32, height: 32, borderRadius: '50%', backgroundColor: '#c084fc', display: 'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'14px'}}>
            {userInitial}
          </div>
          <div>
            <div style={{fontSize: '0.9rem', color: 'white', fontWeight: 500}}>{userName}</div>
            <div style={{fontSize: '0.75rem', color: '#94a3b8'}}>{userTitle}</div>
          </div>
          <LogOut size={16} style={{marginLeft: 'auto'}} color="#94a3b8"/>
        </div>
      </div>
    </aside>
  );
}
