import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import InjectedCheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OYkIDSCKn8fzfthIjKRdUXdA9HQkHjbFfG6P0VX9eigJrDj85hppwaBQ5vDvJbmf7sUHRhNccdMB5eTkTypYAy300D5ccpiKn');

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51OYkIDSCKn8fzfthlcrkJt1mcy12j7LK4uqkw4nl0JjIrga1HMpERAPVs6t7hRgNSEWu9HbSlj2hZZ8uVMVibTvL00N9Q3qf65',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <InjectedCheckoutForm />
    </Elements>
  );
};
