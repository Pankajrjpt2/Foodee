import React from "react";
import Header from "../../components/Header/Header";
import LoginImage from "../../assets/Images/Login.png";
import { SiGnuprivacyguard } from "react-icons/si";
import { Navigate, useNavigate } from "react-router";
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

// Separate form component for better organization
const SignUpForm = () => {
  return (
    <>
      <div className="w-full flex flex-col space-y-[0.4rem]">
        <TextField
          variant="standard"
          label="Full Name"
          required
          placeholder="Enter your full name"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Email Address"
          required
          placeholder="Enter your email address"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Username"
          required
          placeholder="Enter Username"
          className="w-full"
        />
        <TextField
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
        <Button variant="contained" className="w-[100%]">
          Sign Up
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

const SignUpPage = () => {
  const [currentTab, setCurrentTab] = React.useState(1);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/login");
    }
    setCurrentTab(newValue);
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

              <SignUpForm />
            </Paper>
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
