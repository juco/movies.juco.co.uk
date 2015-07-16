describe('Movie services', function() {
  var mockMoviesResponse = [
    {
      title: 'Foo',
      year: '2011',
      rating: 8,
      blurb: 'bar',
      is_movie: false
    }, {
      title: 'Bar',
      year: '2015',
      rating: 3,
      blurb: 'Foo',
      is_movie: true
    }
  ];
  beforeEach(module('juco.movies.services'));

  describe('Movie', function() {
    var Movie
      , UNKNOWN;

    beforeEach(inject(function($injector) {
      Movie = $injector.get('Movie');
      UNKNOWN = $injector.get('UNKNOWN');
    }));

    it('should initialize with the correct data', function() {
      var movie = new Movie({
        title: 'Foo',
        year: '2015',
        rating: 5,
        blurb: 'Some blurb',
        is_movie: true
      });

      expect(movie.title).toEqual('Foo');
      expect(movie.year).toEqual('2015');
      expect(movie.rating).toEqual(5);
      expect(movie.blurb).toEqual('Some blurb');
      expect(movie.isMovie).toBe(true);
    });

    it('should default to unknown for missing data', function() {
      var movie = new Movie({
        title: 'Foo'
      });

      expect(movie.title).toEqual('Foo');
      expect(movie.year).toEqual(UNKNOWN);
      expect(movie.rating).toEqual(UNKNOWN);
      expect(movie.blurb).toEqual(UNKNOWN);
    });
  });

  describe('movies', function() {
    var $rootScope
      , $httpBackend
      , $http
      , movies
      , API_URL;

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope').$new();
      $httpBackend = $injector.get('$httpBackend');
      $http = $injector.get('$http');
      movies = $injector.get('movies');
      API_URL = $injector.get('API_URL');

      $httpBackend.whenGET(API_URL + 'ratings.json')
        .respond(mockMoviesResponse);
    }));

    it('should fetch the ratings', function() {
      movies.get().then(function(response) {
        expectation(response);
      });

      $httpBackend.flush();
      $rootScope.$apply();

      function expectation(result) {
        expect(result[0].title).toEqual('Foo');
      }
    });

    it('should not make API requests when we have the data', function() {
      spyOn($http, 'get').and.callThrough();
      movies.get();
      $httpBackend.flush();

      movies.get();
      expect($http.get.calls.count()).toBe(1);
    });

    describe('movieFilter', function() {
      var movieFilter;

      beforeEach(inject(function($injector) {
        movieFilter = $injector.get('movieFilter');
      }));

      it('should throw an error when filtering with an unknown ' +
          'function', function() {
        movieFilter.addFilterDesc({ type: 'foo', key: 'moo', value: 'bar' });
        expect(function() {
          return movieFilter.filter([]);
        }).toThrowError();
      });

      it('should filter the result set on type', function() {
        var mockMovies = [
          { name: 'Movie', isMovie: true },
          { name: 'TV', isMovie: false }
        ];
        movieFilter.addFilterDesc({ type: 'type', value: 'tv' });
        expect(movieFilter.filter(mockMovies).length).toBe(1);
        expect(movieFilter.filter(mockMovies)[0].name).toEqual('TV');
      });

      it('should allow for changing filter descriptions', function() {
        var mockMovies = [{ name: 'Movie', isMovie: true }];
        movieFilter.addFilterDesc({ type: 'type', value: 'tv' });
        movieFilter.addFilterDesc({ type: 'type', value: 'movies' });
        expect(movieFilter.filter(mockMovies).length).toBe(1);
        expect(movieFilter.filter(mockMovies)[0].name).toEqual('Movie');
      });
    });

    describe('movieFilterRegistry', function() {
      var movieFilterRegistry;

      beforeEach(inject(function($injector) {
        movieFilterRegistry = $injector.get('movieFilterRegistry');
      }));

      it('should have the required filters defined', function() {
        expect(typeof movieFilterRegistry.type).toEqual('function');
      });
    });
  });
});
