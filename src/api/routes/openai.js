const express = require("express");
const router = express.Router();
const openaiController = require("../controllers/openai");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/audioPrompt");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".wav");
  },
});
const upload = multer({ storage: storage });

router.post("/chat", openaiController.getResponse);
router.post(
  "/chat/audio",
  upload.single("audioPrompt"),
  openaiController.translateAudio
);

module.exports = router;
