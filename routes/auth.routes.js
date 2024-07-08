const router = require("express").Router()
const { getAllUsers } = require("../controllers/Admin.controller")
const { registerUser, loginUser, logout } = require("../controllers/auth.controller")

router
    .get("/get", getAllUsers)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logout)
module.exports = router