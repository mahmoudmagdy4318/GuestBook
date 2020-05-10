const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const authRouter = require("./routes/AuthRouter");
const messageRouter = require("./routes/MessageRouter");
const replyRouter = require("./routes/RepliesRouter");

//getting port and databaseUrl from env
const port = process.env.PORT;
const databaseUrl = process.env.DATABASEURL;

app.use(cors());

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

//routing for reply routes
app.use("/replies", replyRouter);

//errors handling
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ err });
});

//stablishing the connection
const connection = app.listen(port, () => {
  console.log(`Guestbook app listenning on port ${port}`);
});
