import React, { useEffect, useState } from "react";
import styles from "./banners.module.scss";
import { BsPlusCircle } from "react-icons/bs";
import ProductService from "../../Service/Api/ProductService";

const Banners = ({ product, active }) => {
  const [secondImage, setSecondImage] = useState();
  const [changeImage, setChangeImage] = useState();
  useEffect(() => {
    ProductService.singleProduct(product.id)
      .then((res) => {
        if (res.status === 200) setSecondImage(res.data.assets[1].url);
      })
      .catch((err) => console.error(err));
  }, [active]);

  return (
    <div className={styles.banner}>
      <div
        className={styles.banner__img}
        onMouseEnter={() => setChangeImage(true)}
        onMouseLeave={() => setChangeImage(false)}
      >
        {!changeImage ? (
          <img src={product.image.url} alt="" />
        ) : (
          <img src={secondImage} alt="" />
        )}
      </div>
      <p>{product.name.substring(0, 34)}</p>
      <div className={styles.banner__footer}>
        <span>{product.price.formatted_with_symbol}</span>
        <div>
          <BsPlusCircle
            className={`${styles.banner__plus} ${styles.icon__small}`}
          />
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
