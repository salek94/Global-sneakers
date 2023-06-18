import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { routeConfig } from "./Config/routeConfig";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import Aside from "./Layout/Aside/Aside";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
import OverviewProduct from "./Pages/OverviewProduct/OverviewProduct";
import Collection from "./Pages/Collection/Collection";
import { commerce } from "./Components/Lib/commerce";
import { getCartObjectId, getLineItems } from "./Service/Store/cartSlice";

axios.defaults.baseURL = "https://api.chec.io/v1";
//todo scrollbar need to be prettier
function App() {
  const { isCartOn } = useSelector((state) => state.cartStore);
  const { overviewProductOn, product } = useSelector(
    (state) => state.productStore
  );
  const { hamburgerMenu } = useSelector((state) => state.mobileStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hamburgerMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [hamburgerMenu]);

  useEffect(() => {
    commerce.cart.retrieve().then((cart) => {
      dispatch(getCartObjectId(cart.id));
      console.log("createdCart", cart.id, cart.line_items);
    });
  }, []);
  // useEffect(() => {
  //   commerce.cart.add(product.id).then((res) => {
  //     console.log("cartIdADDTOCART", res.line_items);
  //     dispatch(getLineItems(res.line_items));
  //   });
  // }, [product]);

  // useEffect(() => {
  //   commerce.cart.delete().then((response) => console.log(response));
  // }, []);

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
      {isCartOn && <Aside />}
    </>
  );
}

export default App;
