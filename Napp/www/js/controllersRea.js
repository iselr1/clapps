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

.controller('KoerperCtrl', function($scope, $state, ownMidataService, $timeout, $ionicPopup, jsonService) {
  // Min value for pulse
  var minPuls = 30;
  // Max value for pulse
  var maxPuls = 150;
  // Min value for weight
  var minWeight = 30;
  // Max value for weight
  var maxWeight = 250;
  // To get acces to the translation tags
  var jsonData = jsonService.getJson();

  $scope.Weight = {};
  $scope.addWeight = function() {
    var val = $scope.Weight.value;

    if (val == "") {
      $scope.showNoValPopup(jsonData.WEIGHT);
    } else if (isNaN(val)) {
      $scope.showNotNumeric(jsonData.WEIGHT);
    } else if ((val < minWeight) || (val > maxWeight)) {
      $scope.showNotPossibleWeight();
    } else {
      var type = 'weight';

      ownMidataService.save(val, type).then(function(e) {
        console.log('Resource Created: ' + e);
        //HARD CODED WEIGHT
        $scope.getObservation('w');
        // Set value of the input field to empty
        $scope.Weight.value = '';
        console.log($scope.Weight.value);
      });
    }
  }
  $scope.Pulse = {};
  $scope.addPulse = function() {
    var val = $scope.Pulse.value;

    if (val == "") {
      $scope.showNoValPopup(jsonData.PULSE);
    } else if (isNaN(val)) {
      $scope.showNotNumeric(jsonData.PULSE);
    } else if ((val < minPuls) || (val > maxPuls)) {
      $scope.showNotPossiblePuls();
    } else {
      var type = 'pulse';

      ownMidataService.save(val, type).then(function(e) {
        console.log('Resource Created: ' + e);
        //HARD CODED WEIGHT
        $scope.getObservation('p');
        // Set value of the input field to empty
        $scope.Pulse.value = '';
        console.log($scope.Pulse.value)
      });
    }
  }

  $scope.showNoValPopup = function(vitalsign) {
    var alertPopup = $ionicPopup.alert({
      title: jsonData.NOVALUE,
      template: jsonData.PLEASEGIVE + vitalsign + jsonData.ACCORDINGFIELD
    });
  }

  $scope.showNotNumeric = function(vitalsign) {
    var alertPopup = $ionicPopup.alert({
      title: jsonData.INVALIDVALUE,
      template: jsonData.PLEASEGIVE + vitalsign + jsonData.ASANUMBER
    });
  }
  $scope.showNotPossiblePuls = function() {
    var alertPopup = $ionicPopup.alert({
      title: jsonData.INVALIDVALUE,
      template: jsonData.PULSMINMAX
    });
  }
  $scope.showNotPossibleWeight = function() {
      var alertPopup = $ionicPopup.alert({
        title: jsonData.INVALIDVALUE,
        template: jsonData.WEIGHTMINMAX
      });
    }
    // general options for the chartist
  var $options = {
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 5,
      labelInterpolationFnc: function(value) {
        return moment(value).format('H D MMM YY ');
      }
    },
    axisY: {
      onlyInteger: true,
      offset: 20
    }
  };
  var $responsiveOptions = {
    fullWidth: true,
    chartPadding: {
      right: 20
    },
    lineSmooth: Chartist.Interpolation.cardinal({
      fillHoles: true,
    }),
    low: 0
  };

  // getter for the Pulse and Weight value
  $scope.getObservation = function(resource) {
    res = "Observation";
    params = {};
    ownMidataService.search(res, params).then(function(observations) {
      result = [];
      //--> only pulses
      if (resource == "p") {
        for (var i = 0; i < observations.length; i++) {
          if (observations[i]._fhir == null) {
            if (observations[i].code.coding["0"].display == "Herzschlag" ||
              observations[i].code.coding["0"].display == "Herzfrequenz") {
              result.push({
                time: observations[i].effectiveDateTime,
                value: observations[i].valueQuantity.value
              });
            }
          }
        }
        console.log(result); //return
        // to show the last 5 values in a chart
        var objects = [];
        if (result.length > 5) {
          for (var i = (result.length - 5); i < result.length; i++) {
            var data = {};
            var d = new Date(result[i].time);
            data.x = d;
            data.y = result[i].value;
            objects.push(data);
            console.log("hier" + objects);
          }
        } else {
          for (var i = 0; i < result.length; i++) {
            var data = {};
            var d = new Date(result[i].time);
            data.x = d;
            data.y = result[i].value;
            objects.push(data);
            console.log("hier" + objects);
          }
        }


        var $configLine = {
          series: [{
            name: 'series-1',
            data: objects
          }]
        };


        var chart = new Chartist.Line('.ct-chartLinePulse', $configLine, $options, $responsiveOptions);
        console.log(chart);
        //--> only weights
      } else if (resource == "w") {
        for (var i = 0; i < observations.length; i++) {
          if (observations[i]._fhir != null) {
            if (observations[i]._fhir.code.coding["0"].display == "Weight Measured" ||
              observations[i]._fhir.code.coding["0"].display == "Body weight Measured" ||
              observations[i]._fhir.code.coding["0"].display == "Gewicht") {
              result.push({
                time: observations[i]._fhir.effectiveDateTime,
                value: observations[i]._fhir.valueQuantity.value
              });
            }
          }
        }
        console.log(result); //return
        // to show the last 5 values in a chart
        var objects = [];
        if (result.length > 5) {
          for (var i = (result.length - 5); i < result.length; i++) {
            var data = {};
            var d = new Date(result[i].time);
            data.x = d;
            data.y = result[i].value;
            objects.push(data);
            console.log("hier" + objects);
          }
        } else {
          for (var i = 0; i < result.length; i++) {
            var data = {};
            var d = new Date(result[i].time);
            data.x = d;
            data.y = result[i].value;
            objects.push(data);
            console.log("hier" + objects);
          }
        }

        var $configLine = {
          series: [{
            name: 'series-1',
            data: objects
          }]
        };

        var chart = new Chartist.Line('.ct-chartLineWeight', $configLine, $options, $responsiveOptions);
        console.log(chart);
      } else {
        //return all obs
      }


    })
  };
  //TO SHOW ALLWAYS THE CHARTS
  $scope.getObservation("w");
  $scope.getObservation("p");
  /* To test the function without login first
    var hanaolalsad = ownMidataService.loggedIn();
    if (!hanaolalsad) {
      ownMidataService.login('sina@midata.coop', 'Sina123456', 'member');
    }
    var timer = $timeout(function refresh() {
      if (ownMidataService.loggedIn()) {
        $scope.getObservation("w");
        $scope.getObservation("p");
      } else {
        timer = $timeout(refresh, 1000);
      }
    }, 1000);
  */
  /*
    var chartPulse = new Chartist.Line('.ct-chartLinePulse', {
      series: [{
        name: 'series-1',
        data: [{
          x: moment(),
          y: 11
        }, {
          x: new Date("12-20-2016"),
          y: 40
        }, {
          x: new Date("12-21-2016"),
          y: 45
        }, {
          x: new Date("12-22-2016"),
          y: 40
        }, {
          x: new Date("12-23-2016"),
          y: 20
        }, {
          x: new Date("12-24-2016"),
          y: 32
        }, {
          x: new Date("12-25-2016"),
          y: 18
        }]
      }]
    }, {
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 5,
        labelInterpolationFnc: function(value) {
          return moment(value).format('D MMM YY');
        }
      }
    }, {
      fullWidth: true,
      chartPadding: {
        right: 20
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        fillHoles: true,
      }),
      low: 0
    });
    console.log(chartPulse); */
})

.controller('UeberCtrl', function($scope, $state) {

  $scope.goSettings = function() {
    console.log(localStorage.getItem('appointmentStatus'));
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

.controller('EinstellungenCtrl', function($scope, $cordovaLocalNotification, $translate, jsonService,$ionicPopup,$state) {
  $scope.resetApp = function() {
    var jsonData = jsonService.getJson();
    var confirmPopup = $ionicPopup.confirm({

      title: jsonData.RESETAPP,
      template: jsonData.RESETAPPTEXT,
      cancelText: jsonData.CANCEL,
      cancelType: 'button-assertive'
    });
    confirmPopup.then(function(res) {
      if (res) {
        localStorage.clear();
        $state.go('welcome');
      }
    });

  }

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
    jsonService.loadJson(key.token);
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
