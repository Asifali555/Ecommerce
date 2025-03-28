//user role ke liye shop product ka route

const express = require("express");

const {getFilteredProducts, getProductDetails} = require("../../controllers/shop/product-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

module.exports=router;