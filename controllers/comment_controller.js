const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.comment_post = [
  body("username", "username error").trim().default('anonymous'),
  body("body", "body error").trim().isLength({ min: 3 }),

  function (req, res, next) {

    const errors = validationResult(req)
    console.log(req.body.username.length);
  const comment = new Comment({
    username: req.body.username,
    body: req.body.body,
    article: req.params.articleId,
  });

  if(!errors.isEmpty()) {
    res.sendStatus(400)
  }

  comment.save(function (err) {
    console.log('eeee');
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
}]

exports.comment_delete = function (req, res, next) {
  Comment.deleteOne({ _id: req.params.commentId }, (err, result) => {
    if (err) {
      res.sendStatus(404);
    }
    res.sendStatus(200);
  });
};
