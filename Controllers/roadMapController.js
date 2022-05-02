const RoadMap = require("../Models/roadmap");
const User = require("../Models/user");
const Answer = require("../Models/answeredQuestions");

const createRoadMap = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(300).json({ error: "one or more fields are empty" });
        }

        const newRoadMap = new RoadMap({
            name,
            description
        });

        newRoadMap
            .save()
            .then(() => {
                return res.status(200).json({ message: "RoadMap Created Succesfully" })
            })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

const updateRoadMap = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(300).json({ error: "one or more fields are empty" });
        }

        const roadMap = await RoadMap.findOne({ _id: req.params.r_id })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })

        roadMap.name = name;
        roadMap.description = description;

        roadMap
            .save()
            .then(() => {
                return res.status(200).json({ message: "RoadMap Updated Succesfully" })
            })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })


    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

const getAllRoadMap = async (req, res) => {
    try {
        const roadMaps = await RoadMap.find()
            .catch((err) => {
                return res.status(500).json({ error: err })
            })

        if (roadMaps == [] || roadMaps == undefined) {
            return res.status(400).json({ message: "RoadMaps not Present" })
        }

        return res.status(200).json({ message: roadMaps });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

const getSingleRoadMap = async (req, res) => {
    try {
        const roadMap = await RoadMap.findOne({ _id: req.params.r_id })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })

        if (roadMap == {} || roadMap == undefined) {
            return res.status(400).json({ message: "RoadMap not Present with this ID" })
        }

        return res.status(200).json({ message: roadMap });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

const getSingleRoadMapforUser = async (req, res) => {
    try {
        const answers = await Answer
            .find({ user: req.params.u_id })
            .populate("test")
            .catch((err) => {
                return res.status(500).json({ error: err })
            });

        if (answers == [] || answers == undefined) {
            return res.status(400).json({ error: "Answers not exist" })
        }

        const roadMaps = await RoadMap
            .find()
            .catch((err) => {
                return res.status(500).json({ error: err })
            });

        if (roadMaps == [] || roadMaps == undefined) {
            return res.status(400).json({ error: "RoadMaps not exist" })
        }

        const userRoadMaps = [];

        for (let i = 0; i < answers.length; i++) {
            for (let j = 0; j < roadMaps.length; j++) {
                if (answers[i].test.type == roadMaps[j].name && answers[i].points >= 70) {
                    userRoadMaps.push(roadMaps[j]);
                }
            }
        }

        console.log(userRoadMaps);
        return res.status(200).json({ message: userRoadMaps });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const getRoadMapByName = async (req, res) => {
    try {
        const { name } = req.body;
        const roadMap = await RoadMap.findOne({ name })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })

        if (roadMap == {} || roadMap == undefined) {
            return res.status(400).json({ message: "RoadMap not Present with this name" })
        }

        res.status(200).json({ message: roadMap });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

const deleteRoadMap = async (req, res) => {
    try {
        await RoadMap.findOneAndDelete({ _id: req.params.r_id })
            .then((resp) => {
                if (resp == {} || resp == undefined || resp == null) {
                    return res.status(400).json({ message: "RoadMap Not Found with this ID" })
                }
                return res.status(200).json({ message: "RoadMap Deleted Successfully" })
            })
            .catch((err) => { return res.status(500).json({ error: err }) })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}

module.exports = {
    createRoadMap,
    updateRoadMap,
    getAllRoadMap,
    getSingleRoadMap,
    getRoadMapByName,
    deleteRoadMap,
    getSingleRoadMapforUser
}