import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Utensils,
  Armchair,
  CalendarDays,
  ShoppingBag,
  CreditCard,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  MoreVertical,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= STATS =================

  const stats = [
    {
      title: "Total Customers",
      value: "1,248",
      change: "+12.5%",
      icon: <Users size={22} />,
    },
    {
      title: "Today's Orders",
      value: "86",
      change: "+8.2%",
      icon: <ShoppingBag size={22} />,
    },
    {
      title: "Today's Revenue",
      value: "₹48,650",
      change: "+14.8%",
      icon: <IndianRupee size={22} />,
    },
    {
      title: "Reservations",
      value: "32",
      change: "+5.4%",
      icon: <CalendarDays size={22} />,
    },
  ];

  // ================= RECENT ORDERS =================

  const recentOrders = [
    {
      id: "HE102458",
      customer: "Rahul Patil",
      table: "Table 3",
      amount: "₹672",
      status: "Preparing",
    },
    {
      id: "HE102457",
      customer: "Priya Sharma",
      table: "Table 5",
      amount: "₹856",
      status: "Completed",
    },
    {
      id: "HE102456",
      customer: "Amit Joshi",
      table: "Table 2",
      amount: "₹418",
      status: "Pending",
    },
    {
      id: "HE102455",
      customer: "Sneha More",
      table: "Table 6",
      amount: "₹1,120",
      status: "Completed",
    },
    {
      id: "HE102454",
      customer: "Rohan Deshmukh",
      table: "Table 1",
      amount: "₹549",
      status: "Preparing",
    },
  ];

  // ================= QUICK ACTIONS =================

  const quickActions = [
    {
      title: "Manage Tables",
      description: "View and update table availability",
      icon: <Armchair size={22} />,
      path: "/admin/tables",
    },
    {
      title: "Manage Food",
      description: "Add or update menu items",
      icon: <Utensils size={22} />,
      path: "/admin/food",
    },
    {
      title: "Reservations",
      description: "View today's reservations",
      icon: <CalendarDays size={22} />,
      path: "/admin/reservations",
    },
    {
      title: "Customers",
      description: "Manage registered customers",
      icon: <Users size={22} />,
      path: "/admin/customers",
    },
  ];

  // ================= NAVIGATION =================

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/admin/login");
  };

  return (
    <section className="admin-dashboard-page">

      {/* ================= MOBILE HEADER ================= */}

      <div className="admin-mobile-header">
        <button
          type="button"
          className="admin-mobile-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <h2>HotelEase</h2>
      </div>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "admin-sidebar-open" : ""
        }`}
      >

        {/* Brand */}

        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            🏨
          </div>

          <div>
            <h2>HotelEase</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}

        <nav className="admin-navigation">

          <p className="admin-nav-title">
            MAIN MENU
          </p>

          {/* Dashboard */}

          <button
            type="button"
            className="admin-nav-item active"
            onClick={() =>
              handleNavigation("/admin/dashboard")
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          {/* Customers */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin/customers")
            }
          >
            <Users size={19} />
            Customers
          </button>

          {/* Tables */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin/tables")
            }
          >
            <Armchair size={19} />
            Tables
          </button>

          {/* Food Menu */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin/food")
            }
          >
            <Utensils size={19} />
            Food Menu
          </button>

          {/* Reservations */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin/reservations")
            }
          >
            <CalendarDays size={19} />
            Reservations
          </button>

          {/* Orders */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin/orders")
            }
          >
            <ShoppingBag size={19} />
            Orders
          </button>

          {/* Payments */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() =>
              handleNavigation("/admin/payments")
            }
          >
            <CreditCard size={19} />
            Payments
          </button>

        </nav>

        {/* Sidebar Bottom */}

        <div className="admin-sidebar-bottom">

          <div className="admin-user-mini">
            <div className="admin-user-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Super Admin</span>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="admin-main-content">

        {/* ================= TOPBAR ================= */}

        <header className="admin-topbar">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back, Administrator 👋
            </p>
          </div>

          <div className="admin-topbar-right">

            <div className="admin-date">
              <CalendarDays size={17} />
              <span>Today</span>
            </div>

            <div className="admin-profile">

              <div className="admin-profile-avatar">
                A
              </div>

              <div>
                <strong>Administrator</strong>
                <span>Admin</span>
              </div>

            </div>

          </div>

        </header>

        {/* ================= STATS ================= */}

        <section className="admin-stats-grid">

          {stats.map((stat) => (
            <div
              className="admin-stat-card"
              key={stat.title}
            >

              <div className="admin-stat-top">

                <div className="admin-stat-icon">
                  {stat.icon}
                </div>

                <span className="admin-stat-change">
                  {stat.change}
                </span>

              </div>

              <p>{stat.title}</p>

              <h2>{stat.value}</h2>

            </div>
          ))}

        </section>

        {/* ================= OVERVIEW ================= */}

        <section className="admin-content-grid">

          {/* ================= RECENT ORDERS ================= */}

          <div className="admin-panel orders-panel">

            <div className="admin-panel-header">

              <div>
                <h2>Recent Orders</h2>
                <p>Latest customer orders</p>
              </div>

              <button
                type="button"
                className="admin-view-all"
                onClick={() =>
                  handleNavigation("/admin/orders")
                }
              >
                View All
              </button>

            </div>

            <div className="admin-table-wrapper">

              <table className="admin-orders-table">

                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Table</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (
                    <tr key={order.id}>

                      <td>
                        <strong>{order.id}</strong>
                      </td>

                      <td>
                        {order.customer}
                      </td>

                      <td>
                        {order.table}
                      </td>

                      <td>
                        <strong>{order.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`admin-order-status ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="admin-more-button"
                          aria-label={`More options for ${order.id}`}
                        >
                          <MoreVertical size={18} />
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* ================= ORDER STATUS ================= */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>
                <h2>Order Status</h2>
                <p>Today's order overview</p>
              </div>

            </div>

            <div className="order-status-list">

              {/* Pending */}

              <div className="order-status-item">

                <div className="order-status-icon pending">
                  <Clock size={20} />
                </div>

                <div>
                  <strong>Pending</strong>
                  <span>12 orders</span>
                </div>

                <b>14%</b>

              </div>

              {/* Preparing */}

              <div className="order-status-item">

                <div className="order-status-icon preparing">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <strong>Preparing</strong>
                  <span>18 orders</span>
                </div>

                <b>21%</b>

              </div>

              {/* Ready */}

              <div className="order-status-item">

                <div className="order-status-icon ready">
                  <CheckCircle size={20} />
                </div>

                <div>
                  <strong>Ready</strong>
                  <span>9 orders</span>
                </div>

                <b>10%</b>

              </div>

              {/* Completed */}

              <div className="order-status-item">

                <div className="order-status-icon completed">
                  <CheckCircle size={20} />
                </div>

                <div>
                  <strong>Completed</strong>
                  <span>47 orders</span>
                </div>

                <b>55%</b>

              </div>

            </div>

          </div>

        </section>

        {/* ================= QUICK ACTIONS ================= */}

        <section className="admin-panel quick-actions-panel">

          <div className="admin-panel-header">

            <div>
              <h2>Quick Actions</h2>

              <p>
                Frequently used management sections
              </p>
            </div>

          </div>

          <div className="admin-quick-actions">

            {quickActions.map((action) => (

              <button
                type="button"
                className="admin-quick-action"
                key={action.title}
                onClick={() =>
                  handleNavigation(action.path)
                }
              >

                <div className="quick-action-icon">
                  {action.icon}
                </div>

                <div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>

              </button>

            ))}

          </div>

        </section>

        {/* ================= SYSTEM ALERT ================= */}

        <div className="admin-system-alert">

          <div className="admin-alert-icon">
            <AlertCircle size={20} />
          </div>

          <div>

            <strong>Frontend Demo Mode</strong>

            <p>
              Dashboard statistics and orders are currently
              using mock data. Real-time data will be connected
              to Spring Boot and MySQL later.
            </p>

          </div>

        </div>

      </main>

    </section>
  );
}

export default AdminDashboard;