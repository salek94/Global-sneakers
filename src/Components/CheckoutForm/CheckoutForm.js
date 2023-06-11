import React from "react";
import { PaymentElement, useStripe } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ stripe }) => {
  //   const stripe = useStripe();

  //   const stripe = Stripe("pk_test_Z8v5IJjNrjmaldcUocBhl4tL00Gbc2HtTc");
  const clientSecret = "gway_mwJZeaDe1PEYwe";

  const appearance = {
    theme: "flat",
    variables: { colorPrimaryText: "#262626" },
  };
  const options = { mode: "shipping" };
  const elements = stripe.elements({ clientSecret, appearance });
  const addressElement = elements.create("address", options);
  const paymentElement = elements.create("payment");
  addressElement.mount("#address-element");
  paymentElement.mount("#payment-element");

  return (
    <form>
      <PaymentElement />
      <AddressElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
