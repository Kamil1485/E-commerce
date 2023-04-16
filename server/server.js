const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const port = process.env.PORT;
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/pay', async (req, res) => {
  try {
    console.log(req.body.token);

    await Stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd',
    });

    res.send('Payment successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Payment failed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

/*
node:events:491
throw er; // Unhandled 'error' event ^
Error: listen EADDRINUSE: address already in use :::8000    at Server.setupListenHandle [as _listen2] (node:net:1717:16),
port: 8000
nodemon kullan hatayı gidermek için
}
*/