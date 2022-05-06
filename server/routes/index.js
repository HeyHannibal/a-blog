var express = require('express');
var router = express.Router();
const article_controller = require('../controllers/article_controller')
const comment_controller = require('../controllers/comment_controller')


router.get('/article', article_controller.article_list)

router.get('/article/:articleId', article_controller.article_detail)

//router.post('/article', article_controller.article_new_post)

router.post('/article/:articleId/comment', comment_controller.comment_post)

module.exports = router;
