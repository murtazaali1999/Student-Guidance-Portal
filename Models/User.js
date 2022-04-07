const mongoose = require("mongoose");
const cids = require("cids");

new cids("fddimads").toV0()

const userSchema = new mongoose.Schema({
    name: {},
    age: {},
    email: {},
    password: {},
    type: {},
})




const User = global.User || mongoose.model("User", userSchema)
module.exports = User;