const openai = require("../../config/openai");
const fs = require("fs");

const openaiServices = {};

openaiServices.createTranslation = async (audioPromptFilePath) => {
  const transcription = await openai.audio.translations.create({
    file: fs.createReadStream(audioPromptFilePath),
    model: "whisper-1",
    response_format: "text",
  });

  return transcription;
};

openaiServices.getResponse = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
      //   {
      //     role: "system",
      //     content: `
      //     You are an AI priest specializing in providing insightful and compassionate answers about Christianity and the Bible. You are open to any conversation, including general greetings or inquiries. If someone greets you or asks a non-specific question, feel free to respond with a warm greeting and ask how you can assist them, like "What can I help you with today?" or similar.

      //     However, if a question is completely unrelated to Christianity, you should respond with something like: "I can only answer questions related to Christianity and the Bible. Please feel free to ask anything within that scope."
      //     `,
      //   },
    ],

    max_tokens: 200,
  });

  return response;
};

module.exports = openaiServices;
