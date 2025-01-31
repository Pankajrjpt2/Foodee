import React from "react";
import ReactDOM from "react-dom/client"; // Corrected import
import Header from "./src/components/Header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./src/pages/Menu/Menu";
import Contact from "./src/pages/Contact/Contact";
import SignUpPage from "./src/pages/SignUp/Signup";
import LoginPage from "./src/pages/Login/Login";
import Home from "./src/pages/Home/Home";

const App = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
  },
  {
    path: "/menu",
    element: (
      <>
        <Header />
        <Menu />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Header />
        <Contact />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUpPage />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
