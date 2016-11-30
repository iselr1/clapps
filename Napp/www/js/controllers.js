/*

Dokumentenname      controller.js
Erstellt am:        09.11.2016
Erstellt durch:     iselr1
Verson Nr.:         1.0

Funktion: Alle Controller für die Views "Navigation", "Login", "Home"
*/
angular.module('starter.controllers', [])
  //The jsonService loades the language file with the currentLanguage
  .controller('NavCtrl', function($scope, $location, $state, I4MIMidataService, jsonService, $ionicPlatform, $cordovaLocalNotification) {
    //Anfrage für Berechtigung zum Senden von notifications auf IOS
    $ionicPlatform.ready(function() {
      if (ionic.Platform.isIOS()) {
        window.plugin.notification.local.promptForPermission();
      }
    });

    //Logout
    $scope.doLogout = function() {
        //Logout function
        I4MIMidataService.logout();
        $state.go('login');
      }
      // Home
    $scope.goHome = function() {
      $state.go('home');
    }
  })

.controller('LoginCtrl', function($scope, $translate, I4MIMidataService, $timeout, $state, jsonService) {
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
    jsonService.loadJson(key);
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
