const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const { json, urlencoded } = require("body-parser");
const authRouter = require("./routes/AuthRouter");
const messageRouter = require("./routes/MessageRouter");

const databaseUrl = process.env.DATABASEURL;

//database connection
const db = mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error(error);
  });

//to parse the request body
app.use(json());
app.use(urlencoded({ extended: true }));

//routing for user routes
app.use("/user", authRouter);

//routing for message routes
app.use("/messages", messageRouter);

//errors handling
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ err });
});

//stablishing the connection
const connection = app.listen(port, () => {
  console.log(`Guestbook app listenning on port ${port}`);
});
