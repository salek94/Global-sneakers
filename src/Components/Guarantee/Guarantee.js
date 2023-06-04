import React from "react";
import styles from "./guarantee.module.scss";
import { FaTruck, FaGift, FaCreditCard } from "react-icons/fa";
import { GrDropbox } from "react-icons/gr";

const Guarantee = () => {
  return (
    <div className={styles.guarantee__container}>
      <div className={styles.guarantee__card}>
        <FaTruck className={styles.icon__big} />
        <h4 className={styles.guarantee_title}>FREE SHIPPING</h4>
        <p className={styles.guarantee__desc}>
          Free worldwide shipping on all orders over $100
        </p>
      </div>
      <div className={styles.guarantee__card}>
        <GrDropbox className={styles.icon__big} />
        <h4 className={styles.guarantee_title}>30 DAYS RETURN</h4>
        <p className={styles.guarantee__desc}>
          Returning your order for free is easy: just send us an email
        </p>
      </div>
      <div className={styles.guarantee__card}>
        <FaGift className={styles.icon__big} />
        <h4 className={styles.guarantee_title}>GIFT CARDS</h4>
        <p className={styles.guarantee__desc}>
          Give something extraordinary with our gift cards
        </p>
      </div>
      <div className={styles.guarantee__card}>
        <FaCreditCard className={styles.icon__big} />
        <h4 className={styles.guarantee_title}>100% GUARANTEE</h4>
        <p className={styles.guarantee__desc}>
          If you don't like our products, we'll give you money back, no question
          ask
        </p>
      </div>
    </div>
  );
};

export default Guarantee;
