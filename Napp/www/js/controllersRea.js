angular.module('starter.controllersRea', [])

.controller('KoerperCtrl', function($scope, $location, I4MIMidataService) {

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

.controller('UeberCtrl', function($scope, $location) {
  $scope.goSettings = function() {
    $location.path('einstellungen');
  };
  $scope.goDataprotection = function() {
    $location.path('datenschutz');
  };
  $scope.goImpressum = function() {
    $location.path('impressum');
  };
})

.controller('EinstellungenCtrl', function($scope, $location) {

  })
  .controller('DatenschutzCtrl', function($scope, $location) {

  })
  .controller('ImpressumCtrl', function($scope, $location) {

  })
