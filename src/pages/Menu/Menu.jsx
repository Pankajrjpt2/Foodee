import React, { useState, useEffect, useCallback, memo } from "react";
import { Container, Box, Typography, Grid2 } from "@mui/material";
import MenuCard from "../../components/Card";
import foodData from "../../utils/DummyData/foodData.json";

const texts = [
  "Welcome to Our Restaurant..",
  "Discover the best food & drinks..",
  "Delicious Meals Await..",
  "Experience Fine Dining..",
  "Order Now!",
];

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setFoods(foodData.foods);
  }, []);

  const handleCartUpdate = useCallback((newCart) => {
    setCart(newCart);
  }, []);

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        className="flex flex-col overflow-hidden relative"
      ></Container>
      <Container maxWidth="xl" sx={{ py: 20 }}>
        <Grid2 container spacing={5}>
          {foods.map((food) => (
            <Grid2 key={food.id} item xs={12} sm={6} md={4} lg={3}>
              <MenuCard food={food} cart={cart} setCart={handleCartUpdate} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};

export default Menu;
