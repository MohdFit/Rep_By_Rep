# Complete Data Flow Architecture

# Current vs Required Architecture

# PRODUCT BROWSING FLOW

**Current (Broken):**
```
ProductMen.jsx (Hardcoded 8 T-shirts)
    ↓
User sees fake products
    ↓
"Add to Bag" button → Does nothing
    ↓
No functionality
```

**Required (To Fix):**
```
ProductMen.jsx
    ↓
useEffect → API Call
    ↓
productService.getAllProducts() 
    ↓
GET /api/tshirts
    ↓
Backend queries DB
    ↓
Returns real products
    ↓
Component renders real data
    ↓
User clicks "Add to Cart"
    ↓
cartService.addToCart(productId, quantity, size, color)
    ↓
POST /api/cart {userId, productId, quantity, size, color}
    ↓
Backend saves to cart DB
    ↓
CartContext updated
    ↓
Cart badge shows count
```

---

## SHOPPING CART FLOW

**Current (Broken):**
```
Cart.jsx
├─ useState hardcoded items (2 fake items)
├─ User edits quantity locally
├─ On refresh → Data lost
└─ Submit checkout → No cart data sent
```

**Required (To Fix):**
```
ProductMen/Women/Plans
    ↓
User clicks "Add to Cart"
    ↓
addToCart(productId, size, color, qty)
    ↓
CartContext.addItem()
    ↓
POST /api/cart/add
    ↓
Backend: Save to Cart table
    ↓
Response: Updated cart
    ↓
CartContext updated
    ↓
Cart badge updates

Cart.jsx
├─ useCart() hook
├─ Fetches from CartContext (or API)
├─ Shows cart.items
├─ Edit quantity → PUT /api/cart/{itemId}
├─ Delete item → DELETE /api/cart/{itemId}
├─ Calculate total → sum(item.price * quantity)
└─ Proceed to checkout

Checkout Flow:
Payment1 (Shipping) → Save shipping address
    ↓
Payment2 (Payment Method) → Select payment
    ↓
Payment3 (Confirmation)
    ↓
[New] Process Payment → Stripe/PayPal
    ↓
[New] POST /api/orders with:
{
  userId,
  items: [{
    productId,
    productType,
    quantity,
    unitPrice,
    selectedSize,
    selectedColor
  }],
  shippingInfo: {...},
  shippingCost,
  paymentId
}
    ↓
Backend creates Order + OrderItems
    ↓
[New] DELETE /api/cart (clear cart)
    ↓
Success → Redirect to OrderConfirmation
```

---

## MY ORDERS FLOW

**Current (Broken):**
```
MyOrders.jsx
├─ useState 5 hardcoded orders
├─ No API call
├─ Shows same data to all users
└─ No refresh capability
```

**Required (To Fix):**
```
MyOrders.jsx
├─ useAuth() → Get userId
├─ useEffect → On mount
│   └─ GET /api/orders/user/{userId}
│       └─ Get all user's orders
├─ Map orders to display
├─ Each order card:
│   ├─ Order number
│   ├─ Date
│   ├─ Status badge
│   ├─ Total amount
│   └─ "View Details" button
│       └─ Click → Show OrderDetailsModal
│           └─ GET /api/orders/{orderId}
│               └─ Show full order with items
│               └─ Show shipping address
│               └─ Show payment details
└─ [NEW] "Track Order" button
    └─ Real-time status updates
    └─ Shipping tracking integration
```

---

## COMPLETE REQUEST/RESPONSE EXAMPLES

### Add to Cart
```javascript
// REQUEST
POST /api/cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user123",
  "productId": "product456",
  "productType": "TShirt",
  "quantity": 1,
  "selectedSize": "M",
  "selectedColor": "Red"
}

// RESPONSE (Success)
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "_id": "cart789",
    "userId": "user123",
    "items": [
      {
        "_id": "item1",
        "productId": "product456",
        "productType": "TShirt",
        "quantity": 1,
        "selectedSize": "M",
        "selectedColor": "Red",
        "price": 20,
        "total": 20
      }
    ],
    "subTotal": 20,
    "tax": 1.60,
    "total": 21.60
  }
}

// RESPONSE (Error)
{
  "success": false,
  "message": "User not found"
}
```

### Create Order
```javascript
// REQUEST
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user123",
  "items": [
    {
      "productId": "product456",
      "productType": "TShirt",
      "quantity": 1,
      "unitPrice": 20,
      "selectedSize": "M",
      "selectedColor": "Red"
    }
  ],
  "shippingInfo": {
    "street": "123 Main St",
    "apartment": "Apt 4",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "shippingCost": 5,
  "paymentId": "pi_1234567890"
}

// RESPONSE (Success)
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "order123",
    "orderNumber": "ORD-2025-000001",
    "userId": "user123",
    "orderItems": [
      {
        "_id": "item1",
        "productType": "TShirt",
        "productId": "product456",
        "quantity": 1,
        "unitPrice": 20,
        "totalPrice": 20,
        "selectedSize": "M",
        "selectedColor": "Red"
      }
    ],
    "shippingInfo": {...},
    "total": 25,
    "status": "Pending",
    "createdAt": "2025-01-18T10:00:00Z"
  }
}
```

