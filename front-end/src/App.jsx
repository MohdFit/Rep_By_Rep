import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/Home/Home";
import ProductPlans from "./pages/productPlans/ProductPlans";

import OrderDetails from "./pages/User/Order/OrderDetailes";
import OrderConfirmation from "./pages/User/Order/OrderConfirmation";
import FeedbackModal from "./pages/User/Order/FeedbackModal";
import Order from "./pages/User/Order/MyOrders";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/User/Wishlist";
import AccountSettings from "./pages/User/AccountSetting";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminReviews from "./pages/Admin/AdminReviews";
import AdminSettings from "./pages/Admin/AdminSettings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<ProductPlans />} />
              <Route path="/user/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/user/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/user/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
              <Route path="/user/order-details" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
              <Route path="/user/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
              <Route path="/user/feedback-model" element={<ProtectedRoute><FeedbackModal /></ProtectedRoute>} />
              <Route path="/user/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
              <Route path="/user/my-orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />

              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="settings" element={<AdminSettings />} />
                
              </Route>
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

