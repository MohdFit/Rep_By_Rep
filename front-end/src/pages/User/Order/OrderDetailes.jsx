import React, { useState } from "react";
import "../../../assets/styles/orderDetails.css";
import Order from "../../../assets/images/accountSetting/Order.png";
import CreditCard from "../../../assets/images/OrderDetails/CreditCard.png";
import MapPin from "../../../assets/images/OrderDetails/MapPin.png";
import cardMan from "../../../assets/images/OrderDetails/cardMan.jpg";
import cardWomen from "../../../assets/images/OrderDetails/cardWomen.jpg";

const OrderDetailsModal = ({ order, onClose }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!order) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "processing";
      case "Shipping":
        return "shipping";
      case "Delivered":
        return "delivered";
      case "Canceled":
        return "canceled";
      default:
        return "";
    }
  };

  const openFeedbackModal = (product) => {
    setSelectedProduct(product);
    setRating(0);
    setComment("");
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setSelectedProduct(null);
  };

  const submitFeedback = () => {
    console.log("Feedback submitted", {
      productId: selectedProduct.id,
      rating,
      comment,
    });
    closeFeedbackModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* ===== Header ===== */}
        <div className="modal-header">
          <h2>Order #{order.id}</h2>
          <span className={`status ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        <hr />

        {/* ===== Order Progress ===== */}
        <div className="order-progress">
          <div>
            <img className="order-icon" src={Order} alt="order" />
            <h3>Order Progress</h3>
          </div>
          <ul>
            <li className="done">
              Order Placed
              <span className="step-date">Jan 15, 2024 10:30 AM</span>
            </li>
            {order.status !== "Canceled" && (
              <>
                <li className="done">
                  Payment Confirmed
                  <span className="step-date">Jan 16, 2024 11:00 AM</span>
                </li>
                <li
                  className={
                    order.status === "Processing" ||
                    order.status === "Shipping" ||
                    order.status === "Delivered"
                      ? "done"
                      : ""
                  }
                >
                  Processing
                  <span className="step-date">Jan 17, 2024 09:15 AM</span>
                </li>
                <li
                  className={
                    order.status === "Shipping" || order.status === "Delivered"
                      ? "done"
                      : ""
                  }
                >
                  Shipping
                  <span className="step-date">Jan 18, 2024 02:45 PM</span>
                </li>
                <li className={order.status === "Delivered" ? "done" : ""}>
                  Delivered
                  <span className="step-date">Jan 20, 2024 04:00 PM</span>
                </li>
              </>
            )}
            {order.status === "Canceled" && (
              <li className="canceled-step">
                <div className="cancel-circle"></div>
                <span>Order Canceled</span>
              </li>
            )}
          </ul>
        </div>

        {/* ===== Products Cards ===== */}
        <div className="product-cards">
          {order.products && order.products.length > 0 ? (
            order.products.map((product, index) => (
              <div className="product-card" key={index}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-details">
                  <h4>{product.name}</h4>
                  <p>
                    Size: {product.size} • {product.color}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="product-action">
                  <span className="price">{product.price} $</span>
                  <button
                    className="feedback-btn"
                    onClick={() => openFeedbackModal(product)}
                  >
                    Leave Feedback
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="products-section">
              <div className="product-card">
                <img src={cardMan} alt="product-1" className="product-image" />
                <div className="product-info">
                  <h4>Sports T-Shirt</h4>
                  <p>Size: M</p>
                  <p>Qty: 1</p>
                </div>
                <div className="side-right">
                  <div className="product-price">$20.00</div>
                  <button
                    className="feedback-btn"
                    onClick={() =>
                      openFeedbackModal({
                        id: 1,
                        name: "Sports T-Shirt",
                        image: cardMan,
                        size: "M",
                        color: "Red",
                      })
                    }
                  >
                    Leave Feedback
                  </button>
                </div>
              </div>

              <div className="product-card">
                <img
                  src={cardWomen}
                  alt="product-2"
                  className="product-image"
                />
                <div className="product-info">
                  <h4>Running Shorts</h4>
                  <p>Size: L</p>
                  <p>Qty: 1</p>
                </div>
                <div className="side-right">
                  <div className="product-price">$20.00</div>
                  <button
                    className="feedback-btn"
                    onClick={() =>
                      openFeedbackModal({
                        id: 2,
                        name: "Running Shorts",
                        image: cardWomen,
                        size: "L",
                        color: "Blue",
                      })
                    }
                  >
                    Leave Feedback
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr />

        {/* ===== Payment & Address ===== */}
        <div className="bottom-section">
          <div>
            <div className="inner">
              <img src={CreditCard} alt="CreditCard" />
              <h4>Payment Info</h4>
            </div>
            <p className="contantP">Visa ending in 4242</p>
          </div>
          <div>
            <div className="inner">
              <img src={MapPin} alt="MapPin" />
              <h4>Delivery Address</h4>
            </div>
            <p className="contantP">
              123 Fitness St
              <br />
              Amman, CA 90210
              <br />
              Jordan
            </p>
          </div>
        </div>

        {/* ===== Summary ===== */}
        <div className="summary">
          <p>
            <strong>Total Amount:</strong> $
            {order.products && order.products.length > 0
              ? order.products
                  .reduce(
                    (sum, p) => sum + parseFloat(p.price) * (p.quantity || 1),
                    0
                  )
                  .toFixed(2)
              : 40.0}
          </p>
          <p className="date">Ordered on {order.date}</p>
        </div>

        {/* ===== Close Button ===== */}
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* ===== Feedback Modal ===== */}
        {feedbackModalOpen && selectedProduct && (
          <div className="modal-overlay">
            <div className="modal-container feedback-modal">
              <h2>Leave Your Feedback</h2>

              <div className="feedback-product">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <div className="product-info">
                  <h4>{selectedProduct.name}</h4>
                  <p>
                    Size: {selectedProduct.size} • {selectedProduct.color}
                  </p>
                </div>
              </div>

              <div className="feedback-rating">
                <p>How would you rate this product?</p>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        cursor: "pointer",
                        color: star <= rating ? "#ff9900" : "#ccc",
                        fontSize: "24px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
              ></textarea>

              <div className="feedback-actions">
                <button onClick={closeFeedbackModal}>Cancel</button>
                <button onClick={submitFeedback}>Submit Feedback</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;
