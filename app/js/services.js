angular.module('juco.movies.services', [])

  .constant('API_URL', '/api/')
  .constant('UNKNOWN', 'Unknown')

  .service('Movie', function(UNKNOWN) {
    function Movie(options) {
      this.title = options.title || UNKNOWN;
      this.year = options.year || UNKNOWN;
      this.rating = options.rating || UNKNOWN;
      this.blurb = options.blurb || UNKNOWN;
      this.cover = options.cover || 'unknown.jpg';
      this.is_movie = options.is_movie;
    }

    return Movie;
  })

  .service('ratings', function($q, $http, API_URL, Movie) {
    var movies = [];

    this.get = function(filters) {
      if (movies.length) {
        return $q.when(movies);
      }

      return fetch()
        .then(function(result) {
          movies = result;
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

    var filter = function(movies) {
      if (typeFilter) {
        movies.filter(function(movie) {
          if (typeFilter === 'movie') return movie.is_movie === true;
          if (typeFilter === 'tv') return movie.is_movies === false;
          return true;
        });
      }
    };
  });
