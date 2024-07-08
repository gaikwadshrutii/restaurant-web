const { getAllUsers, addUser, updateUser, deleteUser, getAllProducts, addProduct, updateProduct, deleteProduct, getAllOrders } = require("../controllers/Admin.controller")

const router = require("express").Router()

// const { getAllUsers } = require("../controllers/Admin.controller")


router
    .get("/get", getAllUsers)
    .post("/new", addUser)
    .put("/update-user/:id", updateUser)
    .delete("/delete-user/:id", deleteUser)

    .get("/products", getAllProducts)
    .post("/add-product", addProduct)
    .put("/update-product/:id", updateProduct)
    .delete("/delete-product/:id", deleteProduct)

    .get("/order", getAllOrders)

module.exports = router