# 📱 COMPONENT QUICK REFERENCE

## ProductReviews Component

**What it does:** Displays customer reviews for a product

**Import:**
```jsx
import ProductReviews from '../../components/ProductReviews';
```

**Usage:**
```jsx
<ProductReviews productId={product._id} />
```

**Props:**
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| productId | string | Yes | Product ID to fetch reviews for |

**Features:**
```
┌─ Display Approved Reviews
├─ Show Average Rating (★★★★☆)
├─ Show Total Review Count
├─ Sort: Recent / Rating / Helpful
├─ Paginate (5 per page)
├─ Verified Purchase Badge
├─ Show helpfulCount
└─ Mobile Responsive
```

**Example Output:**
```
Customer Reviews
                    Average: 4.6 ★
                    42 reviews

[Sort: Most Recent ▼] [Order: Desc ▼]

John Doe ★★★★★ ✓ Verified
Great Product!
"This is amazing, highly recommend!"
Jan 15, 2024  👍 12 found helpful

[← Previous] Page 1 of 9 [Next →]
```

---

## ReviewForm Component

**What it does:** Form for users to submit product reviews

**Import:**
```jsx
import ReviewForm from '../../components/ReviewForm';
```

**Usage:**
```jsx
<ReviewForm 
  productId={product._id}
  orderId={order._id}
  onReviewSubmitted={() => console.log('Review submitted!')}
/>
```

**Props:**
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| productId | string | Yes | Product being reviewed |
| orderId | string | Yes | Order ID for verification |
| onReviewSubmitted | function | No | Callback after success |

**Features:**
```
┌─ Star Rating Picker (1-5)
├─ Title Input (5-100 chars)
├─ Comment Input (10-1000 chars)
├─ Character Counters
├─ Form Validation
├─ Success/Error Messages
├─ Loading State
├─ Login Prompt
└─ Mobile Optimized
```

**Form Layout:**
```
Leave a Review
──────────────────────────────

Rating
★ ★ ★ ★ ★  5 / 5

Review Title *
[Type your title here]  (15/100)

Your Review *
[Type your detailed review here...]  (156/1000)

💡 Helpful tips:
  → Be honest and detailed
  → Include what you liked
  → Help others decide

[✓ Submit Review]
```

---

## Service Methods

### reviewService.createReview(reviewData)
**Creates a new review**
```jsx
const response = await reviewService.createReview({
  productId: "507f1f77bcf86cd799439011",
  orderId: "507f1f77bcf86cd799439012",
  rating: 5,
  title: "Excellent product!",
  comment: "This product exceeded my expectations..."
});
```

### reviewService.getProductReviews(productId, params)
**Gets reviews for a product**
```jsx
const response = await reviewService.getProductReviews(
  "507f1f77bcf86cd799439011",
  {
    page: 1,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc"
  }
);
```

### reviewService.getUserReviews(userId, params)
**Gets user's reviews**
```jsx
const response = await reviewService.getUserReviews(
  "507f1f77bcf86cd799439011",
  { page: 1 }
);
```

### reviewService.updateReview(reviewId, reviewData)
**Updates a review**
```jsx
const response = await reviewService.updateReview(
  "507f1f77bcf86cd799439011",
  { rating: 4, title: "Good", comment: "Updated review..." }
);
```

### reviewService.deleteReview(reviewId)
**Deletes a review**
```jsx
const response = await reviewService.deleteReview(
  "507f1f77bcf86cd799439011"
);
```

### reviewService.getPendingReviews(params)
**Gets pending reviews (admin only)**
```jsx
const response = await reviewService.getPendingReviews(
  { page: 1 }
);
```

### reviewService.updateReviewStatus(reviewId, status)
**Approves/rejects review (admin only)**
```jsx
const response = await reviewService.updateReviewStatus(
  "507f1f77bcf86cd799439011",
  "approved"  // or "rejected"
);
```

---

## Integration Code Snippets

### ✂️ Add to ProductMen.jsx
```jsx
import ProductReviews from '../../components/ProductReviews';

export function Product({ product }) {
  return (
    <div className="product-card">
      {/* existing product code */}
      
      {/* ADD THIS */}
      <ProductReviews productId={product._id} />
    </div>
  );
}
```

### ✂️ Add to MyOrders.jsx
```jsx
import ReviewForm from '../../components/ReviewForm';

function OrderItem({ order }) {
  return (
    <div className="order-item">
      {/* existing order code */}
      
      {/* ADD THIS */}
      {order.status === 'completed' && (
        <ReviewForm
          productId={order.items[0].productId}
          orderId={order._id}
          onReviewSubmitted={() => {
            // Refresh or show success
          }}
        />
      )}
    </div>
  );
}
```

---

## API Endpoints

