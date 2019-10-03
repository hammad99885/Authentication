// importing JWT Strategy
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const UserModel = require("../model/UserModel");

//creating options for JWT Strategy
const opts = {};
// extracting JWT from request header
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// passing the secret jwt key
opts.secretOrKey = "secret";

module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      UserModel.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
