import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";

import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import "./App.css";
import Register from "./components/Register";
import AllUsers from "./components/AllUsers";
import MyTweets from "./components/MyTweets";
import { useEffect, useState } from "react";
function App() {
  const location = useLocation();
  const [navList, setNavList] = useState([
    {
      route: "/register",
      text: "Register",
    },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const pathname = location.pathname;
    const token = sessionStorage.getItem("$myToken$");
    if (pathname === "/") {
      setNavList([
        {
          route: "/register",
          text: "Register",
        },
      ]);
    } else if (pathname === "/register") {
      setNavList([
        {
          route: "/",
          text: "Login",
        },
      ]);
    } else if (token) {
      setNavList([
        {
          route: "/home",
          text: "Home",
        },
        {
          route: "/myTweets",
          text: "My Tweets",
        },
        {
          route: "/allUsers",
          text: "Users",
        },
        {
          route: "/",
          text: "Logout",
        },
      ]);
    }
  }, [location.pathname]);

  const setIsLoggedInValue = (t) => {
    setIsLoggedIn(t);
  };
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} navList={navList} />
      <Routes>
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedInValue} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/allUsers" element={<AllUsers />}></Route>
        <Route path="/myTweets" element={<MyTweets />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
