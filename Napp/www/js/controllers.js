/*

Dokumentenname      controller.js
Erstellt am:        09.11.2016
Erstellt durch:     iselr1
Verson Nr.:         1.0

Funktion: Alle Controller für die Views "Navigation", "Login", "Home"
*/
angular.module('starter.controllers', [])

.controller('NavCtrl', function($scope, $location, $state, I4MIMidataService) {

  $scope.doLogout = function() {
    //Logout function
    I4MIMidataService.logout();
    $state.go('login');
  }
})

.controller('LoginCtrl', function($scope, $translate, I4MIMidataService, $timeout, $state) {
  // Use for testing the development environment
  $scope.user = {
    server: 'https://test.midata.coop:9000'
  }

  // Connect with MIDATA
  $scope.loggedIn = I4MIMidataService.loggedIn();


  // Call every Second
  var timer = $timeout(function refresh() {
    if (I4MIMidataService.loggedIn()) {
      $state.go('welcome');
    } else {
      timer = $timeout(refresh, 1000);
    }
  }, 1000);

  //Change the language
  $scope.switchLanguage = function(key) {
    $translate.use(key);
  };

  $scope.showModalLogin = function() {
    I4MIMidataService.login();
  }
})

.controller('HomeCtrl', function($scope, $stateParams, $state) {
  $scope.goTermine = function() {
    $state.go('termine');
  };

  $scope.goKoerper = function() {
    $state.go('koerper');
  };

  $scope.goInfos = function() {
    $state.go('infos');
  };

  $scope.goKontakte = function() {
    $state.go('kontakte');
  };

  $scope.goUeber = function() {
    $state.go('ueber');
  };
  $scope.goExport = function() {
    $state.go('export');
  };

})
