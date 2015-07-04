angular.module('juco.movies', [
  'ngRoute',

  'juco.movies.controllers',
  'juco.movies.services',
  'juco.movies.directives'
])

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/partial/ratings/index.html',
        controller: 'RatingsCtrl'
      });
  });
