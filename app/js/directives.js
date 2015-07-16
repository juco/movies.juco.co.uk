angular.module('juco.movies.directives', [])

  .controller('movieListCtrl', function($scope, movies, movieFilter) {
    this.filter = function(filterDesc) {
      movieFilter.addFilterDesc(filterDesc);
      movies.get().then(function(result) {
        $scope.movies = result;
      });
    };
  })

  .directive('movieList', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/partial/movie-list/list.html',
      scope: {
        movies: '='
      },
      controller: 'movieListCtrl'
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

  .directive('typeFilter', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/partial/type-filter/filter.html',
      require: '^movieList',
      link: function(scope, el, attrs, movieListCtrl) {
        scope.filters = [
          { type: 'type', name: 'All', value: 'all', selected: true },
          { type: 'type', name: 'Movies', value: 'movies' },
          { type: 'type', name: 'TV', value: 'tv' }
        ];

        scope.select = function(filterDesc, e) {
          e.preventDefault();

          scope.filters.map(function(f) {
            f.selected = f === filterDesc;
            return f;
          });

          movieListCtrl.filter(filterDesc);
        };
      }
    };
  });
