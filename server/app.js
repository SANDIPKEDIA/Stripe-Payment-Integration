const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51OYkIDSCKn8fzfthlcrkJt1mcy12j7LK4uqkw4nl0JjIrga1HMpERAPVs6t7hRgNSEWu9HbSlj2hZZ8uVMVibTvL00N9Q3qf65"
);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//checkout api
app.post("/api/create-checkout-session", async (req, res) => {
    const customer = await stripe.customers.create({
        name: 'Sandip Kedia',
        address: {
          line1: 'College road',
          postal_code: '733129',
          city: 'Kaliyaganj',
          state: 'WB',
          country: 'IN',
        },
      });
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    // Remove the payment_method_types parameter
    // to manage payment methods in the Dashboard
    customer:customer.id,
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          // The currency parameter determines which
          // payment methods are used in the Checkout Session.
          currency: "inr",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000*100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  return res.json({ id: session.id });
});

app.post('/api/charge', async (req, res) => {
    try {
      const { payment_method, amount } = req.body;
  
      // Create a PaymentIntent using the PaymentMethod ID
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method: payment_method,
        confirmation_method: 'manual',
        confirm: true,
        return_url: 'https://www.aiche.org/sites/default/files/styles/chenected_lead_image/public/images/Chenected/lead/untitleddesign31.png?itok=QfNLTjZK'
      });
  
      console.log('PaymentIntent:', paymentIntent);
      return res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      console.error('Error processing payment:', error.message);
      return res.status(500).json({ error: 'Error processing payment' });
    }
  });
  
  app.post('/api/get-client-secret', async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        description: 'Software development services',
        // shipping: {
        //   name: 'Sandip Kedia Test',
        //   address: {
        //     line1: '510 Townsend St',
        //     postal_code: '733129',
        //     city: 'Kaliyaganj',
        //     state: 'WB',
        //     country: 'IN',
        //   },
        // },
        customer:"cus_PNbDfoQf0Z3XPQ",
        amount: amount,
        currency: 'inr',
        confirmation_method: 'automatic',
        description:"This is test payment"
      });
  
      const clientSecret = paymentIntent.client_secret;
      return res.status(200).json({ clientSecret });
    } catch (error) {
      console.error('Error creating PaymentIntent:', error.message);
      return res.status(500).json({ error: 'Error creating PaymentIntent' });
    }
  });

  
  
app.listen(8000, () => {
  console.log("SERVER LISTEING SUCCESS!---✅✅✅✅✅8000");
});
