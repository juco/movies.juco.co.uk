//describe('Controllers', function() {

//  describe('movieListCtrl', function() {
//    var $controller
//      , $scope
//      , $q
//      , movieListCtrl;

//    var mockMovies = {
//      get: angular.noop
//    };

//    var mockMovieFilter = {
//      addFilterDesc: jasmine.createSpy()
//    };

//    beforeEach(inject(function($injector) {
//      $controller = $injector.get('$controller');
//      $scope = $injector.get('$rootScope').$new();
//      $q = $injector.get('$q');

//      console.log('qqqq');
//      movieListCtrl = $controller('movieListCtrl', {
//        $scope: $scope,
//        movies: mockMovies,
//        movieFilter: mockMovieFilter
//      });
//      console.log('controller', movieListCtrl);
//    }));

//    it('should allow filtering of the movie list', function() {
//      console.log(movieListCtrl);
//      var mockResult = { foo: 'bar' };
//      spyOn(mockMovies, 'get').and.returnValue($q.when(mockResult));
//      movieListCtrl.filter('foo');
//      expect(mockMovieFilter).toHaveBeenCalledWith('foo');
//    });
//  });
//});
