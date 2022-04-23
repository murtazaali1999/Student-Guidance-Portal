const epxress = require("express");
const router = epxress.Router();

/* 
//create road-map
//update roadmap(name/description)
//get all road-map
//get road map by name
//delete roadmap
*/

router.post("/create_roadmap");
router.post("/update_roadmap/:r_id");
router.get("/get_all_roadmap");
router.get("/get_single_roadmap/:r_id");
router.get("/get_single_roadmap_for_user/:u_id");
router.get("/get_roadmap_by_name/:r_id");
router.post("/delete_roadmap/:r_id");

module.exports = router;