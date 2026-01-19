# Review System Integration Guide

## Components Created

### 1. **ProductReviews.jsx**
Displays approved customer reviews for a product with filtering and pagination.

**Location:** `src/components/ProductReviews.jsx`

**Props:**
- `productId` (string, required) - The product ID to fetch reviews for

**Features:**
- Shows average rating and total review count
- Sort by: Most Recent, Rating, Most Helpful
- Pagination support (5 reviews per page)
- Displays reviewer name, rating, title, comment, and verified badge
- Shows helpful count for each review

**Usage:**
```jsx
import ProductReviews from './components/ProductReviews';

export default function ProductPage() {
  return (
    <div>
      {/* Product details */}
      <ProductReviews productId={productId} />
    </div>
  );
}
```

**Where to add:** Product detail pages (ProductMen, ProductWomen, ProductPlans, etc.)

---

### 2. **ReviewForm.jsx**
Form for authenticated users to submit product reviews.

**Location:** `src/components/ReviewForm.jsx`

**Props:**
- `productId` (string, required) - The product being reviewed
- `orderId` (string, required) - The order ID to verify purchase
- `onReviewSubmitted` (function, optional) - Callback to refresh reviews list

**Features:**
- Star rating picker (1-5 stars, clickable)
- Review title input (5-100 characters)
- Review comment textarea (10-1000 characters)
- Character count display
- Form validation before submission
- Success/error message display
- Loading state during submission

**Usage:**
```jsx
import ReviewForm from './components/ReviewForm';

export default function ProductPage() {
  const handleReviewSubmitted = () => {
    // Refresh reviews or show success message
  };

  return (
    <div>
      <ReviewForm 
        productId={productId}
        orderId={orderId}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
```

**Where to add:** 
- MyOrders page (add "Leave Review" button for each completed order)
- Product detail pages (for logged-in users with verified purchases)

---

## Integration Steps

### Step 1: Add ProductReviews to Product Pages

**File:** `src/pages/productMen/ProductMen.jsx`

```jsx
import ProductReviews from '../../components/ProductReviews';

// In component JSX:
{selectedProduct && (
  <div>
    {/* Product details */}
    <ProductReviews productId={selectedProduct._id} />
  </div>
)}
```

**Repeat for:**
- ProductWomen.jsx
- ProductPlans.jsx

### Step 2: Add ReviewForm to MyOrders Page

**File:** `src/pages/User/MyOrders.jsx`

```jsx
import ReviewForm from '../../components/ReviewForm';

// In component JSX:
{orders.map(order => (
  <div key={order._id}>
    {/* Order details */}
    {order.status === 'completed' && !hasReviewedProduct && (
      <ReviewForm 
        productId={order.items[0].productId}
        orderId={order._id}
        onReviewSubmitted={() => {
          // Refresh orders or show toast notification
        }}
      />
    )}
  </div>
))}
```

### Step 3: API Endpoints Being Used

**ProductReviews Component calls:**
- `GET /api/reviews/product/:productId?page=1&limit=5&sortBy=createdAt&sortOrder=desc`

**ReviewForm Component calls:**
- `POST /api/reviews` (requires authentication)
  - Body: `{ productId, orderId, rating, title, comment }`

---

## Styling

Both components include responsive CSS files:
- `productReviews.css` - Review list styling
- `reviewForm.css` - Review form styling

Features:
- Mobile-responsive (breakpoints at 768px and 480px)
- Dark mode compatible
- Accessibility focused
- Smooth animations and transitions

---

## Review Workflow

1. **User purchases product** → Order status: "pending/processing"
2. **Order is completed** → Status: "completed"
3. **User navigates to MyOrders** → Sees "Leave Review" button
4. **User fills ReviewForm** → Submits review with rating, title, comment
5. **Review is created** → Status: "pending" (awaits admin approval)
6. **Admin approves review** → Status: "approved"
7. **Review appears in ProductReviews** → Other users see it

---

## Data Flow

```
ProductReviews Component
    ↓
getProductReviews() → axios GET
    ↓
Backend: GET /api/reviews/product/:id
    ↓
ReviewController: getProductReviews()
    ↓
MongoDB Query: Reviews with status="approved"
    ↓
Return with pagination, stats, sorting
    ↓
Display in component with pagination controls


ReviewForm Component
    ↓
User fills form + clicks submit
    ↓
createReview() → axios POST
    ↓
Backend: POST /api/reviews
    ↓
ReviewController: createReview()
    ↓
Validation: Check duplicate, format data
    ↓
MongoDB: Create review with status="pending"
    ↓
Return success message
    ↓
Component shows success, optional callback
```

---

## Verification Checklist

- ✅ ProductReviews.jsx created and compiles
- ✅ ReviewForm.jsx created and compiles
- ✅ Both CSS files created
- ✅ Both components use reviewService.js (already created)
- ✅ ReviewForm uses localStorage for user data (no external dependencies)
- ✅ ProductReviews has pagination, sorting, and filtering
- ✅ ReviewForm has validation and error handling
- ✅ No compilation errors

---

## Next Steps

1. Integrate ProductReviews into product detail pages
2. Integrate ReviewForm into MyOrders page (for completed orders)
3. Create admin review moderation page (view pending, approve/reject)
4. Optional: Add email notifications when review is approved
5. Optional: Add "helpful" voting functionality

---

## Testing

**To test ProductReviews:**
1. Navigate to a product page
2. Should see reviews section with average rating and review count
3. Try sorting and pagination controls
4. Verify reviews show verified badge if from verified purchase

**To test ReviewForm:**
1. Log in with an account
2. Complete an order
3. Navigate to review form
4. Submit a review with rating, title, and comment
5. See success message
6. Admin should see review in pending queue
