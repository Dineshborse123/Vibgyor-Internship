import { useState, useEffect } from 'react';
import API from '../api/axios';

const PaymentsRefunds = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const { data } = await API.get('/payment/all');
      const refundable = data.filter(p => {
        const status = (p.order_status || '').toLowerCase();
        return status === 'cancelled' || status === 'returned';
      });
      setPayments(refundable);
    } catch (err) {
      console.error('Failed to load payments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleUpdateStatus = async (paymentId, newStatus) => {
    try {
      await API.put(`/payment/${paymentId}/status`, { status: newStatus });
      setPayments(payments.map(p => p.paymentId === paymentId ? { ...p, paymentStatus: newStatus } : p));
    } catch (err) {
      alert('Failed to update payment status');
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title">Payments & Refunds</h1>
        <p className="page-subtitle" style={{ fontSize: '1rem' }}>Monitor transactions and issue refunds for returned orders.</p>
      </div>
      
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {payments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💳</div>
            <p>No payment records found.</p>
          </div>
        ) : (
          <div className="table-wrapper" style={{ margin: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f4f6ff', borderBottom: 'none' }}>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Txn ID</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Customer</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Amount</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Method</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'left', color: '#6366f1', fontWeight: '600', borderBottom: 'none' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.paymentId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 1.5rem' }}><strong>#{payment.paymentId}</strong></td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{payment.customer_name || 'Unknown Customer'}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{payment.customer_email || 'No Email Provided'}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>
                      ₹{parseFloat(payment.total_amount || 0).toFixed(2)}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{payment.paymentMethod}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {new Date(payment.paymentDate).toLocaleDateString('en-US')}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {payment.paymentStatus === 'Refunded' ? (
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)' }}>REFUNDED</span>
                      ) : (
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          color: '#6366f1', 
                          background: '#eef2ff', 
                          padding: '0.35rem 0.75rem', 
                          borderRadius: '1rem' 
                        }}>
                          PAID
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {payment.paymentStatus === 'Refunded' ? (
                        <span style={{ color: 'var(--text-secondary)' }}>-</span>
                      ) : payment.order_status?.toLowerCase() !== 'cancelled' ? (
                        <span style={{ 
                          fontSize: '0.8rem', 
                          color: '#f59e0b',
                          background: '#fef3c7',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '1rem',
                          fontWeight: '600'
                        }}>
                          WAITING ({(payment.order_status || 'Pending').toUpperCase()})
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleUpdateStatus(payment.paymentId, 'Refunded')}
                          style={{
                            background: '#fee2e2',
                            color: '#ef4444',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          Issue Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsRefunds;
