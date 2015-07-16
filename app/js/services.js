angular.module('juco.movies.services', [])

  .constant('API_URL', '/api/')
  .constant('UNKNOWN', 'Unknown')

  .service('Movie', function(UNKNOWN) {
    function Movie(options) {
      this.title   = options.title  || UNKNOWN;
      this.year    = options.year   || UNKNOWN;
      this.rating  = options.rating || UNKNOWN;
      this.blurb   = options.blurb  || UNKNOWN;
      this.cover   = options.cover  || 'unknown.jpg';
      this.isMovie = options.is_movie;
    }

    return Movie;
  })

  .service('movies', function($q, $http, API_URL, Movie, movieFilter) {
    var movies = [];

    this.get = function() {
      if (movies.length) {
        return $q.when(movieFilter.filter(movies));
      }

      return fetch()
        .then(function(result) {
          movies = movieFilter.filter(result);
          return movies;
        });
    };

    var fetch = function() {
      return $http.get(API_URL + 'ratings.json')
        .then(function(res) {
          return res.data.map(function(item) {
            return new Movie(item);
          });
        });
    };
  })

  .service('movieFilter', function(movieFilterRegistry) {
    var filterDescs = [];

    this.addFilterDesc = function(filterDesc) {
      if (filterExists(filterDesc)) {
        filterDescs = filterDescs.map(function(item) {
          if (item.type === filterDesc.type) {
            item = filterDesc;
          }
          return filterDesc;
        });
      } else {
        filterDescs.push(filterDesc);
      }
    };

    this.filter = function(movies) {
      filterDescs.forEach(function(filter) {
        var filterFn = movieFilterRegistry[filter.type];

        if (typeof filterFn === 'function') {
          movies = movies.filter(filterFn(filter));
        } else {
          throw new Error('Filter function filterBy' + filter.type
              + ' does not exist');
        }
      });

      return movies;
    };

    var filterByType = function(type) {
      return filterDescs.filter(function(filter) {
        return filter.type === type;
      })[0] || null;
    };

    var filterExists = function(filter) {
      return filterDescs.some(function(item) {
        return item.type === filter.type;
      });
    };
  })

  .value('movieFilterRegistry', {
    type: function(filter) {
      return function(movie) {
        if (filter.value === 'all') return true;
        if (filter.value === 'movies' && movie.isMovie === true) return true;
        if (filter.value === 'tv' && movie.isMovie === false) return true;
        return false;
      };
    }
  });
