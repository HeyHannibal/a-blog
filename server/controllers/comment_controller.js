const Comment = require('../models/comment')

exports.comment_post = function(req, res, next) {
    const comment = new Comment({
        username: req.body.username,
        body: req.body.body,
        article: req.params.articleId
    })
    comment.save(function(err) {
        if(err) { return next(err)}; 
        res.redirect('/')
    })
}