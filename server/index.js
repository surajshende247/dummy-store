import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import Razorpay from 'razorpay';

const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const connnectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if(conn) {
    console.log('MongoDB connected');
  }
}
connnectDB();

app.post("/createOrder", async(req, res) => {
  const { amount, notes } = req.body;

  const order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "RTC_"+Math.floor(Math.random() * 1000000),
    notes: notes
  })

  res.json({
    success: true,
    message: "Order created",
    order: order
  });
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Doc
// https://razorpay.com/docs/api/orders/
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/#12-integrate-with-checkout-on-client-side
