const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./../config/keys");
module.exports = app => {
  mongoose
    .connect(keys.mongoDB.uri, { useNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(e => console.log("error in connecting DB", e));

  app.use(cors());
  app.use(bodyParser.json());
};
