import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./checkout.module.scss";
import { useSelector } from "react-redux";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

const CheckoutForm = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const [summaryOrder, setShowSummaryOrder] = useState(false);
  const navigate = useNavigate();
  console.log(cart);
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSummaryOrder = () => {
    setShowSummaryOrder(!summaryOrder);
  };
  let sumTotal = cart.reduce((prev, curr) => {
    return prev + curr.totalPrice;
  }, 0);

  return (
    <>
      <div className={styles.checkout__container}>
        <section className={styles.checkout__information}>
          <h3 className={styles.checkout__title}>Order Information</h3>
          <form>
            <h4 className={styles.checkout__formTitle}>Shipping Address</h4>
            <div className={styles.checkout__fields}>
              <div className={styles.checkout__field}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  placeholder="Mark"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  placeholder="Brown"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  placeholder="47 Paris Hill Line"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  required
                  placeholder="example@gmail.com"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  placeholder="New York"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="number"
                  name="zip"
                  id="zip"
                  required
                  placeholder="945442"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="country"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="state"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="lastName">Shipping method</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Brown"
                  className={styles.checkout__field__input}
                />
              </div>
            </div>
            <h4 className={styles.checkout__formTitle}>Payment Information</h4>
            <div className={styles.checkout__fields}>
              <div
                className={`${styles.checkout__field} ${styles.checkout__cardField} `}
              >
                <label htmlFor="creditCart">Credit Card No.</label>
                <input
                  type="number"
                  name="creditCard"
                  id="creditCard"
                  placeholder="**** **** **** ****"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="expDate">Expiry Date</label>
                <input
                  type="text"
                  name="expDate"
                  id="expDate"
                  placeholder="03/25"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="cvv">CCV</label>
                <input
                  type="number"
                  name="cvv"
                  id="cvv"
                  placeholder="928"
                  className={styles.checkout__field__input}
                />
              </div>
            </div>
          </form>
          <div className={styles.checkout__bottom}>
            <p className={styles.checkout__back} onClick={handleGoBack}>
              Go back
            </p>
            <div className={styles.checkout__btn}>
              <button
                className={`${styles.btnSecondary} ${styles.checkout__btnOrder}`}
                type="submit"
              >
                Order Now
              </button>
            </div>
          </div>
          <div
            className={styles.checkout__orderSummary}
            onClick={handleSummaryOrder}
          >
            <div className={styles.checkout__summary}>
              <p>Show summary order</p>
              {summaryOrder ? (
                <span>
                  <FiArrowDown />
                </span>
              ) : (
                <span>
                  <FiArrowUp />
                </span>
              )}
            </div>
            <h4>${sumTotal}</h4>
          </div>
        </section>
        <section
          className={
            !summaryOrder
              ? styles.checkout__product
              : styles.checkout__productMobile
          }
        >
          <h3>Product Information</h3>
          <div className={styles.checkout__productInfo}>
            {cart.map((product) => {
              return (
                <div
                  className={styles.checkout__singleProduct}
                  key={product.id}
                >
                  <div className={styles.checkout__productImg}>
                    <img src={product.img} alt="" />
                    <span className={styles.checkout__quantity}>
                      {product.count}
                    </span>
                  </div>
                  <h5>{product.name}</h5>
                  <span>${product.price}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.checkout__discount}>
            <input
              type="text"
              name="discount"
              placeholder="Discount code"
              className={styles.checkout__discountInput}
            />
            <button
              className={`${styles.btnPrimary__black} ${styles.checkout__btnApply}`}
            >
              apply
            </button>
          </div>
          <div className={styles.checkout__orderValue}>
            <div className={styles.checkout__calculatedValue}>
              <p>Subtotal</p>
              <p>${sumTotal}</p>
            </div>
            <div className={styles.checkout__calculatedValue}>
              <p>Shipping</p>
              <p>calculated at the next step</p>
            </div>
            <div className={styles.checkout__calculatedValue}>
              <h4>Total</h4>
              <h5>${sumTotal}</h5>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutForm;
