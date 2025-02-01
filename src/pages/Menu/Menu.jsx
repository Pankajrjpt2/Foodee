import { useState, useEffect, useCallback } from "react";
import { Container, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MenuCard from "../../components/Card";
import foodData from "../../utils/DummyData/foodData.json";
import TopMenuImg from "../../assets/images/TopMenuImg.jpg";
import OrderSummary from "../../components/OrderSummary";

const texts = [
  "Welcome to Our App..",
  "Discover the best food & drinks..",
  "Delicious Meals..",
  "Checking your diet nutrition..",
  "Book Now!",
];

const MenuTop = () => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === currentText) {
          setTypingSpeed(2000); // Pause at the end
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(75);

        if (displayText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, typingSpeed]);

  return (
    <div className="h-[50vh] w-full relative overflow-hidden">
      <img
        className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
        src={TopMenuImg}
        alt="menuimg"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 flex flex-col items-center justify-center backdrop-blur-sm">
        <p className="text-6xl md:text-5xl lg:text-7xl font-okra text-white drop-shadow-xl tracking-wider mb-4 hover:scale-105 transition-transform">
          Foodee
        </p>
        <p className="text-2xl md:text-xl lg:text-2xl text-white drop-shadow-xl text-center px-4 font-light">
          {displayText}
          <span className="animate-blink">|</span>
        </p>
      </div>
    </div>
  );
};
const getTomorrowDay = () => {
  const today = new Date(); // Get today's date
  const tomorrow = new Date(today); // Create a new date object for tomorrow
  tomorrow.setDate(today.getDate() + 1); // Add 1 day to today's date

  // Format the day name (e.g., "Monday", "Tuesday")
  return tomorrow.toLocaleDateString("en-US", { weekday: "long" });
};
const Menu = () => {
  const [foods, setFoods] = useState({});
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (foodData && typeof foodData === "object") {
        const Day = getTomorrowDay();
        if (foodData.weekly_meal_plan[Day]) {
          setFoods(foodData.weekly_meal_plan[Day]);
        } else {
          throw new Error("No food data available for tomorrow");
        }
      } else {
        throw new Error("Food data is not in the expected format");
      }
    } catch (err) {
      setError(err.message);
      setFoods({});
    }
  }, []);

  const handleCartUpdate = useCallback((newCart) => {
    setCart(newCart);
  }, []);

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 20 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuTop />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <Container maxWidth="xl" sx={{ py: 8 }}>
            {Object.entries(foods).map(([category, items]) => (
              <div key={category} className="mb-12">
                <Typography
                  variant="h4"
                  sx={{
                    mb: 5,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "60%",
                      height: "3px",
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  {category}
                </Typography>
                <Grid2 container spacing={4} sx={{ mb: 8 }}>
                  {Array.isArray(items)
                    ? items.map((food) => (
                        <Grid2 key={food.id} xs={12} sm={6} md={4} lg={4}>
                          <MenuCard
                            food={food}
                            cart={cart}
                            setCart={handleCartUpdate}
                          />
                        </Grid2>
                      ))
                    : null}
                </Grid2>
              </div>
            ))}
          </Container>
        </div>
        <div className="w-full lg:w-1/4 lg:min-h-screen lg:sticky lg:top-0 bg-white shadow-lg">
          <Container sx={{ py: 5, height: "100%" }}>
            <OrderSummary cart={cart} />
          </Container>
        </div>
      </div>
    </div>
  );
};

// Update PropTypes for MenuCard component
MenuCard.propTypes = {
  food: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Add other food properties as needed
  }).isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Menu;
