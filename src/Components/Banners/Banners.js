import React, { useEffect, useState } from "react";
import styles from "./banners.module.scss";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ProductService from "../../Service/Api/ProductService";
import { addToCart } from "../../Service/Store/cartSlice";
import {
  isOverviewProductOn,
  singleProduct,
} from "../../Service/Store/productSlice";

const Banners = ({ product, active }) => {
  const [secondImage, setSecondImage] = useState();
  const [changeImage, setChangeImage] = useState();
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.singleProduct(product.id)
      .then((res) => {
        if (res.status === 200) setSecondImage(res.data.assets[1].url);
      })
      .catch((err) => console.error(err));
  }, [active, product.id]);

  const handleAddToCart = (id, name, img, price, inventory, quantity) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        img: img,
        price: price,
        totalPrice: price,
        inventory: inventory,
        quantity: quantity,
      })
    );
    dispatch(
      singleProduct({
        id: id,
        name: name,
        img: img,
        price: price,
        totalPrice: price,
        inventory: inventory,
        quantity: quantity,
      })
    );
    setDisabled(true);
  };

  const goToOverviewProduct = (
    id,
    name,
    img,
    price,
    desc,
    inventory,
    quantity
  ) => {
    dispatch(isOverviewProductOn(true));
    dispatch(
      singleProduct({
        id: id,
        name: name,
        img: img,
        price: price,
        description: desc,
        inventory: inventory,
        totalPrice: price,
        quantity: quantity,
      })
    );
  };

  const goToCheckout = (id, name, img, price, inventory) => {
    dispatch(
      singleProduct({
        id: id,
        name: name,
        image: img,
        price: price,
        inventory: inventory,
        quantity: 1,
        totalPrice: price,
      })
    );
    navigate("/checkout");
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
      <h5>{product.name.substring(0, 34)}</h5>
      <div className={styles.banner__footer}>
        <span>${product.price.raw}</span>
        <div>
          {/* <BsPlusCircle
            onClick={() =>
              handleAddToCart(
                product.id,
                product.name,
                product.image.url,
                product.price.raw,
                product.inventory.available,
                product.quantity
              )
            }
            className={`${styles.banner__plus} ${styles.icon__small}`}
          /> */}
          {!disabled ? (
            <BsPlusCircle
              onClick={() =>
                handleAddToCart(
                  product.id,
                  product.name,
                  product.image.url,
                  product.price.raw,
                  product.inventory.available,
                  product.quantity
                )
              }
              className={`${styles.banner__plus} ${styles.icon__small}`}
            />
          ) : (
            <BsPlusCircle className={styles.icon__small} />
          )}
        </div>
      </div>
      <div className={styles.banner__buttons}>
        <button
          className={styles.banner__btn}
          onClick={() =>
            goToCheckout(
              product.id,
              product.name,
              product.image.url,
              product.price,
              product.inventory.available
            )
          }
        >
          Buy Now
        </button>
        <button
          className={styles.banner__btn}
          onClick={() =>
            goToOverviewProduct(
              product.id,
              product.name,
              product.image.url,
              product.price.raw,
              product.seo.description,
              product.inventory.available,
              product.quantity
            )
          }
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banners;
