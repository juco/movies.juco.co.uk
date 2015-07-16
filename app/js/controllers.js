angular.module('juco.movies.controllers', [])

  .controller('RatingsCtrl', function($scope, movies) {
    movies.get()
      .then(function(result) {
        $scope.movies = result;
      });
  })

  .controller('movieListCtrl', function($scope, movies, movieFilter) {
    this.filter = function(filterDesc) {
      movieFilter.addFilterDesc(filterDesc);
      movies.get().then(function(result) {
        $scope.movies = result;
      });
    };
  });

