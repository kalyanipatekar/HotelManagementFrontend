import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const tables = [
  {
    id: 1,
    name: "Table 1",
    seats: 2,
    location: "Window Side",
  },
  {
    id: 2,
    name: "Table 2",
    seats: 2,
    location: "Main Hall",
  },
  {
    id: 3,
    name: "Table 3",
    seats: 4,
    location: "Main Hall",
  },
  {
    id: 4,
    name: "Table 4",
    seats: 4,
    location: "Garden Area",
  },
  {
    id: 5,
    name: "Table 5",
    seats: 6,
    location: "Garden Area",
  },
  {
    id: 6,
    name: "Table 6",
    seats: 4,
    location: "Window Side",
  },
];

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    totalItems,
  } = useCart();

  const [selectedTable, setSelectedTable] = useState(null);

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    guests: "2",
  });

  const [error, setError] = useState("");

  const deliveryFee = totalPrice > 0 ? 40 : 0;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomerData({
      ...customerData,
      [name]: value,
    });

    setError("");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!customerData.name || !customerData.phone) {
      setError("Please enter your name and phone number.");
      return;
    }

    if (customerData.phone.length !== 10) {
      setError("Please enter a valid 10 digit phone number.");
      return;
    }

    if (!selectedTable) {
      setError("Please select a table.");
      return;
    }

    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <ShoppingBag size={50} />

          <h1>Your Cart is Empty</h1>

          <p>
            Please add some food to your cart before continuing
            to checkout.
          </p>

          <Link to="/menu">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Header */}

      <div className="checkout-header">

        <Link to="/cart" className="checkout-back">
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <h1>Checkout</h1>

        <p>
          Complete your details and select your table.
        </p>

      </div>

      <div className="checkout-container">

        {/* LEFT SIDE */}

        <div className="checkout-main">

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}

          {/* Customer Details */}

          <section className="checkout-card">

            <div className="checkout-section-title">

              <div className="checkout-icon">
                <Users size={20} />
              </div>

              <div>
                <h2>Customer Details</h2>
                <p>Enter your basic information</p>
              </div>

            </div>

            <div className="checkout-form-grid">

              <div className="checkout-form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={customerData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="checkout-form-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="10 digit phone number"
                  value={customerData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="checkout-form-group">

                <label>Number of Guests</label>

                <select
                  name="guests"
                  value={customerData.guests}
                  onChange={handleChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                </select>

              </div>

            </div>

          </section>

          {/* Table Selection */}

          <section className="checkout-card">

            <div className="checkout-section-title">

              <div className="checkout-icon">
                <MapPin size={20} />
              </div>

              <div>
                <h2>Select Your Table</h2>
                <p>Choose where you want to enjoy your meal</p>
              </div>

            </div>

            <div className="table-selection-grid">

              {tables.map((table) => {

                const isSelected =
                  selectedTable === table.id;

                const isSuitable =
                  table.seats >= Number(customerData.guests);

                return (
                  <button
                    type="button"
                    key={table.id}
                    className={
                      isSelected
                        ? "checkout-table selected"
                        : "checkout-table"
                    }
                    disabled={!isSuitable}
                    onClick={() =>
                      setSelectedTable(table.id)
                    }
                  >

                    <div className="table-number">
                      {table.id}
                    </div>

                    <div className="table-details">

                      <strong>{table.name}</strong>

                      <span>
                        {table.seats} seats
                      </span>

                      <small>
                        {table.location}
                      </small>

                    </div>

                    {isSelected && (
                      <CheckCircle
                        className="table-check"
                        size={20}
                      />
                    )}

                  </button>
                );
              })}

            </div>

            <div className="table-note">
              💡 Tables that cannot accommodate your selected
              number of guests are automatically disabled.
            </div>

          </section>

          {/* Payment */}

          <section className="checkout-card">

            <div className="checkout-section-title">

              <div className="checkout-icon">
                <CreditCard size={20} />
              </div>

              <div>
                <h2>Payment Method</h2>
                <p>Choose your preferred payment option</p>
              </div>

            </div>

            <div className="payment-option selected-payment">

              <div className="payment-radio"></div>

              <div>
                <strong>Online Payment</strong>
                <span>
                  UPI, Cards, Net Banking and more
                </span>
              </div>

              <CreditCard size={22} />

            </div>

            <div className="payment-info">
              🔒 You will be redirected to the payment
              page to complete your payment securely.
            </div>

          </section>

        </div>

        {/* RIGHT SIDE */}

        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-items">

            {cartItems.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >

                <div className="checkout-item-image">
                  {item.image}
                </div>

                <div className="checkout-item-info">

                  <strong>{item.name}</strong>

                  <span>
                    {item.quantity} × ₹{item.price}
                  </span>

                </div>

                <strong>
                  ₹{item.quantity * item.price}
                </strong>

              </div>
            ))}

          </div>

          <div className="checkout-summary-line">
            <span>Items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="checkout-summary-line">
            <span>Subtotal</span>
            <strong>₹{totalPrice}</strong>
          </div>

          <div className="checkout-summary-line">
            <span>Service Fee</span>
            <strong>₹{deliveryFee}</strong>
          </div>

          <div className="checkout-summary-line">
            <span>Tax (5%)</span>
            <strong>₹{tax}</strong>
          </div>

          <div className="checkout-total-line">
            <span>Total</span>
            <strong>₹{grandTotal}</strong>
          </div>

          <button
            className="place-order-button"
            onClick={handlePlaceOrder}
          >
            Continue to Payment
            <CreditCard size={18} />
          </button>

          <p className="checkout-security">
            🔒 Secure checkout · Your information is protected
          </p>

        </aside>

      </div>

    </div>
  );
}

export default Checkout;