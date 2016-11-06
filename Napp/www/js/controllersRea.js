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
