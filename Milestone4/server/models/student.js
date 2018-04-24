// Requiring mongoose and the reviews schema to embed
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var reviews = require('./reviews');
var reviewSchema = mongoose.model('Reviews').schema;

var Schema = mongoose.Schema;

var StudentSchema = Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    picture: {
        type: String,
        required: false
    },
    groupId: {
        type: String,
        required: true
    },
    // Embedding the reviewSchema
    reviews: [
        reviewSchema
    ]
});

// Virtual for author's full name
StudentSchema
    .virtual('name')
    .get(function () {
        return this.lastName + ', ' + this.firstName;
    });
StudentSchema.plugin(passportLocalMongoose);    

//Export model
module.exports = mongoose.model('Student', StudentSchema);