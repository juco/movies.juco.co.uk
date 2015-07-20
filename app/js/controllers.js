angular.module('juco.movies.controllers', [])

  .controller('RatingsCtrl', function($scope, movies) {
    movies.get()
      .then(function(result) {
        $scope.movies = result;
      });
  });

