import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the client secret from your server when the component mounts
    fetch('http://localhost:8000/api/get-client-secret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Adjust the amount as needed
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Error fetching client secret:', error);
      });
  }, []);
// ... (previous code)

const handleSubmit = async (event) => {
    event.preventDefault();
  
    setLoading(true);
  
    try {
      // Fetch the client secret from the server
      const response = await fetch('http://localhost:8000/api/get-client-secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Adjust the amount as needed
      });
  
      const { clientSecret } = await response.json();
  
      // Use the client secret to confirm the PaymentIntent
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (error) {
        console.error(error);
        setLoading(false);
      } else {
        // Handle the paymentIntent status as needed
        console.log('PaymentIntent status:', paymentIntent.status);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setLoading(false);
    }
  };
  
  // ... (rest of the code)
  

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
