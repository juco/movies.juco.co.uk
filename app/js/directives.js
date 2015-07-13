angular.module('juco.movies.directives', [])

  .directive('movieList', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/partial/movie-list/list.html',
      scope: {
        movies: '='
      }
    };
  })

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

  .directive('typeFilter', function(movieFilter, movies) {
    return {
      restrict: 'E',
      templateUrl: '/views/partial/type-filter/filter.html',
      link: function(scope, el, attrs) {
        scope.filters = [
          { type: 'type', name: 'All', key: 'all', selected: true },
          { type: 'type', name: 'Movies', key: 'movies' },
          { type: 'type', name: 'TV', key: 'tv' }
        ];

        scope.select = function(filterDesc, $event) {
          $event.preventDefault();
          movieFilter.addFilterDesc(filterDesc);
          scope.movies = movies.get();
        };
      }
    };
  });
