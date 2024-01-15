import Failed from './Failed';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from './Payment';
import Success from './Success';
import PaymentIntent from './PaymentIntent';
export default function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaymentIntent />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
    </Routes>
  </BrowserRouter>

  );
};

// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';
// import PaymentIntent from './PaymentIntent';

// const stripePromise = loadStripe('pk_test_51OYkIDSCKn8fzfthIjKRdUXdA9HQkHjbFfG6P0VX9eigJrDj85hppwaBQ5vDvJbmf7sUHRhNccdMB5eTkTypYAy300D5ccpiKn'); // Replace with your actual publishable key

// const App = () => {
//   return (
//     <PaymentIntent />
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default App;
