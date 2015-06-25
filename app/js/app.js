angular.module('juco.movies', [
  'ngRoute',

  'juco.movies.controllers'
])

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/partial/ratings/index.html',
        controller: 'RatingsCtrl'
      });
  });
