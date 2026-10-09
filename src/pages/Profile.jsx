import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  Package,
  ShoppingBag,
  CalendarDays,
  ShieldCheck,
  Lock,
  ChevronRight,
} from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rahul Patil",
    email: "rahul@gmail.com",
    phone: "9876543210",
  });

  const [formData, setFormData] = useState(profile);

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSuccess("");
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
    setSuccess("");
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setSuccess("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      return;
    }

    setProfile(formData);
    setIsEditing(false);
    setSuccess("Profile updated successfully.");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="profile-page">

      {/* HEADER */}

      <section className="profile-header">

        <div className="profile-header-content">

          <div className="profile-avatar-large">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div>

            <span className="profile-welcome">
              Welcome back
            </span>

            <h1>{profile.name}</h1>

            <p>
              Manage your account and dining preferences
            </p>

          </div>

        </div>

        <div className="profile-status">
          <ShieldCheck size={16} />
          Active Account
        </div>

      </section>

      <div className="profile-container">

        {/* MAIN PROFILE */}

        <div className="profile-main">

          {success && (
            <div className="profile-success">
              <ShieldCheck size={18} />
              {success}
            </div>
          )}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>Personal Information</h2>

                <p>
                  Your basic account information
                </p>

              </div>

              {!isEditing && (
                <button
                  className="edit-profile-button"
                  onClick={handleEdit}
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              )}

            </div>

            {isEditing ? (

              <form onSubmit={handleSave}>

                <div className="profile-form-grid">

                  <div className="profile-form-group">

                    <label>Full Name</label>

                    <div className="profile-input">

                      <User size={18} />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />

                    </div>

                  </div>

                  <div className="profile-form-group">

                    <label>Email Address</label>

                    <div className="profile-input">

                      <Mail size={18} />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                      />

                    </div>

                    <small>
                      Email cannot be changed here.
                    </small>

                  </div>

                  <div className="profile-form-group">

                    <label>Phone Number</label>

                    <div className="profile-input">

                      <Phone size={18} />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />

                    </div>

                  </div>

                </div>

                <div className="profile-form-actions">

                  <button
                    type="button"
                    className="cancel-profile-button"
                    onClick={handleCancel}
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-profile-button"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>

                </div>

              </form>

            ) : (

              <div className="profile-details-grid">

                <div className="profile-detail">

                  <div className="profile-detail-icon">
                    <User size={18} />
                  </div>

                  <div>
                    <span>Full Name</span>
                    <strong>{profile.name}</strong>
                  </div>

                </div>

                <div className="profile-detail">

                  <div className="profile-detail-icon">
                    <Mail size={18} />
                  </div>

                  <div>
                    <span>Email Address</span>
                    <strong>{profile.email}</strong>
                  </div>

                </div>

                <div className="profile-detail">

                  <div className="profile-detail-icon">
                    <Phone size={18} />
                  </div>

                  <div>
                    <span>Phone Number</span>
                    <strong>{profile.phone}</strong>
                  </div>

                </div>

                <div className="profile-detail">

                  <div className="profile-detail-icon">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <span>Member Since</span>
                    <strong>January 2026</strong>
                  </div>

                </div>

              </div>

            )}

          </section>

          {/* SECURITY */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>Security</h2>

                <p>
                  Manage your account security
                </p>

              </div>

            </div>

            <div className="security-option">

              <div className="security-option-icon">
                <Lock size={20} />
              </div>

              <div className="security-option-content">

                <strong>Password</strong>

                <span>
                  Keep your account secure with a strong password.
                </span>

              </div>

              <button className="security-action">
                Change Password
                <ChevronRight size={16} />
              </button>

            </div>

          </section>

        </div>

        {/* SIDE PANEL */}

        <aside className="profile-sidebar">

          {/* ACCOUNT STATS */}

          <section className="profile-card profile-stats-card">

            <h2>Account Overview</h2>

            <div className="profile-stat">

              <div className="profile-stat-icon">
                <Package size={19} />
              </div>

              <div>
                <strong>12</strong>
                <span>Total Orders</span>
              </div>

            </div>

            <div className="profile-stat">

              <div className="profile-stat-icon">
                <ShoppingBag size={19} />
              </div>

              <div>
                <strong>₹4,850</strong>
                <span>Total Spent</span>
              </div>

            </div>

            <div className="profile-stat">

              <div className="profile-stat-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <strong>8</strong>
                <span>Table Visits</span>
              </div>

            </div>

          </section>

          {/* QUICK ACTIONS */}

          <section className="profile-card">

            <h2>Quick Actions</h2>

            <div className="profile-quick-links">

              <Link to="/orders">
                <div>
                  <Package size={18} />
                  <span>My Orders</span>
                </div>

                <ChevronRight size={16} />
              </Link>

              <Link to="/menu">
                <div>
                  <ShoppingBag size={18} />
                  <span>Explore Menu</span>
                </div>

                <ChevronRight size={16} />
              </Link>

              <Link to="/cart">
                <div>
                  <ShoppingBag size={18} />
                  <span>View Cart</span>
                </div>

                <ChevronRight size={16} />
              </Link>

            </div>

          </section>

        </aside>

      </div>

    </div>
  );
}

export default Profile;