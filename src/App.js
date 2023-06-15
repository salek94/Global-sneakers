import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { routeConfig } from "./Config/routeConfig";
import CartService from "./Service/Api/CartService";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import Aside from "./Layout/Aside/Aside";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
import OverviewProduct from "./Pages/OverviewProduct/OverviewProduct";
import Collection from "./Pages/Collection/Collection";
import { getCardId } from "./Service/Store/cartSlice";

axios.defaults.baseURL = "https://api.chec.io/v1";
//todo scrollbar need to be prettier
function App() {
  const { isCheckoutOn } = useSelector((state) => state.cartStore);
  const { overviewProductOn } = useSelector((state) => state.productStore);
  const { hamburgerMenu } = useSelector((state) => state.mobileStore);
  const dispatch = useDispatch();
  // let nullCardId = cardId = '';

  useEffect(() => {
    if (!hamburgerMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [hamburgerMenu]);

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
        <Route path={routeConfig.HOME.url} element={<Layout />} />
        <Route path={routeConfig.COLLECTION.url} element={<Collection />}>
          <Route
            path={routeConfig.COLLECTION.subURL.men}
            element={<Collection />}
          />
          <Route
            path={routeConfig.COLLECTION.subURL.women}
            element={<Collection />}
          />
          <Route
            path={routeConfig.COLLECTION.subURL.kids}
            element={<Collection />}
          />
          <Route
            path={routeConfig.COLLECTION.subURL.all}
            element={<Collection />}
          />
          <Route
            path={routeConfig.COLLECTION.subURL.best}
            element={<Collection />}
          />
          <Route
            path={routeConfig.COLLECTION.subURL.new}
            element={<Collection />}
          />
        </Route>
        <Route path={routeConfig.CHECKOUT.url} element={<CheckoutForm />} />
      </Routes>
      {overviewProductOn && <OverviewProduct />}
      {isCheckoutOn && <Aside />}
    </>
  );
}

export default App;
