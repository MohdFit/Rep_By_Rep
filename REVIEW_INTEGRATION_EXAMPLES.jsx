// EXAMPLE: How to integrate ProductReviews and ReviewForm into a product page
// This is example code showing the integration pattern

import { useState, useEffect } from 'react';
import ProductReviews from '../../components/ProductReviews';
import ReviewForm from '../../components/ReviewForm';
import { getAllProducts } from '../../services/productService';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const [selectedOrderId, setSelectedOrderId] = useState(null); // For review form
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts({ search: productId });
      if (response.data && response.data.length > 0) {
        setProduct(response.data[0]);
      }
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>

          <button onClick={() => addToCart(product)}>
            🛒 Add to Cart
          </button>
        </div>
      </div>

      <section className="reviews-section">
        <ProductReviews productId={product._id} />
      </section>

      {showReviewForm && selectedOrderId && (
        <section className="review-submission-section">
          <ReviewForm
            productId={product._id}
            orderId={selectedOrderId}
            onReviewSubmitted={() => {
              setShowReviewForm(false);
              // Optionally: Refresh reviews list
              window.location.reload(); // or use state update
            }}
          />
        </section>
      )}

      {!showReviewForm && (
        <button 
          onClick={() => setShowReviewForm(true)}
          className="write-review-button"
        >
          ✍️ Write a Review
        </button>
      )}
    </div>
  );
}


// Assuming existing Product component structure:

export function Product({ product }) {
  const [expanded, setExpanded] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <button onClick={() => addToCart(product)}>Add to Cart</button>

      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Details' : 'View Details & Reviews'}
      </button>

      {expanded && (
        <div className="expanded-details">
          <p>{product.description}</p>
          
          <ProductReviews productId={product._id} />
          
        </div>
      )}
    </div>
  );
}



export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [reviewingOrderId, setReviewingOrderId] = useState(null);

  return (
    <div className="my-orders-container">
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <h3>Order #{order._id.slice(-6)}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>

          {order.items.map(item => (
            <div key={item.productId} className="order-item">
              <span>{item.productName}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}

          {order.status === 'completed' && (
            <>
              {reviewingOrderId === order._id ? (
                // INTEGRATION: Show review form for this order
                <ReviewForm
                  productId={order.items[0].productId}
                  orderId={order._id}
                  onReviewSubmitted={() => {
                    setReviewingOrderId(null);
                    // Optionally refresh or show success
                  }}
                />
              ) : (
                <button onClick={() => setReviewingOrderId(order._id)}>
                  ⭐ Leave a Review
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================
   STYLING: Add to your CSS file
   ============================================ */

/*
.reviews-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #e0e0e0;
}

.review-submission-section {
  margin-top: 30px;
}

.write-review-button {
  padding: 12px 24px;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.write-review-button:hover {
  background-color: #ffb300;
  transform: translateY(-2px);
}

.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .product-main {
    grid-template-columns: 1fr;
  }
}
*/

/* ============================================
   USAGE NOTES
   ============================================ */

/*
1. Import ProductReviews and ReviewForm in component
2. Pass productId to ProductReviews (required)
3. Pass productId and orderId to ReviewForm (both required)
4. Handle onReviewSubmitted callback to refresh reviews if needed
5. Add CSS from productReviews.css and reviewForm.css to project

ProductReviews: Shows all approved reviews with sorting/pagination
ReviewForm: Form for leaving new reviews (requires authentication)

Data flows through reviewService.js which handles all API calls.

Admin must approve reviews before they appear in ProductReviews.
*/
