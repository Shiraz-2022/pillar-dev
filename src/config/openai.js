const OpenAIApi = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });

module.exports = openai;
