/*

Dokumentenname      controllerRea.js
Erstellt am:        09.11.2016
Erstellt durch:     iselr1
Verson Nr.:         1.0

Funktion: Alle Controller für die Views "Körper", "Einstellungen", "Über", "Datenschutz", "Impressum"
*/
angular.module('starter.controllersRea', [])

.controller('KoerperCtrl', function($scope, $state, I4MIMidataService) {

  // Chart for the weight
  var $configLineWeight = {
    name: '.ct-chartLineWeight',
    labels: 'Week',
    series: "[51, 51.2, 53, 52.5]",
    fullWidth: "true",
    showArea: "false",
  };

  var chartLineWeight = new ChartJS($configLineWeight);
  chartLineWeight.line();
  // Chart for the pulse
  var $configLinePulse = {
    name: '.ct-chartLinePulse',
    labels: 'Week',
    series: "[12, 9, 7, 8, 5, 9, 0]",
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

.controller('EinstellungenCtrl', function($scope, $state) {

  })
  .controller('DatenschutzCtrl', function($scope, $state) {

  })
  .controller('ImpressumCtrl', function($scope, $state) {

  })
