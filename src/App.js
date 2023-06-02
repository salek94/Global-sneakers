import React from "react";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Layout/Header/Header";
import Main from "./Layout/Main/Main";
import axios from "axios";

axios.defaults.baseURL = "https://api.chec.io/v1";

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
