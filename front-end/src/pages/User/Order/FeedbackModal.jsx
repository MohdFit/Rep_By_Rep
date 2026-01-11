import React, { useState } from "react";
import "../../../assets/styles/feedback.css";

const FeedbackModal = ({ product, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarClick = (value) => setRating(value);
  const handleSubmit = () => {
    onSubmit({ productId: product.id, rating, comment });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="feedback-modal">
        {/* Title */}
        <div className="feedback-title">
          <h2 className="title">Leave Your Feedback</h2>
        </div>

        {/* Product Card */}
        <div className="feedback-product">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <div className="product-info">
            <h4 className="product-name">{product.name}</h4>
            <p className="product-details">
              Size: {product.size} • {product.color}
            </p>
          </div>
        </div>

        {/* How would you rate paragraph */}
        <p className="rating-text">How would you rate this product?</p>

        {/* Stars */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => handleStarClick(star)}
            >
              ☆
            </span>
          ))}
        </div>

        {/* Comment Box */}
        <div className="feedback-comment-box">
          <p className="comment-paragraph">
            Tell us more about your experience
          </p>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="feedback-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
