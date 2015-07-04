angular.module('juco.movies.directives', [])

  .directive('starRating', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/partial/ratings/star-rating.html',
      scope: {
        'rating': '@'
      },
      link: function(scope) {
        scope.rating = parseInt(scope.rating);
        scope.maxRating = 10;
        scope.nTimes = function(n) {
          return new Array(n);
        };
      }
    };
  });
