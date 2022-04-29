var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ArticleSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now },

    }, { toJSON: { virtuals: true } });

// Virtual for Article's URL
ArticleSchema
    .virtual('url')
    .get(function () {
        return 'article/' + this._id;
    });

//Export model
module.exports = mongoose.model('Article', ArticleSchema);