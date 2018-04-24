//these are gonna call methods using the binded variables in each html into parameters in methods to call the service provider
myApp.controller("LoginController", ["$scope", "$location", "$window", "studentProvider", "authenticationSvc", function ($scope, $location, $window, studentProvider, authenticationSvc) {
    $scope.userInfo = null;
    $scope.login = function () {
        authenticationSvc.login($scope.username, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;
                console.log("IM WORKING");
                $location.path("/student/courses");
            }, function (error) {
                $window.alert("Username or password is invalid");
                console.log(error);
            });
    };

    $scope.signup = function () {
        console.log("WOW ITS SIGNING YOU UP");
        $location.path("/signup");
    }
}]);




// EXAMPLE OF HOW THIS STUFF WORKS
// inject the authenticationservice

// fucntion name() {
//     authenticationservice.name(params with $scope).then(function (res) {
//         if (
//             if access token) {
//             $location.path('partial thats being displayed')
//         } else {
//             $window respond that there was an error with alert or soemghint
//         }
//     })
// }