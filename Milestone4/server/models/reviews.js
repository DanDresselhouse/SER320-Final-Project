// Requiring mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewsSchema = Schema({
    performanceRating: {
        type: Number,
        required: true,
    },
    performanceComment: {
        type: String,
        required: true,
        min: 0,
        max: 200
    },
    collaborationRating: {
        type: Number,
        required: true,
    },
    collaborationComment: {
        type: String,
        required: true,
        min: 0,
        max: 200
    },
    teamworkRating: {
        type: Number,
        required: true,
    },
    teamworkComment: {
        type: String,
        required: true,
        min: 0,
        max: 200
    },
    contributionRating: {
        type: Number,
        required: true,
    },
    contributionComment: {
        type: String,
        required: true,
        min: 0,
        max: 200
    },
});

// Virtual for author's full name
ReviewsSchema
    .virtual('id')
    .get(function () {
        return this._id;
    });


//Export model
module.exports = mongoose.model('Reviews', ReviewsSchema);