### Public Endpoints (No auth needed)
```
GET /api/reviews/product/:productId
  - Query params: page, limit, sortBy, sortOrder
  - Returns: reviews array with stats

GET /api/reviews/:reviewId
  - Returns: single review details
```

### Protected Endpoints (JWT required)
```
POST /api/reviews
  - Body: { productId, orderId, rating, title, comment }
  - Returns: created review

PUT /api/reviews/:reviewId
  - Body: { rating, title, comment }
  - Returns: updated review (owner only)

DELETE /api/reviews/:reviewId
  - Returns: success message (owner only)

GET /api/reviews/user/:userId
  - Query params: page, limit
  - Returns: user's reviews
```

### Admin Endpoints (JWT + Admin role required)
```
GET /api/reviews/admin/pending
  - Query params: page, limit
  - Returns: pending reviews queue

PATCH /api/reviews/admin/:reviewId/status
  - Body: { status: "approved" | "rejected" }
  - Returns: updated review
```

---

## State Management Reference

### ProductReviews Internal State
```jsx
const [reviews, setReviews] = useState([]);        // Array of reviews
const [loading, setLoading] = useState(true);      // Loading state
const [error, setError] = useState(null);          // Error message
const [page, setPage] = useState(1);               // Current page
const [totalPages, setTotalPages] = useState(1);   // Total pages
const [stats, setStats] = useState({...});         // Avg rating, count
const [sortBy, setSortBy] = useState('createdAt'); // Sort field
const [sortOrder, setSortOrder] = useState('desc'); // Sort direction
```

### ReviewForm Internal State
```jsx
const [formData, setFormData] = useState({
  rating: 5,          // 1-5
  title: '',          // 5-100 chars
  comment: ''         // 10-1000 chars
});
const [loading, setLoading] = useState(false);  // Submit loading
const [error, setError] = useState(null);       // Error message
const [success, setSuccess] = useState(false);  // Success message
```

---

## Error Scenarios & Handling

### ProductReviews Errors
```jsx
// Network error
"Failed to load reviews"

// No reviews yet
"No reviews yet. Be the first to review!"

// Server error
"Failed to load reviews"
```

### ReviewForm Errors
```jsx
// Not logged in
"Please log in to leave a review"

// Validation errors
"Please enter a review title"
"Title must be between 5 and 100 characters"
"Please enter a review comment"
"Comment must be between 10 and 1000 characters"

// Duplicate review
"You have already reviewed this product"

// Server error
"An error occurred while submitting your review"
```

---

## Testing Checklist

### ProductReviews
- [ ] Component renders without errors
- [ ] Shows average rating correctly
- [ ] Shows total review count
- [ ] Displays reviews in list
- [ ] Sort dropdown changes results
- [ ] Pagination buttons work
- [ ] Previous/Next buttons enabled/disabled correctly
- [ ] Verified badge shows on qualified reviews
- [ ] Loading state shows on initial load
- [ ] Error message displays if API fails

### ReviewForm
- [ ] Component renders without errors
- [ ] Shows "Please log in" if not authenticated
- [ ] Star rating picker responds to clicks
- [ ] Title input accepts text and counts characters
- [ ] Comment input accepts text and counts characters
- [ ] Submit button is disabled while loading
- [ ] Form validates before submission
- [ ] Success message shows on successful submit
- [ ] Error message shows on failure
- [ ] Form resets after successful submit
- [ ] onReviewSubmitted callback fires

### Integration
- [ ] ProductReviews displays on product page
- [ ] ReviewForm displays in MyOrders for completed items
- [ ] User can fill and submit review
- [ ] Admin can approve review
- [ ] Approved review appears in ProductReviews
- [ ] Responsive on mobile/tablet/desktop

---

## Performance Tips

**For ProductReviews:**
- Pagination keeps load time fast
- Server-side sorting for scalability
- Component memoization can reduce re-renders
- Could add caching for average ratings

**For ReviewForm:**
- Form validation happens before API call
- Loading state prevents double-submit
- Could debounce character counter
- Could add auto-save draft feature

---

## Accessibility Features

**ProductReviews:**
- Semantic HTML headings
- Alt text for star ratings
- Keyboard navigable pagination
- Clear color contrast

**ReviewForm:**
- Proper form labels with htmlFor
- Semantic HTML structure
- Character count announced
- Error messages focused for screen readers

---

## Mobile Optimizations

**ProductReviews:**
- Stacked layout on small screens
- Touch-friendly pagination buttons
- Readable font sizes
- Proper spacing for fat thumbs

**ReviewForm:**
- 16px input font (prevents zoom on iOS)
- Large clickable stars
- Vertical form layout
- Touch-friendly button size

---

**Print this reference for quick lookup! 📋**
