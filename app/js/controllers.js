angular.module('juco.movies.controllers', [])

  .controller('RatingsCtrl', function($scope, ratings) {
    ratings.fetch()
      .then(function(result) {
        // Mock some data for now...
        $scope.movies = [];
        for(var i = 1; i < 5; i++) {
          $scope.movies = $scope.movies.concat(result);
        }

        //$scope.movies = result;
      });
  });
