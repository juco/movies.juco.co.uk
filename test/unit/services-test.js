describe('Movie services', function() {
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
        blurb: 'Some blurb'
      });

      expect(movie.title).toEqual('Foo');
      expect(movie.year).toEqual('2015');
      expect(movie.rating).toEqual(5);
      expect(movie.blurb).toEqual('Some blurb');
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

  describe('ratings', function() {
    var $rootScope
      , $httpBackend
      , ratings
      , API_URL;

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope').$new();
      $httpBackend = $injector.get('$httpBackend');
      ratings = $injector.get('ratings');
      API_URL = $injector.get('API_URL');
    }));

    it('should fetch the ratings', function() {
      $httpBackend.whenGET(API_URL + 'ratings.json').respond([
        { title: 'Foo', year: '2011', rating: 8, blurb: 'bar' }
      ]);
      ratings.fetch().then(function(response) {
        expectation(response);
      });

      $httpBackend.flush();
      $rootScope.$apply();

      function expectation(result) {
        expect(result[0].title).toEqual('Foo');
      }
    });
  });
});
