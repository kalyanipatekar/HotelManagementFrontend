function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>🏨 HotelEase</h2>

          <p>
            Smart dining and table management made simple.
            Scan, order, pay and enjoy your experience.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/orders">Orders</a>
          <a href="/cart">Cart</a>
        </div>

        <div className="footer-section">
          <h3>Services</h3>

          <p>Table Reservation</p>
          <p>Online Ordering</p>
          <p>QR Ordering</p>
          <p>Digital Payment</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Pune, Maharashtra</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@hotelease.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 HotelEase. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;