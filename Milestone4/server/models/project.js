// Requiring mongoose and reviews to embed
var mongoose = require('mongoose');
var reviews = require('./reviews');
var reviewSchema = mongoose.model('Reviews').schema;

var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    projectName: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    projectCode: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    projectDescription: {
        type: String,
        required: true,
        min: 0,
        max: 200
    },
    // Embedding the reviewSchema
    reviews: [
        reviewSchema
    ]
});

// Virtual for author's full name
ProjectSchema
    .virtual('name')
    .get(function () {
        return this.projectName;
    });


//Export model
module.exports = mongoose.model('Project', ProjectSchema);