const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const User = require("../models/User")
const sendEmail = require("../utils/email")

exports.placeorder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ Message: "order place success" })
})
exports.getUserorders = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "order fetch success ", result })
})
exports.cancleOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Order.findByIdAndUpdate(id, { status: "cancel" })
    const x = await Order.findById(id)
    const result = await User.findById(x.customer)
    //result.email
    sendEmail({
        to: result.email,
        message: `your order with Id ${id}cancel success`,
        subject: `order (${id} )cancel`

    })
    res.json({ message: "order remove success " })
})






