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
.controller('TNMCtrl', function($scope, $location, $state, schemaService) {

  $scope.showSelectValue = function(cancertype) {
      console.log(cancertype);
      schemaService.setCancertype(cancertype);
    }
    // Initialize an array for the stages
  $scope.value = {};


  // Weiterleitung nach Operationen
  $scope.goOP = function() {
    // Set the values of the diffrent stages
    $scope.$watch('value.tstage', function() {
      console.log($scope.value.tstage);
      schemaService.setStagingT($scope.value.tstage);
    })
    $scope.$watch('value.nstage', function() {
      console.log($scope.value.nstage);
      schemaService.setStagingN($scope.value.nstage);
    })
    $scope.$watch('value.mstage', function() {
      console.log($scope.value.mstage);
      schemaService.setStagingM($scope.value.mstage);
    })
    $state.go('op');
  };

})

/* -- Controller für Operationen View -- */
.controller('OPCtrl', function($scope, $location, $state, ionicDatePicker, $filter, schemaService, jsonService) {

  var jsonData = jsonService.getJson();
  var yes = jsonData.YES;
  var no = jsonData.NO;

  // Functions for the coloskopie toggle
  $scope.complete = false;
  $scope.setComplete = function(boolean) {
    $scope.complete = boolean;
    console.log($scope.complete);
  }
  $scope.setComplete.text = $scope.complete ? yes : no;
  $scope.update = function() {
    $scope.setComplete.text = $scope.complete ? yes : no;
  }



  $scope.buttonOPText = 'dd.mm.yyyy';

  var ipObj1 = {
    callback: function(val) { //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      schemaService.setOpDate(new Date(val));
      var dateAsString = $filter('date')(val, "dd.MM.yyyy");
      console.log('Return value from the datepicker popup is formatted : ' + dateAsString);
      $scope.buttonOPText = dateAsString;
      //  document.getElementById('opdate').value = dateAsString;
    }
  };

  $scope.openDatePicker = function() {
    ionicDatePicker.openDatePicker(ipObj1);
  };

  // Go to the Homescreen & set the coloskopie value and generate the Schema
  $scope.goHome = function() {
    schemaService.setColonoscopyComplete($scope.complete);
    console.log($scope.complete);
    schemaService.genSchema();
    $state.go('home');
  };
});
