import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const Payment = () => {
  let data = [
    {
      id: 1,
      name: "xyz",
      image:
        "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    },
  ];

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OYkIDSCKn8fzfthIjKRdUXdA9HQkHjbFfG6P0VX9eigJrDj85hppwaBQ5vDvJbmf7sUHRhNccdMB5eTkTypYAy300D5ccpiKn"
    );
    const body = {
      products: data,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
// const makePayment = async () => {
//     const stripe = await loadStripe(
//       "pk_test_51OYkIDSCKn8fzfthIjKRdUXdA9HQkHjbFfG6P0VX9eigJrDj85hppwaBQ5vDvJbmf7sUHRhNccdMB5eTkTypYAy300D5ccpiKn"
//     );
//     const body = {
//       amount: 1000,
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     const response = await fetch(
//       "http://localhost:8000/create-payment-intent",
//       {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       }
//     );
//     const session = await response.json();
//     // const result = stripe.redirectToCheckout({
//     //   sessionId: session.id,
//     // });
//     // if (result.error) {
//     //   console.log(result.error);
//     // }
//   };

  return (
    <div >
      <button style={{fontSize:"30px",textAlign:"center"}} onClick={makePayment}>Checkout</button>
    </div>
  );
};

export default Payment;
