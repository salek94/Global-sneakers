import React, { useEffect, useState } from "react";
import styles from "./banners.module.scss";
import { BsPlusCircle } from "react-icons/bs";
import ProductService from "../../Service/Api/ProductService";
import CartService from "../../Service/Api/CartService";
import { addToCart } from "../../Service/Store/cartSlice";
import {
  isOverviewProductOn,
  singleProduct,
} from "../../Service/Store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Banners = ({ product, active }) => {
  const [secondImage, setSecondImage] = useState();
  const [changeImage, setChangeImage] = useState();
  const dispatch = useDispatch();
  const { cartId, cart } = useSelector((state) => state.cartStore);
  // console.log("sss", cartId);
  useEffect(() => {
    ProductService.singleProduct(product.id)
      .then((res) => {
        if (res.status === 200) setSecondImage(res.data.assets[1].url);
      })
      .catch((err) => console.error(err));
  }, [active, product.id]);

  // useEffect(() => {
  //   const addToCart = (cartId, cart) => {
  //     CartService.addItemToCart(cartId, cart)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   if (cart) {
  //     addToCart(cartId, cart);
  //   }
  // }, [cart, cartId]);

  const handleAddToCart = (id, name, img, price, quantity) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        img: img,
        price: price,
        count: 1,
        totalPrice: price,
        quantity: quantity,
      })
    );
  };

  const goToOverviewProduct = (id, name, img, price, desc, quantity) => {
    dispatch(isOverviewProductOn(true));
    dispatch(
      singleProduct({
        id: id,
        name: name,
        img: img,
        price: price,
        description: desc,
        quantity: quantity,
        count: 1,
        totalPrice: price,
      })
    );
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
        <span>${product.price.raw}</span>
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
          onClick={() =>
            goToOverviewProduct(
              product.id,
              product.name,
              product.image.url,
              product.price.raw,
              product.seo.description,
              product.inventory.available
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
