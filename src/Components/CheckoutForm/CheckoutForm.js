import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./checkout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { commerce } from "../Lib/commerce";
import { getCheckoutId } from "../../Service/Store/cartSlice";
import Loader from "../Features/loader/Loader";

const CheckoutForm = () => {
  const { cart, cartObjectId, checkoutId } = useSelector(
    (state) => state.cartStore
  );
  const [summaryOrder, setShowSummaryOrder] = useState(false);
  const [countries, setCountries] = useState("");
  const [regions, setRegions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState("");
  const [chosenRegion, setChosenRegion] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log("kkkkk", data);

  useEffect(() => {
    commerce.checkout
      .generateToken(cartObjectId, { type: "cart" })
      .then((checkout) => {
        dispatch(getCheckoutId(checkout.id));
        console.log(checkout);
      });
  }, []);
  useEffect(() => {
    if (isMounted) {
      commerce.services.localeListShippingCountries(checkoutId).then((res) => {
        setCountries(res.countries);
      });
    } else setIsMounted(true);
  }, [checkoutId]);
  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      commerce.services
        .localeListShippingSubdivisions(checkoutId, chosenCountry)
        .then((res) => {
          setRegions(res.subdivisions);
          setLoading(false);
        });
    } else setIsMounted(true);
  }, [chosenCountry]);
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
    return prev + curr.price.raw * curr.quantity;
  }, 0);

  return (
    <>
      <div className={styles.checkout__container}>
        {loading && <Loader />}
        <section className={styles.checkout__information}>
          <h3 className={styles.checkout__title}>Order Information</h3>
          <form onSubmit={() => handleSubmit(onSubmit)}>
            <h4 className={styles.checkout__formTitle}>Shipping Address</h4>
            <div className={styles.checkout__fields}>
              <div className={styles.checkout__field}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  // name="firstName"
                  // id="firstName"
                  // required
                  placeholder="Mark"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  // name="lastName"
                  // id="lastName"
                  // required
                  placeholder="Brown"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  {...register("address", {
                    required: true,
                    maxLength: 30,
                  })}
                  // name="address"
                  // id="address"
                  // required
                  placeholder="47 Paris Hill Line"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  {...register("email", {
                    required: true,
                    maxLength: 30,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                  // name="email"
                  // id="email"
                  // required
                  placeholder="example@gmail.com"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  {...register("city", {
                    required: true,
                    maxLength: 20,
                    pattern: /[A-Za-z]/,
                  })}
                  // name="city"
                  // id="city"
                  // required
                  placeholder="New York"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="number"
                  {...register("city", {
                    required: true,
                    maxLength: 20,
                  })}
                  // name="zip"
                  // id="zip"
                  // required
                  placeholder="945442"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="country">Country</label>
                <select
                  {...register("country", {
                    required: true,
                  })}
                  className={styles.checkout__country}
                  // name="country"
                  // id="country"
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
                  {...register("state", {
                    required: true,
                  })}
                  className={styles.checkout__country}
                  // name="state"
                  // id="state"
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
                  {...register("creditCart", {
                    required: true,
                    maxLength: 16,
                  })}
                  // name="creditCard"
                  // id="creditCard"
                  placeholder="**** **** **** ****"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="expDate">Expiry Date</label>
                <input
                  type="text"
                  {...register("expDate", {
                    required: true,
                    maxLength: 5,
                  })}
                  // name="expDate"
                  // id="expDate"
                  placeholder="03/25"
                  className={styles.checkout__field__input}
                />
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="cvv">CCV</label>
                <input
                  type="number"
                  {...register("cvv", {
                    required: true,
                    maxLength: 4,
                  })}
                  // name="cvv"
                  // id="cvv"
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
              {/* <Link to="/order"> */}
              <button
                className={`${styles.btnSecondary} ${styles.checkout__btnOrder}`}
                type="submit"
              >
                Order Now
              </button>
              {/* </Link> */}
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
                    <img src={product.image.url} alt="" />
                    <span className={styles.checkout__quantity}>
                      {product.quantity}
                    </span>
                  </div>
                  <h5>{product.name}</h5>
                  <span>${product.price.raw}</span>
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
