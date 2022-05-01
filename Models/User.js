const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["Admin", "User"], default: "User" },
    participated: [{ type: mongoose.Types.ObjectId, ref: "Test", default: [] }],
    resetToken: { type: Number, default: 0 }
});

const User = global.User || mongoose.model("User", userSchema)
module.exports = User;