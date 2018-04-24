(function () {

    // 1. declare our controller.
    function StudentProjectsController($scope, $location, studentProvider, authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function getProjects() {
            console.log("WOW YOU'RE SEEING PROJECTS");
            $scope.projects = studentProvider.getProjects().query(
                function (resp) {
                    $scope.finished_loading = true;
                    $scope.projects = resp;
                },
                function (error) {
                    $scope.page_load_error = error.message;
                });

        }

        getProjects();
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
    myApp.controller("StudentProjectsController", ['$scope', '$location', 'studentProvider', 'authenticationSvc', StudentProjectsController]);


})();