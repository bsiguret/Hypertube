const passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;

require('dotenv').config();

passport.use(new FortyTwoStrategy({
    clientID: process.env.PASSPORT_42_CLIENT_ID,
    clientSecret: process.env.PASSPORT_42_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/42/"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log("id: " + profile.id);
        console.log("username: " + profile.username);
        console.log("lastname: " + profile.name.familyName + " firstname: " + profile.name.givenName);
        console.log("email: " + profile.emails[0].value);
        console.log("photo de profile: " + profile.photos[0].value);
        
    }
));

module.exports = passport;