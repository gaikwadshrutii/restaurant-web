const momgoose = require("mongoose")

const userSchema = new momgoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"] },
})
module.exports = momgoose.model("user", userSchema)