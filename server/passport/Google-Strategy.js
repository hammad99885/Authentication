const GoogleStartgey = require("passport-google-oauth20");
const keys = require("./../config/keys");
const User = require("./../model/UserModel");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    console.log(user, "before redirect");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });

  passport.use(
    new GoogleStartgey(
      {
        callbackURL: keys.google.callbackURL,
        // options for google stratgey
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
      },
      (accesToken, refreshToken, profile, done) => {
        // passport callback function

        //check if user already exist
        User.findOne({ googleId: profile.id }).then(currentUser => {
          if (currentUser) {
            // already a user
            done(null, currentUser);
          } else {
            // create user in DB
            const newUser = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              googleId: profile.id
            });
            newUser.save().then(user => {
              done(null, newUser);
            });
          }
        });
      }
    )
  );
};
