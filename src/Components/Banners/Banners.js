import React from "react";
import styles from "./banners.module.scss";
import { BsPlusCircle } from "react-icons/bs";

const Banners = ({ product }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__img}>
        <img src={product.image.url} alt="" />
      </div>
      <p>{product.name}</p>
      <div className={styles.banner__footer}>
        <span>{product.price.formatted_with_symbol}</span>
        <div>
          <BsPlusCircle className={styles.banner__plus} />
        </div>
      </div>
      <div className={styles.banner__buttons}>
        <button className={styles.banner__btn}>Buy Now</button>
        <button className={styles.banner__btn}>More Info</button>
      </div>
    </div>
  );
};

export default Banners;
