const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

// router.route("/").post(checkout);

router.route("/").get(function (req, res) {
  // if (req.session.login)

  let info = [];
  let send = [];
  fs.readFile(
    path.join(__dirname, "..", "product_data.json"),
    "utf-8",
    function (err, data) {
      // console.log(data);
      if (data.length == 0) {
        send = [];
        info = [];
      } else {
        info = JSON.parse(data);
        curr = 0;
        let c = curr + 5;
      }

      res.json({ product: info });
      return;
    }
  );
});
module.exports = router;
