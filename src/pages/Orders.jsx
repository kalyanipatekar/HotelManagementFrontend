import { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  ChefHat,
  Utensils,
  XCircle,
  CalendarDays,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const orders = [
  {
    id: "HE102458",
    date: "08 Oct 2026",
    time: "02:15 PM",
    status: "PREPARING",
    table: "Table 3",
    total: 672,
    items: [
      {
        name: "Paneer Tikka",
        quantity: 2,
        price: 249,
        image: "🍢",
      },
      {
        name: "Cold Coffee",
        quantity: 1,
        price: 129,
        image: "🥤",
      },
    ],
  },
  {
    id: "HE102317",
    date: "05 Oct 2026",
    time: "07:30 PM",
    status: "COMPLETED",
    table: "Table 5",
    total: 856,
    items: [
      {
        name: "Margherita Pizza",
        quantity: 1,
        price: 299,
        image: "🍕",
      },
      {
        name: "Classic Veg Burger",
        quantity: 2,
        price: 179,
        image: "🍔",
      },
    ],
  },
  {
    id: "HE102101",
    date: "01 Oct 2026",
    time: "01:10 PM",
    status: "CANCELLED",
    table: "Table 2",
    total: 418,
    items: [
      {
        name: "Butter Paneer",
        quantity: 1,
        price: 289,
        image: "🍛",
      },
      {
        name: "Fresh Lime Soda",
        quantity: 1,
        price: 99,
        image: "🍋",
      },
    ],
  },
];

const statusSteps = [
  {
    status: "CONFIRMED",
    label: "Order Confirmed",
    icon: CheckCircle,
  },
  {
    status: "PREPARING",
    label: "Preparing",
    icon: ChefHat,
  },
  {
    status: "READY",
    label: "Ready",
    icon: Utensils,
  },
  {
    status: "COMPLETED",
    label: "Completed",
    icon: CheckCircle,
  },
];

function Orders() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filters = [
    "ALL",
    "PREPARING",
    "COMPLETED",
    "CANCELLED",
  ];

  const filteredOrders =
    activeFilter === "ALL"
      ? orders
      : orders.filter(
          (order) => order.status === activeFilter
        );

  const getStatusClass = (status) => {
    if (status === "COMPLETED") {
      return "order-status completed";
    }

    if (status === "CANCELLED") {
      return "order-status cancelled";
    }

    if (status === "PREPARING") {
      return "order-status preparing";
    }

    return "order-status confirmed";
  };

  const getStepClass = (orderStatus, stepStatus) => {
    if (orderStatus === "CANCELLED") {
      return "order-step";
    }

    const orderIndex = statusSteps.findIndex(
      (step) => step.status === orderStatus
    );

    const stepIndex = statusSteps.findIndex(
      (step) => step.status === stepStatus
    );

    if (stepIndex <= orderIndex) {
      return "order-step active";
    }

    return "order-step";
  };

  return (
    <div className="orders-page">

      {/* HEADER */}

      <section className="orders-header">

        <span className="orders-label">
          <Package size={15} />
          Order Management
        </span>

        <h1>My Orders</h1>

        <p>
          Track your orders and view your previous dining
          experiences.
        </p>

      </section>

      {/* FILTERS */}

      <section className="orders-filter-section">

        <div className="orders-filters">

          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "order-filter active"
                  : "order-filter"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "ALL"
                ? "All Orders"
                : filter}
            </button>
          ))}

        </div>

      </section>

      {/* ORDERS */}

      <section className="orders-list">

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {

            const isExpanded =
              expandedOrder === order.id;

            return (
              <div
                className="order-card"
                key={order.id}
              >

                {/* ORDER HEADER */}

                <div className="order-card-header">

                  <div className="order-main-info">

                    <div className="order-icon">
                      <Package size={21} />
                    </div>

                    <div>
                      <span>Order ID</span>

                      <h2>#{order.id}</h2>
                    </div>

                  </div>

                  <div className="order-date">

                    <div>
                      <CalendarDays size={15} />
                      {order.date}
                    </div>

                    <div>
                      <Clock size={15} />
                      {order.time}
                    </div>

                  </div>

                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>

                </div>

                {/* ORDER INFO */}

                <div className="order-info-row">

                  <div className="order-location">
                    <MapPin size={17} />

                    <span>
                      {order.table}
                    </span>
                  </div>

                  <div className="order-item-count">
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "item"
                      : "items"}
                  </div>

                  <strong className="order-total">
                    ₹{order.total}
                  </strong>

                </div>

                {/* TRACKING */}

                {order.status !== "CANCELLED" && (
                  <div className="order-tracking">

                    {statusSteps.map((step) => {

                      const StepIcon = step.icon;

                      return (
                        <div
                          className={getStepClass(
                            order.status,
                            step.status
                          )}
                          key={step.status}
                        >

                          <div className="order-step-icon">
                            <StepIcon size={17} />
                          </div>

                          <span>
                            {step.label}
                          </span>

                        </div>
                      );
                    })}

                  </div>
                )}

                {/* CANCELLED */}

                {order.status === "CANCELLED" && (
                  <div className="cancelled-message">
                    <XCircle size={18} />

                    <span>
                      This order was cancelled.
                    </span>
                  </div>
                )}

                {/* EXPAND */}

                <button
                  className="order-details-button"
                  onClick={() =>
                    setExpandedOrder(
                      isExpanded ? null : order.id
                    )
                  }
                >
                  {isExpanded
                    ? "Hide Details"
                    : "View Details"}

                  {isExpanded ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}
                </button>

                {/* DETAILS */}

                {isExpanded && (
                  <div className="order-details">

                    <h3>Order Items</h3>

                    {order.items.map((item) => (
                      <div
                        className="order-item"
                        key={item.name}
                      >

                        <div className="order-item-image">
                          {item.image}
                        </div>

                        <div className="order-item-info">
                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.quantity} × ₹
                            {item.price}
                          </span>
                        </div>

                        <strong>
                          ₹
                          {item.quantity *
                            item.price}
                        </strong>

                      </div>
                    ))}

                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="orders-empty">

            <Package size={48} />

            <h2>No Orders Found</h2>

            <p>
              You don't have any orders in this category.
            </p>

          </div>
        )}

      </section>

    </div>
  );
}

export default Orders;