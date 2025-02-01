import Header from "./components/Header/Header";
import { createBrowserRouter, RouterProvider } from "react-router";
import Menu from "./pages/Menu/Menu";
import Contact from "./pages/Contact/Contact";
import SignUpPage from "./pages/SignUp/Signup";
import LoginPage from "./pages/Login/Login";
import Home from "./pages/Home/Home";

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

const AppRoute = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default AppRoute;
