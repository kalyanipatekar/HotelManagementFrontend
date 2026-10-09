import { Utensils, Coffee, Pizza, Cake } from "lucide-react";

function CategoryCard({ category }) {

  const icons = {
    Indian: <Utensils size={30} />,
    Beverages: <Coffee size={30} />,
    Pizza: <Pizza size={30} />,
    Desserts: <Cake size={30} />,
  };

  return (
    <div className="category-card">

      <div className="category-icon">
        {icons[category.name]}
      </div>

      <h3>{category.name}</h3>

      <p>{category.description}</p>

    </div>
  );
}

export default CategoryCard;