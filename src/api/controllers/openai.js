const openai = require("../../config/openai");
const openaiServices = require("../services/openai");
const fs = require("fs");
const path = require("path");

const openaiController = {};

openaiController.getResponse = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  const response = await openaiServices.getResponse(prompt);

  res.status(200).json({
    response: response.choices[0].message.content,
  });
};

openaiController.translateAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: "No audio file uploaded" });
    }
    const audioPromptFilePath = path.resolve(req.file.path);
    const audioBuffer = fs.readFileSync(audioPromptFilePath);

    const transcription = await openaiServices.createTranslation(
      audioPromptFilePath
    );
    const response = await openaiServices.getResponse(transcription);

    fs.unlinkSync(audioPromptFilePath);

    res.status(200).json({
      response: response.choices[0].message.content,
      transcription: transcription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while translating audio",
    });
  }
};

module.exports = openaiController;
