const passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userQuery = require('../models/userModel');

require('dotenv').config();

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_KEY;
passport.use(new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    userQuery.findOne({id: jwt_payload.id}).then(user => {
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
                    if (userEmail)
                        cb(null, {err: "Email already exists"});
                    else {
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

module.exports = passport;