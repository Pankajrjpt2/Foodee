import React, { useState } from "react";
import PropTypes from "prop-types";
import TopMenuImg from "../assets/Images/TopMenuImg.jpg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function MenuCard({ food, cart, setCart }) {
  const [expanded, setExpanded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (isAdded) {
      setIsAdded(false);
      setCart(cart.filter((item) => item.id !== food.id));
    } else {
      setIsAdded(true);
      setCart([...cart, food]);
    }
  };

  return (
    <div className="w-60 h-auto bg-white rounded-2xl shadow-lg p-4 flex flex-col">
      <div className="mb-4">
        <img
          src={food.image}
          alt="Menu item"
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{food.name}</h2>
        <p className="text-gray-600 text-sm">Category: {food.category}</p>
        <p className="text-gray-800 font-medium">calories: {food.calories}</p>
        {expanded && (
          <div className="space-y-1 text-sm">
            <p className="text-red-600">Protein: {food.protein_g}g</p>
            <p className="text-yellow-600">Fat: {food.fat_g}g</p>
            <p className="text-green-600">Carbs: {food.carbs_g}g</p>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-600 hover:text-gray-800"
        >
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        <button
          onClick={handleAdd}
          className={`mt-auto py-2 px-4 rounded-lg transition-colors ${
            isAdded
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isAdded ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}

MenuCard.propTypes = {
  food: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default MenuCard;
