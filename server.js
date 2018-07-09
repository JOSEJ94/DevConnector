const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect mongoose
mongoose
  .connect(db)
  .then(() => console.log("Mongo Connected"))
  .catch(() => console.log("Mongo failed to connect"));

app.get("/", (req, res) => res.send("Hello world"));

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port " + port));
