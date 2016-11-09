angular.module('starter.controllersSarah', [])

.controller('WelcomeCtrl', function($scope, $location) {
  $scope.goTNM = function() {
    $location.path('tnm');
  };

})

.controller('TNMCtrl', function($scope, $location) {
  $scope.goOP = function() {
    $location.path('op');
  };

})

.controller('OPCtrl', function($scope, $location) {
    $scope.goHome = function() {
    $location.path('home');
  };

})
;
