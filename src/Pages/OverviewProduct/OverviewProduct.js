import React, { useEffect, useRef, useState } from "react";
import styles from "./overviewProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  isOverviewProductOn,
  singleProduct,
} from "../../Service/Store/productSlice";
import { GrClose } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  getLineItems,
  incrementCount,
  decrementCount,
} from "../../Service/Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { commerce } from "../../Components/Lib/commerce";

const OverviewProduct = () => {
  const { product, overviewProductOn } = useSelector(
    (state) => state.productStore
  );
  const { cart, cartLineItems } = useSelector((state) => state.cartStore);
  const [isMounted, setIsMounted] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [a, setA] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  console.log(cartLineItems[0]);
  const handlePopUp = () => {
    dispatch(isOverviewProductOn(false));
  };

  useEffect(() => {
    if (isMounted) {
      commerce.cart
        .update(cartLineItems[0].id, { quantity: cartLineItems[0].quantity })
        .then((response) => {
          console.log(response);
          setIsMounted(false);
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [updateProduct]);

  useEffect(() => {
    if (isMounted) {
      commerce.cart
        .remove(cartLineItems[0].id)
        .then((res) => {
          console.log("cartLineItemsAfterRemove", res);
          dispatch(getLineItems(res.line_items));
          dispatch(isOverviewProductOn(false));
          setIsMounted(false);
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [a]);

  const handleDecrement = (product) => {
    setUpdateProduct(!updateProduct);
    dispatch(decrementCount(product.id));
  };
  const handleIncrement = (product) => {
    console.log(product);

    setUpdateProduct(!updateProduct);
    dispatch(incrementCount(product.id));
  };

  // const handleAddToCart = (id) => {
  //   dispatch(
  //     singleProduct({
  //       id: id,
  //     })
  //   );
  //   dispatch(isOverviewProductOn(false));
  // };

  const goToCheckout = (id, name, img, price, quantity) => {
    dispatch(
      singleProduct({
        id: id,
        // name: name,
        // image: img,
        // price: price,
        // quantity: quantity,
        // totalPrice: price,
      })
    );
    dispatch(isOverviewProductOn(false));
    navigate("/checkout");
  };

  const pickedSize = (e) => {
    console.log(e.target.innerText);
  };

  const handleClosePopup = (e) => {
    if (e.target === containerRef.current) {
      // dispatch(isOverviewProductOn(false));
      setA(!a);
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
            <div className={styles.overview__size}>
              <p>Size:</p>
              <button
                onClick={pickedSize}
                className={`${styles.overview__sizeBtn} ${styles.btnPrimary__white}`}
              >
                S
              </button>

              <button
                onClick={pickedSize}
                className={`${styles.overview__sizeBtn} ${styles.btnPrimary__white}`}
              >
                M
              </button>
              <button
                onClick={pickedSize}
                className={`${styles.overview__sizeBtn} ${styles.btnPrimary__white}`}
              >
                L
              </button>
            </div>
            <div className={styles.overview__chooseQuantity}>
              <div className={styles.btn__quantity}>
                <button
                  className={styles.btn__increment}
                  onClick={() => handleDecrement(cartLineItems[0])}
                >
                  <FaMinus />
                </button>
                {cartLineItems.length > 0 ? (
                  <span className={styles.btn__count}>
                    {cartLineItems[0].quantity}
                  </span>
                ) : (
                  <span className={styles.btn__count}>{cart[0].quantity}</span>
                )}

                <button
                  className={styles.btn__increment}
                  onClick={() => handleIncrement(cartLineItems[0])}
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={
                  () => dispatch(isOverviewProductOn(false))
                  // handleAddToCart(
                  //   product.id,
                  //   product.name,
                  //   product.image,
                  //   product.price,
                  //   product.quantity
                  // )
                }
                className={`${styles.btnSecondary} ${styles.overview__btnAdd}`}
              >
                Add To Cart
              </button>
            </div>
            <div className={styles.overview__subtotal}>
              <span>Subtotal:</span>
              {cartLineItems.length > 0 ? (
                <h4>${cartLineItems[0].totalPrice.raw}</h4>
              ) : (
                <h4>${cart[0].totalPrice.raw}</h4>
              )}
            </div>

            <button
              className={`${styles.btnPrimary__black} ${styles.overview__btnBuy}`}
              onClick={() =>
                goToCheckout(
                  cartLineItems[0].id
                  // product.id,
                  // product.name,
                  // product.image,
                  // product.price.raw,
                  // product.quantity
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
