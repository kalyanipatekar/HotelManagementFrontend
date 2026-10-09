import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Payment() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const deliveryFee = totalPrice > 0 ? 40 : 0;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + tax;

  const handlePayment = (e) => {
    e.preventDefault();

    setError("");

    if (paymentMethod === "upi" && !upiId) {
      setError("Please enter your UPI ID.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiry || !cvv) {
        setError("Please fill all card details.");
        return;
      }

      if (cardNumber.replace(/\s/g, "").length !== 16) {
        setError("Card number must contain 16 digits.");
        return;
      }

      if (cvv.length !== 3) {
        setError("CVV must contain 3 digits.");
        return;
      }
    }

    setProcessing(true);

    setTimeout(() => {
      clearCart();
      navigate("/order-success");
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="payment-page">
        <div className="payment-empty">
          <CheckCircle size={48} />

          <h1>No Active Order</h1>

          <p>
            Your cart is empty. Please add food before making
            a payment.
          </p>

          <Link to="/menu">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">

      {/* Header */}

      <div className="payment-header">

        <Link to="/checkout" className="payment-back">
          <ArrowLeft size={17} />
          Back to Checkout
        </Link>

        <h1>Payment</h1>

        <p>
          Complete your payment to place your order.
        </p>

      </div>

      <div className="payment-container">

        {/* PAYMENT FORM */}

        <div className="payment-main">

          <div className="payment-card">

            <div className="payment-card-header">
              <div className="payment-title-icon">
                <CreditCard size={22} />
              </div>

              <div>
                <h2>Choose Payment Method</h2>
                <p>
                  Select a payment option below
                </p>
              </div>
            </div>

            {/* Payment Methods */}

            <div className="payment-methods">

              <button
                type="button"
                className={
                  paymentMethod === "upi"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => {
                  setPaymentMethod("upi");
                  setError("");
                }}
              >
                <Smartphone size={21} />

                <span>
                  <strong>UPI</strong>
                  <small>Google Pay, PhonePe, etc.</small>
                </span>
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "card"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => {
                  setPaymentMethod("card");
                  setError("");
                }}
              >
                <CreditCard size={21} />

                <span>
                  <strong>Card</strong>
                  <small>Debit / Credit Card</small>
                </span>
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "cash"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => {
                  setPaymentMethod("cash");
                  setError("");
                }}
              >
                <Wallet size={21} />

                <span>
                  <strong>Pay at Counter</strong>
                  <small>Pay after dining</small>
                </span>
              </button>

            </div>

            {error && (
              <div className="payment-error">
                {error}
              </div>
            )}

            <form onSubmit={handlePayment}>

              {/* UPI */}

              {paymentMethod === "upi" && (
                <div className="payment-details">

                  <h3>UPI Payment</h3>

                  <label>UPI ID</label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(e.target.value)
                    }
                  />

                  <p>
                    Enter your UPI ID to continue.
                  </p>

                </div>
              )}

              {/* CARD */}

              {paymentMethod === "card" && (
                <div className="payment-details">

                  <h3>Card Details</h3>

                  <label>Card Number</label>

                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    maxLength={19}
                    onChange={(e) =>
                      setCardNumber(e.target.value)
                    }
                  />

                  <div className="card-fields">

                    <div>
                      <label>Card Holder Name</label>

                      <input
                        type="text"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) =>
                          setCardName(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label>Expiry</label>

                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        maxLength={5}
                        onChange={(e) =>
                          setExpiry(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label>CVV</label>

                      <input
                        type="password"
                        placeholder="•••"
                        value={cvv}
                        maxLength={3}
                        onChange={(e) =>
                          setCvv(e.target.value)
                        }
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* CASH */}

              {paymentMethod === "cash" && (
                <div className="cash-payment-info">

                  <Wallet size={35} />

                  <h3>Pay at Counter</h3>

                  <p>
                    You can complete your payment at the
                    restaurant counter after your meal.
                  </p>

                </div>
              )}

              <button
                type="submit"
                className="pay-now-button"
                disabled={processing}
              >
                {processing ? (
                  "Processing..."
                ) : paymentMethod === "cash" ? (
                  "Confirm Order"
                ) : (
                  `Pay ₹${grandTotal}`
                )}
              </button>

            </form>

            <div className="payment-security">

              <ShieldCheck size={18} />

              <span>
                This is a secure checkout. Your payment
                information is protected.
              </span>

            </div>

          </div>

        </div>

        {/* ORDER SUMMARY */}

        <aside className="payment-summary">

          <h2>Order Summary</h2>

          <div className="payment-summary-items">

            {cartItems.map((item) => (
              <div
                className="payment-summary-item"
                key={item.id}
              >

                <span className="summary-food-image">
                  {item.image}
                </span>

                <div>
                  <strong>{item.name}</strong>
                  <small>
                    {item.quantity} × ₹{item.price}
                  </small>
                </div>

                <strong>
                  ₹{item.quantity * item.price}
                </strong>

              </div>
            ))}

          </div>

          <div className="payment-summary-row">
            <span>Subtotal</span>
            <strong>₹{totalPrice}</strong>
          </div>

          <div className="payment-summary-row">
            <span>Service Fee</span>
            <strong>₹{deliveryFee}</strong>
          </div>

          <div className="payment-summary-row">
            <span>Tax</span>
            <strong>₹{tax}</strong>
          </div>

          <div className="payment-total">
            <span>Total</span>
            <strong>₹{grandTotal}</strong>
          </div>

        </aside>

      </div>

    </div>
  );
}

export default Payment;