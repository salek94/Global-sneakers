import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCartForm,
  incrementCount,
  decrementCount,
  removeItem,
  removeAll,
  removeLineItem,
} from "../../Service/Store/cartSlice";
import styles from "./cart.module.scss";
import { GrClose, GrTrash } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { commerce } from "../Lib/commerce";

const Cart = () => {
  const { cart, lineItemRemove, lineItemUpdate, cartLineItems } = useSelector(
    (state) => state.cartStore
  );
  const [cartClose, setCartClose] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [removeAllItems, setRemoveAllItems] = useState(false);
  const dispatch = useDispatch();
  const notCart = useRef(null);
  console.log("cart", cart);
  console.log("cartLineItems", cartLineItems);
  // console.log(lineItemUpdate);
  useEffect(() => {
    if (isMounted) {
      commerce.cart
        .remove(lineItemRemove)
        .then((res) => {
          console.log("cartLineItemsAfterRemove", res);
          setIsMounted(false);
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [lineItemRemove]);
  console.log(isMounted);
  useEffect(() => {
    if (isMounted) {
      commerce.cart
        .update(lineItemUpdate.id, { quantity: lineItemUpdate.quantity })
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
        .empty()
        .then((_) => {
          setIsMounted(false);
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [removeAllItems]);

  const closeCart = () => {
    setTimeout(() => {
      dispatch(showCartForm(false));
    }, 600);
    setCartClose(true);
  };
  const handleCloseCart = (e) => {
    if (e.target === notCart.current) {
      setTimeout(() => {
        dispatch(showCartForm(false));
      }, 600);
      setCartClose(true);
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    dispatch(removeLineItem(id));
  };
  const handleDecrement = (id) => {
    setUpdateProduct(!updateProduct);
    dispatch(decrementCount(id));
  };
  const handleIncrement = (id) => {
    setUpdateProduct(!updateProduct);
    dispatch(incrementCount(id));
  };
  const handleRemoveAllItems = () => {
    setRemoveAllItems(true);
    dispatch(removeAll());
  };
  let sumTotal = cartLineItems.reduce((prev, curr) => {
    return prev + curr.price.raw * curr.quantity;
  }, 0);

  const goToCheckout = () => {
    dispatch(showCartForm(false));
  };
  if (cartLineItems.length === 0) {
    dispatch(showCartForm(false));
  }

  return (
    <aside className={styles.ShoppingCart__container}>
      <div
        ref={notCart}
        onClick={handleCloseCart}
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
        <div
          className={
            !cartClose
              ? styles.shoppingCart__checkout
              : styles.notShoppingCart__checkout
          }
        >
          <header className={styles.shoppingCart__header}>
            <div>
              <h4>
                <i>Shopping Cart</i>
              </h4>
            </div>
            <GrClose onClick={closeCart} className={styles.icon__close} />
          </header>
          <div className={styles.shoppingCart__headerBottom}>
            <p>
              {cartLineItems?.length === 0
                ? "0 item"
                : cartLineItems?.length === 1
                ? cartLineItems.length + " item"
                : cartLineItems.length + " items"}
            </p>
            {cartLineItems?.length && (
              <p
                className={styles.shoppingCart__headerRemoveAll}
                onClick={handleRemoveAllItems}
              >
                remove all
              </p>
            )}
          </div>
          <div
            className={
              cartLineItems?.length >= 4
                ? `${styles.shoppingCart__items} ${styles.shoppingCart__overflow}`
                : styles.shoppingCart__items
            }
          >
            {cartLineItems?.length ? (
              cartLineItems.map((product) => {
                return (
                  <div className={styles.shoppingCart__item} key={product.id}>
                    <GrTrash
                      onClick={() => handleRemoveItem(product.id)}
                      className={styles.shoppingCart__removeItem}
                    />
                    <div className={styles.shoppingCart__picture}>
                      <img src={product.img || product.image.url} alt="" />
                    </div>
                    <div className={styles.shoppingCart__info}>
                      <p>
                        <b>{product.name.substring(0, 30)}</b>
                      </p>
                      <div className={styles.btn__quantity}>
                        <button
                          className={styles.btn__increment}
                          onClick={() => handleDecrement(product.id)}
                        >
                          <FaMinus />
                        </button>
                        <span className={styles.btn__count}>
                          {product.quantity}
                        </span>

                        <button
                          className={styles.btn__increment}
                          onClick={() => handleIncrement(product.id)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <span>${product.price.raw}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <p>Your cart is empty</p>
                <button
                  onClick={() => dispatch(showCartForm(false))}
                  className={`${styles.shoppingCart__continue} ${styles.btnPrimary} ${styles.btnPrimary__white}`}
                >
                  Continue shopping
                </button>
              </>
            )}
          </div>
          {cartLineItems?.length ? (
            <div className={styles.shoppingCart__footer}>
              <div className={styles.shoppingCart__sum}>
                <h4>Subtotal</h4>
                <h4>${sumTotal}</h4>
              </div>
              <div className={styles.shoppingCart__sum}>
                <h3>Total</h3>
                <h3>${sumTotal}</h3>
              </div>
              <p className={styles.tax__shipping}>
                Tax included and shipping calculated at checkout
              </p>
              <Link to="/checkout">
                <button
                  onClick={goToCheckout}
                  className={`${styles.btnSecondary} ${styles.btnCheckout}`}
                >
                  Checkout
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </aside>
  );
};

export default Cart;
