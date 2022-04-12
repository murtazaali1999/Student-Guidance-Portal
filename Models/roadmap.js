const mongoose = require("mongoose");

const roadMapSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        type: { type: String, enum: ["Blockchain", "Artificial-Intelligence", "Machine-Learning", "Deep-Learning"] },
    },
    description: { type: String, required: true },
});

const RoadMap = global.RoadMap || mongoose.model("RoadMap", roadMapSchema)
module.exports = RoadMap;