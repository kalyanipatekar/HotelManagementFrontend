import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminTables from "./admin/AdminTables";
import AdminFood from "./admin/AdminFood";
import AdminReservations from "./admin/AdminReservations";
import AdminOrders from "./admin/AdminOrders";
 import AdminPayments from "./admin/AdminPayments";
import TablePage from "./user/TablePage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Table Route */}
        <Route path="/table/:tableId" element={<TablePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tables" element={<AdminTables />} />
         <Route path="/admin/food" element={<AdminFood />} />
         <Route
  path="/admin/payments"
  element={<AdminPayments />}
/>
         <Route
  path="/admin/reservations"
  element={<AdminReservations />}
 
/>
<Route
  path="/admin/orders"
  element={<AdminOrders />}
/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;