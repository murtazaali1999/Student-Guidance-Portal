const mongoose = require("mongoose");

const roadMapSchema = new mongoose.Schema({
    name: {
        type: String,
        type: { type: String, enum: ["Blockchain", "Artificial-Intelligence", "Machine-Learning", "Deep-Learning"] },
    },
    description: { type: String, required: true },
}, { timestamps: true });

const RoadMap = global.RoadMap || mongoose.model("RoadMap", roadMapSchema)
module.exports = RoadMap;