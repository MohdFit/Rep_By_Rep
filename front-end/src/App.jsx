import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/Home/Home";
import ProductPlans from "./pages/productPlans/ProductPlans";

import OrderDetails from "./pages/User/Order/OrderDetailes";
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
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<ProductPlans />} />
          <Route path="user/wishlist" element={<Wishlist />} />
          <Route path="user/cart" element={<Cart />} />

          
          <Route path="user/account-settings" element={<AccountSettings />} />
          <Route path="user/order-details" element={<OrderDetails />} />
          <Route path="user/feedback-model" element={<FeedbackModal />} />
          <Route path="user/orders" element={<Order />} />

          <Route path="admin/*" element={<AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </AdminLayout>
          }
        />



        </Routes>
      </div>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;

