angular.module('juco.movies', [
  'ngRoute',

  'juco.movies.controllers',
  'juco.movies.services',
  'juco.movies.directives'
])

  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix = '!';

    $routeProvider
      .when('/ratings', {
        templateUrl: '/views/partial/ratings/index.html',
        controller: 'RatingsCtrl'
      })
      .otherwise('/ratings');
  });
