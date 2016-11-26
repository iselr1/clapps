/*

Documentname      controllerRea.js
Created:          09.11.2016
Created by:       iselr1
Version Nr.:       1.0

Function: All controllers for the views "Körper", "Einstellungen", "Über", "Datenschutz", "Impressum"
*/
angular.module('starter.controllersRea', [])

//--------------------------------------------------------//
//---------------CONTROLLER Körper-----------------------//
//--------------------------------------------------------//

/* Controller Körper
You'll find the following functions in it:
addPulse, to make a new pulse entry;
addWeight, to make a new weight entry;
onchangeSound, to alter the reminder sound;
onchangeLanguage, to alter the app language;
currentLanguage, to detect the current language;
*/

.controller('KoerperCtrl', function($scope, $state, I4MIMidataService) {
  //Adding the data from the input fields into the chart
  $scope.Pulse = {};
  $scope.addPulse = function() {

    $configLinePulse.series.push($scope.Pulse.value);
    console.log($configLinePulse);
  };
  $scope.Weight = {};
  $scope.addWeight = function() {
    var test = $scope.Weight.value;
    console.log(test);
    $configLineWeight.series.push($scope.addWeight.value);
    console.log($configLineWeight);
  };

  // Chart for the weight
  var $configLineWeight = {
    name: '.ct-chartLineWeight',
    labels: 'Week',
    series: [51, 51.2, 53, 52.5, 52, 52.2, 52.9],
    fullWidth: "true",
    showArea: "true",
  };

  var chartLineWeight = new ChartJS($configLineWeight);
  chartLineWeight.line();
  // Chart for the pulse
  var $configLinePulse = {
    name: '.ct-chartLinePulse',
    labels: 'Week',
    series: [66, 68, 65, 70, 67, 69, 68],
    fullWidth: "true",
    showArea: "false",
  };

  var chartLinePulse = new ChartJS($configLinePulse);
  chartLinePulse.line();
})

.controller('UeberCtrl', function($scope, $state) {
  $scope.goSettings = function() {
    $state.go('einstellungen');
  };
  $scope.goDataprotection = function() {
    $state.go('datenschutz');
  };
  $scope.goImpressum = function() {
    $state.go('impressum');
  };
})

//--------------------------------------------------------//
//---------------CONTROLLER Einstellungen-----------------------//
//--------------------------------------------------------//

.controller('EinstellungenCtrl', function($scope, $state, $translate, jsonService) {
  //Choice for Remindersounds
  $scope.soundList = [{
    id: 1,
    name: 'Ton 1'
  }, {
    id: 2,
    name: 'Ton 2'
  }, {
    id: 3,
    name: 'Ton 3'
  }];
  $scope.soundSelected = 1;

  $scope.onchangeSound = function(id) {
    console.log("id:" + id.id);
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
    jsonService.loadJson(key);
  };
})

//--------------------------------------------------------//
//---------------CONTROLLER Datenschutz-----------------------//
//--------------------------------------------------------//

.controller('DatenschutzCtrl', function($scope, $state) {

})

//--------------------------------------------------------//
//---------------CONTROLLER Impressum-----------------------//
//--------------------------------------------------------//

.controller('ImpressumCtrl', function($scope, $state) {

})
