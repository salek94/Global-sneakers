import React from "react";
import "./App.scss";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";
import Footer from "./Layout/Footer/Footer";
import Aside from "./Layout/Aside/Aside";

axios.defaults.baseURL = "https://api.chec.io/v1";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <Aside />
    </>
  );
}

export default App;
