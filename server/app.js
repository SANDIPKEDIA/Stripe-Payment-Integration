const express = require("express");
const app = express();
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51OYkIDSCKn8fzfthlcrkJt1mcy12j7LK4uqkw4nl0JjIrga1HMpERAPVs6t7hRgNSEWu9HbSlj2hZZ8uVMVibTvL00N9Q3qf65"
);
app.use(express.json());
app.use(cors());


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

app.listen(8000, () => {
  console.log("SERVER LISTEING SUCCESS!---✅✅✅✅✅8000");
});
