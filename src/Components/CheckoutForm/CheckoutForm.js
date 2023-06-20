import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./checkout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { commerce } from "../Lib/commerce";
import { getCheckoutId } from "../../Service/Store/cartSlice";
import Loader from "../Features/loader/Loader";
import {
  getCustomerInfo,
  getShippingMethods,
} from "../../Service/Store/customerSlice";

const CheckoutForm = () => {
  const { cart, cartObjectId, checkoutId, cartLineItems } = useSelector(
    (state) => state.cartStore
  );
  const { shipping, customer } = useSelector((state) => state.customerStore);
  const [summaryOrder, setShowSummaryOrder] = useState(false);
  const [countries, setCountries] = useState("");
  const [regions, setRegions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState("FR");
  const [chosenRegion, setChosenRegion] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitingOrder, setWaitingOrder] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(getCustomerInfo(data));
  };

  useEffect(() => {
    setLoading(true);
    commerce.checkout
      .generateToken(cartObjectId, { type: "cart" })
      .then((checkout) => {
        dispatch(getCheckoutId(checkout.id));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [cartObjectId]);
  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      commerce.services
        .localeListShippingCountries(checkoutId)
        .then((res) => {
          setCountries(res.countries);
          setLoading(false);
        })
        .catch((err) => console.error(err));
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
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [chosenCountry]);
  useEffect(() => {
    if (isMounted) {
      commerce.checkout
        .getShippingOptions(checkoutId, {
          country: chosenCountry,
          region: chosenRegion,
        })
        .then((res) => {
          dispatch(getShippingMethods(res));
        })
        .catch((err) => console.error(err));
      setIsMounted(false);
    } else setIsMounted(true);
  }, [chosenRegion]);
  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      commerce.checkout
        .capture(checkoutId, {
          customer: {
            firstname: customer.firstName,
            lastname: customer.lastName,
            email: customer.email,
          },
          shipping: {
            name: customer.firstName + "" + customer.lastName,
            street: customer.address,
            town_city: customer.city,
            county_state: customer.country + "-" + customer.state,
            postal_zip_code: customer.zip,
            country: customer.country,
          },
          fulfillment: {
            shipping_method: customer.shipping_method,
          },
          billing: {
            name: customer.firstName + "" + customer.lastName,
            street: customer.address,
            town_city: customer.city,
            county_state: customer.country + "-" + customer.state,
            postal_zip_code: customer.zip,
            country: customer.country,
          },
          payment: {
            gateway: "test_gateway",
            card: {
              number: customer.creditCard,
              expiry_month: customer.expiryMonth,
              expiry_year: customer.expiryYear,
              cvc: customer.cvc,
              postal_zip_code: customer.zip,
            },
          },
        })
        .then((response) => {
          setIsMounted(false);
          setLoading(false);
          setWaitingOrder(false);
          console.log("order", response);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else setIsMounted(true);
  }, [customer]);

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

  if (!waitingOrder) {
    navigate("/order");
  }

  let subTotal = cartLineItems.reduce((prev, curr) => {
    return prev + curr.price.raw * curr.quantity;
  }, 0);
  console.log(waitingOrder);
  return (
    <>
      <div className={styles.checkout__container}>
        {loading && <Loader />}
        <section className={styles.checkout__information}>
          <h3 className={styles.checkout__title}>Order Information</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  aria-invalid={errors.firstName ? "true" : "false"}
                  placeholder="Mark"
                  className={styles.checkout__field__input}
                />
                {errors.firstName && (
                  <p role="alert">{errors.firstName?.message}</p>
                )}
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
                  aria-invalid={errors.lastName ? "true" : "false"}
                  placeholder="Brown"
                  className={styles.checkout__field__input}
                />
                {errors.lastName && (
                  <p role="alert">{errors.lastName?.message}</p>
                )}
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  {...register("address", {
                    required: true,
                    maxLength: 30,
                  })}
                  aria-invalid={errors.address ? "true" : "false"}
                  placeholder="47 Paris Hill Line"
                  className={styles.checkout__field__input}
                />
                {errors.address && (
                  <p role="alert">{errors.address?.message}</p>
                )}
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
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="example@gmail.com"
                  className={styles.checkout__field__input}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
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
                  aria-invalid={errors.city ? "true" : "false"}
                  placeholder="New York"
                  className={styles.checkout__field__input}
                />
                {errors.city && <p role="alert">{errors.city?.message}</p>}
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="number"
                  {...register("zip", {
                    required: true,
                    maxLength: 10,
                  })}
                  aria-invalid={errors.zip ? "true" : "false"}
                  placeholder="945442"
                  className={styles.checkout__field__input}
                />
                {errors.zip && <p role="alert">{errors.zip?.message}</p>}
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="country">Country</label>
                <select
                  {...register("country", {
                    required: true,
                  })}
                  className={styles.checkout__country}
                  aria-invalid={errors.country ? "true" : "false"}
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
                {errors.country && (
                  <p role="alert">{errors.country?.message}</p>
                )}
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="state">State</label>
                <select
                  {...register("state", {
                    required: true,
                  })}
                  className={styles.checkout__country}
                  aria-invalid={errors.state ? "true" : "false"}
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
                {errors.state && <p role="alert">{errors.state?.message}</p>}
              </div>
            </div>
            <h4 className={styles.checkout__formTitle}>Payment Information</h4>
            <div className={styles.checkout__fields}>
              <div
                className={`${styles.checkout__field} ${styles.checkout__cardField} `}
              >
                <label htmlFor="creditCard">Credit Card No.</label>
                <input
                  type="number"
                  {...register("creditCard", {
                    required: true,
                    maxLength: 16,
                  })}
                  aria-invalid={errors.creditCard ? "true" : "false"}
                  placeholder="**** **** **** ****"
                  className={styles.checkout__field__input}
                />
                {errors.creditCard && (
                  <p role="alert">{errors.creditCard?.message}</p>
                )}
              </div>
              <div
                className={`${styles.checkout__field} ${styles.checkout__expiry}`}
              >
                <label htmlFor="expiryMonth">Expiry Month</label>
                <input
                  type="number"
                  {...register("expiryMonth", {
                    required: true,
                    minLength: 2,
                    maxLength: 2,
                  })}
                  minLength={2}
                  maxLength={2}
                  aria-invalid={errors.expiryMonth ? "true" : "false"}
                  placeholder="03"
                  className={styles.checkout__field__input}
                />
                {errors.expiryMonth && (
                  <p role="alert">{errors.expiryMonth?.message}</p>
                )}
              </div>
              <div
                className={`${styles.checkout__field} ${styles.checkout__expiry}`}
              >
                <label htmlFor="expiryYear">Expiry Year</label>
                <input
                  type="number"
                  {...register("expiryYear", {
                    required: true,
                    minLength: 2,
                    maxLength: 2,
                  })}
                  minLength={2}
                  maxLength={2}
                  aria-invalid={errors.expiryYear ? "true" : "false"}
                  placeholder="25"
                  className={styles.checkout__field__input}
                />
                {errors.expiryYear && (
                  <p role="alert">{errors.expiryYear?.message}</p>
                )}
              </div>
              <div className={styles.checkout__field}>
                <label htmlFor="cvc">CVC</label>
                <input
                  type="number"
                  {...register("cvc", {
                    required: true,
                    minLength: 3,
                    maxLength: 4,
                  })}
                  aria-invalid={errors.cvc ? "true" : "false"}
                  placeholder="928"
                  className={styles.checkout__field__input}
                />
                {errors.cvc && <p role="alert">{errors.cvv?.message}</p>}
              </div>
            </div>
            <div className={styles.checkout__bottom}>
              <p className={styles.checkout__goBack} onClick={handleGoBack}>
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
          </form>
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
            {shipping.map((method) => {
              return <h4 key={method.id}>${subTotal + method.price.raw}</h4>;
            })}
          </div>
        </section>
        <section
          className={
            !summaryOrder
              ? styles.checkout__product
              : styles.checkout__productMobile
          }
        >
          <h3 className={styles.checkout__title}>Product Information</h3>
          <div className={styles.checkout__productInfo}>
            {cartLineItems?.map((product) => {
              return (
                <div
                  className={styles.checkout__singleProduct}
                  key={product.id}
                >
                  <div className={styles.checkout__productImg}>
                    <img src={product.image.url || product.image} alt="" />
                    <span className={styles.checkout__quantity}>
                      {product.quantity}
                    </span>
                  </div>
                  <h5>{product.name}</h5>
                  <span>${product.price.raw || product.price}</span>
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
              <p>${subTotal}</p>
            </div>
            <div className={styles.checkout__calculatedValue}>
              <p>Shipping</p>
              <div className={styles.checkout__shipping}>
                {shipping.map((method) => {
                  return (
                    <>
                      <p>{method.description}</p>
                      <p className={styles.checkout__shippingPrice}>
                        ${method.price.raw}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
            <div className={styles.checkout__calculatedValue}>
              <h4>Total</h4>
              {shipping.map((method) => {
                return <h5 key={method.id}>${subTotal + method.price.raw}</h5>;
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutForm;
