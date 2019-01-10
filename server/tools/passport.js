const passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const userQuery = require('../models/userModel');

require('dotenv').config();

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

var jwtOptions = {};
jwtOptions.jwtFromRequest = cookieExtractor;
jwtOptions.secretOrKey = process.env.JWT_KEY;
passport.use(new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    userQuery.findOne({id: jwt_payload.id}).then((user) => {
        if (user) {
            var info = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            return done(null, info);
        }
        return done(null, false);
    });
}));

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
        userQuery.findOne({id42: id42}).then(userId => {
            if (!userId) {
                userQuery.findOne({email: email}).then(async userEmail => {
                    if (userEmail) {
                        cb(null, {err: "Email already exists"});
                    } else {
                        while (1) {
                            let response = await userQuery.findOne({username: username});
                            if (!response)
                                break ;
                            username += Math.floor(Math.random() * 1001);
                        }
                        userQuery.createOne({lastname: lastname, firstname: firstname, username: username, email: email, profile: photo, id42: id42}).then(data => {
                            userQuery.findOne({id42: id42}).then(userInfo => {
                                return cb(null, userInfo);
                            });
                        });
                    }
                })
            }
            else {
                return cb(null, userId);
            }
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.PASSPORT_FACEBOOK_APP_ID,
    clientSecret: process.env.PASSPORT_FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile._json);
        return cb(null, profile);
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile._json);
        return cb(null, profile);
    }
));

module.exports = passport;