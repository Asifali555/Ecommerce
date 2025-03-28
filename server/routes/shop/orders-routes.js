const express = require("express");

const {createOrder, capturePayment, getAllOrdersByUser, getOrderDetails} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);//user ke id ke based pr
router.get("/details/:id", getOrderDetails);//based on product id

module.exports = router;