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
            res.sendStatus(403)
            console.log('this');

        }
        if (!user) {
            res.sendStatus(403)
            console.log('this');

        }
        else if (!req.body.password || user.password !== req.body.password) {
            console.log('this');
            res.sendStatus(403)
        }
        else {
             const options = {}
            options.expiresIn = 100 * 100;
            const secret = process.env.secretKey;
            const token = jwt.sign({ user }, secret, options)
            console.log(token);
            res.status(200).json({
                message: 'Auth passed',
                token
            })
        }
    })
}

