import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Utensils,
  ArrowRight,
} from "lucide-react";

function TablePage() {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [guestCount, setGuestCount] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const tables = {
    1: {
      number: 1,
      seats: 2,
      location: "Window Side",
      status: "Available",
    },
    2: {
      number: 2,
      seats: 2,
      location: "Main Hall",
      status: "Available",
    },
    3: {
      number: 3,
      seats: 4,
      location: "Main Hall",
      status: "Available",
    },
    4: {
      number: 4,
      seats: 4,
      location: "Garden Area",
      status: "Reserved",
    },
    5: {
      number: 5,
      seats: 6,
      location: "Garden Area",
      status: "Available",
    },
    6: {
      number: 6,
      seats: 4,
      location: "Window Side",
      status: "Available",
    },
  };

  const table = tables[tableId];

  if (!table) {
    return (
      <section className="table-page">
        <div className="table-error-card">
          <div className="table-error-icon">⚠️</div>

          <h1>Table Not Found</h1>

          <p>
            The table you are trying to access does not exist.
            Please scan a valid table QR code.
          </p>

          <button
            className="table-primary-button"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </section>
    );
  }

  const isAvailable = table.status === "Available";

  const handleReservation = (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!phone.trim() || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!date) {
      setError("Please select a reservation date.");
      return;
    }

    if (!time) {
      setError("Please select a reservation time.");
      return;
    }

    if (guestCount > table.seats) {
      setError(
        `This table can accommodate maximum ${table.seats} guests.`
      );
      return;
    }

    setSuccess(true);
  };

  return (
    <section className="table-page">
      <div className="table-page-container">

        {/* Header */}
        <div className="table-page-header">
          <div>
            <span className="table-page-badge">
              <Utensils size={16} />
              Smart Table Booking
            </span>

            <h1>
              Reserve Your <span>Table</span>
            </h1>

            <p>
              Choose your preferred time and reserve your table
              before placing your food order.
            </p>
          </div>
        </div>

        <div className="table-booking-layout">

          {/* LEFT SIDE */}
          <div className="table-information">

            <div className="selected-table-card">

              <div className="selected-table-top">
                <div className="table-number-box">
                  {table.number}
                </div>

                <div>
                  <p className="small-label">SELECTED TABLE</p>
                  <h2>Table {table.number}</h2>
                </div>

                <span
                  className={
                    isAvailable
                      ? "table-status available"
                      : "table-status reserved"
                  }
                >
                  {isAvailable ? "Available" : "Reserved"}
                </span>
              </div>

              <div className="table-details">

                <div className="table-detail-item">
                  <MapPin size={19} />
                  <div>
                    <span>Location</span>
                    <strong>{table.location}</strong>
                  </div>
                </div>

                <div className="table-detail-item">
                  <Users size={19} />
                  <div>
                    <span>Capacity</span>
                    <strong>{table.seats} Guests</strong>
                  </div>
                </div>

                <div className="table-detail-item">
                  <CheckCircle size={19} />
                  <div>
                    <span>Status</span>
                    <strong>
                      {isAvailable ? "Ready to Reserve" : "Currently Reserved"}
                    </strong>
                  </div>
                </div>

              </div>
            </div>

            {/* Reservation Information */}
            <div className="table-benefits-card">

              <h3>Why reserve your table?</h3>

              <div className="table-benefits">

                <div className="table-benefit">
                  <div className="benefit-icon">⚡</div>
                  <div>
                    <h4>Quick Service</h4>
                    <p>Your table will be prepared before arrival.</p>
                  </div>
                </div>

                <div className="table-benefit">
                  <div className="benefit-icon">🍽️</div>
                  <div>
                    <h4>Easy Ordering</h4>
                    <p>Scan, select food and place your order easily.</p>
                  </div>
                </div>

                <div className="table-benefit">
                  <div className="benefit-icon">🔒</div>
                  <div>
                    <h4>Secure Booking</h4>
                    <p>Your reservation details are kept secure.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="reservation-card">

            {!isAvailable ? (
              <div className="reserved-message">

                <div className="reserved-icon">🔒</div>

                <h2>Table Currently Reserved</h2>

                <p>
                  Table {table.number} is currently reserved.
                  Please choose another table.
                </p>

                <button
                  className="table-primary-button"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </button>

              </div>
            ) : success ? (

              <div className="reservation-success">

                <div className="success-circle">
                  <CheckCircle size={42} />
                </div>

                <h2>Table Reserved Successfully!</h2>

                <p>
                  Your Table {table.number} has been reserved.
                </p>

                <div className="reservation-summary">

                  <div>
                    <span>Guest Name</span>
                    <strong>{name}</strong>
                  </div>

                  <div>
                    <span>Guests</span>
                    <strong>{guestCount}</strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>{date}</strong>
                  </div>

                  <div>
                    <span>Time</span>
                    <strong>{time}</strong>
                  </div>

                </div>

                <button
                  className="table-primary-button"
                  onClick={() => navigate("/menu")}
                >
                  Continue to Menu
                  <ArrowRight size={18} />
                </button>

              </div>

            ) : (

              <>
                <div className="reservation-card-header">
                  <h2>Reserve Table</h2>
                  <p>Enter your details to reserve this table.</p>
                </div>

                <form onSubmit={handleReservation}>

                  {/* Name */}
                  <div className="table-form-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="table-form-group">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={phone}
                      maxLength="10"
                      onChange={(e) =>
                        setPhone(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                    />
                  </div>

                  {/* Guests */}
                  <div className="table-form-group">

                    <label>
                      Number of Guests
                    </label>

                    <div className="guest-selector">

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            Math.max(1, guestCount - 1)
                          )
                        }
                      >
                        −
                      </button>

                      <div>
                        <Users size={18} />
                        <span>{guestCount}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            Math.min(
                              table.seats,
                              guestCount + 1
                            )
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <small>
                      Maximum capacity: {table.seats} guests
                    </small>
                  </div>

                  {/* Date and Time */}
                  <div className="date-time-grid">

                    <div className="table-form-group">
                      <label>
                        <CalendarDays size={15} />
                        Date
                      </label>

                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div className="table-form-group">
                      <label>
                        <Clock size={15} />
                        Time
                      </label>

                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>

                  </div>

                  {error && (
                    <div className="table-form-error">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="table-primary-button reserve-submit"
                  >
                    Reserve Table
                    <ArrowRight size={18} />
                  </button>

                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default TablePage;