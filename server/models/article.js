var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ArticleSchema = new Schema(
    {
        title: { type: String, required: true, minlength: 3},
        body: { type: String, required: true, minlength: 10 },
        date: { type: Date, default: Date.now },
        published: {type: Boolean, default: true}

    }, { toJSON: { virtuals: true } });

// Virtual for Article's URL
ArticleSchema
    .virtual('url')
    .get(function () {
        return 'article/' + this._id;
    });

//Export model
module.exports = mongoose.model('Article', ArticleSchema);