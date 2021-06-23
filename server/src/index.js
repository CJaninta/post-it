require("./config/dotenv");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const setHeader = require('./config/cors')

const PORT = process.env.PORT || 5000;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();

app.use(express.json()); // application/json

app.use(setHeader.cors);

app.use("/api", routes);

const MONGODB_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster1.w1xit.mongodb.net/post-it?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log(`Connected Database`);
    app.listen(PORT, () => {
      console.log(`Server start at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
