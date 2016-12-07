/*

Dokumentenname      controllerSarah.js
Erstellt am:        16.11.2016
Erstellt durch:     meles1
Verson Nr.:         1.0

Funktion: Alle Controller für die Views "Welcome", "TNM-Staging", "Operation"
*/

angular.module('starter.controllersSarah', ['proton.multi-list-picker'])

/* -- Controller für Welcome View -- */
.controller('WelcomeCtrl', function($scope, $location, $state, $translate) {

  // Weiterleitung nach TNM Staging
  $scope.goTNM = function() {
    $state.go('tnm');
  };

  //Choice for language
  $scope.languageList = [{
    id: '1',
    name: 'Deutsch',
    token: 'de'
  }, {
    id: '2',
    name: 'Français',
    token: 'fr'
  }];

  // Set the selectoption to the current language
  $scope.languageSelected = currentLanguage();

  // Get the current language
  function currentLanguage() {
    if (($translate.proposedLanguage() || $translate.use()) == "fr") {
      return '2';
    } else {
      return '1';
    }
  };

  // Change language if the selectoption changed
  $scope.onchangeLanguage = function(key) {
    $translate.use(key.token);
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
.controller('OPCtrl', function($scope, $location, $state, ionicDatePicker, $filter) {

    // Weiterleitung nach Home Screen
  $scope.goHome = function() {
    $state.go('home');
  };

 $scope.buttonOPText = 'dd.mm.yyyy';

  var ipObj1 = {
  callback: function (val) {  //Mandatory
    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    var dateAsString = $filter('date')(val, "dd.MM.yyyy");
    console.log('Return value from the datepicker popup is formatted : ' + dateAsString);
    $scope.buttonOPText = dateAsString;
  //  document.getElementById('opdate').value = dateAsString;
  }};

$scope.openDatePicker = function(){
  ionicDatePicker.openDatePicker(ipObj1);
};

})
;
