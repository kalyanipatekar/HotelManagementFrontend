import { useState } from "react";
import {
  CalendarDays,
  Search,
  Clock,
  Users,
  Armchair,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
} from "lucide-react";

function AdminReservations() {
  const [reservations, setReservations] = useState([
    {
      id: "RES1001",
      customer: "Rahul Patil",
      phone: "9876543210",
      table: 3,
      guests: 4,
      date: "2026-10-08",
      time: "07:30 PM",
      status: "Confirmed",
    },
    {
      id: "RES1002",
      customer: "Priya Sharma",
      phone: "9823456789",
      table: 5,
      guests: 5,
      date: "2026-10-08",
      time: "08:00 PM",
      status: "Pending",
    },
    {
      id: "RES1003",
      customer: "Amit Joshi",
      phone: "9765432109",
      table: 2,
      guests: 2,
      date: "2026-10-08",
      time: "06:30 PM",
      status: "Completed",
    },
    {
      id: "RES1004",
      customer: "Sneha More",
      phone: "9898765432",
      table: 8,
      guests: 6,
      date: "2026-10-09",
      time: "08:30 PM",
      status: "Pending",
    },
    {
      id: "RES1005",
      customer: "Rohan Deshmukh",
      phone: "9812345678",
      table: 1,
      guests: 2,
      date: "2026-10-09",
      time: "07:00 PM",
      status: "Cancelled",
    },
    {
      id: "RES1006",
      customer: "Neha Kulkarni",
      phone: "9901234567",
      table: 6,
      guests: 4,
      date: "2026-10-09",
      time: "09:00 PM",
      status: "Confirmed",
    },
    {
      id: "RES1007",
      customer: "Vikas Patil",
      phone: "9887654321",
      table: 10,
      guests: 2,
      date: "2026-10-10",
      time: "07:30 PM",
      status: "Pending",
    },
    {
      id: "RES1008",
      customer: "Kavita Shah",
      phone: "9876123450",
      table: 12,
      guests: 6,
      date: "2026-10-10",
      time: "08:30 PM",
      status: "Confirmed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const statusOptions = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  const filteredReservations = reservations.filter(
    (reservation) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        reservation.customer
          .toLowerCase()
          .includes(search) ||
        reservation.id
          .toLowerCase()
          .includes(search) ||
        String(reservation.table).includes(search);

      const matchesStatus =
        selectedStatus === "All" ||
        reservation.status === selectedStatus;

      return matchesSearch && matchesStatus;
    }
  );

  const updateReservationStatus = (
    id,
    newStatus
  ) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status: newStatus,
            }
          : reservation
      )
    );
  };

  const pendingCount = reservations.filter(
    (reservation) =>
      reservation.status === "Pending"
  ).length;

  const confirmedCount = reservations.filter(
    (reservation) =>
      reservation.status === "Confirmed"
  ).length;

  const completedCount = reservations.filter(
    (reservation) =>
      reservation.status === "Completed"
  ).length;

  const cancelledCount = reservations.filter(
    (reservation) =>
      reservation.status === "Cancelled"
  ).length;

  return (
    <section className="admin-reservations-page">

      {/* Header */}
      <div className="admin-reservations-header">

        <div className="admin-reservations-title">

          <div className="admin-reservation-title-icon">
            <CalendarDays size={23} />
          </div>

          <div>
            <h1>Reservations</h1>

            <p>
              Manage customer table reservations.
            </p>
          </div>

        </div>

        <button className="admin-reservation-add-button">
          <CalendarDays size={17} />
          New Reservation
        </button>

      </div>

      {/* Statistics */}
      <div className="reservation-stats">

        <div className="reservation-stat-card">

          <div className="reservation-stat-icon total">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Total Reservations</span>
            <strong>{reservations.length}</strong>
          </div>

        </div>

        <div className="reservation-stat-card">

          <div className="reservation-stat-icon pending">
            <Clock size={20} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>

        </div>

        <div className="reservation-stat-card">

          <div className="reservation-stat-icon confirmed">
            <CheckCircle size={20} />
          </div>

          <div>
            <span>Confirmed</span>
            <strong>{confirmedCount}</strong>
          </div>

        </div>

        <div className="reservation-stat-card">

          <div className="reservation-stat-icon completed">
            <CheckCircle size={20} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>

        </div>

        <div className="reservation-stat-card">

          <div className="reservation-stat-icon cancelled">
            <XCircle size={20} />
          </div>

          <div>
            <span>Cancelled</span>
            <strong>{cancelledCount}</strong>
          </div>

        </div>

      </div>

      {/* Controls */}
      <div className="reservation-controls">

        <div className="reservation-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search customer, reservation ID or table..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>

        <div className="reservation-status-filters">

          {statusOptions.map((status) => (

            <button
              key={status}
              className={
                selectedStatus === status
                  ? "reservation-filter active"
                  : "reservation-filter"
              }
              onClick={() =>
                setSelectedStatus(status)
              }
            >
              {status}
            </button>

          ))}

        </div>

      </div>

      {/* Reservation Table */}
      <div className="admin-reservation-panel">

        <div className="admin-reservation-panel-header">

          <div>
            <h2>Reservation List</h2>

            <p>
              {filteredReservations.length} reservations found
            </p>
          </div>

        </div>

        <div className="reservation-table-wrapper">

          <table className="admin-reservation-table">

            <thead>
              <tr>
                <th>Reservation</th>
                <th>Customer</th>
                <th>Table</th>
                <th>Guests</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredReservations.map(
                (reservation) => (

                  <tr key={reservation.id}>

                    {/* Reservation ID */}
                    <td>

                      <div className="reservation-id">

                        <div className="reservation-id-icon">
                          <CalendarDays size={16} />
                        </div>

                        <div>
                          <strong>
                            {reservation.id}
                          </strong>

                          <span>
                            Table Booking
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* Customer */}
                    <td>

                      <div className="reservation-customer">

                        <div className="reservation-customer-avatar">
                          {reservation.customer
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {reservation.customer}
                          </strong>

                          <span>
                            {reservation.phone}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* Table */}
                    <td>

                      <div className="reservation-table-number">

                        <Armchair size={16} />

                        <strong>
                          Table {reservation.table}
                        </strong>

                      </div>

                    </td>

                    {/* Guests */}
                    <td>

                      <div className="reservation-guests">

                        <Users size={15} />

                        {reservation.guests}

                      </div>

                    </td>

                    {/* Date / Time */}
                    <td>

                      <div className="reservation-datetime">

                        <strong>
                          {reservation.date}
                        </strong>

                        <span>
                          <Clock size={13} />
                          {reservation.time}
                        </span>

                      </div>

                    </td>

                    {/* Status */}
                    <td>

                      <span
                        className={`reservation-status-badge ${reservation.status.toLowerCase()}`}
                      >
                        {reservation.status ===
                          "Confirmed" && (
                          <CheckCircle size={13} />
                        )}

                        {reservation.status ===
                          "Pending" && (
                          <Clock size={13} />
                        )}

                        {reservation.status ===
                          "Completed" && (
                          <CheckCircle size={13} />
                        )}

                        {reservation.status ===
                          "Cancelled" && (
                          <XCircle size={13} />
                        )}

                        {reservation.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td>

                      <div className="reservation-actions">

                        {reservation.status ===
                          "Pending" && (
                          <button
                            className="reservation-confirm-button"
                            onClick={() =>
                              updateReservationStatus(
                                reservation.id,
                                "Confirmed"
                              )
                            }
                            title="Confirm"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}

                        {reservation.status ===
                          "Confirmed" && (
                          <button
                            className="reservation-complete-button"
                            onClick={() =>
                              updateReservationStatus(
                                reservation.id,
                                "Completed"
                              )
                            }
                            title="Complete"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}

                        {reservation.status !==
                          "Cancelled" &&
                          reservation.status !==
                            "Completed" && (
                            <button
                              className="reservation-cancel-button"
                              onClick={() =>
                                updateReservationStatus(
                                  reservation.id,
                                  "Cancelled"
                                )
                              }
                              title="Cancel"
                            >
                              <XCircle size={15} />
                            </button>
                          )}

                        <button
                          className="reservation-view-button"
                          title="View"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          className="reservation-more-button"
                          title="More"
                        >
                          <MoreVertical size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {filteredReservations.length === 0 && (

          <div className="reservation-empty">

            <CalendarDays size={42} />

            <h3>No Reservations Found</h3>

            <p>
              Try changing your search or status filter.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminReservations;