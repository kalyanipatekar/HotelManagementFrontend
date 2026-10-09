import { Link } from "react-router-dom";
import {
  CheckCircle,
  ShoppingBag,
  ClipboardList,
} from "lucide-react";

function OrderSuccess() {
  const orderNumber = "HE" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="order-success-page">

      <div className="order-success-card">

        <div className="success-icon">
          <CheckCircle size={55} />
        </div>

        <span className="success-label">
          ORDER CONFIRMED
        </span>

        <h1>Thank You!</h1>

        <p>
          Your order has been placed successfully.
          Our kitchen will start preparing your food shortly.
        </p>

        <div className="order-number">
          <span>Order Number</span>
          <strong>#{orderNumber}</strong>
        </div>

        <div className="success-actions">

          <Link
            to="/orders"
            className="view-order-button"
          >
            <ClipboardList size={18} />
            View My Orders
          </Link>

          <Link
            to="/menu"
            className="continue-order-button"
          >
            <ShoppingBag size={18} />
            Order More Food
          </Link>

        </div>

        <div className="success-note">
          🔔 You can track your order status from the
          My Orders section.
        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;