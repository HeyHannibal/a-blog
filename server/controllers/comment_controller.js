const { sendStatus } = require('express/lib/response')
const Comment = require('../models/comment')

exports.comment_post = function(req, res, next) {
    console.log(req.body)
    const comment = new Comment({
        username: req.body.username,
        body: req.body.body,
        article: req.params.articleId
    })
    comment.save(function(err) {
        if(err) { return next(err)}; 
        res.json(comment)
    })
}

exports.comment_delete = function (req, res, next) {
    Comment.deleteOne({_id: req.params.commentId}, (err , result) => {
        if(err) {
            res.sendStatus(404)
        }
        res.sendStatus(200)
    })
}