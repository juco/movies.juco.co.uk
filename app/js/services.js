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
    }

    return Movie;
  })

  .factory('ratings', function($http, API_URL, Movie) {
    return {
      fetch: function() {
        return $http.get(API_URL + 'ratings.json')
          .then(function(res) {
            return res.data.map(function(item) {
              return new Movie(item);
            });
          });
      }
    };
  });
