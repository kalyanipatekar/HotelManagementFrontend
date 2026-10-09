import { useMemo, useState } from "react";
import {
  ShoppingBag,
  Search,
  IndianRupee,
  Clock,
  CheckCircle,
  ChefHat,
  Eye,
  XCircle,
  PackageCheck,
} from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "HE102458",
      customer: "Rahul Patil",
      phone: "9876543210",
      table: 3,
      items: "Paneer Tikka x2, Cold Coffee x2",
      amount: 672,
      date: "2026-10-08",
      time: "07:30 PM",
      status: "PREPARING",
    },
    {
      id: "HE102457",
      customer: "Priya Sharma",
      phone: "9823456789",
      table: 5,
      items: "Margherita Pizza x1, Veg Burger x2",
      amount: 657,
      date: "2026-10-08",
      time: "07:15 PM",
      status: "CONFIRMED",
    },
    {
      id: "HE102456",
      customer: "Amit Joshi",
      phone: "9765432109",
      table: 2,
      items: "Butter Paneer x1, Fresh Lime Soda x2",
      amount: 487,
      date: "2026-10-08",
      time: "06:45 PM",
      status: "READY",
    },
    {
      id: "HE102455",
      customer: "Sneha More",
      phone: "9898989898",
      table: 8,
      items: "Farmhouse Pizza x1, Chocolate Brownie x2",
      amount: 667,
      date: "2026-10-08",
      time: "06:30 PM",
      status: "PENDING",
    },
    {
      id: "HE102454",
      customer: "Rohan Deshmukh",
      phone: "9812345678",
      table: 1,
      items: "Classic Veg Burger x2, Cold Coffee x2",
      amount: 616,
      date: "2026-10-08",
      time: "06:00 PM",
      status: "COMPLETED",
    },
    {
      id: "HE102453",
      customer: "Neha Kulkarni",
      phone: "9900112233",
      table: 6,
      items: "Paneer Tikka x1, Gulab Jamun x2",
      amount: 487,
      date: "2026-10-08",
      time: "05:30 PM",
      status: "COMPLETED",
    },
    {
      id: "HE102452",
      customer: "Vikas Patil",
      phone: "9876012345",
      table: 10,
      items: "Cheese Burger x1, Fresh Lime Soda x1",
      amount: 334,
      date: "2026-10-08",
      time: "05:00 PM",
      status: "CANCELLED",
    },
    {
      id: "HE102451",
      customer: "Kavita Shah",
      phone: "9867456123",
      table: 12,
      items: "Margherita Pizza x2, Cold Coffee x2",
      amount: 856,
      date: "2026-10-08",
      time: "04:30 PM",
      status: "COMPLETED",
    },
    {
      id: "HE102450",
      customer: "Pooja Jadhav",
      phone: "9955667788",
      table: 4,
      items: "Butter Paneer x2, Gulab Jamun x2",
      amount: 816,
      date: "2026-10-08",
      time: "04:00 PM",
      status: "PREPARING",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search) ||
        order.phone.includes(search) ||
        String(order.table).includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const preparingOrders = orders.filter(
    (order) =>
      order.status === "CONFIRMED" ||
      order.status === "PREPARING" ||
      order.status === "READY"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((total, order) => total + order.amount, 0);

  const updateOrderStatus = (id, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder((currentOrder) => ({
        ...currentOrder,
        status: newStatus,
      }));
    }
  };

  const getStatusClass = (status) => {
    return `admin-order-status ${status.toLowerCase()}`;
  };

  return (
    <section className="admin-orders-page">

      {/* Header */}
      <div className="admin-orders-header">
        <div>
          <div className="admin-orders-title-row">
            <div className="admin-orders-title-icon">
              <ShoppingBag size={24} />
            </div>

            <div>
              <h1>Order Management</h1>
              <p>
                Monitor and manage all customer orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="admin-order-stats">

        <div className="admin-order-stat-card">
          <div className="admin-order-stat-icon blue">
            <ShoppingBag size={22} />
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>

        <div className="admin-order-stat-card">
          <div className="admin-order-stat-icon orange">
            <Clock size={22} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="admin-order-stat-card">
          <div className="admin-order-stat-icon purple">
            <ChefHat size={22} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{preparingOrders}</strong>
          </div>
        </div>

        <div className="admin-order-stat-card">
          <div className="admin-order-stat-icon green">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedOrders}</strong>
          </div>
        </div>

        <div className="admin-order-stat-card">
          <div className="admin-order-stat-icon revenue">
            <IndianRupee size={22} />
          </div>

          <div>
            <span>Revenue</span>
            <strong>₹{totalRevenue.toLocaleString()}</strong>
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="admin-order-controls">

        <div className="admin-order-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search order, customer, phone or table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-order-filters">

          {[
            "ALL",
            "PENDING",
            "CONFIRMED",
            "PREPARING",
            "READY",
            "COMPLETED",
            "CANCELLED",
          ].map((status) => (
            <button
              key={status}
              className={
                statusFilter === status
                  ? "admin-order-filter active"
                  : "admin-order-filter"
              }
              onClick={() => setStatusFilter(status)}
            >
              {status === "ALL"
                ? "All"
                : status.charAt(0) +
                  status.slice(1).toLowerCase()}
            </button>
          ))}

        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-orders-panel">

        <div className="admin-orders-panel-header">
          <div>
            <h2>Orders</h2>
            <p>
              Showing {filteredOrders.length} of {totalOrders} orders
            </p>
          </div>

          <span className="admin-orders-count">
            {filteredOrders.length} Orders
          </span>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="admin-orders-table-wrapper">

            <table className="admin-orders-table">

              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredOrders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      <span className="admin-order-id">
                        #{order.id}
                      </span>
                    </td>

                    <td>
                      <div className="admin-order-customer">
                        <strong>{order.customer}</strong>
                        <span>{order.phone}</span>
                      </div>
                    </td>

                    <td>
                      <span className="admin-order-table-number">
                        Table {order.table}
                      </span>
                    </td>

                    <td>
                      <span className="admin-order-items">
                        {order.items}
                      </span>
                    </td>

                    <td>
                      <strong className="admin-order-amount">
                        ₹{order.amount}
                      </strong>
                    </td>

                    <td>
                      <div className="admin-order-datetime">
                        <span>{order.date}</span>
                        <span>{order.time}</span>
                      </div>
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value
                          )
                        }
                        className={getStatusClass(order.status)}
                      >
                        <option value="PENDING">
                          Pending
                        </option>
                        <option value="CONFIRMED">
                          Confirmed
                        </option>
                        <option value="PREPARING">
                          Preparing
                        </option>
                        <option value="READY">
                          Ready
                        </option>
                        <option value="COMPLETED">
                          Completed
                        </option>
                        <option value="CANCELLED">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="admin-order-view-button"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        <Eye size={17} />
                        View
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        ) : (
          <div className="admin-orders-empty">
            <ShoppingBag size={48} />
            <h3>No orders found</h3>
            <p>
              Try changing your search or status filter.
            </p>
          </div>
        )}

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="admin-order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="admin-order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="admin-order-modal-header">
              <div>
                <h2>Order #{selectedOrder.id}</h2>
                <p>
                  {selectedOrder.date} at{" "}
                  {selectedOrder.time}
                </p>
              </div>

              <button
                className="admin-order-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="admin-order-detail-status">
              <span>Status</span>

              <span
                className={`admin-order-detail-badge ${selectedOrder.status.toLowerCase()}`}
              >
                {selectedOrder.status}
              </span>
            </div>

            <div className="admin-order-detail-grid">

              <div className="admin-order-detail-card">
                <span>Customer</span>
                <strong>{selectedOrder.customer}</strong>
                <small>{selectedOrder.phone}</small>
              </div>

              <div className="admin-order-detail-card">
                <span>Table</span>
                <strong>Table {selectedOrder.table}</strong>
                <small>Restaurant Table</small>
              </div>

              <div className="admin-order-detail-card full">
                <span>Ordered Items</span>
                <strong>{selectedOrder.items}</strong>
              </div>

              <div className="admin-order-detail-card full">
                <span>Total Amount</span>
                <strong className="admin-order-detail-price">
                  ₹{selectedOrder.amount}
                </strong>
              </div>

            </div>

            <div className="admin-order-status-actions">

              <h3>Update Order Status</h3>

              <div className="admin-order-status-buttons">

                <button
                  onClick={() =>
                    updateOrderStatus(
                      selectedOrder.id,
                      "CONFIRMED"
                    )
                  }
                >
                  <CheckCircle size={17} />
                  Confirm
                </button>

                <button
                  onClick={() =>
                    updateOrderStatus(
                      selectedOrder.id,
                      "PREPARING"
                    )
                  }
                >
                  <ChefHat size={17} />
                  Preparing
                </button>

                <button
                  onClick={() =>
                    updateOrderStatus(
                      selectedOrder.id,
                      "READY"
                    )
                  }
                >
                  <PackageCheck size={17} />
                  Ready
                </button>

                <button
                  onClick={() =>
                    updateOrderStatus(
                      selectedOrder.id,
                      "COMPLETED"
                    )
                  }
                >
                  <CheckCircle size={17} />
                  Complete
                </button>

                <button
                  className="cancel"
                  onClick={() =>
                    updateOrderStatus(
                      selectedOrder.id,
                      "CANCELLED"
                    )
                  }
                >
                  <XCircle size={17} />
                  Cancel
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default AdminOrders;