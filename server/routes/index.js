var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

require('dotenv').config()

const article_controller = require('../controllers/article_controller')
const comment_controller = require('../controllers/comment_controller')
const auth_controller = require('../controllers/auth_controller')

router.get('/article', verifyPriveleges, article_controller.article_list)

router.get('/article/:articleId', article_controller.article_detail)

router.post('/article', verifyToken, article_controller.article_new_post)

router.delete('/article/:articleId', verifyToken, article_controller.article_delete)

router.put('/article/:articleId', verifyToken, article_controller.article_pub)

router.post('/article/:articleId/comment', comment_controller.comment_post)

router.delete('/article/:articleId/comment/:commentId', comment_controller.comment_delete)


router.post('/auth/sign-up', auth_controller.sing_up)


router.post('/auth/login', auth_controller.login)

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
        console.log('failed auth');
        res.sendStatus(403)
    }
}
function verifyPriveleges(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
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


//////function verify(req, next) {
    //     const bearerHeader = req.headers['authorization']
    //     if (typeof bearerHeader !== 'undefined') {
    //         return false
    //     }
    //     const token = bearerHeader.split(' ')[1]
    //     return jwt.verify(token, process.env.secretKey, (err, decoded) => {
    //         if (err) return false;
    //         return token
    //     })
    
    // }
    
    // function verifyToken(req, res, next) {
    //     if (verify(req)) {
    //         next()
    //     } else {
    //         res.sendStatus(403)
    //     }
    // }
    
    
    
    
    // function verifyPriveleges(req, res, next) {
    //     console.log(verify(req));
    //     if (verify(req)) {
    //         console.log('had access');
    //         req.hasAccess = true
    //         next()
    //     } else {
    //         req.hasAccess = false
    //         next()
    //     }
    // }


