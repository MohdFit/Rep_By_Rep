import React, { useState } from "react";
import "../../../assets/styles/orderDetails.css";
import Order from "../../../assets/images/accountSetting/Order.png";
import CreditCard from "../../../assets/images/OrderDetails/CreditCard.png";
import MapPin from "../../../assets/images/OrderDetails/MapPin.png";
import cardMan from "../../../assets/images/OrderDetails/cardMan.jpg";
import ReviewForm from "../../../components/ReviewForm";

const OrderDetailsModal = ({ order, onClose }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        <div className="modal-header">
          <h2>Order #{order.id}</h2>
          <span className={`status ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        <hr />

        
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

        
        <div className="product-cards">
          {(order._raw?.orderItems || []).length > 0 ? (
            order._raw.orderItems.map((item, index) => (
              <div className="product-card" key={index}>
                <img
                  className="product-image"
                  src={item.product?.image || cardMan}
                  alt={item.product?.title || 'Training Plan'}
                />
                <div className="product-details">
                  <h4>{item.product?.title || 'Training Plan'}</h4>
                  <p>Quantity: {item.quantity || 1}</p>
                </div>
                <div className="product-action">
                  <span className="price">{(item.unitPrice || 0).toFixed(2)} $</span>
                  <button
                    className="feedback-btn"
                    onClick={() => openFeedbackModal({
                      id: item.product?._id || item._id,
                      name: item.product?.title || 'Training Plan',
                      image: item.product?.image || cardMan
                    })}
                  >
                    Leave Feedback
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="products-section">No items for this order.</div>
          )}
        </div>
        <hr />

        
        <div className="bottom-section">
          <div>
            <div className="inner">
              <img src={CreditCard} alt="CreditCard" />
              <h4>Payment Info</h4>
            </div>
            <p className="contantP">{order._raw?.paymentMethod || '—'}</p>
          </div>
          <div>
            <div className="inner">
              <img src={MapPin} alt="MapPin" />
              <h4>Delivery Address</h4>
            </div>
            <p className="contantP">{order._raw?.shippingAddress || '—'}</p>
          </div>
        </div>

        
        <div className="summary">
          <p>
            <strong>Total Amount:</strong> $
            {typeof order._raw?.total === 'number'
              ? order._raw.total.toFixed(2)
              : Number(order._raw?.total || 0).toFixed(2)}
          </p>
          <p className="date">Ordered on {order.date}</p>
        </div>

        
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        
        {feedbackModalOpen && selectedProduct && (
          <div className="modal-overlay" onClick={closeFeedbackModal}>
            <div className="modal-container feedback-modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="close-btn" 
                onClick={closeFeedbackModal}
                style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
              >
                ×
              </button>
              <ReviewForm
                productId={selectedProduct.id || selectedProduct._id}
                orderId={order._raw?._id || order.id}
                onReviewSubmitted={() => {
                  closeFeedbackModal();
                  // Optional: show success message
                  console.log('Review submitted successfully');
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;

