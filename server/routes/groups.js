const { addGroup, quitGroup, searchUser } = require("../controllers/groupController");
const router = require("express").Router();

router.post("/addgrp", addGroup);
router.post("/quitgrp", quitGroup);
router.get("/searchUsers", searchUser);

module.exports = router;