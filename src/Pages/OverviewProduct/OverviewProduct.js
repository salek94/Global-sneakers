import React from "react";
import styles from "./overviewProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  isOverviewProductOn,
  singleProduct,
  incrementCount,
  decrementCount,
} from "../../Service/Store/productSlice";
import { GrClose } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";

const OverviewProduct = () => {
  const { product, overviewProductOn } = useSelector(
    (state) => state.productStore
  );
  const dispatch = useDispatch();

  const handlePopUp = () => {
    dispatch(isOverviewProductOn(false));
  };
  console.log(product);

  return (
    <div className={styles.overview__container}>
      {overviewProductOn && (
        <div className={styles.overview__popup}>
          <div className={styles.overview__picture}>
            <img src={product.img} alt="" />
          </div>
          <div className={styles.overview__productInfo}>
            <div className={styles.overview__title}>
              <h3>{product.name}</h3>
              <div
                className={styles.overview__closePopup}
                onClick={handlePopUp}
              >
                <GrClose />
              </div>
            </div>
            <h4>${product.price}</h4>
            <div className={styles.overview__desc}>{product.description}</div>
            <div className={styles.overview__size}>
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
                <span className={styles.btn__count}>{product.count}</span>

                <button
                  className={styles.btn__increment}
                  onClick={() => dispatch(incrementCount(product))}
                >
                  <FaPlus />
                </button>
              </div>
              <button
                className={`${styles.btnSecondary} ${styles.overview__btnAdd}`}
              >
                Add To Cart
              </button>
            </div>
            <div className={styles.overview__subtotal}>
              <span>Subtotal:</span>
              <h4>${product.totalPrice}</h4>
            </div>

            <button
              className={`${styles.btnPrimary__black} ${styles.overview__btnBuy}`}
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