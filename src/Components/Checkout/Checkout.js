import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCheckout,
  incrementCount,
  decrementCount,
} from "../../Service/Store/cartSlice";
import styles from "./checkout.module.scss";
import { GrClose } from "react-icons/gr";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const [cartClose, setCartClose] = useState(false);
  const dispatch = useDispatch();

  const closeCheckout = () => {
    setTimeout(() => {
      dispatch(showCheckout(false));
    }, 500);
    setCartClose(true);
  };
  return (
    <aside className={styles.checkout__container}>
      <div
        className={
          !cartClose
            ? styles.notShoppingCart
            : `${styles.notShoppingCart} ${styles.notShoppingCart__close}`
        }
      ></div>
      <div
        className={
          !cartClose ? styles.shoppingCart : styles.shoppingCart__close
        }
      >
        <div className={styles.shoppingCart__checkout}>
          <header className={styles.shoppingCart__header}>
            <div>
              <h4>
                <i>Shopping Cart</i>
              </h4>
            </div>
            <GrClose onClick={closeCheckout} className={styles.icon__small} />
          </header>
          <p>cart length</p>
          <div className={styles.shoppingCart__items}>
            {cart?.length ? (
              cart.map((product) => {
                return (
                  <div className={styles.shoppingCart__item} key={product.id}>
                    <div className={styles.shoppingCart__picture}>
                      <img src={product.img} alt="" />
                    </div>
                    <div className={styles.shoppingCart__info}>
                      <p>{product.name.substring(0, 30)}</p>

                      <span>{product.price}</span>
                    </div>
                    <div className={styles.shoppingCart__quantity}>
                      <button
                        className={styles.shoppingCart__increment}
                        onClick={() => dispatch(incrementCount(product.id))}
                      >
                        +
                      </button>
                      <span className={styles.shoppingCart__count}>
                        {product.count}
                      </span>
                      <button
                        className={styles.shoppingCart__decrement}
                        onClick={() => dispatch(decrementCount(product.id))}
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>3423</h4>
            )}
          </div>
          <div className={styles.shoppingCart__footer}>
            <h4>Total:</h4>
            <p>Tax included and shipping calculated at checkout</p>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Checkout;
