var myApp = angular.module("myApp", ["ngRoute", "ngResource"]);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            redirectTo: "/login"
        })
        .when("/signup", {
            templateUrl: "app/partials/signup.html",
            controller: "SignupController"
        })
        .when("/professor/courses", {
            templateUrl: "app/partials/professorCourses.html",
            controller: "ProfessorCoursesController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/professor/projects", {
            templateUrl: "app/partials/professorProjects.html",
            controller: "ProfessorProjectsController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/professor/reviews", {
            templateUrl: "app/partialsprofessorReviews.html",
            controller: "ProfessorReviewsController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/student/courses", {
            templateUrl: "/app/partials/studentCourses.html",
            controller: "StudentCoursesController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/student/projects", {
            templateUrl: "app/partials/studentProjects.html",
            controller: "StudentProjectsController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/student/reviews", {
            templateUrl: "/app/partials/studentReviews.html",
            controller: "StudentReviewsController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/student/createReviews", {
            templateUrl: "/app/partials/studentCreateReview.html",
            controller: "StudentCreateReviewController",
            resolve: { //if user is not logged in direct user to login page.
                //The object sent here is boardcasted via $rootScope. If Route is resovled,
                //the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                auth: function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    console.log("resolve");
                    if (userInfo) {

                        return $q.when(userInfo);
                    } else {
                        console.log("reject");
                        return $q.reject({
                            authenticated: false
                        });
                    }
                }
            }
        })
        .when("/login", {
            templateUrl: "app/partials/login.html",
            controller: "LoginController"
        })
        .otherwise({
            redirectTo: "/login"
        });
});
myApp.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);
