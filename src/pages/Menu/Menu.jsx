import React, { useState, useEffect, useCallback, memo } from "react";
import { Container, Box, Typography, Grid2 } from "@mui/material";
import MenuCard from "../../components/Card";
import foodData from "../../utils/DummyData/foodData.json";
import TopBarImage from "../../assets/Images/TopMenuImg.jpg";
import OrderSummary from "../../components/OrderSummary";

const texts = [
  "Welcome to Our Restaurant..",
  "Discover the best food & drinks..",
  "Delicious Meals Await..",
  "Experience Fine Dining..",
  "Order Now!",
];

// Move texts array outside component to prevent recreating on each render
const TYPING_SPEED = { DELETING: 50, TYPING: 100 };
const PAUSE_BEFORE_DELETE = 1000;

// Separate TopBar into its own file: src/components/TopBar/TopBar.jsx
//