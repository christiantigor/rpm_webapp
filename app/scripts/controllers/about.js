'use strict';

/**
 * @ngdoc function
 * @name rpmAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rpmAppApp
 */
angular.module('rpmAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
