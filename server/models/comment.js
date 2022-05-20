var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        username: { type: String, default: "anonymous" },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now },
        article: {type: Schema.Types.ObjectId, ref:'Article', required: true}
    }
);

// Virtual for Comment's URL
CommentSchema
    .virtual('url')
    .get(function () {
        return 'Comment/' + this._id;
    });

//Export model
module.exports = mongoose.model('Comment', CommentSchema);