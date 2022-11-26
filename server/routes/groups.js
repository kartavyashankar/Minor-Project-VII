const { addGroup, quitGroup } = require("../controllers/groupController");
const router = require("express").Router();

router.post("/addgrp/", addGroup);
router.post("/quitgrp/", quitGroup);

module.exports = router;