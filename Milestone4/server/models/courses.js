// Requiring mongoose and other schemas to embed them
var mongoose = require('mongoose');
var project = require('./project');
var projectSchema = mongoose.model('Project').schema;
var student = require('./student');
var studentSchema = mongoose.model('Student').schema;
var professor = require('./professor');
var professorSchema = mongoose.model('Professor').schema;
var reviews = require('./reviews');
var reviewSchema = mongoose.model('Reviews').schema;

var Schema = mongoose.Schema;

var CourseSchema = Schema({
    courseName: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    courseCode: {
        type: String,
        required: true,
        min: 6,
        max: 7
    },
    // Embedding the schemas
    projects: [
        projectSchema
        ],
    students: [
        studentSchema
    ],
    professor: {
        professorSchema
    },
    reviews: [
        reviewSchema
    ]
});

// Virtual for author's full name
CourseSchema
    .virtual('name')
    .get(function () {
        return this.courseCode;
    });


//Export model
module.exports = mongoose.model('Course', CourseSchema);