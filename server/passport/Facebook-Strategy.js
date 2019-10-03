const FacebookStrategy = require("passport-facebook");
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
    new FacebookStrategy(
      {
        clientID: keys.facebook.clienID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: keys.facebook.callbackURL,
        profileFields: ["id", "displayName", "photos", "emails"]
      },
      function(accessToken, refreshToken, profile, done) {
        //check if user already exist
        User.findOne({ facebookID: profile.id }).then(currentUser => {
          if (currentUser) {
            // already a user
            done(null, currentUser);
          } else {
            // create user in DB
            const newUser = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              facebookID: profile.id
            });
            newUser.save().then(user => {
              done(null, user);
            });
          }
        });
      }
    )
  );
};
