'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userQuery = require('../models/userModel');
const passport = require('../tools/passport');
const settingsFilter = require('../middlewares/settingsFilter');
const fs = require('fs');
let db = require('../db/db').connection_db;
let sql = require('../db/requetes');
let {sendMailTo} = require('../tools/sendMailTo');

router.get('/settings', passport.authenticate('jwt', {session: false}), (req, res) => {
    let id = jwt.decode(req.cookies.token).id;

    userQuery.findOne({id: id}).then(user => {
        if (!user) {
            res.status(403).json({msg: "No user"});
        } else {
            let data = {
                id: user.id,
                username: user.username,
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
                language: user.language,
                profile: user.profile,
                isVerified: user.isVerified
            }
            res.json({user: data});
        }
    });
});

router.post('/settings', passport.authenticate('jwt', {session: false}), settingsFilter, (req, res) => {
    let photo = req.body.photo;
    let id = jwt.decode(req.cookies.token).id;

    if (req.body.photo_change) {
        const dir = __dirname + '/../public/'
        const userStorage =  id + '/'
        const filename = userStorage + 'profile.png'
        const file = "http://localhost:" + process.env.PORT_BACK + "/api/photo/" + filename
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        if (!fs.existsSync(dir + userStorage)) {
            fs.mkdirSync(dir + userStorage)
        }
        fs.writeFileSync(dir + filename, req.body.photo, {encoding: 'base64'});
        req.body.photo = file;
    }
    
    userQuery.findOne({id: id}).then(user => {
        let requete = sql.update_oauth_settings;
        let data = [
            req.body.lastname,
            req.body.firstname,
            req.body.username,
            req.body.language,
            req.body.photo
        ];
        if (!user.id42 && !user.googleid && !user.githubid) {
            requete = sql.update_user_settings;
            data.push(req.body.npassword);
            data.push(req.body.email);
            data.push(req.body.isVerified);
        }
        data.push(id);
        db.query(requete, data, (err, rows) => {
            if (err) {
                res.status(403).json({msg: "Error update settings"});
            } else if (!req.body.isVerified) {
                sendMailTo(req.body.username, req.body.email, 2).then(success => {
                    res.json({msg: "Update settings", msg_mail: success});
                }).catch(err => {
                    res.status(403).json({sendMail: err});
                })
            } else {
                res.json({msg: "Update settings"});
            }
        });
    });
});

module.exports = router;