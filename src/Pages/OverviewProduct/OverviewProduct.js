import React, { useEffect, useRef, useState } from "react";
import styles from "./overviewProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  isOverviewProductOn,
  incrementCount,
  decrementCount,
  singleProduct,
} from "../../Service/Store/productSlice";
import { GrClose } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addToCart, getLineItems } from "../../Service/Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { commerce } from "../../Components/Lib/commerce";

const OverviewProduct = () => {
  const { product, overviewProductOn } = useSelector(
    (state) => state.productStore
  );
  const { cart } = useSelector((state) => state.cartStore);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  console.log(cart);
  const handlePopUp = () => {
    dispatch(isOverviewProductOn(false));
  };

  const handleAddToCart = (id, name, img, price, quantity) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        image: img,
        price: price,
        totalPrice: price,
        quantity: quantity,
      })
    );
    dispatch(isOverviewProductOn(false));
  };

  const goToCheckout = (id, name, img, price, quantity) => {
    dispatch(getLineItems(""));
    dispatch(
      singleProduct({
        id: id,
        name: name,
        image: img,
        price: price,
        quantity: quantity,
        totalPrice: price,
      })
    );
    dispatch(isOverviewProductOn(false));
    navigate("/checkout");
  };

  // useEffect(() => {
  //   if (isMounted && cart.length > 0) {
  //     commerce.cart
  //       .remove(cart[0].id)
  //       .then((res) => {
  //         console.log("cartLineItemsAfterRemove", res);
  //         setIsMounted(false);
  //       })
  //       .catch((err) => console.error(err))
  //       .finally(setIsMounted(false));
  //   } else setIsMounted(true);
  // }, [cart]);

  const pickedSize = (e) => {
    console.log(e.target.innerText);
  };

  const handleClosePopup = (e) => {
    if (e.target === containerRef.current) {
      dispatch(isOverviewProductOn(false));
    }
  };
  console.log(overviewProductOn);
  return (
    <div
      className={styles.overview__container}
      onClick={handleClosePopup}
      ref={containerRef}
    >
      {overviewProductOn && (
        <div className={styles.overview__popup}>
          <div className={styles.overview__picture}>
            <img src={cart[0].img} alt="" />
          </div>
          <div className={styles.overview__productInfo}>
            <div className={styles.overview__title}>
              <h3>{cart[0].name}</h3>
              <div
                className={styles.overview__closePopup}
                onClick={handlePopUp}
              >
                <GrClose />
              </div>
            </div>
            <h4>${cart[0].price.raw}</h4>
            <div className={styles.overview__desc}>{cart[0].description}</div>
            <div className={styles.overview__size} onClick={pickedSize}>
              <p>Size:</p>
              <button
                className={`${styles.overview__sizeBtn} ${styles.btnPrimary__white}`}
              >
                S
              </button>
              <button
                className={`${styles.overview__sizeBtn} ${styles.btnPrimary__white}`}
              >
                M
              </button>
              <button
                className={`${styles.overview__sizeBtn} ${styles.btnPrimary__white}`}
              >
                L
              </button>
            </div>
            <div className={styles.overview__chooseQuantity}>
              <div className={styles.btn__quantity}>
                <button
                  className={styles.btn__increment}
                  onClick={() => dispatch(decrementCount(product))}
                >
                  <FaMinus />
                </button>
                <span className={styles.btn__count}>{cart[0].quantity}</span>

                <button
                  className={styles.btn__increment}
                  onClick={() => dispatch(incrementCount(product))}
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.id,
                    product.name,
                    product.image,
                    product.price,
                    product.quantity
                  )
                }
                className={`${styles.btnSecondary} ${styles.overview__btnAdd}`}
              >
                Add To Cart
              </button>
            </div>
            <div className={styles.overview__subtotal}>
              <span>Subtotal:</span>
              <h4>${cart[0].totalPrice}</h4>
            </div>

            <button
              className={`${styles.btnPrimary__black} ${styles.overview__btnBuy}`}
              onClick={() =>
                goToCheckout(
                  product.id,
                  product.name,
                  product.image,
                  product.price.raw,
                  product.quantity
                )
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewProduct;
