import "../../../assets/styles/myOrders.css";
import "../../../assets/styles/layout.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import OrderDetailsModal from "./OrderDetailes";
import { getUserOrders } from "../../../services/orderService";

export default function Orders() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id || user?._id || user?.userId;
        if (!userId) {
          setLoading(false);
          return;
        }
        const res = await getUserOrders(userId);
        if (res.success) {
          const formatted = (res.data || []).map((o) => ({
            id: o.orderNumber,
            date: new Date(o.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            items: o.orderItems?.length || 0,
            total: Number(o.total || 0).toFixed(2),
            status: o.status,
            _raw: o,
          }));
          setOrders(formatted);
        }
      } catch (e) {
        console.error("Failed to fetch orders", e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (id) => {
    const order = orders.find((o) => o.id === id);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <Layout>
      <div className="orders-container">
        <div className="orders-header">
          <h2>
            My Orders
            <hr className="line" />
          </h2>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by order number or product name..."
            />
            <select>
              <option>All Orders</option>
            </select>
          </div>
        </div>

        <div className="orders-list">
          {loading ? (
            <div className="order-card">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="order-card">No orders found.</div>
          ) : orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                <h4>#{order.id}</h4>
                <p>{order.date}</p>
                <p>{order.items} Items</p>
                <p>${order.total}</p>
              </div>

              <div className="order-status">
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={handleCloseModal}
            navigate={navigate}
          />
        )}
      </div>
    </Layout>
  );
}

