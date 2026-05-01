import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMsg, setCartMsg] = useState('');

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get('/wishlist');
      setWishlist(data);
    } catch (err) {
      console.error('Failed to load wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post('/cart', { product_id: productId, quantity: 1 });
      setCartMsg('Item added to cart! 🛒');
      setTimeout(() => setCartMsg(''), 2500);
    } catch (err) {
      setCartMsg(err.response?.data?.message || 'Failed to add to cart.');
      setTimeout(() => setCartMsg(''), 2500);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/remove/${productId}`);
      setWishlist(wishlist.filter((item) => item.product.product_id !== productId && item.product.productId !== productId));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">💖 My Wishlist</h1>
          <p className="page-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>
        <Link to="/products" className="btn btn-primary">+ Add New</Link>
      </div>

      {cartMsg && <div className="alert alert-success">{cartMsg}</div>}

      {wishlist.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>💖</div>
          <h2 style={{ marginBottom: '1rem' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You haven't added any items to your wishlist yet.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((item) => {
            const product = item.product;
            const productId = product.product_id || product.productId;
            return (
              <div className="product-card" key={item.id}>
                <div className="product-image">
                  {product.image_url || product.imageUrl ? (
                    <img src={product.image_url || product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : '📦'}
                  <button 
                    onClick={() => removeFromWishlist(productId)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      color: 'var(--danger)'
                    }}
                    title="Remove from wishlist"
                  >
                    🗑️
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category_name || product.categoryName || 'Uncategorized'}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">₹{parseFloat(product.price).toFixed(2)}</div>
                  <div className="product-stock" style={{ marginBottom: '1rem' }}>
                    {product.stock > 0
                      ? <span style={{ color: 'var(--success)' }}>✓ In Stock ({product.stock})</span>
                      : <span style={{ color: 'var(--danger)' }}>✗ Out of Stock</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/products/${productId}`} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Details</Link>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => addToCart(productId)}
                      disabled={product.stock === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
