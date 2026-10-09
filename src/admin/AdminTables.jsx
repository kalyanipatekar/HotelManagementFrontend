import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Armchair,
  Users,
  MapPin,
  QrCode,
  MoreVertical,
  CheckCircle,
  Clock,
  Utensils,
  Sparkles,
} from "lucide-react";

function AdminTables() {
  const navigate = useNavigate();

  const [tables, setTables] = useState([
    {
      id: 1,
      tableNumber: 1,
      capacity: 2,
      location: "Window Side",
      status: "Available",
      reservation: null,
    },
    {
      id: 2,
      tableNumber: 2,
      capacity: 2,
      location: "Main Hall",
      status: "Reserved",
      reservation: "Rahul Patil",
    },
    {
      id: 3,
      tableNumber: 3,
      capacity: 4,
      location: "Main Hall",
      status: "Occupied",
      reservation: "Priya Sharma",
    },
    {
      id: 4,
      tableNumber: 4,
      capacity: 4,
      location: "Garden Area",
      status: "Available",
      reservation: null,
    },
    {
      id: 5,
      tableNumber: 5,
      capacity: 6,
      location: "Garden Area",
      status: "Cleaning",
      reservation: null,
    },
    {
      id: 6,
      tableNumber: 6,
      capacity: 4,
      location: "Window Side",
      status: "Available",
      reservation: null,
    },
    {
      id: 7,
      tableNumber: 7,
      capacity: 2,
      location: "Main Hall",
      status: "Occupied",
      reservation: "Amit Joshi",
    },
    {
      id: 8,
      tableNumber: 8,
      capacity: 6,
      location: "Garden Area",
      status: "Reserved",
      reservation: "Sneha More",
    },
    {
      id: 9,
      tableNumber: 9,
      capacity: 4,
      location: "Main Hall",
      status: "Available",
      reservation: null,
    },
    {
      id: 10,
      tableNumber: 10,
      capacity: 2,
      location: "Window Side",
      status: "Available",
      reservation: null,
    },
    {
      id: 11,
      tableNumber: 11,
      capacity: 4,
      location: "Garden Area",
      status: "Cleaning",
      reservation: null,
    },
    {
      id: 12,
      tableNumber: 12,
      capacity: 6,
      location: "Garden Area",
      status: "Occupied",
      reservation: "Rohan Deshmukh",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const statusOptions = [
    "All",
    "Available",
    "Reserved",
    "Occupied",
    "Cleaning",
  ];

  const filteredTables =
    filter === "All"
      ? tables
      : tables.filter((table) => table.status === filter);

  const updateTableStatus = (id, newStatus) => {
    setTables((currentTables) =>
      currentTables.map((table) => {
        if (table.id !== id) {
          return table;
        }

        return {
          ...table,
          status: newStatus,
          reservation:
            newStatus === "Available" ? null : table.reservation,
        };
      })
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Available":
        return <CheckCircle size={15} />;

      case "Reserved":
        return <Clock size={15} />;

      case "Occupied":
        return <Utensils size={15} />;

      case "Cleaning":
        return <Sparkles size={15} />;

      default:
        return null;
    }
  };

  const availableCount = tables.filter(
    (table) => table.status === "Available"
  ).length;

  const reservedCount = tables.filter(
    (table) => table.status === "Reserved"
  ).length;

  const occupiedCount = tables.filter(
    (table) => table.status === "Occupied"
  ).length;

  const cleaningCount = tables.filter(
    (table) => table.status === "Cleaning"
  ).length;

  return (
    <section className="admin-tables-page">

      {/* ================= PAGE HEADER ================= */}

      <div className="admin-section-header">

        <div className="admin-section-title-row">

          <div className="admin-section-title-icon">
            <Armchair size={22} />
          </div>

          <div>
            <h1>Table Management</h1>

            <p>
              Manage restaurant tables, availability and QR codes.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="admin-add-table-button"
          onClick={() => alert("Add New Table feature coming soon")}
        >
          + Add New Table
        </button>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="table-management-stats">

        <div className="table-management-stat">

          <div className="table-stat-icon total">
            <Armchair size={20} />
          </div>

          <div>
            <span>Total Tables</span>
            <strong>{tables.length}</strong>
          </div>

        </div>

        <div className="table-management-stat">

          <div className="table-stat-icon available">
            <CheckCircle size={20} />
          </div>

          <div>
            <span>Available</span>
            <strong>{availableCount}</strong>
          </div>

        </div>

        <div className="table-management-stat">

          <div className="table-stat-icon reserved">
            <Clock size={20} />
          </div>

          <div>
            <span>Reserved</span>
            <strong>{reservedCount}</strong>
          </div>

        </div>

        <div className="table-management-stat">

          <div className="table-stat-icon occupied">
            <Utensils size={20} />
          </div>

          <div>
            <span>Occupied</span>
            <strong>{occupiedCount}</strong>
          </div>

        </div>

        <div className="table-management-stat">

          <div className="table-stat-icon cleaning">
            <Sparkles size={20} />
          </div>

          <div>
            <span>Cleaning</span>
            <strong>{cleaningCount}</strong>
          </div>

        </div>

      </div>

      {/* ================= FILTER ================= */}

      <div className="table-filter-bar">

        <div>
          <h2>Restaurant Tables</h2>

          <p>
            Select a table to manage its status.
          </p>
        </div>

        <div className="table-filter-buttons">

          {statusOptions.map((status) => (
            <button
              type="button"
              key={status}
              className={
                filter === status
                  ? "table-filter active"
                  : "table-filter"
              }
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}

        </div>

      </div>

      {/* ================= TABLE GRID ================= */}

      {filteredTables.length > 0 ? (

        <div className="admin-table-grid">

          {filteredTables.map((table) => (

            <div
              className={`admin-restaurant-table-card ${table.status.toLowerCase()}`}
              key={table.id}
            >

              {/* Card Top */}

              <div className="restaurant-table-card-top">

                <div className="restaurant-table-number">

                  <Armchair size={22} />

                  <span>
                    Table {table.tableNumber}
                  </span>

                </div>

                <button
                  type="button"
                  className="restaurant-table-more"
                  aria-label={`More options for Table ${table.tableNumber}`}
                >
                  <MoreVertical size={19} />
                </button>

              </div>

              {/* Table Visual */}

              <div className="restaurant-table-visual">

                <div className="chair chair-top"></div>
                <div className="chair chair-right"></div>
                <div className="chair chair-bottom"></div>
                <div className="chair chair-left"></div>

                <div className="table-center">
                  <span>{table.tableNumber}</span>
                </div>

              </div>

              {/* Status */}

              <div className="restaurant-table-status-row">

                <span
                  className={`restaurant-table-status ${table.status.toLowerCase()}`}
                >
                  {getStatusIcon(table.status)}
                  {table.status}
                </span>

              </div>

              {/* Details */}

              <div className="restaurant-table-details">

                <div>
                  <Users size={15} />

                  <span>
                    {table.capacity} Seats
                  </span>
                </div>

                <div>
                  <MapPin size={15} />

                  <span>
                    {table.location}
                  </span>
                </div>

              </div>

              {/* Reservation */}

              {table.reservation && (
                <div className="table-reservation-info">

                  <span>Customer</span>

                  <strong>
                    {table.reservation}
                  </strong>

                </div>
              )}

              {/* Actions */}

              <div className="restaurant-table-actions">

                <button
                  type="button"
                  className="table-qr-button"
                  onClick={() =>
                    alert(
                      `QR Code for Table ${table.tableNumber}`
                    )
                  }
                >
                  <QrCode size={16} />
                  QR Code
                </button>

                <select
                  value={table.status}
                  onChange={(event) =>
                    updateTableStatus(
                      table.id,
                      event.target.value
                    )
                  }
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Reserved">
                    Reserved
                  </option>

                  <option value="Occupied">
                    Occupied
                  </option>

                  <option value="Cleaning">
                    Cleaning
                  </option>
                </select>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="menu-empty">

          <h3>No Tables Found</h3>

          <p>
            There are no tables with the selected status.
          </p>

        </div>

      )}

      {/* ================= ADMIN NAVIGATION ================= */}

      <button
        type="button"
        className="admin-nav-item"
        onClick={() => navigate("/admin/dashboard")}
      >
        Back to Dashboard
      </button>

    </section>
  );
}

export default AdminTables;