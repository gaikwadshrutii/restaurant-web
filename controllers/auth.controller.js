const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/email")
const { json } = require("express")




exports.registerUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const isFound = await User.findOne({ email })
    if (isFound) {
        return res.status(404).json({ message: "Email Already Exist" })
    }
    const hashPass = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hashPass, role: "customer" })
    //send Email
    await sendEmail({ to: email, subject: "Register Success", message: `<h1>welcome, ${req.body.name}</h1>` })
    res.json({ message: `${req.body.name} Register Success` })
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //step 1
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(404).json({ message: "Email Not Found" })
    }

    //step 2
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(404).json({ message: "password do Not Found" })
    }

    //step 3
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "6h" })
    //step 4
    res.cookie("auth-token", token, { httpOnly: true })
    res.json({
        message: "login success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role,
        }
    })
})
exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("auth-token")
    res.json({ message: "Logout success" })
})