import { useState } from 'react';
import { createReview } from '../../services/reviewService';
import './reviewForm.css';

const ReviewForm = ({ productId, orderId, onReviewSubmitted }) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.title.trim()) {
      setError('Please enter a review title');
      return;
    }
    if (formData.title.length < 5 || formData.title.length > 100) {
      setError('Title must be between 5 and 100 characters');
      return;
    }
    if (!formData.comment.trim()) {
      setError('Please enter a review comment');
      return;
    }
    if (formData.comment.length < 10 || formData.comment.length > 1000) {
      setError('Comment must be between 10 and 1000 characters');
      return;
    }

    try {
      setLoading(true);
      const reviewData = {
        productId,
        orderId,
        rating: formData.rating,
        title: formData.title.trim(),
        comment: formData.comment.trim()
      };

      const response = await createReview(reviewData);

      if (response.success) {
        setSuccess(true);
        setFormData({
          rating: 5,
          title: '',
          comment: ''
        });
        
        // Notify parent to refresh reviews list
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || 'An error occurred while submitting your review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="review-form-container">
        <div className="login-prompt">
          <p>Please log in to leave a review</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <h3>Leave a Review</h3>

      {error && (
        <div className="form-error">
          <span className="close-error" onClick={() => setError(null)}>×</span>
          {error}
        </div>
      )}

      {success && (
        <div className="form-success">
          ✓ Review submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="review-form">
        {/* Rating Section */}
        <div className="form-group">
          <label>Rating</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`rating-star ${star <= formData.rating ? 'active' : ''}`}
                onClick={() => handleStarClick(star)}
                title={`${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </span>
            ))}
            <span className="rating-value">
              {formData.rating} / 5
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="form-group">
          <label htmlFor="title">Review Title *</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Summarize your experience (5-100 characters)"
            maxLength="100"
            required
            className="form-input"
          />
          <span className="char-count">
            {formData.title.length}/100
          </span>
        </div>

        {/* Comment Section */}
        <div className="form-group">
          <label htmlFor="comment">Your Review *</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your detailed experience (10-1000 characters)"
            maxLength="1000"
            rows="5"
            required
            className="form-textarea"
          />
          <span className="char-count">
            {formData.comment.length}/1000
          </span>
        </div>

        {/* Helpful Note */}
        <div className="form-note">
          <p>💡 <strong>Helpful tips:</strong></p>
          <ul>
            <li>Be honest and detailed about your experience</li>
            <li>Include what you liked and disliked</li>
            <li>Help other customers make informed decisions</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? '⏳ Submitting...' : '✓ Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
