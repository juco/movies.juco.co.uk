describe('Directives', function() {
  var $scope
    , $compile
    , el
    , isolateScope;

  beforeEach(function() {
    module('juco.movies.partials');
    module('juco.movies.directives');
  });

  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
  }));

  describe('star-rating', function() {
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
});
