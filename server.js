const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
//import express from "express";
//import mongoose from "mongoose";
//import { mongoURI } from "./config/keys";

const app = express();

//connect mongoose
mongoose
  .connect(db)
  .then(() => console.log("Mongo Connected"))
  .catch(() => console.log("Mongo failed to connect"));

app.get("/", (req, res) => res.send("Hello world"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port " + port));
