const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

const databaseUrl = process.env.DATABASEURL;
const db = mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error(error);
  });

const connection = app.listen(port, () => {
  console.log(`Guestbook app listenning on port ${port}`);
});