### Get User Orders
```javascript
// REQUEST
GET /api/orders/user/user123
Authorization: Bearer {token}

// RESPONSE (Success)
{
  "success": true,
  "data": [
    {
      "_id": "order123",
      "orderNumber": "ORD-2025-000001",
      "status": "Pending",
      "total": 25,
      "createdAt": "2025-01-18T10:00:00Z",
      "orderItems": [
        {
          "productType": "TShirt",
          "productId": "product456",
          "quantity": 1,
          "selectedSize": "M",
          "selectedColor": "Red"
        }
      ],
      "userId": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "count": 1
}
```

---

## DATABASE RELATIONSHIPS NEEDED

### Current Models
```
User
├─ (has many) Orders
├─ (has many) Reviews
└─ (has many) WishlistItems

Order
├─ (belongs to) User
├─ (has many) OrderItems
└─ (has) ShippingInfo

OrderItem
├─ (belongs to) Order
├─ (references) TShirt or Plan
└─ Stores: quantity, selectedSize, selectedColor, unitPrice

TShirt
├─ (has many) OrderItems
├─ (has many) Reviews
└─ (has many) WishlistItems

Plan
├─ (has many) OrderItems
├─ (has many) Reviews
└─ (has many) WishlistItems
```

### MISSING Models
```
Cart ❌ NEEDED
├─ (belongs to) User
├─ (has many) CartItems
└─ expiresAt (for cleanup)

CartItem ❌ NEEDED
├─ (belongs to) Cart
├─ (references) TShirt or Plan
└─ Stores: quantity, selectedSize, selectedColor

Review ❌ NEEDED
├─ (belongs to) User (reviewer)
├─ (references) TShirt or Plan (reviewable)
├─ rating: 1-5
└─ comment: string

Wishlist ❌ NEEDED
├─ (belongs to) User
├─ (has many) WishlistItems
└─ createdAt

WishlistItem ❌ NEEDED
├─ (belongs to) Wishlist
├─ (references) TShirt or Plan
└─ addedAt

Payment ❌ NEEDED
├─ (belongs to) Order
├─ stripePaymentId
├─ amount
├─ status: 'pending'|'succeeded'|'failed'
└─ createdAt
```

---

## CONTEXT STRUCTURE NEEDED

### CartContext
```javascript
const CartContext = {
  state: {
    items: [],
    userId: null,
    subTotal: 0,
    tax: 0,
    shippingCost: 0,
    total: 0,
    loading: false,
    error: null
  },
  
  actions: {
    addItem(product, quantity, size, color),
    removeItem(itemId),
    updateQuantity(itemId, quantity),
    clearCart(),
    fetchCart(userId),
    calculateTotals()
  }
}
```

### AuthContext
```javascript
const AuthContext = {
  state: {
    user: {
      id: string,
      email: string,
      fullName: string,
      role: 'user'|'admin',
      phone: string,
      createdAt: date
    },
    token: string,
    isAuthenticated: boolean,
    loading: boolean,
    error: null
  },
  
  actions: {
    login(email, password),
    register(fullName, email, password, phone),
    logout(),
    refreshToken(),
    updateProfile(userData)
  }
}
```

---

## MISSING API ENDPOINTS

### Cart Routes
```
POST   /api/cart/add           → Add item to cart
GET    /api/cart/{userId}      → Get user's cart
PUT    /api/cart/{itemId}      → Update cart item quantity
DELETE /api/cart/{itemId}      → Remove item from cart
DELETE /api/cart/{userId}      → Clear entire cart
```

### Review Routes
```
POST   /api/reviews            → Create review
GET    /api/reviews/{productId} → Get reviews for product
PUT    /api/reviews/{reviewId} → Update review
DELETE /api/reviews/{reviewId} → Delete review
GET    /api/reviews/user/{userId} → Get user's reviews
```

### Wishlist Routes
```
POST   /api/wishlist/add       → Add to wishlist
GET    /api/wishlist/{userId}  → Get user's wishlist
DELETE /api/wishlist/{itemId}  → Remove from wishlist
```

### Payment Routes
```
POST   /api/payments/process   → Process payment (Stripe)
POST   /api/payments/webhook   → Stripe webhook
GET    /api/payments/{orderId} → Get payment details
```

---

## Frontend Component Structure Needed

```
src/
├─ context/
│   ├─ CartContext.jsx ❌
│   ├─ AuthContext.jsx ❌
│   └─ index.js
├─ hooks/
│   ├─ useCart.js ❌
│   ├─ useAuth.js ❌
│   └─ useOrders.js ❌
├─ services/
│   ├─ cartService.js ❌
│   ├─ paymentService.js ❌
│   ├─ reviewService.js ❌
│   └─ (others already exist)
├─ pages/
│   ├─ productMen/ (needs API integration)
│   ├─ productWomen/ (needs API integration)
│   ├─ productPlans/ (needs API integration)
│   ├─ ProductDetail/ ❌ (needs to be created)
│   ├─ User/
│   │   ├─ Cart/ (needs API integration)
│   │   ├─ Order/ (needs API integration)
│   │   └─ (others exist)
│   └─ Admin/ (mostly done ✅)
```

---

## Testing Checklist After Implementation

- [ ] User can browse products (real data)
- [ ] User can select product size/color
- [ ] User can add to cart
- [ ] Cart persists after page refresh
- [ ] User can edit cart quantities
- [ ] User can remove items from cart
- [ ] User can proceed to checkout
- [ ] Checkout collects shipping address
- [ ] Payment processes successfully
- [ ] Order is created in database
- [ ] User sees order confirmation
- [ ] User can view order history
- [ ] User can view order details
- [ ] Admin can see all orders
- [ ] Admin can change order status
- [ ] Stats show real data
- [ ] Charts update in real-time

