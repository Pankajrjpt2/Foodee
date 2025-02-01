// Header.jsx
import React from "react"; // You can use icons from react-icons for extra polish
import { SiHomebridge } from "react-icons/si";
import { MdOutlineRestaurantMenu, MdContactSupport } from "react-icons/md";
import { NavLink } from "react-router";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-gray-100 p-6 shadow-lg">
      <div className=" max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-3xl font-semibold flex items-center space-x-2">
          <span className="text-4xl">🍔</span>
          <span className="text-black">Foodee</span>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center w-1/3">
          <input
            type="text"
            className="w-full p-2 pl-10 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for food..."
          />
          <FaSearch className="absolute left-3 text-gray-500" />
        </div>

        {/* Icons / Buttons */}
        <div className="flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 rounded-full ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-black hover:bg-indigo-200"
              } transition`
            }
          >
            <SiHomebridge size={24} />
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `p-2 rounded-full ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-black hover:bg-indigo-200"
              } transition`
            }
          >
            <MdOutlineRestaurantMenu size={24} />
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `p-2 rounded-full ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-black hover:bg-indigo-200"
              } transition`
            }
          >
            <MdContactSupport size={24} />
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `p-2 rounded-full ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-black hover:bg-indigo-200"
              } transition`
            }
          >
            <FaRegUserCircle size={24} />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
