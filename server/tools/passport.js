const passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;

let db = require('../db/db').connection_db;
let sql = require('../db/requetes');

require('dotenv').config();

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(new FortyTwoStrategy({
    clientID: process.env.PASSPORT_42_CLIENT_ID,
    clientSecret: process.env.PASSPORT_42_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/42/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        let id42 = profile.id;
        let lastname = profile.name.familyName;
        let firstname = profile.name.givenName;
        let username = profile.username;
        let email = profile.emails[0].value;
        let photo = profile.photos[0].value;

        console.log("id: " + id42);
        console.log("username: " + username);
        console.log("lastname: " + lastname + " firstname: " + firstname);
        console.log("email: " + email);
        console.log("photo de profile: " + photo);
        return cb(null, profile);
    }
));

module.exports = passport;