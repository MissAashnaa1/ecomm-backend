const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000; //if process.env has some value, then this port will be run else hard coded one.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //precises that the req. body object will contain values of any type instead of just strings
app.use(
  cors({
    origin: "*",
  })
);
const homeRoute = require("./routes/homeRoute");
app.use("/", (req, res) => {
  res.json({ val: 1 });
});

app.use("/getAllProducts", homeRoute);

// app.use("*", (req, res) => {
//   res.json({
//     mag: "Not Found",
//   });
// });

app.listen(port, function () {
  console.log("at port number" + port);
});
