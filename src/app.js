const express = require("express");
const dotenv = require("dotenv");
const openaiRoutes = require("./api/routes/openai");
const userRoutes = require("./api/routes/user");
const cors = require("cors");

const port = process.env.port || 3000;

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/openai", openaiRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("This is pillar app backend");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
