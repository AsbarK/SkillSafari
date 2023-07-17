const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const adminRouter = require("./admin/admin");
const userRouter = require("./client/client");

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

mongoose.connect(process.env.mongoSecret, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User routes

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
