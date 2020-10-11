const express = require("express");

const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  //console.log("shop.js: ", adminData.products);
  res.render("shop", {
    prods: adminData.products,
    pageTitle: "Online Shop",
    path: "/",
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true,
  });
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
