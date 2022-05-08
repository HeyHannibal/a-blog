const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.sing_up = function (req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    }).save(err => {
        if (err) {
            return next(err);
        }
        console.log('succsess')
        res.redirect("/");
    });
}

exports.login = function (req, res, next) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.redirect('./')
        }
        if (!user) {
            res.json({ message: "Incorrect username" });
        }
        if (!req.body.password || user.password !== req.body.password) {

            res.json({ message: "Incorrect password" });
        }
        else {
            const options = {}
            options.expiresIn = 60 * 60;
            const secret = process.env.secretKey;
            const token = jwt.sign({ user }, secret, options)
            res.status(200).json({
                message: 'Auth passed',
                token
            })
        }
    })
}

