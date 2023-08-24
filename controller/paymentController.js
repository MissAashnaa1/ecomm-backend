// const instance = require("../main.js");
const Razorpay = require("razorpay");

const crypto = require("crypto");
// const { Payment } =  "../models/paymentModel.js";

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    // await Payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });

    // cart se item remove krdo, kyuki payment hogyi hai

    res.redirect(
      // `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      `http://localhost:4000/`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { checkout, paymentVerification };
