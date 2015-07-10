describe('Directives', function() {
  var $scope
    , $compile
    , $controller
    , el
    , isolateScope;

  beforeEach(function() {
    module('juco.movies.partials');
    module('juco.movies.directives');
  });

  beforeEach(inject(function($injector) {
    $scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $controller = $injector.get('$controller');
  }));

  describe('movieListCtrl', function() {
    var ctrl;
    beforeEach(function() {
      ctrl = $controller('movieListCtrl', {});
    });

    it('should have the required methods defined', function() {
      expect(ctrl.addFilter).toBeDefined();
    });
  });

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

  xdescribe('type-filter', function() {
    beforeEach(function() {
      el = $compile('<type-filter></type-filter>')($scope);
      $scope.$apply();
    });

    it('should set the required scope properties', function() {
      expect($scope.filters).toBeDefined();
      expect($scope.select).toBeDefined();
    });
  });
});
