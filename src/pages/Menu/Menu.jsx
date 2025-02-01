import { useState, useEffect, useCallback } from "react";
import { Container, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MenuCard from "../../components/Card";
import foodData from "../../utils/DummyData/foodData.json";
import TopMenuImg from "../../assets/images/TopMenuImg.jpg";
import OrderSummary from "../../components/OrderSummary";

const texts = [
  "Welcome to Our Restaurant..",
  "Discover the best food & drinks..",
  "Delicious Meals Await..",
  "Experience Fine Dining..",
  "Order Now!",
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
    <>
      <div className="h-[45vh] w-full relative">
        <img
          className="w-full h-full object-cover"
          src={TopMenuImg}
          alt="menuimg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 flex flex-col items-center justify-center">
          <p className="text-5xl md:text-4xl lg:text-7xl font-okra text-white drop-shadow-lg font-bold">
            Foodee
          </p>
          <p className="text-xl md:text-1xl lg:text-2xl text-white drop-shadow-lg text-center px-4">
            {displayText}
            <span className="animate-blink">|</span>
          </p>
        </div>
      </div>
    </>
  );
};

const Menu = () => {
  const [foods, setFoods] = useState({});
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (foodData && typeof foodData === "object") {
        setFoods(foodData.foods);
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
    <div>
      <div className="h-[45vh] w-full relative">
        <MenuTop />
      </div>
      <div className="flex">
        <div>
          <Container maxWidth="xl" sx={{ py: 20 }}>
            {Object.entries(foods).map(([category, items]) => (
              <div key={category}>
                <Typography
                  variant="h4"
                  sx={{ mb: 4, textTransform: "capitalize" }}
                >
                  {category}
                </Typography>
                <Grid2 container spacing={5} sx={{ mb: 8 }}>
                  {Array.isArray(items)
                    ? items.map((food) => (
                        <Grid2 key={food.id} item xs={12} sm={6} md={4} lg={3}>
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
        <div>
          <Container maxWidth="xl" sx={{ py: 20 }}>
            <OrderSummary cart={cart} />
          </Container>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes for MenuCard component
MenuCard.propTypes = {
  food: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // Add other food properties as needed
  }).isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Menu;
