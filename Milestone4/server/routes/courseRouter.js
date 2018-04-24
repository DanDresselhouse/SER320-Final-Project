var express = require('express');
var router = express.Router();
// Require controller modules
// var courseController = require('../controllers/courseController');

var mongoose = require('mongoose');
var courses = require('../models/courses');
var projects = require('../models/project');
var reviews = require('../models/reviews');
var students = require('../models/student');
/// course ROUTES ///

/* GET catalog home page. */
// router.get('/', courseController.index);

console.log("Gone through course router");

// Application Route Document Route

// GET all courses
// router.get('/courses', courseController.courseList);

router.route('/')
.get(function(req, res, next) {
	courses.find({}, function(err, course) {
		if (err) throw err;
		res.json(course);
		res.end('Retrieved all courses');
	});
})
.post(function(req, res, next) {
	courses.create(req.body, function(err, course) {
		if (err) throw err;
		res.end('Course created with id: ' + course._id);
	});
	// WORKS
});

// GET single course
// router.get('/courses/:courseID', courseController.courseDetail);

router.route('/:courseId')
.get(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		res.json(course);
	});
});

// GET all projects in a course
// router.get('/courses/:courseID/project', courseController.courseProjectList);

router.route('/:courseId/project')
.get(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		res.json(course.projects);
	});
})
.post(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		course.projects.push(req.body);
		course.save(function(err, course) {
			if (err) throw err;
			console.log('Project created');
			res.json(course);
		});
	});
});

// GET single project in a course
// router.get('/courses/:courseID/project/:projectID', courseController.courseProjectDetail)

router.route('/:courseId/project/:projectId')
.get(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		res.json(course.projects.id(req.params.projectId));
	});
});

// GET all reviews in a single project
// router.get('/courses/:courseID/project/:projectID/review', courseController.courseProjectReviewList);

router.route('/:courseId/project/:projectId/review')
.get(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		projects.findById(req.params.projectId, function(err, project) {

		})
		res.json(course.projects.id(projects.reviews));
	});
})
.post(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		projects.findById(req.params.projectId, function(err, project) {
			if (err) throw err;
			project.reviews.push(req.body);
			project.save(function(err, review) {
				if (err) throw err;
				console.log('Review created');
				res.json(review);
			});
		});
	});
});

// GET single review in a single project
// router.get('/courses/:courseID/project/:projectID/review/:reviewID', courseController.courseProjectReviewDetail);

router.route('/:courseId/project/:projectId/review/:reviewId')
.get(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		res.json(course.project.id(req.params.reviewId));
	});
});

// GET and POST students into courses
router.route('/:courseId/student')
.get(function (req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		res.json(course.students);
	});
})
.post(function(req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		course.students.push(req.body);
		course.save(function(err, students) {
			if (err) throw err;
			console.log('Updated students');
			res.json(students);
			res.end('Added the student with id: ' + students._id);
		});
	});
});

router.route('/:courseId/student/:studentId')
.get(function (req, res, next) {
	courses.findById(req.params.courseId, function(err, course) {
		if (err) throw err;
		res.json(course.students.id(req.params.studentId));
	});
});

module.exports = router;