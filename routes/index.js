var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

require('dotenv').config()

const article_controller = require('../controllers/article_controller')
const comment_controller = require('../controllers/comment_controller')
const auth_controller = require('../controllers/auth_controller')


// Article Routes
router.get('/', function (req, res, next) {
    res.end('HI!')
} )

router.get('/article', verifyPriveleges, article_controller.article_list)

router.get('/article/:articleId', article_controller.article_detail)

router.post('/article', verifyToken, article_controller.post_article)

router.delete('/article/:articleId', verifyToken, article_controller.delete_article)

router.put('/article/:articleId', verifyToken, article_controller.publish_article)

// Comment Routes
router.post('/article/:articleId/comment', comment_controller.comment_post)

router.delete('/article/:articleId/comment/:commentId', comment_controller.comment_delete)

// Authentication Routes
router.post('/auth/sign-up', auth_controller.sing_up)

router.post('/auth/login', auth_controller.login)

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token,process.env.key, (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.token = token
            next()
        })
    } else {
        res.sendStatus(403)
    }
}
function verifyPriveleges(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token, process.env.key, (err, decoded) => {
            if (err) {
                req.hasAccess = false
                next(err)
            };            ;
            req.hasAccess = true
            next()
        })
    } else {
        req.hasAccess = false;
        next()
    }
}


module.exports = router;


