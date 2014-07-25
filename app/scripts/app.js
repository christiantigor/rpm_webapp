'use strict';

/**
 * @ngdoc overview
 * @name rpmAppApp
 * @description
 * # rpmAppApp
 *
 * Main module of the application.
 */
angular
  .module('rpmAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'd3',
    'c3',
    'ngTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

//setup dependency injection
angular.module('d3',[]);
angular.module('c3',['d3']);