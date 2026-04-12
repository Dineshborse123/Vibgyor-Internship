import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (email.toLowerCase() === 'admin@shopvibe.com') {
      setError('This email is reserved for administrators.');
      return;
    }

    // Get existing users
    const usersStr = localStorage.getItem('shopvibe_users');
    let users = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      setError('An account with this email already exists!');
      return;
    }

    // Save new user
    users.push({ name, email, password });
    localStorage.setItem('shopvibe_users', JSON.stringify(users));

    alert(`Account created successfully for ${name}! Please sign in.`);
    navigate('/');
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
          <h1 style={{fontSize: '2rem', color: 'var(--text-dark)', fontWeight: 700}}>Create Account</h1>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Join ShopVibe as a Customer</p>
        </div>
        
        {error && <div style={{background: '#fef2f2', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center'}}>{error}</div>}

        <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dark)'}}>Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Dinesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                border: '1px solid var(--border-light)', fontFamily: 'inherit'
              }}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dark)'}}>Email address</label>
            <input 
              type="email" 
              required
              placeholder="your@email.com"
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', 
                border: '1px solid var(--border-light)', fontFamily: 'inherit'
              }}
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.85rem'}}>
            Register Now
          </button>
        </form>

        <div style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-dark)'}}>
          Already have an account? <Link to="/" style={{color: 'var(--primary)', fontWeight: 600, textDecoration: 'none'}}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
