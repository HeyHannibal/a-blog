var async = require('async')
const jwt = require('jsonwebtoken')

const Article = require('../models/article')
const Comment = require('../models/comment')
exports.article_list = function (req, res, next) {

    Article.find({})
        .sort({ date: 1 })
        .exec((err, article_list) => {
            if (err) { return next(err) }
            res.json(JSON.stringify(article_list))
        })
}

exports.article_detail = function (req, res, next) {
    async.parallel({
        article: function (callback) {
            Article.findById(req.params.articleId)
                .exec(callback)
        },
        comments: function (callback) {
            Comment.find({ 'article': req.params.articleId })
                .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err) }
        res.json({ article: results.article, comments: results.comments })
    })

}

exports.article_new_post = function (req, res, next) {
    const article = new Article({
        title: req.body.title,
        body: req.body.body,

    })
    article.save(function (err) {
        if (err) { return next(err) };
        res.json('article created!')
    })
}

exports.article_delete = function (req, res, next) {
    Article.deleteOne({_id: req.params.articleId}, (err , result) => {
        if(err) {return next(err)}
        res.json('successfully deleted!')
    })
}


// post article
// curl -X POST -H "Content-Type:application/json" http://localhost:3000/article/ -d '{"title":"It works!", "body":"heheheh"}'
// post comment
// curl -X POST -H "Content-Type:application/json" http://localhost:3000/article/626bed2ac4fa1d72c6c405d7/comment/ -d '{"username":"baked potato", "body":"i'm baked"}'
