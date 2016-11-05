angular.module('starter.controllers', [])

.controller('NavCtrl', function($scope, $location, $state, I4MIMidataService) {

  $scope.goHome = function() {
    $location.path('home');
  };

  $scope.doLogout = function() {
    //Logout function
    I4MIMidataService.logout();
    $location.path('login');
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
      $state.go('home');
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

.controller('HomeCtrl', function($scope, $stateParams, $location) {
  $scope.goTermine = function() {
    $location.path('termine');
  };

  $scope.goKoerper = function() {
    $location.path('koerper');
  };

  $scope.goInfos = function() {
    $location.path('infos');
  };

  $scope.goKontakte = function() {
    $location.path('kontakte');
  };

  $scope.goUeber = function() {
    $location.path('ueber');
  };
  $scope.goExport = function() {
    $location.path('export');
  };
});
