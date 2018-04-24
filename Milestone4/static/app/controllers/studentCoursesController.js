(function () {

    // 1. declare our controller.
    function StudentCoursesController($scope, $location, studentProvider, authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function getCourses() {
            console.log("WOW IT WORKS");
            $scope.courses = studentProvider.getCourses().query(
                function (resp) {
                    $scope.finished_loading = true;
                    $scope.courses = resp;
                },
                function (error) {
                    $scope.page_load_error = error.message;
                });

        }

        getCourses();
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
    myApp.controller("StudentCoursesController", ['$scope', '$location', 'studentProvider', 'authenticationSvc', StudentCoursesController]);


})();