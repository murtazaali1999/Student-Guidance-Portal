const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    test: { type: mongoose.Types.ObjectId, ref: "Test", required: true },
    questions: [{
        questionName: { type: String, required: true },
        givenAnswer: { type: String, required: true },
    }],
    points: { type: Number, required: true }
}, { timestamps: true });

const Answer = global.Answer || mongoose.model("Answer", answerSchema)
module.exports = Answer;