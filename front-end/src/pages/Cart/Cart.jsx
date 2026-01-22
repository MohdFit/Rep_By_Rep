import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './cart.css';

const Cart = () => {
  const { cart, loading, removeFromCart, updateCartItem } = useCart();
  const [updatingItems, setUpdatingItems] = useState({});

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    try {
      setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (loading) {
    return <div className="cart-container"><p>Loading cart...</p></div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item._id} className="cart-item">
            <div className="item-info">
              <h4>{item.productType}</h4>
              {item.selectedSize && <p>Size: {item.selectedSize}</p>}
              {item.selectedColor && <p>Color: {item.selectedColor}</p>}
              <p className="price">${item.price.toFixed(2)}</p>
            </div>

            <div className="item-quantity">
              <button
                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                disabled={updatingItems[item._id]}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                disabled={updatingItems[item._id]}
              >
                +
              </button>
            </div>

            <div className="item-total">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item._id)}
              disabled={updatingItems[item._id]}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${cart.subTotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>${cart.tax.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>${cart.shippingCost.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="checkout-btn">Proceed to Checkout</button>
        <a href="/programs" className="continue-shopping">Continue Shopping</a>
      </div>
    </div>
  );
};

export default Cart;
