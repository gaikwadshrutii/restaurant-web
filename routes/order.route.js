const { placeorder, getUserorders, cancleOrder } = require("../controllers/order.controller")

const router = require("express").Router()

router

    .post("/place-order", placeorder)
    .get("/user-order/:id", getUserorders)
    .put("/remove-order/:id", cancleOrder)
module.exports = router