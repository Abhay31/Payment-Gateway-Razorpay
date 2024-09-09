const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: 'rzp_test_GcZZFDPP0jHtC4',
  key_secret: '6JdtQv2u7oUw7EWziYeyoewJ',
});

app.post('/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in smallest currency unit
    currency: 'INR',
    receipt: 'receipt_order_74394',
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
