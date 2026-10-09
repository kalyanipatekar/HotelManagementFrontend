import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Star,
  SlidersHorizontal,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const categories = [
  "All",
  "Indian",
  "Pizza",
  "Burgers",
  "Beverages",
  "Desserts",
];

const foodItems = [
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Indian",
    price: 249,
    rating: 4.8,
    type: "Veg",
    image: "🍢",
    description:
      "Soft paneer marinated with Indian spices and grilled perfectly.",
  },
  {
    id: 2,
    name: "Butter Paneer",
    category: "Indian",
    price: 289,
    rating: 4.7,
    type: "Veg",
    image: "🍛",
    description:
      "Creamy paneer curry prepared with rich tomato gravy.",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.8,
    type: "Veg",
    image: "🍕",
    description:
      "Classic pizza topped with mozzarella, tomato and fresh herbs.",
  },
  {
    id: 4,
    name: "Farmhouse Pizza",
    category: "Pizza",
    price: 349,
    rating: 4.6,
    type: "Veg",
    image: "🍕",
    description:
      "Loaded with fresh vegetables and delicious cheese.",
  },
  {
    id: 5,
    name: "Classic Veg Burger",
    category: "Burgers",
    price: 179,
    rating: 4.5,
    type: "Veg",
    image: "🍔",
    description:
      "Crispy vegetable patty with fresh lettuce and sauces.",
  },
  {
    id: 6,
    name: "Cheese Burger",
    category: "Burgers",
    price: 219,
    rating: 4.7,
    type: "Veg",
    image: "🍔",
    description:
      "Juicy burger layered with cheese and fresh vegetables.",
  },
  {
    id: 7,
    name: "Cold Coffee",
    category: "Beverages",
    price: 129,
    rating: 4.8,
    type: "Veg",
    image: "🥤",
    description:
      "Refreshing chilled coffee topped with creamy foam.",
  },
  {
    id: 8,
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 99,
    rating: 4.5,
    type: "Veg",
    image: "🍋",
    description:
      "Fresh and refreshing lime soda served chilled.",
  },
  {
    id: 9,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 159,
    rating: 4.9,
    type: "Veg",
    image: "🍫",
    description:
      "Warm chocolate brownie with a rich and soft center.",
  },
  {
    id: 10,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 119,
    rating: 4.8,
    type: "Veg",
    image: "🍮",
    description:
      "Traditional Indian dessert served warm with sweet syrup.",
  },
];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Get addToCart function from CartContext
  const { addToCart } = useCart();

  const filteredFoods = useMemo(() => {
    return foodItems.filter((food) => {
      const matchesCategory =
        selectedCategory === "All" ||
        food.category === selectedCategory;

      const matchesSearch =
        food.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        food.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (food) => {
    addToCart(food);
  };

  return (
    <div className="menu-page">

      {/* ================= HEADER ================= */}
      <section className="menu-header">
        <div>
          <span className="menu-badge">
            <ShoppingCart size={16} />
            Freshly Prepared
          </span>

          <h1>Explore Our Menu</h1>

          <p>
            Discover delicious dishes prepared specially for you.
            Choose your favorite food and enjoy a seamless dining
            experience.
          </p>
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="menu-controls">

        <div className="menu-search">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="filter-button"
        >
          <SlidersHorizontal size={18} />
          Filter
        </button>

      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="category-filter-section">

        <div className="category-filter-header">
          <h2>Categories</h2>

          <span>
            {filteredFoods.length} items
          </span>
        </div>

        <div className="category-filters">

          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                selectedCategory === category
                  ? "category-filter active"
                  : "category-filter"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}

        </div>

      </section>

      {/* ================= FOOD GRID ================= */}
      <section className="menu-food-section">

        {filteredFoods.length > 0 ? (

          <div className="menu-food-grid">

            {filteredFoods.map((food) => (

              <div
                className="menu-food-card"
                key={food.id}
              >

                {/* Food Image */}
                <div className="menu-food-image">

                  <span>
                    {food.image}
                  </span>

                  <div className="food-type-badge">

                    <span></span>

                    {food.type}

                  </div>

                </div>

                {/* Food Content */}
                <div className="menu-food-content">

                  <div className="menu-food-top">

                    <div>

                      <span className="menu-food-category">
                        {food.category}
                      </span>

                      <h3>
                        {food.name}
                      </h3>

                    </div>

                    <div className="menu-food-rating">

                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      {food.rating}

                    </div>

                  </div>

                  <p>
                    {food.description}
                  </p>

                  <div className="menu-food-bottom">

                    <div className="menu-food-price">
                      ₹{food.price}
                    </div>

                    <button
                      type="button"
                      className="menu-add-button"
                      onClick={() => handleAddToCart(food)}
                    >
                      <ShoppingCart size={17} />
                      Add
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= NO FOOD FOUND ================= */

          <div className="menu-empty">

            <div className="menu-empty-icon">
              🔍
            </div>

            <h2>
              No food found
            </h2>

            <p>
              We couldn't find any food matching your search.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              View All Food
            </button>

          </div>

        )}

      </section>

    </div>
  );
}

export default Menu;