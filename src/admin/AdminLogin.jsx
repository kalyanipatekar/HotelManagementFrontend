import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  LogIn,
  ShieldCheck,
} from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter admin email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter password.");
      return;
    }

    // Mock login for frontend development
    navigate("/admin/dashboard");
  };

  return (
    <section className="admin-login-page">

      <div className="admin-login-container">

        {/* Left Side */}
        <div className="admin-login-info">

          <div className="admin-brand">
            <div className="admin-brand-icon">
              🏨
            </div>

            <div>
              <h2>HotelEase</h2>
              <span>Management System</span>
            </div>
          </div>

          <div className="admin-info-content">
            <span className="admin-badge">
              <ShieldCheck size={16} />
              Secure Admin Portal
            </span>

            <h1>
              Manage your hotel
              <span> smarter.</span>
            </h1>

            <p>
              Manage customers, tables, food items, reservations,
              orders and payments from one centralized dashboard.
            </p>
          </div>

          <div className="admin-login-features">

            <div>
              <span>✓</span>
              <p>Customer Management</p>
            </div>

            <div>
              <span>✓</span>
              <p>Table & Reservation Management</p>
            </div>

            <div>
              <span>✓</span>
              <p>Food & Order Management</p>
            </div>

            <div>
              <span>✓</span>
              <p>Payment Monitoring</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="admin-login-form-container">

          <div className="admin-login-form-card">

            <div className="admin-form-heading">
              <div className="admin-lock-icon">
                <Lock size={23} />
              </div>

              <h2>Admin Login</h2>

              <p>
                Sign in to access the management dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="admin-form-group">

                <label>Email Address</label>

                <div className="admin-input-wrapper">
                  <Mail size={18} />

                  <input
                    type="email"
                    placeholder="admin@hotelease.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>

              </div>

              {/* Password */}
              <div className="admin-form-group">

                <label>Password</label>

                <div className="admin-input-wrapper">

                  <Lock size={18} />

                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {error && (
                <div className="admin-login-error">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="admin-login-button"
              >
                <LogIn size={18} />
                Sign In to Dashboard
              </button>

            </form>

            <div className="admin-back-link">
              <Link to="/login">
                ← Back to Customer Login
              </Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AdminLogin;