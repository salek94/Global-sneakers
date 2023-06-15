import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./checkout.module.scss";

const CheckoutForm = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
                  placeholder="945442"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="lastName">last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Brown"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="lastName">last Name</label>
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
        </section>
        <section className={styles.checkout__product}>
          <h3>Product Information</h3>
        </section>
      </div>
    </>
  );
};

export default CheckoutForm;
