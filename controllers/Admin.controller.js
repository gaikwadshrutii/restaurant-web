const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const Product = require("../models/Product")
const upload = require("../utils/upload")
const Order = require("../models/Order")

exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find({ role: "customer" })
    res.json({ message: "User fetch success", result })
})
exports.addUser = asyncHandler(async (req, res) => {
    await User.create(req.body)
    res.json({ message: "User add success" })
})
exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndUpdate(id, req.body)
    res.json({ message: "User update success" })
})
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({ message: "User delete success" })
})



exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "product fetch success", result })
})
exports.addProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(404).json({ message: "Multer error", err })
        }
        if (req.file) {
            console.log("inside")
            await Product.create({ ...req.body, image: req.file.filename })
            res.json({ message: "product add success" })
        } else {

            return res.json({ message: "Thumb Image Is Reqiure" })
        }
    })


})
exports.updateProduct = asyncHandler(async (req, res) => {
    // const { id } = req.params
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "product update success" })
})
exports.deleteProduct = asyncHandler(async (req, res) => {
    // const { id } = req.params
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "product delete success" })
})

exports.getAllOrders = asyncHandler(async (req, res) => {
    const {id, products, status}=req.body
    const result = await Order.find(id, products, status)
    res.json({ message: "order fetch success",result })
})


