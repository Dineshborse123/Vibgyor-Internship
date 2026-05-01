import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/reviews');
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/reviews/${id}/status`, { status });
      setSuccess(`Review has been ${status.toLowerCase()}!`);
      setTimeout(() => setSuccess(''), 3000);
      fetchReviews();
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await API.delete(`/reviews/${id}`);
      setSuccess('Review deleted.');
      setTimeout(() => setSuccess(''), 3000);
      fetchReviews();
    } catch (err) {
      setError('Failed to delete review.');
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">⭐ Review Moderation</h1>
          <p className="page-subtitle">Approve or reject customer product reviews.</p>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td><strong>{r.product_name}</strong></td>
                    <td>{r.user_name}</td>
                    <td>
                      <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </td>
                    <td style={{ maxWidth: '250px' }}>{r.comment}</td>
                    <td>
                      <span className={`badge badge-${r.status === 'Approved' ? 'success' : r.status === 'Rejected' ? 'danger' : 'primary'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                      {r.status !== 'Approved' && (
                        <button className="btn btn-sm btn-success" onClick={() => updateStatus(r.id, 'Approved')}>Approve</button>
                      )}
                      {r.status !== 'Rejected' && (
                        <button className="btn btn-sm btn-danger" onClick={() => updateStatus(r.id, 'Rejected')}>Reject</button>
                      )}
                      <button className="btn btn-sm btn-secondary" onClick={() => deleteReview(r.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewModeration;
