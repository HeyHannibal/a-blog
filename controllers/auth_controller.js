const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.sing_up = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    });
  });
};

exports.login = function (req, res, next) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }
    if (!user) {
      res.sendStatus(403);
    } else
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) next(err);
        if (response) {
          const options = {};
          options.expiresIn = 100 * 100;
          const secret = process.env.key;
          const token = jwt.sign({ user }, secret, options);
          res.json({
            message: "Auth passed",
            token,
          });
        }
      });
  });
};
// LOGIN
// curl -X POST -H "Content-Type:application/json" http://localhost:3001/auth/sign-up -d '{"username":"ffffff", "password":"ffffff"}'
