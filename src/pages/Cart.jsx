import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  const deliveryFee = totalPrice > 0 ? 40 : 0;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            <ShoppingBag size={50} />
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to your cart yet.
            Explore our menu and choose your favorite food.
          </p>

          <Link to="/menu" className="continue-shopping-button">
            Explore Menu
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-header">
        <span>Your Order</span>

        <h1>Shopping Cart</h1>

        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="cart-container">

        {/* Cart Items */}

        <div className="cart-items-section">

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>

              <div className="cart-item-image">
                {item.image}
              </div>

              <div className="cart-item-info">

                <span>{item.category}</span>

                <h3>{item.name}</h3>

                <p>
                  ₹{item.price} per item
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus size={15} />
                  </button>

                </div>

              </div>

              <div className="cart-item-right">

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

                <button
                  className="remove-cart-button"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

          <Link to="/menu" className="back-menu-link">
            ← Continue Shopping
          </Link>

        </div>

        {/* Summary */}

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{totalPrice}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>₹{deliveryFee}</strong>
          </div>

          <div className="summary-row">
            <span>Tax (5%)</span>
            <strong>₹{tax}</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{grandTotal}</strong>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <p className="secure-checkout">
            🔒 Secure checkout
          </p>

        </div>

      </div>

    </div>
  );
}

export default Cart;