angular.module('juco.movies.directives', [])

  .controller('movieListCtrl', function($window, $scope, ratings) {
    var filters = [];

    this.filterBytype = function(value) {
      return function(movie) {
        if (value === 'all') return true;
        if (value === 'movies' && movie.is_movie === true) return true;
        if (value === 'tv' && movie.is_movie === false) return true;
        return false;
      };
    };

    this.filter = function() {
      var that = this;
      filters.forEach(function(filter) {
        var filterFn = that['filterBy' + filter.type];
        if (typeof filterFn === 'function') {
          ratings.get()
            .then(function(result) {
              $scope.movies = result.filter(filterFn(filter.value));
            });
        } else {
          throw new Error('Filter function filterBy' + filter.type + ' does ' +
              'not exist');
        }
      });
    };

    this.addFilter = function(type, filter) {
      console.log('type:', type, 'filter:', filter);
      filters = []; // todo - this should be intelligent
      filters.push({ type: type, value: filter });
      this.filter();
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
        var selected;

        scope.filters = [
          { type: 'type', name: 'All', key: 'all', selected: true },
          { type: 'type', name: 'Movies', key: 'movies' },
          { type: 'type', name: 'TV', key: 'tv' }
        ];

        scope.select = function(filter, $event) {
          $event.preventDefault();
          selected = filter;

          scope.filters.map(function(f) {
            f.selected = f === filter;
            return f;
          });

          movieListCtrl.addFilter(selected.type, selected.key);
        };
      }
    };
  });
