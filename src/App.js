import React from "react";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import Aside from "./Layout/Aside/Aside";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
import { Route, Routes } from "react-router-dom";
import OverviewProduct from "./Pages/OverviewProduct/OverviewProduct";
import Collection from "./Pages/Collection/Collection";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_Z8v5IJjNrjmaldcUocBhl4tL00Gbc2HtTc");

axios.defaults.baseURL = "https://api.chec.io/v1";
//todo scrollbar need to be prettier
function App() {
  const { isCheckoutOn } = useSelector((state) => state.cartStore);
  const { overviewProductOn } = useSelector((state) => state.productStore);
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "gway_mwJZeaDe1PEYwe",
  // };

  return (
    <>
      {/* <Elements stripe={stripePromise}> */}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/collection" element={<Collection />}>
          <Route path="men" element={<Collection />} />
          <Route path="women" element={<Collection />} />
          <Route path="kids" element={<Collection />} />
          <Route path="all" element={<Collection />} />
        </Route>
        {/* <Route path="/checkout" element={<CheckoutForm />} /> */}
      </Routes>
      {overviewProductOn && <OverviewProduct />}
      {isCheckoutOn && <Aside />}
      {/* </Elements> */}
    </>
  );
}

export default App;
