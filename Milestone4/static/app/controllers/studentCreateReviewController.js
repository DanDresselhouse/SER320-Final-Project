(function () {

    // 1. declare our controller.
    function StudentCreateReviewController($scope, $location, studentProvider, authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function createReviews() {
            console.log("WOW YOU'RE CREATING A REVIEW");
            $scope.reviews = studentProvider.createReviews().query(
                function (resp) {
                    $scope.finished_loading = true;
                    $scope.reviews = resp;
                },
                function (error) {
                    $scope.page_load_error = error.message;
                });

        }

        createReviews();
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
    myApp.controller("StudentCreateReviewController", ['$scope', '$location', 'studentProvider', 'authenticationSvc', StudentCreateReviewController]);


})();