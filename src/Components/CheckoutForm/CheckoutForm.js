import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./checkout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { commerce } from "../Lib/commerce";
import { getCheckoutId } from "../../Service/Store/cartSlice";

const CheckoutForm = () => {
  const { cart, cartObjectId, checkoutId } = useSelector(
    (state) => state.cartStore
  );
  const [summaryOrder, setShowSummaryOrder] = useState(false);
  const [countries, setCountries] = useState("France");
  const [regions, setRegions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState("FR");
  const [chosenRegion, setChosenRegion] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    commerce.checkout
      .generateToken(cartObjectId, { type: "cart" })
      .then((checkout) => {
        dispatch(getCheckoutId(checkout.id));
        console.log(checkout);
      });
  }, [cartObjectId]);
  useEffect(() => {
    commerce.services.localeListShippingCountries(checkoutId).then((res) => {
      setCountries(res.countries);
    });
  }, [checkoutId]);
  useEffect(() => {
    commerce.services
      .localeListShippingSubdivisions(checkoutId, chosenCountry)
      .then((res) => {
        setRegions(res.subdivisions);
      });
  }, [chosenCountry, checkoutId]);
  const handleChosenCountry = (e) => {
    setChosenCountry(e.target.value);
  };
  const handleChosenRegion = (e) => {
    setChosenRegion(e.target.value);
  };
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
                <select
                  className={styles.checkout__country}
                  name="country"
                  id="country"
                  onClick={handleChosenCountry}
                >
                  {Object.entries(countries).map(([k, v], i) => {
                    return (
                      <option value={k} key={i}>
                        {v}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="state">State</label>
                <select
                  className={styles.checkout__country}
                  name="state"
                  id="state"
                  onClick={handleChosenRegion}
                >
                  {Object.entries(regions).map(([k, v], i) => {
                    return (
                      <option value={k} key={i}>
                        {v}
                      </option>
                    );
                  })}
                </select>
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
              <Link to="/order">
                <button
                  className={`${styles.btnSecondary} ${styles.checkout__btnOrder}`}
                  type="submit"
                >
                  Order Now
                </button>
              </Link>
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
