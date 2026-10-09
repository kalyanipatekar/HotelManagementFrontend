import { ShoppingCart, Star } from "lucide-react";

function FoodCard({ food }) {

  return (
    <div className="food-card">

      <div className="food-image">

        <span className="food-emoji">
          {food.image}
        </span>

      </div>

      <div className="food-content">

        <div className="food-title-row">

          <h3>{food.name}</h3>

          <div className="food-rating">
            <Star size={15} fill="currentColor" />
            {food.rating}
          </div>

        </div>

        <p className="food-category">
          {food.category}
        </p>

        <p className="food-description">
          {food.description}
        </p>

        <div className="food-bottom">

          <span className="food-price">
            ₹{food.price}
          </span>

          <button className="add-cart-button">
            <ShoppingCart size={17} />
            Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;