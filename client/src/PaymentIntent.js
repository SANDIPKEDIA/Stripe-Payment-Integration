import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const PaymentIntent = () => {
  const stripePromise = loadStripe(
    "pk_test_51OYkIDSCKn8fzfthIjKRdUXdA9HQkHjbFfG6P0VX9eigJrDj85hppwaBQ5vDvJbmf7sUHRhNccdMB5eTkTypYAy300D5ccpiKn"
  ); // Replace with your actual publishable key

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentIntent;
