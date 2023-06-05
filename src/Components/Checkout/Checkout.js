import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCheckout,
  incrementCount,
  decrementCount,
  removeItem,
} from "../../Service/Store/cartSlice";
import styles from "./checkout.module.scss";
import { GrClose, GrTrash } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";

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
  let sumTotal = cart.reduce((prev, curr) => {
    return prev + curr.totalPrice;
  }, 0);

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
            <GrClose onClick={closeCheckout} className={styles.icon__close} />
          </header>
          <p>
            {cart?.length === 0
              ? "0 item"
              : cart?.length === 1
              ? cart.length + " item"
              : cart.length + " items"}
          </p>
          <div
            className={
              cart?.length >= 4
                ? `${styles.shoppingCart__items} ${styles.shoppingCart__overflow}`
                : styles.shoppingCart__items
            }
          >
            {cart?.length ? (
              cart.map((product) => {
                return (
                  <div className={styles.shoppingCart__item} key={product.id}>
                    <GrTrash
                      onClick={() => dispatch(removeItem(product.id))}
                      className={styles.shoppingCart__removeItem}
                    />
                    <div className={styles.shoppingCart__picture}>
                      <img src={product.img} alt="" />
                    </div>
                    <div className={styles.shoppingCart__info}>
                      <p>
                        <b>{product.name.substring(0, 30)}</b>
                      </p>
                      <div className={styles.shoppingCart__quantity}>
                        <button
                          className={styles.shoppingCart__increment}
                          onClick={() => dispatch(decrementCount(product.id))}
                        >
                          <FaMinus />
                        </button>
                        <span className={styles.shoppingCart__count}>
                          {product.count}
                        </span>

                        <button
                          className={styles.shoppingCart__increment}
                          onClick={() => dispatch(incrementCount(product.id))}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <span>
                        $
                        {product.count > 1 ? product.totalPrice : product.price}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <p>Your cart is empty</p>
                <button
                  onClick={() => dispatch(showCheckout(false))}
                  className={`${styles.shoppingCart__continue} ${styles.btnPrimary} ${styles.btnPrimary__white}`}
                >
                  Continue shopping
                </button>
              </>
            )}
          </div>
          {cart?.length ? (
            <div className={styles.shoppingCart__footer}>
              <div className={styles.shoppingCart__sum}>
                <h4>Subtotal</h4>
                <h4>{sumTotal}$</h4>
              </div>
              <div className={styles.shoppingCart__sum}>
                <h3>Total</h3>
                <h3>{sumTotal}$</h3>
              </div>
              <p className={styles.tax__shipping}>
                Tax included and shipping calculated at checkout
              </p>
              <button
                className={`${styles.btnSecondary} ${styles.btnCheckout}`}
              >
                Checkout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </aside>
  );
};

export default Checkout;
