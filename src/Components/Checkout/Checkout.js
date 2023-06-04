import React from "react";
import styles from "./checkout.module.scss";

const Checkout = () => {
  return (
    <aside className={styles.checkout__container}>
      <div className={styles.notCheckout}></div>
      <div className={styles.checkout}></div>
    </aside>
  );
};

export default Checkout;
