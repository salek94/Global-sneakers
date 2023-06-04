import React from "react";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";
import Footer from "./Layout/Footer/Footer";
import Aside from "./Layout/Aside/Aside";

axios.defaults.baseURL = "https://api.chec.io/v1";

function App() {
  const { isCheckoutOn } = useSelector((state) => state.cartStore);

  return (
    <>
      <Header />
      <Main />
      <Footer />
      {isCheckoutOn && <Aside />}
    </>
  );
}

export default App;
