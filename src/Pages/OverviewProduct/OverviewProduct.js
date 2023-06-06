import React from "react";
import styles from "./overviewProduct.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { isOverviewProductOn } from "../../Service/Store/productSlice";

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
          <div className={styles.overview__closePopup} onClick={handlePopUp}>
            X
          </div>
          <div className={styles.overview__picture}>
            uhuh
            <img src="" alt="" />
          </div>
          <div className={styles.overview__productInfo}>
            <h3>name product</h3>
            <div>ratings</div>
            <div>price</div>
            {/* <div>size</div>
          <div>color</div> */}
            <div className={styles.overview__desc}>description</div>
            <div>quantity btn</div>
            <h4>subtotal</h4>
            <div className={styles.overview__buttons}>
              <button>add to cart</button>
              <button>buy now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewProduct;
