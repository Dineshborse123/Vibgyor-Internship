import { useState, useEffect } from 'react';

export default function CategoryDashboard() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Fetch categories from Spring Boot backend
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/categories');
      const data = await res.json();
      setCategories(data.filter(c => c.status)); // Show only active
    } catch (e) {
      console.error('Failed to fetch', e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryName: name, description })
      });
      setName('');
      setDescription('');
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const deactivateCategory = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/categories/${id}/deactivate`, {
        method: 'DELETE'
      });
      fetchCategories();
    } catch (e) {
      alert("Error: Reassign products to a new category before deactivating!");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Categories</h1>
        <div style={{color: 'var(--text-muted)'}}>Manage your e-commerce structure</div>
      </div>

      <div className="glass-panel" style={{marginBottom: '2rem'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.2rem', color: '#c084fc'}}>Create New</h2>
        <form onSubmit={createCategory} style={{display: 'flex', gap: '1rem'}}>
          <input 
            className="glass-input" 
            placeholder="Category Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <input 
            className="glass-input" 
            placeholder="Brief Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
          <button className="btn" type="submit">Create</button>
        </form>
      </div>

      <div className="grid">
        {categories.map(cat => (
          <div className="category-card" key={cat.categoryId}>
            <div className="badge">0 Products</div>
            <h3 className="card-title">{cat.categoryName}</h3>
            <p className="card-desc">{cat.description || 'No description provided.'}</p>
            <div className="card-actions">
              <button className="btn" style={{padding: '0.6rem 1rem', fontSize: '0.85rem'}}>Edit</button>
              <button 
                className="btn btn-danger" 
                style={{padding: '0.6rem 1rem', fontSize: '0.85rem'}}
                onClick={() => deactivateCategory(cat.categoryId)}
              >
                Deactivate
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div style={{color: 'var(--text-muted)', fontStyle: 'italic'}}>No categories active. Add one above!</div>
        )}
      </div>
    </div>
  );
}
