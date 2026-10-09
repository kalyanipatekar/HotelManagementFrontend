import { useState } from "react";
import {
  Utensils,
  Search,
  Plus,
  Star,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  MoreVertical,
  X,
  Save,
} from "lucide-react";

function AdminFood() {
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Paneer Tikka",
      category: "Indian",
      price: 249,
      rating: 4.8,
      image: "🍢",
      available: true,
      description: "Grilled paneer with Indian spices.",
    },
    {
      id: 2,
      name: "Butter Paneer",
      category: "Indian",
      price: 289,
      rating: 4.7,
      image: "🍛",
      available: true,
      description: "Creamy paneer cooked in butter gravy.",
    },
    {
      id: 3,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 299,
      rating: 4.8,
      image: "🍕",
      available: true,
      description: "Classic pizza with cheese and tomato.",
    },
    {
      id: 4,
      name: "Farmhouse Pizza",
      category: "Pizza",
      price: 349,
      rating: 4.6,
      image: "🍕",
      available: true,
      description: "Loaded vegetable farmhouse pizza.",
    },
    {
      id: 5,
      name: "Classic Veg Burger",
      category: "Burgers",
      price: 179,
      rating: 4.5,
      image: "🍔",
      available: false,
      description: "Crispy vegetable patty with fresh vegetables.",
    },
    {
      id: 6,
      name: "Cheese Burger",
      category: "Burgers",
      price: 219,
      rating: 4.7,
      image: "🍔",
      available: true,
      description: "Juicy veg burger with melted cheese.",
    },
    {
      id: 7,
      name: "Cold Coffee",
      category: "Beverages",
      price: 129,
      rating: 4.8,
      image: "🥤",
      available: true,
      description: "Chilled creamy coffee.",
    },
    {
      id: 8,
      name: "Fresh Lime Soda",
      category: "Beverages",
      price: 99,
      rating: 4.5,
      image: "🍋",
      available: true,
      description: "Refreshing fresh lime soda.",
    },
    {
      id: 9,
      name: "Chocolate Brownie",
      category: "Desserts",
      price: 159,
      rating: 4.9,
      image: "🍫",
      available: true,
      description: "Warm chocolate brownie.",
    },
    {
      id: 10,
      name: "Gulab Jamun",
      category: "Desserts",
      price: 119,
      rating: 4.8,
      image: "🍮",
      available: true,
      description: "Soft gulab jamun served warm.",
    },
  ]);

  const [categories, setCategories] = useState([
    "Indian",
    "Pizza",
    "Burgers",
    "Beverages",
    "Desserts",
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [showFoodForm, setShowFoodForm] =
    useState(false);

  const [editingFood, setEditingFood] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "🍽️",
    description: "",
    available: true,
  });

  const [formError, setFormError] = useState("");

  const [newCategory, setNewCategory] =
    useState("");

  const categoryFilters = [
    "All",
    ...categories,
  ];

  const filteredFood = foodItems.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openAddForm = () => {
    setEditingFood(null);

    setFormData({
      name: "",
      category: categories[0] || "",
      price: "",
      image: "🍽️",
      description: "",
      available: true,
    });

    setFormError("");
    setShowFoodForm(true);
  };

  const openEditForm = (food) => {
    setEditingFood(food);

    setFormData({
      name: food.name,
      category: food.category,
      price: food.price,
      image: food.image,
      description: food.description,
      available: food.available,
    });

    setFormError("");
    setShowFoodForm(true);
  };

  const closeFoodForm = () => {
    setShowFoodForm(false);
    setEditingFood(null);
    setFormError("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = () => {
    setFormData((currentData) => ({
      ...currentData,
      available: !currentData.available,
    }));
  };

  const handleSaveFood = (event) => {
    event.preventDefault();

    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Please enter food name.");
      return;
    }

    if (!formData.category) {
      setFormError("Please select a category.");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
      setFormError("Please enter a valid price.");
      return;
    }

    if (!formData.description.trim()) {
      setFormError("Please enter food description.");
      return;
    }

    if (editingFood) {
      setFoodItems((currentItems) =>
        currentItems.map((food) =>
          food.id === editingFood.id
            ? {
                ...food,
                name: formData.name.trim(),
                category: formData.category,
                price: Number(formData.price),
                image: formData.image,
                description:
                  formData.description.trim(),
                available: formData.available,
              }
            : food
        )
      );
    } else {
      const newFood = {
        id: Date.now(),
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        rating: 0,
        image: formData.image,
        available: formData.available,
        description:
          formData.description.trim(),
      };

      setFoodItems((currentItems) => [
        newFood,
        ...currentItems,
      ]);
    }

    closeFoodForm();
  };

  const toggleAvailability = (id) => {
    setFoodItems((currentItems) =>
      currentItems.map((food) =>
        food.id === id
          ? {
              ...food,
              available: !food.available,
            }
          : food
      )
    );
  };

  const deleteFood = (id) => {
    setFoodItems((currentItems) =>
      currentItems.filter((food) => food.id !== id)
    );
  };

  const addCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) {
      return;
    }

    const categoryExists = categories.some(
      (category) =>
        category.toLowerCase() ===
        trimmedCategory.toLowerCase()
    );

    if (categoryExists) {
      return;
    }

    setCategories((currentCategories) => [
      ...currentCategories,
      trimmedCategory,
    ]);

    setNewCategory("");
  };

  const totalItems = foodItems.length;

  const availableItems = foodItems.filter(
    (food) => food.available
  ).length;

  const unavailableItems = foodItems.filter(
    (food) => !food.available
  ).length;

  const averageRating =
    foodItems.length > 0
      ? (
          foodItems.reduce(
            (total, food) => total + food.rating,
            0
          ) / foodItems.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="admin-food-page">

      {/* Header */}
      <div className="admin-food-header">

        <div className="admin-food-title">

          <div className="admin-food-title-icon">
            <Utensils size={23} />
          </div>

          <div>
            <h1>Food Menu</h1>

            <p>
              Manage food items, prices and availability.
            </p>
          </div>

        </div>

        <button
          className="admin-add-food-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Food Item
        </button>

      </div>

      {/* Statistics */}
      <div className="admin-food-stats">

        <div className="admin-food-stat-card">

          <div className="admin-food-stat-icon total">
            <Utensils size={20} />
          </div>

          <div>
            <span>Total Items</span>
            <strong>{totalItems}</strong>
          </div>

        </div>

        <div className="admin-food-stat-card">

          <div className="admin-food-stat-icon available">
            <CheckCircle size={20} />
          </div>

          <div>
            <span>Available</span>
            <strong>{availableItems}</strong>
          </div>

        </div>

        <div className="admin-food-stat-card">

          <div className="admin-food-stat-icon unavailable">
            <XCircle size={20} />
          </div>

          <div>
            <span>Unavailable</span>
            <strong>{unavailableItems}</strong>
          </div>

        </div>

        <div className="admin-food-stat-card">

          <div className="admin-food-stat-icon rating">
            <Star size={20} />
          </div>

          <div>
            <span>Average Rating</span>
            <strong>{averageRating}</strong>
          </div>

        </div>

      </div>

      {/* Controls */}
      <div className="admin-food-controls">

        <div className="admin-food-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>

        <div className="admin-food-categories">

          {categoryFilters.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "admin-food-category active"
                  : "admin-food-category"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

      </div>

      {/* Food Grid */}
      <div className="admin-food-grid">

        {filteredFood.map((food) => (

          <div
            className="admin-food-card"
            key={food.id}
          >

            <div className="admin-food-image">

              <span>
                {food.image}
              </span>

              <span
                className={
                  food.available
                    ? "admin-food-availability available"
                    : "admin-food-availability unavailable"
                }
              >
                {food.available
                  ? "Available"
                  : "Unavailable"}
              </span>

              <button className="admin-food-more">
                <MoreVertical size={18} />
              </button>

            </div>

            <div className="admin-food-content">

              <div className="admin-food-name-row">

                <div>
                  <span className="admin-food-category-label">
                    {food.category}
                  </span>

                  <h3>{food.name}</h3>
                </div>

                <div className="admin-food-rating">
                  <Star
                    size={13}
                    fill="currentColor"
                  />
                  {food.rating || "New"}
                </div>

              </div>

              <p className="admin-food-description">
                {food.description}
              </p>

              <div className="admin-food-bottom">

                <strong>
                  ₹{food.price}
                </strong>

                <label className="availability-switch">

                  <input
                    type="checkbox"
                    checked={food.available}
                    onChange={() =>
                      toggleAvailability(food.id)
                    }
                  />

                  <span className="switch-slider"></span>

                </label>

              </div>

              <div className="admin-food-actions">

                <button
                  className="admin-food-edit"
                  onClick={() =>
                    openEditForm(food)
                  }
                >
                  <Edit3 size={15} />
                  Edit
                </button>

                <button
                  className="admin-food-delete"
                  onClick={() =>
                    deleteFood(food.id)
                  }
                >
                  <Trash2 size={15} />
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {filteredFood.length === 0 && (

        <div className="admin-food-empty">

          <Utensils size={42} />

          <h3>No Food Items Found</h3>

          <p>
            Try another search or select a different category.
          </p>

        </div>

      )}

      {/* Add / Edit Modal */}
      {showFoodForm && (

        <div className="food-modal-overlay">

          <div className="food-modal">

            <div className="food-modal-header">

              <div>
                <h2>
                  {editingFood
                    ? "Edit Food Item"
                    : "Add Food Item"}
                </h2>

                <p>
                  {editingFood
                    ? "Update the food item details."
                    : "Add a new item to your menu."}
                </p>
              </div>

              <button
                className="food-modal-close"
                onClick={closeFoodForm}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSaveFood}>

              <div className="food-form-grid">

                {/* Food Name */}
                <div className="food-form-group full">

                  <label>
                    Food Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Paneer Tikka"
                    value={formData.name}
                    onChange={handleFormChange}
                  />

                </div>

                {/* Category */}
                <div className="food-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                </div>

                {/* Price */}
                <div className="food-form-group">

                  <label>
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="1"
                    placeholder="249"
                    value={formData.price}
                    onChange={handleFormChange}
                  />

                </div>

                {/* Emoji */}
                <div className="food-form-group">

                  <label>
                    Food Image
                  </label>

                  <select
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                  >
                    <option value="🍽️">
                      🍽️ Food
                    </option>

                    <option value="🍢">
                      🍢 Starter
                    </option>

                    <option value="🍛">
                      🍛 Indian
                    </option>

                    <option value="🍕">
                      🍕 Pizza
                    </option>

                    <option value="🍔">
                      🍔 Burger
                    </option>

                    <option value="🥤">
                      🥤 Beverage
                    </option>

                    <option value="🍫">
                      🍫 Dessert
                    </option>

                    <option value="🍮">
                      🍮 Sweet
                    </option>

                  </select>

                </div>

                {/* Availability */}
                <div className="food-form-group">

                  <label>
                    Availability
                  </label>

                  <button
                    type="button"
                    className={
                      formData.available
                        ? "food-availability-button active"
                        : "food-availability-button"
                    }
                    onClick={handleAvailabilityChange}
                  >
                    {formData.available ? (
                      <>
                        <CheckCircle size={17} />
                        Available
                      </>
                    ) : (
                      <>
                        <XCircle size={17} />
                        Unavailable
                      </>
                    )}
                  </button>

                </div>

                {/* Description */}
                <div className="food-form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Enter a short description..."
                    value={formData.description}
                    onChange={handleFormChange}
                  />

                </div>

              </div>

              {/* Category Management */}
              <div className="category-management">

                <div className="category-management-title">

                  <div>
                    <h3>
                      Manage Categories
                    </h3>

                    <p>
                      Add categories for your menu.
                    </p>
                  </div>

                </div>

                <div className="category-add-row">

                  <input
                    type="text"
                    placeholder="New category"
                    value={newCategory}
                    onChange={(event) =>
                      setNewCategory(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addCategory();
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={addCategory}
                  >
                    <Plus size={16} />
                    Add
                  </button>

                </div>

                <div className="category-chip-list">

                  {categories.map((category) => (

                    <span
                      className="category-chip"
                      key={category}
                    >
                      {category}
                    </span>

                  ))}

                </div>

              </div>

              {formError && (
                <div className="food-form-error">
                  ⚠️ {formError}
                </div>
              )}

              <div className="food-modal-actions">

                <button
                  type="button"
                  className="food-cancel-button"
                  onClick={closeFoodForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="food-save-button"
                >
                  <Save size={17} />

                  {editingFood
                    ? "Update Food"
                    : "Save Food"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}

export default AdminFood;