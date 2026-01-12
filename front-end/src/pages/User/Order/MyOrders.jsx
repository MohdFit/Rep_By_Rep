import "../../../assets/styles/myOrders.css";
import "../../../assets/styles/layout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import OrderDetailsModal from "./OrderDetailes";

export default function Orders() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "SZX-344-000",
      date: "Jan 20, 2024",
      items: 2,
      total: 234.5,
      status: "Processing",
    },
    {
      id: "SZX-325-088",
      date: "Jan 20, 2024",
      items: 3,
      total: 234.5,
      status: "Shipping",
    },
    {
      id: "SZX-325-023",
      date: "Jan 20, 2024",
      items: 2,
      total: 234.5,
      status: "Delivered",
    },
    {
      id: "SZX-325-006",
      date: "Jan 20, 2024",
      items: 5,
      total: 234.5,
      status: "Delivered",
    },
    {
      id: "SZX-325-003",
      date: "Jan 20, 2024",
      items: 5,
      total: 234.5,
      status: "Canceled",
    },
  ];

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
          {orders.map((order) => (
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

