import React, { useEffect, useState } from "react";
import styles from "./banners.module.scss";
import { BsPlusCircle } from "react-icons/bs";
import ProductService from "../../Service/Api/ProductService";
import { addToCart } from "../../Service/Store/cartSlice";
import {
  isOverviewProductOn,
  singleProduct,
} from "../../Service/Store/productSlice";
import { useDispatch } from "react-redux";

const Banners = ({ product, active }) => {
  const [secondImage, setSecondImage] = useState();
  const [changeImage, setChangeImage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    ProductService.singleProduct(product.id)
      .then((res) => {
        if (res.status === 200) setSecondImage(res.data.assets[1].url);
      })
      .catch((err) => console.error(err));
  }, [active, product.id]);

  const handleAddToCart = (id, name, img, price, quantity) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        img: img,
        price: price,
        count: 1,
        totalPrice: 0,
        quantity: quantity,
      })
    );
  };

  const goToOverviewProduct = (product) => {
    dispatch(isOverviewProductOn(true));
    dispatch(singleProduct(product));
  };

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
            onClick={() =>
              handleAddToCart(
                product.id,
                product.name,
                product.image.url,
                product.price.raw,
                product.inventory.available
              )
            }
            className={`${styles.banner__plus} ${styles.icon__small}`}
          />
        </div>
      </div>
      <div className={styles.banner__buttons}>
        <button className={styles.banner__btn}>Buy Now</button>
        <button
          className={styles.banner__btn}
          onClick={() => goToOverviewProduct(product)}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banners;
