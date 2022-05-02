const epxress = require("express");
const router = epxress.Router();

/* 
//create road-map
//update roadmap(name/description)
//get all road-map
//get road map by name
//delete roadmap
*/

const roadMapController = require("../Controllers/roadMapController");

router.post("/create_roadmap", roadMapController.createRoadMap);
router.post("/update_roadmap/:r_id", roadMapController.updateRoadMap);
router.get("/get_all_roadmap", roadMapController.getAllRoadMap);
router.get("/get_single_roadmap/:r_id", roadMapController.getSingleRoadMap);
router.post("/get_roadmap_by_name", roadMapController.getRoadMapByName);
router.post("/delete_roadmap/:r_id", roadMapController.deleteRoadMap);
router.get("/get_single_roadmap_for_user/:u_id", roadMapController.getSingleRoadMapforUser);

module.exports = router;