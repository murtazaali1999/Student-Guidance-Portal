const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true, },
    questions: [{
        questionName: { type: String, required: true },
        decoyAnswers: [{ type: String, required: true }],
        correctAnswer: { answer: { type: String, required: true }, points: { type: Number, required: true } },
    }],
    type: {
        type: String,
        enum: ["Generic", "Blockchain", "Artificial-Intelligence",
            "Machine-Learning", "Deep-Learning"], required: true
    },
    status: { enum: ["Progress", "Pending", "Ended"], default: "Pending", type: String },
},
    { timestamps: true });

const Test = global.Test || mongoose.model("Test", testSchema)
module.exports = Test;