const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/api");
const auth = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);
app.use("/auth", auth);

let PORT = 8080;
let URL =
  "mongodb+srv://roshan17:roshan17@cluster0.vpkrxjq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL).then(() => {
  app.listen(PORT, () => {
    console.log("listing on port 8080...");
  });
});
