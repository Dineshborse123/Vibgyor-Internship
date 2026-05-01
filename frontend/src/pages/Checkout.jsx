import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery'];

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [method, setMethod] = useState('UPI');
  const [addr, setAddr] = useState({ name: '', phone: '', pin: '', flat: '', area: '', city: '', state: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchedTotal, setFetchedTotal] = useState(0);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Review state
  const [reviewingProductId, setReviewingProductId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState({});

  const handleReviewSubmit = async (productId) => {
    try {
      await API.post('/reviews', {
        product_id: productId,
        user_id: user?.id || user?.user_id || 3,
        rating,
        comment
      });
      setSubmittedReviews(prev => ({ ...prev, [productId]: true }));
      setReviewingProductId(null);
      setRating(5);
      setComment('');
      alert('Thank you! Your review has been submitted for moderation.');
    } catch (err) {
      alert('Failed to submit review.');
    }
  };

  const total = state?.total || fetchedTotal;
  const discountAmount = appliedCoupon ? (total * (appliedCoupon.discountPercentage / 100)) : 0;
  const discountedTotal = total - discountAmount;

  useEffect(() => {
    if (!state?.total) {
      API.get(`/cart?userId=${user?.id || 3}`).then(({ data }) => {
        const sum = data.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
        setFetchedTotal(sum);
      });
    }
  }, [state, user]);

  const applyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    setCouponLoading(true);
    setCouponError('');
    try {
      const { data } = await API.get(`/coupons/validate/${couponCode}`);
      setAppliedCoupon(data);
    } catch (err) {
      setCouponError(err.response?.data || 'Invalid or inactive coupon.');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!addr.name || !addr.phone || !addr.pin || !addr.flat || !addr.area || !addr.city || !addr.state) {
      alert('Please fill in all address fields.');
      return setError('Please fill in all address fields.');
    }
    if (addr.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return setError('Please enter a valid 10-digit mobile number.');
    }
    if (addr.pin.length !== 6) {
      alert('Please enter a valid 6-digit PIN code.');
      return setError('Please enter a valid 6-digit PIN code.');
    }
    
    const formattedAddress = `${addr.name}, ${addr.phone}\n${addr.flat}, ${addr.area}\n${addr.city}, ${addr.state} - ${addr.pin}`;

    if (!method) return setError('Please select a payment method.');
    setLoading(true);
    setError('');
    try {
      // Place order using discountedTotal and send coupon code
      const payload = {
        total_amount: discountedTotal,
        shipping_address: formattedAddress,
        user_id: user?.id || 3,
      };
      if (appliedCoupon) {
        payload.couponCode = appliedCoupon.code;
      }
      
      const { data: orderData } = await API.post('/orders', payload);
      
      // Record payment
      await API.post('/payment', {
        order_id: orderData.order_id || orderData.orderId,
        amount: discountedTotal,
        method,
      });
      
      setOrderSuccess(orderData);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Checkout failed. Please try again.';
      alert(errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Thank you for your purchase. Your order <strong>#{orderSuccess.order_id || orderSuccess.orderId}</strong> is being processed.
          </p>
          
          <div style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Help others by reviewing your products:</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {orderSuccess.items?.map(item => {
                const productId = item.product?.product_id || item.product?.id;
                const isReviewed = submittedReviews[productId];
                const isReviewing = reviewingProductId === productId;

                return (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', background: '#fff', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: '500' }}>{item.product?.name || 'Product'}</div>
                      {isReviewed ? (
                        <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓ Reviewed</span>
                      ) : (
                        <button 
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setReviewingProductId(isReviewing ? null : productId);
                            setRating(5);
                            setComment('');
                          }}
                        >
                          {isReviewing ? 'Cancel' : '⭐ Write Review'}
                        </button>
                      )}
                    </div>
                    
                    {isReviewing && !isReviewed && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <div className="form-group">
                          <label>Rating (1-5)</label>
                          <select 
                            className="form-control" 
                            value={rating} 
                            onChange={(e) => setRating(Number(e.target.value))}
                            style={{ width: '100px' }}
                          >
                            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                            <option value="4">⭐⭐⭐⭐ (4)</option>
                            <option value="3">⭐⭐⭐ (3)</option>
                            <option value="2">⭐⭐ (2)</option>
                            <option value="1">⭐ (1)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Your Review</label>
                          <textarea 
                            className="form-control" 
                            rows="3" 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell others what you liked about this product..."
                          ></textarea>
                        </div>
                        <button 
                          className="btn btn-primary" 
                          onClick={() => handleReviewSubmit(productId)}
                          disabled={!comment.trim()}
                        >
                          Submit Review
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/products')}>Continue Shopping</button>
            <button className="btn btn-primary" onClick={() => navigate('/orders')}>View My Orders</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Complete your purchase</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: '700', marginBottom: '1rem' }}>Order Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          <span>Subtotal</span>
          <span>₹{parseFloat(total).toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: '600', marginBottom: '0.5rem' }}>
            <span>Discount ({appliedCoupon.code} - {appliedCoupon.discountPercentage}%)</span>
            <span>- ₹{parseFloat(discountAmount).toFixed(2)}</span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
          <span>Total to Pay</span>
          <span>₹{parseFloat(discountedTotal).toFixed(2)}</span>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border)' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: '600' }}>Have a Coupon?</h4>
          {appliedCoupon ? (
            <div className="alert alert-success" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '0.75rem' }}>
              <span>✅ Coupon <strong>{appliedCoupon.code}</strong> applied</span>
              <button 
                onClick={() => setAppliedCoupon(null)} 
                style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={applyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                style={{ textTransform: 'uppercase' }}
              />
              <button type="submit" className="btn btn-primary" disabled={couponLoading || !couponCode.trim()}>
                {couponLoading ? '...' : 'Apply'}
              </button>
            </form>
          )}
          {couponError && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{couponError}</div>}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: '700', marginBottom: '1.25rem' }}>Delivery Address</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Full Name *</label>
            <input type="text" className="form-control" value={addr.name} onChange={e => setAddr({...addr, name: e.target.value})} placeholder="First and Last Name" />
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Mobile Number *</label>
            <input type="tel" className="form-control" value={addr.phone} onChange={e => setAddr({...addr, phone: e.target.value.replace(/\D/g, '')})} maxLength="10" placeholder="10-digit mobile number" />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>PIN Code *</label>
            <input type="text" className="form-control" value={addr.pin} onChange={e => setAddr({...addr, pin: e.target.value.replace(/\D/g, '')})} maxLength="6" placeholder="6 digits (e.g. 400001)" />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Flat, House no., Building, Company, Apartment *</label>
            <input type="text" className="form-control" value={addr.flat} onChange={e => setAddr({...addr, flat: e.target.value})} placeholder="e.g. 201, Shanti Niwas" />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Area, Street, Sector, Village *</label>
            <input type="text" className="form-control" value={addr.area} onChange={e => setAddr({...addr, area: e.target.value})} placeholder="e.g. Linking Road, Bandra West" />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Town/City *</label>
            <input type="text" className="form-control" value={addr.city} onChange={e => setAddr({...addr, city: e.target.value})} placeholder="e.g. Mumbai" />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>State *</label>
            <select className="form-control" value={addr.state} onChange={e => setAddr({...addr, state: e.target.value})}>
              <option value="">Choose a state...</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Other">Other...</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontWeight: '700', marginBottom: '1.25rem' }}>Select Payment Method</h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {PAYMENT_METHODS.map((pm) => (
            <label
              key={pm}
              htmlFor={`pm-${pm}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                border: `2px solid ${method === pm ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                background: method === pm ? 'var(--primary-light)' : '#fff',
                transition: 'all 0.2s',
              }}
            >
              <input
                type="radio"
                id={`pm-${pm}`}
                name="payment_method"
                value={pm}
                checked={method === pm}
                onChange={() => setMethod(pm)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span style={{ fontWeight: '600', color: method === pm ? 'var(--primary)' : 'var(--text-primary)' }}>{pm}</span>
            </label>
          ))}
        </div>

        <button
          id="place-order-btn"
          className="btn btn-success btn-lg"
          style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
          onClick={handleCheckout}
          disabled={loading || total === 0}
        >
          {loading ? 'Processing...' : `✓ Place Order — ₹${parseFloat(discountedTotal).toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
