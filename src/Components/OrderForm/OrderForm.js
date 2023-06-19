import React from "react";
import styles from "./order.module.scss";
import { useSelector } from "react-redux";

const OrderForm = () => {
  const { customer } = useSelector((state) => state.customerStore);
  console.log(customer);

  return <div>OrderForm</div>;
};

export default OrderForm;
