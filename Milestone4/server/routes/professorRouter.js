var express = require('express');
var router = express.Router();

// Require controller modules
// var professorController = require('../controllers/professorController');

var mongoose = require('mongoose');
var professors = require('../models/professor');
// var verification = require('./userVerification');
var passport = require('passport');
// Professor Routes

console.log("Gone through professor router");

//Routes from Applications Doc

// POST request for professor to create course
// router.post('/professor/:professorID/course', professorController.professorCoursePost);

router.route('/:professorId/course')
.post(function(req, res, next) {
	professors.findById(req.params.professorId, function(err, professor) {
		if (err) throw err;
		professor.courses.create(req.body, function(err, course) {
			if (err) throw err;
			res.end('Course ' + course._id + ' has been created');
		})
	});
});

// POST request for professor to create project
// router.post('/professor/:professorID/project', professorController.professorProjectPost);

router.route('/:professorId/project')
.post(function(req, res, next) {
	professors.findById(req.params.professorId, function(err, professor) {
		if (err) throw err;
		professor.courses.push(req.body);
		professor.save(function(err, professor) {
			if (err) throw err;
			console.log('Updated projects');
			res.json(professor);
		});
	});
});

// POST request to create one professor
// router.post('/professor/', professorController.professorPost);

router.route('/')
.post(function(req, res, next) {
	professors.register(new professors({
		username : req.body.username
	}), req.body.password, function(err, professor) {
		if (err) throw err;
		if (req.body.firstName) {
			professor.firstName = req.body.firstName;
		}
		if (req.body.lastName) {
			professor.lastName = req.body.lastName;
		}
		passport.authenticate('local')(req, res, function() {
			if (err) throw err;
			req.logIn(professor, function(err) {
				if (err) throw err;
				var token = verification.getProfessorToken(professor);
				res.status(200);
			});
		});
	});
	// professors.create(req.body, function(err, professor) {
	// 	if (err) throw err;
	// 	console.log('Professor created');
	// 	var id = professor._id;
	// 	res.json(professor);
	// 	res.end('Added the professor with id: ' + id);
		// WORKS
	// });
});

// GET all of one professors students
// router.get('/professor/:professorID/student', professorController.professorOneStudentDetail);

router.route('/:professorId/student')
.get(function(req, res, next) {
	professors.findById(req.params.professorId, function(err, professor) {
		if (err) throw err;
		res.end("Retrieve all of a specific professor's students");
		res.json(professor.students);
		// WORKS
	});
});

// GET one of one professors students
// router.get('/professor/:professorID/student/:studentID', professorController.professorAllStudentsDetail);

router.route('/:professorId/student/:studentId')
.get(function(req, res, next) {
	professors.findById(req.params.professorId, function(err, professor) {
		if (err) throw err;
		res.end("Retrieve a specific student of a professor");
		res.json(professor.students.id(req.params.studentId));
		// WORKS
	});
});

// GET request for list of all professors
// router.get('/professors', professorController.professorList);

router.route('/')
.get(function(req, res, next) {
	professors.find({}, function(err, professor) {
		if (err) throw err;
		res.json(professor);
		// WORKS
	});
});

// GET request for one professor
// router.get('/professor/:professorID', professorController.professorDetail);

router.route('/:professorId')
.get(function(req, res, next) {
	professors.findById(req.params.professorId, function(err, professor) {
		if (err) throw err;
		res.json(professor);
		// WORKS
	});
});

module.exports = router;