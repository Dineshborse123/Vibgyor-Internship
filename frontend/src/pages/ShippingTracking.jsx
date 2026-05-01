import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ShippingTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // State for inline editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    courierService: '',
    trackingNumber: '',
    status: ''
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/orders/all');
      // Sort to show newest orders first and filter out cancelled/returned
      const validOrders = data.filter(o => {
        const s = (o.status || '').toLowerCase();
        return s !== 'cancelled' && s !== 'returned';
      });
      setOrders(validOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError('Failed to fetch shipping data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEditClick = (order) => {
    setEditingId(order.order_id);
    setEditForm({
      courierService: order.courier_service || 'Pending Assignment',
      trackingNumber: order.tracking_number || 'Not assigned',
      status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase() : 'Processing'
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}/status`, { 
        status: editForm.status,
        courierService: editForm.courierService,
        trackingNumber: editForm.trackingNumber
      });
      setSuccess(`Order #${orderId} updated successfully`);
      setTimeout(() => setSuccess(''), 3000);
      setEditingId(null);
      fetchOrders();
    } catch (err) {
      setError('Failed to update order info.');
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Shipping Management</h1>
          <p className="page-subtitle" style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
            Update courier tracking numbers and shipping statuses for all orders.
          </p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ padding: '0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f5f7ff', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1.25rem 1.5rem', color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>Order #</th>
              <th style={{ padding: '1.25rem 1.5rem', color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>Customer / Address</th>
              <th style={{ padding: '1.25rem 1.5rem', color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>Courier Service</th>
              <th style={{ padding: '1.25rem 1.5rem', color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>Tracking Number</th>
              <th style={{ padding: '1.25rem 1.5rem', color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>Status</th>
              <th style={{ padding: '1.25rem 1.5rem', color: '#6366f1', fontWeight: '600', fontSize: '0.9rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => {
                const isEditing = editingId === o.order_id;
                const normalizedStatus = o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1).toLowerCase() : 'Processing';
                const currentCourier = o.courier_service || 'Pending Assignment';
                const currentTracking = o.tracking_number || 'Not assigned';

                return (
                  <tr key={o.order_id} style={{ borderBottom: '1px solid #f1f5f9', background: 'white' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 'bold' }}>#{o.order_id}</td>
                    <td style={{ padding: '1.25rem 1.5rem', maxWidth: '300px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{o.customer_name || 'Admin'}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {o.shipping_address}
                      </div>
                    </td>
                    
                    {/* Courier Service Column */}
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editForm.courierService} 
                          onChange={(e) => setEditForm({...editForm, courierService: e.target.value})}
                          style={{ padding: '0.5rem', fontSize: '0.9rem', width: '100%' }}
                        />
                      ) : (
                        <span style={{ fontSize: '0.95rem' }}>{currentCourier}</span>
                      )}
                    </td>

                    {/* Tracking Number Column */}
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="form-control" 
                          value={editForm.trackingNumber} 
                          onChange={(e) => setEditForm({...editForm, trackingNumber: e.target.value})}
                          style={{ padding: '0.5rem', fontSize: '0.9rem', width: '100%' }}
                        />
                      ) : (
                        <span style={{ fontSize: '0.95rem' }}>{currentTracking}</span>
                      )}
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {isEditing ? (
                        <select 
                          className="form-control" 
                          value={editForm.status} 
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          style={{ padding: '0.5rem', fontSize: '0.9rem', width: '100%' }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{normalizedStatus}</span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => handleSave(o.order_id)}
                            style={{ padding: '0.4rem 1rem', borderRadius: '6px' }}
                          >
                            Save
                          </button>
                          <button 
                            className="btn btn-sm" 
                            onClick={handleCancelEdit}
                            style={{ padding: '0.4rem 1rem', background: 'transparent', color: '#6366f1', border: 'none' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn btn-sm" 
                          onClick={() => handleEditClick(o)}
                          style={{ background: '#f5f7ff', color: '#6366f1', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', fontWeight: '500' }}
                        >
                          Edit Info
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShippingTracking;
