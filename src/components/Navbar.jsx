import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏨</span>
          <span>HotelEase</span>
        </Link>

        <div className="navbar-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/menu" className="nav-link">
            Menu
          </Link>

          <Link to="/orders" className="nav-link">
            My Orders
          </Link>

          <Link to="/cart" className="cart-link">
            <ShoppingCart size={20} />

            <span>Cart</span>

            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/login" className="login-button">
            <User size={18} />
            Login
          </Link>

        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </div>

      {menuOpen && (
        <div className="mobile-menu">

          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </Link>

          <Link
            to="/orders"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            My Orders
          </Link>

          <Link
            to="/cart"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            🛒 Cart {totalItems > 0 && `(${totalItems})`}
          </Link>

          <Link
            to="/login"
            className="mobile-login-button"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;