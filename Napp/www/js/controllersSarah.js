/*

Dokumentenname      controllerSarah.js
Erstellt am:        16.11.2016
Erstellt durch:     meles1
Verson Nr.:         1.0

Funktion: Alle Controller für die Views "Welcome", "TNM-Staging", "Operation"
*/

angular.module('starter.controllersSarah', [])

/* -- Controller für Welcome View -- */
.controller('WelcomeCtrl', function($scope, $location, $state) {

  // Weiterleitung nach TNM Staging
  $scope.goTNM = function() {
    $state.go('tnm');
  };

})

/* -- Controller für TNM Staging View -- */
.controller('TNMCtrl', function($scope, $location, $state) {

  // Weiterleitung nach Operationen
  $scope.goOP = function() {
    $state.go('op');
  };

})

/* -- Controller für Operationen View -- */
.controller('OPCtrl', function($scope, $location, $state) {

    // Weiterleitung nach Home Screen
    $scope.goHome = function() {
    $state.go('home');
  };

})
;
