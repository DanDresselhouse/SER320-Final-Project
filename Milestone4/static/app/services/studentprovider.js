//this is the one that is gonna use the $http

(function () {

    function studentProvider($resource, authenticationSvc) {

        this._server_host = "";

        this.login = function () {
            return $resource(this._server_host + "/login", null, {
                query: {
                    method: 'POST',
                    url: "/student/courses",
                    data: {
                        username: result.data.username,
                        password: result.data.password
                    }
                    .then(function (res) {
                        return res.data;
                    })
                }
            })
        }

        this.getCourses = function () {
            return $resource(this._server_host + "/student/courses/:courseId", null, {
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                },
                get: {
                    method: 'GET',
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                }
            });

        };

        this.getProjects = function () {
            return $resource(this._server_host + "/student/projects/:projectId", null, {
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                },
                get: {
                    method: 'GET',
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                }
            });

        };

        this.getReviews = function () {
            return $resource(this._server_host + "/student/reviews/:reviewId", null, {
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                },
                get: {
                    method: 'GET',
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                }
            });

        };

        this.createReviews = function () {
            return $resource(this._server_host + "/student/createReviews/", null, {
                save: {
                    method: 'POST',
                    headers: {
                        'access_token': authenticationSvc.getUserInfo().accessToken
                    }
                }
            });

        };
    }

    myApp.service("studentProvider", ['$resource', 'authenticationSvc', studentProvider]);

})();




















// myApp.factory("authenticationSvc", ["$http", "$q", "$window", function ($http, $q, $window) {
//                 var userInfo;

//                 function getStudentCourses(student_id) {
//                     var deferred = $q.defer();

//                     return $http({
//                         method: "POST",
//                         url: "/student/courses",
//                         data: {
//                             student_id: result.data.student_id
//                         }
//                         .then(function (res) {
//                             return res.data;
//                         })
//                     });
//                 }

//             }



// THIS IS AN EXAMPLE OF HOW THIS THING WORKS
// function name(param)
// return $http({
//             method: "POST",
//             url: "/api/logout",
//             // headers: {
//             //     "access_token": userInfo.accessToken
//             // },
//             data: {
//                 username
//                 password
//             }
//             .then(func(res) { //being returned by server
//                 return res.data
//             })
//         }