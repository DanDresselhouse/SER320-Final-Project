// Requiring mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupsSchema = Schema({
    students: [{
        type: Schema.ObjectId,
        ref: 'Student',
        required: true
    }],
    reviews: [{
        type: Schema.ObjectId,
        ref: 'Reviews',
        required: false
    }],
    groupCode: {
        type: String,
        required: true,
        min: 3,
        max: 15
    }
});

// Virtual for author's full name
GroupsSchema
    .virtual('name')
    .get(function () {
        return this.groupCode;
    });


//Export model
module.exports = mongoose.model('Groups', GroupsSchema);