const router = require("express").Router();
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const UserModel = require("../model/UserModel");

router.post("/register", function(req, res) {
  //validating inputs using register validations rules
  const { errors, isValid } = validateRegisterInput(req.body);

  // genrating error if validation failed
  if (!isValid) return res.status(400).json(errors);

  // checking if user with provided email already exist.
  UserModel.findOne({
    email: req.body.email
  }).then(user => {
    //   genrating if user already exist
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      // creating new user using the User Model
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hashing the password of new user using bcrypt
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) console.error("There was an error", err);
        else {
          // replacing the newuser password with hashed password.
          newUser.password = hash;
          newUser.save().then(user => {
            res.status(200).json({ success: true });
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // validating inputs
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // extracting email and password from body
  const email = req.body.email;
  const password = req.body.password;
  // finding the user with email
  UserModel.findOne({ email }).then(user => {
    // checking if user exist
    if (!user) {
      // genrating error if user does no exist
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // comparing the password and encrypted password store in DB
    bcrypt.compare(password, user.password).then(isMatch => {
      // Checking if Password Match or not
      if (isMatch) {
        // creating an object named payload that stores required user info to create the token
        const payload = {
          id: user.id
        };
        //creating token using JWT sign method
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600
          },
          (err, token) => {
            // logning error if existed
            if (err) console.error("There is some error in token", err);
            else {
              // sending res back to user with token
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image
    });
  }
);

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false
  })
);

// callback route for google redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.redirect("/profile")
  console.log(req.user);
  jwt.sign(
    { id: req.user._id },
    "secret",
    {
      expiresIn: 3600
    },
    (err, token) => {
      // logning error if existed
      if (err) console.error("There is some error in token", err);
      else {
        console.log(token);
        res.redirect(
          `http://localhost:8080/get_token/?token=${"Bearer " + token}`
        );
      }
    }
  );
});

// auth with google
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    prompt: "select_account",
    session: false,
    auth_type: 'reauthenticate'
  })
);

// callback route for google redirect to
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    jwt.sign(
      { id: req.user._id },
      "secret",
      {
        expiresIn: 3600
      },
      (err, token) => {
        // logning error if existed
        if (err) console.error("There is some error in token", err);
        else {
          console.log(token);
          res.redirect(
            `http://localhost:8080/get_token/?token=${"Bearer " + token}`
          );
        }
      }
    );
  }
);

module.exports = router;
