import { useState, useEffect } from 'react';
import { getProductReviews } from '../../services/reviewService';
import './productReviews.css';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchReviews();
  }, [productId, page, sortBy, sortOrder]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductReviews(productId, {
        page,
        limit: 5,
        sortBy,
        sortOrder
      });

      if (response.success) {
        setReviews(response.data || []);
        setTotalPages(response.pagination?.pages || 1);
        if (response.statistics) {
          setStats({
            averageRating: response.statistics.averageRating || 0,
            totalReviews: response.statistics.totalReviews || 0
          });
        }
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= Math.round(rating) ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading && reviews.length === 0) {
    return <div className="reviews-container"><p>Loading reviews...</p></div>;
  }

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="reviews-stats">
          <div className="average-rating">
            <div className="big-rating">{stats.averageRating.toFixed(1)}</div>
            {renderStars(stats.averageRating)}
            <p className="review-count">{stats.totalReviews} reviews</p>
          </div>
        </div>
      </div>

      <div className="reviews-controls">
        <select 
          value={sortBy} 
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="createdAt">Most Recent</option>
          <option value="rating">Rating</option>
          <option value="helpfulCount">Most Helpful</option>
        </select>

        <select 
          value={sortOrder} 
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <p className="reviewer-name">
                    {review.userId?.name || 'Anonymous'}
                  </p>
                  {review.verified && (
                    <span className="verified-badge">✓ Verified Purchase</span>
                  )}
                </div>
                {renderStars(review.rating)}
              </div>

              <div className="review-title">{review.title}</div>
              <div className="review-comment">{review.comment}</div>

              <div className="review-footer">
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <div className="helpful-count">
                  👍 {review.helpfulCount} found this helpful
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>{page} of {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
