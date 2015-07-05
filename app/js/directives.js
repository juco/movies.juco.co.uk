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
  })

  .directive('typeFilter', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/partial/type-filter/filter.html',
      link: function(scope) {
        scope.filters = [
          { name: 'All', key: 'all', selected: true },
          { name: 'Movies', key: 'movies' },
          { name: 'TV', key: 'tv' }
        ];

        scope.select = function(filter, $event) {
          $event.preventDefault();

          scope.filters.map(function(f) {
            f.selected = f === filter;
            return f;
          });
        };
      }
    };
  });
