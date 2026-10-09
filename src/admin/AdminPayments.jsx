import { useMemo, useState } from "react";
import {
  CreditCard,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Eye,
  Smartphone,
  WalletCards,
} from "lucide-react";

function AdminPayments() {
  const [payments, setPayments] = useState([
    {
      id: "PAY5001",
      orderId: "HE102458",
      customer: "Rahul Patil",
      amount: 672,
      method: "UPI",
      date: "2026-10-08",
      time: "07:35 PM",
      status: "SUCCESS",
      transactionId: "TXN78451236",
    },
    {
      id: "PAY5002",
      orderId: "HE102457",
      customer: "Priya Sharma",
      amount: 657,
      method: "CARD",
      date: "2026-10-08",
      time: "07:20 PM",
      status: "SUCCESS",
      transactionId: "TXN78451237",
    },
    {
      id: "PAY5003",
      orderId: "HE102456",
      customer: "Amit Joshi",
      amount: 487,
      method: "UPI",
      date: "2026-10-08",
      time: "06:50 PM",
      status: "SUCCESS",
      transactionId: "TXN78451238",
    },
    {
      id: "PAY5004",
      orderId: "HE102455",
      customer: "Sneha More",
      amount: 667,
      method: "CASH",
      date: "2026-10-08",
      time: "06:35 PM",
      status: "PENDING",
      transactionId: "-",
    },
    {
      id: "PAY5005",
      orderId: "HE102454",
      customer: "Rohan Deshmukh",
      amount: 616,
      method: "CARD",
      date: "2026-10-08",
      time: "06:05 PM",
      status: "SUCCESS",
      transactionId: "TXN78451240",
    },
    {
      id: "PAY5006",
      orderId: "HE102453",
      customer: "Neha Kulkarni",
      amount: 487,
      method: "UPI",
      date: "2026-10-08",
      time: "05:35 PM",
      status: "SUCCESS",
      transactionId: "TXN78451241",
    },
    {
      id: "PAY5007",
      orderId: "HE102452",
      customer: "Vikas Patil",
      amount: 334,
      method: "UPI",
      date: "2026-10-08",
      time: "05:05 PM",
      status: "FAILED",
      transactionId: "TXN78451242",
    },
    {
      id: "PAY5008",
      orderId: "HE102451",
      customer: "Kavita Shah",
      amount: 856,
      method: "CARD",
      date: "2026-10-08",
      time: "04:35 PM",
      status: "SUCCESS",
      transactionId: "TXN78451243",
    },
    {
      id: "PAY5009",
      orderId: "HE102450",
      customer: "Pooja Jadhav",
      amount: 816,
      method: "UPI",
      date: "2026-10-08",
      time: "04:05 PM",
      status: "REFUNDED",
      transactionId: "TXN78451244",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(search) ||
        payment.orderId.toLowerCase().includes(search) ||
        payment.customer.toLowerCase().includes(search) ||
        payment.transactionId.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "ALL" ||
        payment.method === methodFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod
      );
    });
  }, [payments, searchTerm, statusFilter, methodFilter]);

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status === "SUCCESS"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING"
  ).length;

  const failedPayments = payments.filter(
    (payment) =>
      payment.status === "FAILED" ||
      payment.status === "REFUNDED"
  ).length;

  const totalCollected = payments
    .filter((payment) => payment.status === "SUCCESS")
    .reduce(
      (total, payment) => total + payment.amount,
      0
    );

  const updatePaymentStatus = (id, newStatus) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === id
          ? { ...payment, status: newStatus }
          : payment
      )
    );

    if (selectedPayment?.id === id) {
      setSelectedPayment((currentPayment) => ({
        ...currentPayment,
        status: newStatus,
      }));
    }
  };

  const getStatusClass = (status) => {
    return `admin-payment-status ${status.toLowerCase()}`;
  };

  return (
    <section className="admin-payments-page">

      {/* Header */}
      <div className="admin-payments-header">
        <div className="admin-payments-title-row">
          <div className="admin-payments-title-icon">
            <CreditCard size={24} />
          </div>

          <div>
            <h1>Payment Management</h1>
            <p>
              Monitor customer payments and transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="admin-payment-stats">

        <div className="admin-payment-stat-card">
          <div className="admin-payment-stat-icon blue">
            <CreditCard size={22} />
          </div>

          <div>
            <span>Total Payments</span>
            <strong>{totalPayments}</strong>
          </div>
        </div>

        <div className="admin-payment-stat-card">
          <div className="admin-payment-stat-icon green">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Successful</span>
            <strong>{successfulPayments}</strong>
          </div>
        </div>

        <div className="admin-payment-stat-card">
          <div className="admin-payment-stat-icon orange">
            <Clock size={22} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingPayments}</strong>
          </div>
        </div>

        <div className="admin-payment-stat-card">
          <div className="admin-payment-stat-icon red">
            <XCircle size={22} />
          </div>

          <div>
            <span>Failed / Refunded</span>
            <strong>{failedPayments}</strong>
          </div>
        </div>

        <div className="admin-payment-stat-card">
          <div className="admin-payment-stat-icon revenue">
            <IndianRupee size={22} />
          </div>

          <div>
            <span>Collected</span>
            <strong>
              ₹{totalCollected.toLocaleString()}
            </strong>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="admin-payment-controls">

        <div className="admin-payment-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search payment, order, customer or transaction..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="admin-payment-filter-section">

          <div>
            <span className="admin-payment-filter-label">
              Payment Status
            </span>

            <div className="admin-payment-filters">

              {[
                "ALL",
                "SUCCESS",
                "PENDING",
                "FAILED",
                "REFUNDED",
              ].map((status) => (
                <button
                  key={status}
                  className={
                    statusFilter === status
                      ? "admin-payment-filter active"
                      : "admin-payment-filter"
                  }
                  onClick={() =>
                    setStatusFilter(status)
                  }
                >
                  {status === "ALL"
                    ? "All"
                    : status.charAt(0) +
                      status.slice(1).toLowerCase()}
                </button>
              ))}

            </div>
          </div>

          <div>
            <span className="admin-payment-filter-label">
              Payment Method
            </span>

            <div className="admin-payment-filters">

              {["ALL", "UPI", "CARD", "CASH"].map(
                (method) => (
                  <button
                    key={method}
                    className={
                      methodFilter === method
                        ? "admin-payment-filter active"
                        : "admin-payment-filter"
                    }
                    onClick={() =>
                      setMethodFilter(method)
                    }
                  >
                    {method === "ALL"
                      ? "All"
                      : method}
                  </button>
                )
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Payment Table */}
      <div className="admin-payments-panel">

        <div className="admin-payments-panel-header">
          <div>
            <h2>Transactions</h2>
            <p>
              Showing {filteredPayments.length} of{" "}
              {totalPayments} payments
            </p>
          </div>

          <span className="admin-payments-count">
            {filteredPayments.length} Payments
          </span>
        </div>

        {filteredPayments.length > 0 ? (
          <div className="admin-payments-table-wrapper">

            <table className="admin-payments-table">

              <thead>
                <tr>
                  <th>Payment</th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredPayments.map((payment) => (

                  <tr key={payment.id}>

                    <td>
                      <span className="admin-payment-id">
                        #{payment.id}
                      </span>
                    </td>

                    <td>
                      <span className="admin-payment-order-id">
                        #{payment.orderId}
                      </span>
                    </td>

                    <td>
                      <strong className="admin-payment-customer">
                        {payment.customer}
                      </strong>
                    </td>

                    <td>
                      <strong className="admin-payment-amount">
                        ₹{payment.amount}
                      </strong>
                    </td>

                    <td>
                      <span className="admin-payment-method">
                        {payment.method === "UPI" && (
                          <Smartphone size={15} />
                        )}

                        {payment.method === "CARD" && (
                          <CreditCard size={15} />
                        )}

                        {payment.method === "CASH" && (
                          <WalletCards size={15} />
                        )}

                        {payment.method}
                      </span>
                    </td>

                    <td>
                      <span className="admin-payment-transaction">
                        {payment.transactionId}
                      </span>
                    </td>

                    <td>
                      <div className="admin-payment-datetime">
                        <span>{payment.date}</span>
                        <span>{payment.time}</span>
                      </div>
                    </td>

                    <td>
                      <select
                        value={payment.status}
                        onChange={(e) =>
                          updatePaymentStatus(
                            payment.id,
                            e.target.value
                          )
                        }
                        className={getStatusClass(
                          payment.status
                        )}
                      >
                        <option value="SUCCESS">
                          Success
                        </option>

                        <option value="PENDING">
                          Pending
                        </option>

                        <option value="FAILED">
                          Failed
                        </option>

                        <option value="REFUNDED">
                          Refunded
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="admin-payment-view-button"
                        onClick={() =>
                          setSelectedPayment(payment)
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
          <div className="admin-payments-empty">
            <CreditCard size={48} />

            <h3>No payments found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div
          className="admin-payment-modal-overlay"
          onClick={() =>
            setSelectedPayment(null)
          }
        >
          <div
            className="admin-payment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-payment-modal-header">

              <div>
                <h2>
                  Payment #{selectedPayment.id}
                </h2>

                <p>
                  {selectedPayment.date} at{" "}
                  {selectedPayment.time}
                </p>
              </div>

              <button
                className="admin-payment-modal-close"
                onClick={() =>
                  setSelectedPayment(null)
                }
              >
                <XCircle size={24} />
              </button>

            </div>

            <div className="admin-payment-detail-status">

              <span>Status</span>

              <span
                className={`admin-payment-detail-badge ${selectedPayment.status.toLowerCase()}`}
              >
                {selectedPayment.status}
              </span>

            </div>

            <div className="admin-payment-detail-grid">

              <div className="admin-payment-detail-card">
                <span>Payment ID</span>
                <strong>
                  {selectedPayment.id}
                </strong>
              </div>

              <div className="admin-payment-detail-card">
                <span>Order ID</span>
                <strong>
                  {selectedPayment.orderId}
                </strong>
              </div>

              <div className="admin-payment-detail-card">
                <span>Customer</span>
                <strong>
                  {selectedPayment.customer}
                </strong>
              </div>

              <div className="admin-payment-detail-card">
                <span>Payment Method</span>
                <strong>
                  {selectedPayment.method}
                </strong>
              </div>

              <div className="admin-payment-detail-card full">
                <span>Transaction ID</span>
                <strong>
                  {selectedPayment.transactionId}
                </strong>
              </div>

              <div className="admin-payment-detail-card full">
                <span>Amount</span>

                <strong className="admin-payment-detail-price">
                  ₹{selectedPayment.amount}
                </strong>
              </div>

            </div>

            <div className="admin-payment-status-actions">

              <h3>Update Payment Status</h3>

              <div className="admin-payment-status-buttons">

                <button
                  onClick={() =>
                    updatePaymentStatus(
                      selectedPayment.id,
                      "SUCCESS"
                    )
                  }
                >
                  <CheckCircle size={17} />
                  Success
                </button>

                <button
                  onClick={() =>
                    updatePaymentStatus(
                      selectedPayment.id,
                      "PENDING"
                    )
                  }
                >
                  <Clock size={17} />
                  Pending
                </button>

                <button
                  onClick={() =>
                    updatePaymentStatus(
                      selectedPayment.id,
                      "FAILED"
                    )
                  }
                >
                  <XCircle size={17} />
                  Failed
                </button>

                <button
                  className="refund"
                  onClick={() =>
                    updatePaymentStatus(
                      selectedPayment.id,
                      "REFUNDED"
                    )
                  }
                >
                  <WalletCards size={17} />
                  Refunded
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default AdminPayments;