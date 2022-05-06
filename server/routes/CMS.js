const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

require('dotenv').config()


const User = require('../models/user')
const article_controller = require('../controllers/article_controller')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json('log in to use CMS');
});

router.post('/sign-up', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    }).save(err => {
        if (err) {
            return next(err);
        }
        console.log('succsess')
        res.redirect("/");
    });
})


router.post('/login', (req, res) => {
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
            options.expiresIn = 60;
            const secret = process.env.secretKey;
            const token = jwt.sign({ user }, secret, options)
            res.status(200).json({
                message: 'Auth passed',
                token
            })
        }
    })
})


router.post('/article', verifyToken, article_controller.article_new_post)

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.token = token
            next()
        })
    } else {
        res.sendStatus(403)
    }
}

router.delete('/article', article_controller.article_delete)



module.exports = router;



// Get protected
// curl -X POST -H "Content-Type:application/json" -H "authorization:bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImRhbiJ9LCJpYXQiOjE2NTE2OTYyMzN9.Q4zxGfCLEgyRqUgPO9vEJHs3aUqa9AExYUmW0bxJBrk" http://localhost:3001/cms/article/ -d '{"title":"Classic Matrix Quotes", "body":"Wow"}'
//  Sign Up
//  curl -X POST -H "Content-Type:application/json" http://localhost:3001/cms/sign-up -d '{"username":"aaaaaa", "password":"aaaaaa"}'
//  Post Login 
// curl -X POST -H "Content-Type:application/json" http://localhost:3001/cms/login -d '{"username":"aaaaaa", "password":"aaaaaa"}'
