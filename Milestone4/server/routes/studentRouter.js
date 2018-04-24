var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Require controller modules
// var studentController = require('../controllers/studentController');

var mongoose = require('mongoose');
var students = require('../models/student');
var reviews = require('../models/reviews');
/// student ROUTES ///

// Application Router Doc 

// POST create a student
// router.post('/student', studentController.studentPost);

console.log("Gone through student router");

router.route('/')
.get(function(req, res, next) {
	students.find({}, function(err, student) {
		if (err) throw err;
		res.json(student);
	});
})
.post(function(req, res, next) {
	students.create(req.body, function(err, student) {
		if (err) throw err;

		console.log('Student created');

		var id = student._id;
		res.end('Added the student, ' + student.firstName + ', with id: ' + id);
		// WORKS
	});
});

// POST student creates review
// router.post('/student/:studentID/review', studentController.studentCreateReviewPost);

router.route('/:studentId/review')
.get(function (req, res, next) {
	students.findById(req.params.studentId, function (err, student) {
		if (err) throw err;
		res.json(student.reviews);
		// WORKS
	});
})
.post(function(req, res, next) {
	students.findById(req.params.studentId, function(err, student) {
		if (err) throw err;
		student.reviews.push(req.body);
		student.save(function (err, review) {
			if (err) throw err;
			console.log('Updated reviews');
			res.json(review);
		});
	});
});

// GET single course information for a single student
// router.get('/student/:studentID/course/:courseID', studentController.studentCourseDetail);

router.route('/:studentId/course/:courseId')
.get(function (req, res, next) {
	students.findById(req.params.studentId, function(err, student) {
		if (err) throw err;
		res.json(student.courses.id(req.params.courseId));
	});
});

// GET all reviews of student (themselves)
// router.get('/student/:studentID/review/:studentID', studentController.studentReviewList);

router.route('/:studentId/review/:reviewId')
.get(function (req, res, next) {
	students.findById(req.params.studentId, function (err, student) {
		if (err) throw err;
		res.json(student.reviews.id(req.params.reviewId));
	});
});

module.exports = router;