const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//setup express app
const server = express();

//consume json
server.use(express.json());

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"));



server.use("/api",routes);

server.listen(process.env.PORT || 5000, () => {
  console.log("Port is listening");
});
