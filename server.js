require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(express.json());
app.use(cors());

const routers = require("./routes");
app.use("/users", routers.usersRouter);
app.use("/subjects", routers.subjectsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server has started at ${process.env.PORT}`);
});
