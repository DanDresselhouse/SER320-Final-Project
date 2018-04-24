(function () {

    // 1. declare our controller.
    function StudentReviewsController($scope, $location, studentProvider, authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();

        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function getReviews() {
            console.log("WOW YOU'RE SEEING REVIEWS");
            $scope.reviews = studentProvider.getReviews().query(
                function (resp) {
                    $scope.finished_loading = true;
                    $scope.reviews = resp;
                },
                function (error) {
                    $scope.page_load_error = error.message;
                });

        }

        getReviews();
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
    myApp.controller("StudentReviewsController", ['$scope', '$location', 'studentProvider', 'authenticationSvc', StudentReviewsController]);


})();