const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/journals", userController.addJournal);
router.get("/journals", userController.getJournals);

module.exports = router;
