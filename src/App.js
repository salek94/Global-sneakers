import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { routeConfig } from "./Config/routeConfig";
import { ToastContainer } from "react-toastify";
import { ToastContainerSettings } from "./Components/Features/settings";
import "react-toastify/dist/ReactToastify.css";
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
import OrderForm from "./Components/OrderForm/OrderForm";

axios.defaults.baseURL = "https://api.chec.io/v1";

function App() {
  const { isCartOn } = useSelector((state) => state.cartStore);
  const { overviewProductOn, product } = useSelector(
    (state) => state.productStore
  );
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    commerce.cart.retrieve().then((cart) => {
      dispatch(getCartObjectId(cart.id));
      dispatch(getLineItems(cart.line_items));
    });
  }, []);
  useEffect(() => {
    if (isMounted) {
      commerce.cart
        .add(product.id)
        .then((res) => {
          dispatch(getLineItems(res.line_items));
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [product]);

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
        <Route path={routeConfig.ORDER.url} element={<OrderForm />} />
      </Routes>
      {overviewProductOn && <OverviewProduct />}
      {isCartOn && <Aside />}
      <ToastContainer {...ToastContainerSettings} />
    </>
  );
}

export default App;
