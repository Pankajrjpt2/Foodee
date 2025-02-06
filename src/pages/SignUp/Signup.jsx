import React from "react";
import Header from "../../components/Header/Header";
import LoginImage from "../../assets/Images/Login.png";
import { SiGnuprivacyguard } from "react-icons/si";
import { useNavigate } from "react-router";
import {
  Avatar,
  Grid2,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";

// Separate form component for better organization
const SignUpForm = ({ handleInputChange, handleSignUp, isLoading }) => {
  return (
    <>
      <div className="w-full flex flex-col space-y-[0.4rem]">
        <TextField
          onChange={handleInputChange}
          name="fullname"
          variant="standard"
          label="Full Name"
          required
          placeholder="Enter your full name"
          className="w-full"
        />
        <TextField
          onChange={handleInputChange}
          name="email"
          variant="standard"
          label="Email Address"
          required
          placeholder="Enter your email address"
          className="w-full"
        />
        <TextField
          onChange={handleInputChange}
          name="username"
          variant="standard"
          label="Username"
          required
          placeholder="Enter Username"
          className="w-full"
        />
        <TextField
          onChange={handleInputChange}
          name="password"
          variant="standard"
          label="Password"
          type="password"
          required
          placeholder="Enter Password"
          className="w-full"
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography sx={{ fontSize: "0.875rem", color: "#555" }}>
              I agree to the Terms and Conditions.
            </Typography>
          }
        />
      </div>
      <div className="w-full flex flex-col mt-[-10px]">
        <Button
          onClick={handleSignUp}
          variant="contained"
          className="w-[100%]"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
        <div className="w-full flex flex-col mt-[5px]">
          <Typography>
            Do you have an account?{" "}
            <Link sx={{ textDecoration: "none" }} href="/login">
              Sign In?
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

SignUpForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const SignUpPage = () => {
  const [currentTab, setCurrentTab] = React.useState(1);
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/login");
    }
    setCurrentTab(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setError("All fields are required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignUp = async (formData) => {
    try {
      await axios.post("http://localhost:3000/signup", formData);
      console.log("Form data:", formData);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const paperStyles = {
    borderRadius: "1.5rem",
    maxWidth: "400px",
    width: "90%",
    maxHeight: "80vh",
    height: "auto",
    overflow: "hidden",
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-[65%] h-full items-center justify-center hidden md:flex">
          <img
            src={LoginImage}
            alt="Login illustration"
            className="h-[80%] w-[80%] object-contain"
          />
        </div>

        <div className="w-full md:w-[35%] h-full flex items-center justify-center">
          <Grid2
            className="flex flex-col items-center"
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Paper
              elevation={10}
              className="p-6 md:p-12 m-4 md:m-9 h-auto md:h-[80vh] flex flex-col items-center space-y-5"
              sx={paperStyles}
            >
              <Tabs
                value={currentTab}
                onChange={handleChange}
                centered
                sx={{ mb: 2 }}
              >
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>

              <Grid2 className="flex flex-col items-center mt-14 space-y-4">
                <Avatar sx={{ bgcolor: "#c7d2fe", width: 60, height: 60 }}>
                  <SiGnuprivacyguard color="black" size={30} />
                </Avatar>
                <p className="text-2xl font-bold">Sign Up</p>
              </Grid2>

              {error && (
                <Typography color="error" className="text-center">
                  {error}
                </Typography>
              )}

              <SignUpForm
                handleInputChange={handleInputChange}
                handleSignUp={handleSignUp}
                isLoading={isLoading}
              />
            </Paper>
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
