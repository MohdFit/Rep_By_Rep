import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import FooterWhite from "../../../components/FooterWhite";

export default function OrderConfirmation() {
  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white">
        <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-2xl p-10 border border-orange-100">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-customOrange1 to-orange-500 text-white text-4xl flex items-center justify-center shadow-lg">
            ✓
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-8">
            Your order was created successfully. You can track it anytime from your orders page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/user/my-orders"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-customOrange1 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              View My Orders
            </Link>
            <Link
              to="/programs"
              className="px-6 py-3 rounded-lg border-2 border-orange-400 text-orange-500 font-semibold hover:bg-orange-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <FooterWhite />
    </>
  );
}
