import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // 1. Check Admin Hardcoded Credentials
    if (email === 'admin@shopvibe.com' && password === 'admin123') {
      localStorage.setItem('currentUser', JSON.stringify({ role: 'ADMIN', name: 'Admin User', initial: 'A' }));
      navigate('/admin');
      return;
    }

    // 2. Check Registered Users from LocalStorage
    const usersStr = localStorage.getItem('shopvibe_users');
    let users = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }

    const matchedUser = users.find(u => u.email === email && u.password === password);
    
    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify({ 
        role: 'CUSTOMER', 
        name: matchedUser.name, 
        initial: matchedUser.name.charAt(0).toUpperCase() 
      }));
      navigate('/customer');
    } else {
      setError('Invalid email or password! Please register if you are a new user.');
    }
  };

  return (
    <div style={{
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--sidebar-bg)'
    }}>
      <div style={{
        background: 'var(--card-bg)',
        padding: '3rem',
        borderRadius: '16px',
        width: '420px',
        maxWidth: '90%',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '2rem'}}>
          <ShoppingCart size={40} color="#4f46e5" />
          <h1 style={{fontSize: '2rem', color: 'var(--text-dark)', fontWeight: 700}}>ShopVibe</h1>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Sign in to your account</p>
        </div>

        {error && <div style={{background: '#fef2f2', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center'}}>{error}</div>}

        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dark)'}}>Email address</label>
            <input 
              type="email" 
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                border: '1px solid var(--border-light)', fontFamily: 'inherit'
              }}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dark)'}}>Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                border: '1px solid var(--border-light)', fontFamily: 'inherit'
              }}
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.85rem'}}>
            Sign In
          </button>
        </form>

        <div style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-dark)'}}>
          Don't have an account? <Link to="/register" style={{color: 'var(--primary)', fontWeight: 600, textDecoration: 'none'}}>Register here</Link>
        </div>

        <div style={{marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
          <p style={{fontWeight: 600, marginBottom: '0.5rem'}}>🌟 System Admin Login:</p>
          <p>Email: <b>admin@shopvibe.com</b></p>
          <p>Password: <b>admin123</b></p>
        </div>
      </div>
    </div>
  );
}
