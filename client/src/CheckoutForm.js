import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id to your server for further processing
      await handlePayment(paymentMethod.id);
    }

    setLoading(false);
  };

  const handlePayment = async (paymentMethodId) => {
    try {
      const response = await fetch('http://localhost:8000/api/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_method: paymentMethodId, amount: 1000 }), // Adjust the amount as needed
      });

      const result = await response.json();

      console.log(result); // Log the server response
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
