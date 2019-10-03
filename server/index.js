const express = require("express");
const path = require("path");
const userRoute = require("./routes/user-routes");
const passport = require("passport");

// creating express instance
const app = express();

//requring Middleware function
require("./middleware/middleware")(app);

// importing JWT strategy
require("./passport/JWT-Strategy")(passport);

// importing Google oauth 2.0 strategy
require("./passport/Google-Strategy")(passport);

// importing facebook strategy
require("./passport/Facebook-Strategy")(passport)

//initiallizing Passport
app.use(passport.initialize());

// creating routes for our app
app.use("/user", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is listening on port 3000/5000/6000");
});
app.get(
  "/get_post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
