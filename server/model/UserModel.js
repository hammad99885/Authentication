const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {
    type: String,
    default:
      "https://www.pinclipart.com/picdir/middle/155-1559316_male-avatar-clipart.png"
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String, required: false },
  facebookId: { type: String}
});

module.exports = new mongoose.model("user", userSchema);
