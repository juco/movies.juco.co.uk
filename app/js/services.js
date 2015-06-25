angular.module('juco.movies.services', [])

  .constant('API_URL', '/api/')
  .constant('UNKNOWN', 'Unknown')

  .service('Movie', function(UNKNOWN) {
    function Movie(options) {
      this.title = options.title || UNKNOWN;
      this.year = options.year || UNKNOWN;
      this.rating = options.rating || UNKNOWN;
      this.blurb = options.blurb || UNKNOWN;
    }

    return Movie;
  })

  .factory('ratings', function($http, API_URL) {
    return {
      fetch: function() {
        return $http.get(API_URL + 'ratings.json');
      }
    };
  });
