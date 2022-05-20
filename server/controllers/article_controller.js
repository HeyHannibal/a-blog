var async = require("async");
const { body, validationResult } = require("express-validator");

const Article = require("../models/article");
const Comment = require("../models/comment");
exports.article_list = function (req, res, next) {
  Article.find(req.hasAccess ? {} : { published: true })
    .sort({ date: 1 })
    .exec((err, article_list) => {
      if (err) {
        return next(err);
      }
      res.json(article_list);
    });
};

exports.article_detail = function (req, res, next) {
  async.parallel(
    {
      article: function (callback) {
        Article.findById(req.params.articleId).exec(callback);
      },
      comments: function (callback) {
        Comment.find({ article: req.params.articleId }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json({ article: results.article, comments: results.comments });
    }
  );
};

exports.post_article = [
  body("title", "Title error").trim().isLength({ min: 3 }).escape(),
  body("body", "Article error").trim().isLength({ min: 15 }).escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    const article = new Article({
      title: req.body.title,
      body: req.body.body,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      res.sendStatus(400);
    } else {
      article.save(function (err) {
        if (err) {
          return next(err);
        }
        res.json("article created!");
      });
    }
  },
];

exports.delete_article = function (req, res, next) {
  Article.deleteOne({ _id: req.params.articleId }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json("successfully deleted!");
  });
};

exports.publish_article = function (req, res, next) {
  Article.findOneAndUpdate(
    { _id: req.params.articleId },
    { published: req.body.published },
    function (err, result) {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    }
  );
};

// post article
// curl -X POST -H "Content-Type:application/json" http://localhost:3000/article/ -d '{"title":"It works!", "body":"heheheh"}'
// post comment
// curl -X POST -H "Content-Type:application/json" http://localhost:3000/article/626bed2ac4fa1d72c6c405d7/comment/ -d '{"username":"baked potato", "body":"i'm baked"}'
