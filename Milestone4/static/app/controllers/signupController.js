(function () {

    // 1. declare our controller.
    function SignupController($scope, $location, studentProvider, authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        $scope.newSignup = {};

        function signup() {
            console.log("WOW YOU'RE SIGNING UP");
            $scope.courses = studentProvider.signup().query(
                function (resp) {
                    $scope.finished_loading = true;
                    $scope.students = resp;
                },
                function (error) {
                    $scope.page_load_error = error.message;
                });

        }
        signup();
        $scope.logout = function () {

            authenticationSvc.logout()
                .then(function (result) {
                    $scope.userInfo = null;
                    $location.path("/login");
                }, function (error) {
                    console.log(error);
                });
        };

    }

    // 2. create the controller and give it $scope.
    myApp.controller("SignupController", ['$scope', '$location', 'studentProvider', 'authenticationSvc', SignupController]);


})();