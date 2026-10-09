import {
  ArrowRight,
  QrCode,
  Clock,
  ShieldCheck,
  Smartphone,
  Utensils,
} from "lucide-react";

import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCard";

function Home() {

  const categories = [
    {
      id: 1,
      name: "Indian",
      description: "Authentic Indian flavors",
    },
    {
      id: 2,
      name: "Beverages",
      description: "Refreshing drinks & coffee",
    },
    {
      id: 3,
      name: "Pizza",
      description: "Freshly baked pizzas",
    },
    {
      id: 4,
      name: "Desserts",
      description: "Sweet treats & desserts",
    },
  ];

  const popularFoods = [
    {
      id: 1,
      name: "Paneer Tikka",
      category: "Indian Starter",
      price: 249,
      rating: 4.8,
      image: "🥘",
      description: "Soft paneer marinated with aromatic Indian spices.",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 299,
      rating: 4.7,
      image: "🍕",
      description: "Classic pizza with tomato, mozzarella and basil.",
    },
    {
      id: 3,
      name: "Veg Burger",
      category: "Fast Food",
      price: 179,
      rating: 4.6,
      image: "🍔",
      description: "Crispy veggie patty with fresh vegetables.",
    },
    {
      id: 4,
      name: "Cold Coffee",
      category: "Beverages",
      price: 129,
      rating: 4.9,
      image: "🥤",
      description: "Creamy chilled coffee served perfectly cold.",
    },
  ];

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <div className="hero-badge">
            <span>✨</span>
            Smart Dining Experience
          </div>

          <h1>
            Your Table.
            <br />
            Your Order.
            <br />
            <span>Your Experience.</span>
          </h1>

          <p>
            Skip the wait. Scan your table QR code, explore our
            delicious menu, place your order and enjoy your meal
            with a smarter dining experience.
          </p>

          <div className="hero-actions">

            <button className="hero-primary-button">
              Explore Menu
              <ArrowRight size={18} />
            </button>

            <button className="hero-secondary-button">
              <QrCode size={18} />
              Scan Table QR
            </button>

          </div>

          <div className="hero-features">

            <div>
              <ShieldCheck size={20} />
              <span>Secure Ordering</span>
            </div>

            <div>
              <Clock size={20} />
              <span>Quick Service</span>
            </div>

            <div>
              <Smartphone size={20} />
              <span>Easy to Use</span>
            </div>

          </div>

        </div>

        <div className="home-hero-visual">

          <div className="hero-food-card">

            <div className="large-food-emoji">
              🍽️
            </div>

            <div className="floating-card floating-rating">
              ⭐ 4.9 Rating
            </div>

            <div className="floating-card floating-order">
              🛎️ Order at your table
            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-actions-section">

        <div className="section-heading">

          <p className="section-label">
            GET STARTED
          </p>

          <h2>
            Everything you need for a better dining experience
          </h2>

        </div>

        <div className="quick-actions-grid">

          <div className="quick-action-card">

            <div className="quick-action-icon">
              <QrCode size={28} />
            </div>

            <h3>Scan Table QR</h3>

            <p>
              Scan the QR code on your table to get started.
            </p>

          </div>


          <div className="quick-action-card">

            <div className="quick-action-icon">
              <Utensils size={28} />
            </div>

            <h3>Explore Menu</h3>

            <p>
              Browse categories and discover delicious food.
            </p>

          </div>


          <div className="quick-action-card">

            <div className="quick-action-icon">
              🛒
            </div>

            <h3>Place Your Order</h3>

            <p>
              Add your favorite dishes and place your order.
            </p>

          </div>


          <div className="quick-action-card">

            <div className="quick-action-icon">
              💳
            </div>

            <h3>Pay Easily</h3>

            <p>
              Choose cash, UPI, QR or online payment.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories-section">

        <div className="section-heading">

          <p className="section-label">
            EXPLORE
          </p>

          <h2>
            Browse Food Categories
          </h2>

          <p>
            Find exactly what you are craving.
          </p>

        </div>

        <div className="categories-grid">

          {categories.map((category) => (

            <CategoryCard
              key={category.id}
              category={category}
            />

          ))}

        </div>

      </section>


      {/* ================= POPULAR FOOD ================= */}

      <section className="popular-section">

        <div className="section-heading section-heading-row">

          <div>

            <p className="section-label">
              CUSTOMER FAVORITES
            </p>

            <h2>
              Popular Dishes
            </h2>

          </div>

          <button className="view-menu-button">
            View Full Menu
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="food-grid">

          {popularFoods.map((food) => (

            <FoodCard
              key={food.id}
              food={food}
            />

          ))}

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="section-heading">

          <p className="section-label">
            SIMPLE PROCESS
          </p>

          <h2>
            How HotelEase Works
          </h2>

        </div>

        <div className="steps-grid">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              📱
            </div>

            <h3>
              Scan
            </h3>

            <p>
              Scan the QR code available on your restaurant table.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🍴
            </div>

            <h3>
              Select
            </h3>

            <p>
              Browse the menu and select your favorite dishes.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              🛒
            </div>

            <h3>
              Order
            </h3>

            <p>
              Add food to your cart and place your order.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              😋
            </div>

            <h3>
              Enjoy
            </h3>

            <p>
              Track your order and enjoy your delicious meal.
            </p>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="why-section">

        <div className="why-content">

          <p className="section-label">
            WHY HOTELEASE?
          </p>

          <h2>
            Dining made simpler,
            faster and smarter.
          </h2>

          <p>
            HotelEase reduces the dependency on traditional
            waiter-based ordering. Customers can directly
            interact with the digital menu and place their
            orders from their table.
          </p>

          <div className="why-list">

            <div>
              <ShieldCheck size={22} />
              <span>Secure and reliable ordering</span>
            </div>

            <div>
              <Clock size={22} />
              <span>Reduce waiting time</span>
            </div>

            <div>
              <Smartphone size={22} />
              <span>Works perfectly on mobile devices</span>
            </div>

          </div>

        </div>

        <div className="why-visual">

          <div className="why-card">

            <span>🏨</span>

            <h3>
              Smart Restaurant
            </h3>

            <p>
              Scan → Order → Pay → Enjoy
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div>

          <p>
            READY TO GET STARTED?
          </p>

          <h2>
            Enjoy a smarter way to dine.
          </h2>

          <span>
            Scan your table and start ordering today.
          </span>

        </div>

        <button className="cta-button">
          Start Ordering
          <ArrowRight size={18} />
        </button>

      </section>

    </div>
  );
}

export default Home;