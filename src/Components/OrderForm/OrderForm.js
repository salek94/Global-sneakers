import React from "react";
import styles from "./order.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getLineItems } from "../../Service/Store/cartSlice";
import { singleProduct } from "../../Service/Store/productSlice";

const OrderForm = () => {
  const { customer } = useSelector((state) => state.customerStore);
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addToCart([]));
    dispatch(getLineItems([]));
    dispatch(singleProduct(""));
  };
  return (
    <div className={styles.order__popup}>
      <div>
        <h3>Thank you for your purchase, {customer.firstName}</h3>
      </div>
      <p>We've send you receipt on {customer.email}</p>
      <Link to="/">
        <button
          onClick={handleCart}
          className={`${styles.btnPrimary} ${styles.btnPrimary__white}`}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderForm;
