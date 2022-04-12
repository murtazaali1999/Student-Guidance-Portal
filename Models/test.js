const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    participants: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    test: [{
        type: { type: String, enum: ["Generic", "Blockchain", "Artificial-Intelligence", "Machine-Learning", "Deep-Learning"] },
        question: [{
            q_name: { type: String },
            d_answer: [{ type: String }],
            c_answer: { type: String }
        }]
    }]
})

const Test = global.Test || mongoose.model("Test", testSchema)
module.exports = Test;