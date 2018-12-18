var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    db.connection.query(sql.create_database, function(err, res) {
        if (err) {
            console.log("CREATE DATABASE ERROR: ", err.message);
            return ;
        }
        console.log("CREATE DATABASE SUCCESS!");
        db.connection_db.query(sql.create_table_users, function(err, res) {
            if (err)
                console.log("CREATE TABLE USERS ERROR: ", err.message);
            else
                console.log("CREATE TABLE USERS SUCCESS!");
        });
        db.connection_db.query(sql.create_table_movies, function(err, res) {
            if (err)
                console.log("CREATE TABLE MOVIES ERROR: ", err.message);
            else
                console.log("CREATE TABLE MOVIES SUCCESS!");
        });
        db.connection_db.query(sql.create_table_movies_viewed, function(err, res) {
            if (err)
                console.log("CREATE TABLE MOVIES VIEWED ERROR: ", err.message);
            else
                console.log("CREATE TABLE MOVIES VIEWED SUCCESS!");
        });
        db.connection_db.query(sql.create_table_movies_genre, function(err, res) {
            if (err)
                console.log("CREATE TABLE MOVIES GENRE ERROR: ", err.message);
            else
                console.log("CREATE TABLE MOVIES GENRE SUCCESS!");
        });
        db.connection_db.query(sql.create_table_movies_torrent, function(err, res) {
            if (err)
                console.log("CREATE TABLE MOVIES TORRENT ERROR: ", err.message);
            else
                console.log("CREATE TABLE MOVIES TORRENT SUCCESS!");
        });
        db.connection_db.query(sql.create_table_movies_file, function(err, res) {
            if (err)
                console.log("CREATE TABLE MOVIES FILE ERROR: ", err.message);
            else
                console.log("CREATE TABLE MOVIES FILE SUCCESS!");
        });
        db.connection_db.query(sql.create_table_movies_subtitle, function(err, res) {
            if (err)
                console.log("CREATE TABLE MOVIES SUBTITLE ERROR: ", err.message);
            else
                console.log("CREATE TABLE MOVIES SUBTITLE SUCCESS!");
        });
    });
});

module.exports = router;
