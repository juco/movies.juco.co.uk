describe('Directives', function() {
  var $scope
    , $compile
    , $q
    , el
    , isolateScope
    , mockMovies
    , mockMovieFilter;

  mockMovies = {
    get: angular.noop
  };

  mockMovieFilter = {
    addFilterDesc: angular.noop
  };

  beforeEach(function() {
    module('juco.movies.partials');
    module('juco.movies', function($provide) {
      $provide.value('movies', mockMovies);
      $provide.value('movieFilter', mockMovieFilter);
    });
  });

  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $q = $injector.get('$q');
  }));

  describe('movieList', function() {
    var ctrl;

    beforeEach(function() {
      el = $compile('<movie-list></movie-list>')($scope);
      $scope.$apply();
      ctrl = el.controller('movieList');
      isolateScope = el.isolateScope();
    });

    it('should have a working filter method', function() {
      spyOn(mockMovieFilter, 'addFilterDesc');
      spyOn(mockMovies, 'get').and.returnValue($q.when(['bar']));

      ctrl.filter('foo');
      $scope.$apply();

      expect(mockMovieFilter.addFilterDesc).toHaveBeenCalledWith('foo');
      expect(mockMovies.get).toHaveBeenCalled();
      expect(isolateScope.movies).toEqual(['bar']);
    });
  });

  describe('starRating', function() {
    beforeEach(function() {
      el = $compile('<star-rating rating="7"></star-rating>')($scope);
      $scope.$apply();
      isolateScope = el.isolateScope();
    });

    it('should have the correct scope properties', function() {
      expect(isolateScope.rating).toBeDefined();
      expect(isolateScope.maxRating).toBeDefined();
      expect(isolateScope.nTimes).toBeDefined();
    });

    it('should default to a 10 star maximum', function() {
      expect(isolateScope.maxRating).toBe(10);
    });

    it('should set the correct rating', function() {
      expect(isolateScope.rating).toEqual('7');
    });
  });

  describe('typeFilter', function() {
    beforeEach(function() {
      el = $compile('<movie-list><type-filter></type-filter></movie-list>')($scope);
      $scope.$apply();
      isolateScope = el.isolateScope();
    });

    it('should define the three filters', function() {
      expect(isolateScope.filters.length).toBe(3);
    });

    it('should select All by default', function() {
      expect(isolateScope.filters[0].name).toEqual('All');
      expect(isolateScope.filters[0].selected).toBe(true);
    });
  });
});
