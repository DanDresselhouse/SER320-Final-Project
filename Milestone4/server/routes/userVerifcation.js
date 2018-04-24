var professor = require('../models/professor');
var student = require('../models/student');
var jwt = require('jsonwebtoken');

exports.verifyUser = function(req, res, next) {
	if (req.professor) {
		next();
	} else {
		if (req.student) {
			next();
		} else {
			var error = new Error("Please log into an account");
			error.status = 400;
			next(error);
		}
		var error = new Error("Please log into an account");
		error.status = 400;
		next(error);
	}

};

exports.getProfessorToken = function(professor) {
	return jwt.sign(professor, "ABDCEF123456", {
		"expiresIn" : 5
	});
};

exports.getStudentToken = function(student) {
	return jwt.sign(student, "ABDCEF123456", {
		"expiresIn" : 5
	});
};