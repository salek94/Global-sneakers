import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CartService from "./Service/Api/CartService";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import Aside from "./Layout/Aside/Aside";
import OverviewProduct from "./Pages/OverviewProduct/OverviewProduct";
import Collection from "./Pages/Collection/Collection";
import { getCardId } from "./Service/Store/cartSlice";

axios.defaults.baseURL = "https://api.chec.io/v1";
//todo scrollbar need to be prettier
function App() {
  const { isCheckoutOn } = useSelector((state) => state.cartStore);
  const { overviewProductOn } = useSelector((state) => state.productStore);
  const dispatch = useDispatch();
  // let nullCardId = cardId = '';
  useEffect(() => {
    const createCart = () => {
      CartService.createCart()
        .then((res) => {
          if (res.status === 201) dispatch(getCardId(res.data.id));
        })
        .catch((err) => console.error(err));
    };
    createCart();
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
