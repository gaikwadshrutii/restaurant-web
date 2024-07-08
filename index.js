const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
const app = express()

app.use(express.static("uploads"))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/Admin.route"))
app.use("/api/order", require("./routes/order.route"))

app.use("*", async (req, res) => {
    res.status(404).json({ message: "Resource Not found" })
})

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message || "somthing went wrong" })
})
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECT")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})
