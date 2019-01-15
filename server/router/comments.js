const express = require('express');
const router = express.Router();
const passport = require('../tools/passport');
const userQuery = require('../models/userModel');
const jwt = require('jsonwebtoken');
var db = require('../db/db');
var sql = require('../db/requetes');

router.get('/:movie_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    db.connection_db.query(sql.get_comment_user_id, [req.params.movie_id], (err, rows) => {
        if (err) {
            res.status(403).json({msg: "Error get comments"});
        } else if (rows.length > 1) {
            var data = [];
            for (let i = 0; i < rows.length; i++) {
                userQuery.findOne({id: rows[0].user_id}).then(user => {
                    db.connection_db.query(sql.get_comment, [rows[0].comment_id], (err1, rows1) => {
                        if (err1) {
                            res.status(403).json({msg: "Error get comments"});
                        } else {
                            let info = {
                                uid: user.id,
                                username: user.username,
                                lastname: user.lastname,
                                firstname: user.firstname,
                                profile: user.profile,
                                comment: rows1[0].comment,
                                date: rows1[0].date
                            }
                            data.push(info);
                            if (i == rows.length - 1) {
                                res.json({comments: data});
                            }
                        }
                    });
                });
            }
        } else {
            res.json({comments: []});
        }
    });
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    var user_id = jwt.decode(req.cookies.token).id;
    if (req.body.comment.length < 1) {
        res.status(403).json({msg: "Error empty comment"});
    } else if (req.body.comment.length > 1000) {
        res.status(403).json({msg: "Error comment to large"});
    } else {
        db.connection_db.query(sql.add_comment, [req.body.comment], (err, rows) => {
            if (err) {
                res.status(403).json({msg: "Error add comment"});
            } else {
                db.connection_db.query(sql.add_comment_movie_user, [[req.body.movie_id, rows.insertId, user_id]], (err1, rows1) => {
                    if (err1) {
                        res.status(403).json({msg: "Error add comment"});
                    } else {
                        res.json({msg: "Save comment success"});
                    }
                });
            }
        });
    }
});

module.exports = router;