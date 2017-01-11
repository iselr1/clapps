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

.controller('LoginCtrl', function($scope, $translate, ownMidataService, $timeout, $state, $ionicLoading) {
  // Values for login
  $scope.login = {};
  $scope.login.password = '';

  if (localStorage.getItem('username') != null) {
    $scope.login.email = JSON.parse(localStorage.getItem('username'));
  } else {
    $scope.login.email = '';
  }


  var loggedIn;
  // Login
  $scope.doLogin = function() {

    if ($scope.login.email != '' && $scope.login.password != '')
      ownMidataService.login($scope.login.email, $scope.login.password, 'member');

    // Zeige Loading Spinner
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });

    setTimeout(function() {
      $scope.checkUser();

      // Verstecke Loading Spinner
      $ionicLoading.hide();
    }, 3000);
  }



  // Check if valid User
  $scope.checkUser = function() {
    loggedIn = ownMidataService.loggedIn();
    console.log(loggedIn);
    if (loggedIn) {
      //$state.go('home');
      $state.go('welcome');
      localStorage.setItem('username', JSON.stringify($scope.login.email));
    } else {
      ownMidataService.logout();
    }
  }

  // Logout
  $scope.logout = function() {
    console.info("Logout");
    ownMidataService.logout();
  }

})

.controller('HomeCtrl', function($scope, $stateParams, $state, $cordovaLocalNotification) {

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
