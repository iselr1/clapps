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

.controller('KoerperCtrl', function($scope, $state, I4MIMidataService, schemaService) {
  /*
    // Testing of Schema generation
    schemaService.setCancertype("colon");
    schemaService.setStagingT('1');
    schemaService.setStagingN('0');
    schemaService.setStagingM('0');
    schemaService.setColoscopyComplete(true);
    schemaService.setOpDate(new Date);
    console.log(new Date);
    schemaService.genSchema();
    console.log(schemaService.getYears());
  */
  // Chart for the weight
  var $configLineWeight = {
    name: '.ct-chartLineWeight',
    labels: 'Week',
    series: [51, 51.2, 53, 52.5, 52, 52.2],
    fullWidth: "true",
    showArea: "true",
  };

  var chartLineWeight = new ChartJS($configLineWeight);
  chartLineWeight.line();
  // Chart for the pulse
  var $configLinePulse = {
    name: '.ct-chartLinePulse',
    labels: 'Week',
    series: [66, 68, 65, 70, 67, 69],
    fullWidth: "true",
    showArea: "false",
  };

  var chartLinePulse = new ChartJS($configLinePulse);
  chartLinePulse.line();

  //Adding the data from the input fields into the chart
  $scope.Pulse = {};
  $scope.addPulse = function() {
    var newPulse = $scope.Pulse.value;
    var currentDate = new Date;
    var dateFormated = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear();
    console.log(dateFormated);
    $configLinePulse.series.push(newPulse);
    console.log($configLinePulse.series);
    chartLinePulse = new ChartJS($configLinePulse);
    chartLinePulse.line();
    $scope.Pulse.value = "";
  };
  $scope.Weight = {};
  $scope.addWeight = function() {
    var newWeight = $scope.Weight.value;
    var currentDate = new Date;
    var dateFormated = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear();
    console.log(newWeight);
    console.log(dateFormated);
    $configLineWeight.series.push(newWeight);
    console.log($configLineWeight.series);
    chartLineWeight = new ChartJS($configLineWeight);
    chartLineWeight.line();
    $scope.Weight.value = "";
  };

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

.controller('EinstellungenCtrl', function($scope, $cordovaLocalNotification, $translate, jsonService) {
  $scope.$on('onReminderAdded', function(event, id, state, json) {
    console.log('notification ADDED, id: ' + id + ' state:' + state + ' json:' + json);
  });
  $scope.schedule = function(tit, msg) {
    window.plugin.notification.local.add({
      id: 'MYLN',
      title: tit,
      message: msg,
    });
  };

  // ========== Scheduling

  /*  $scope.scheduleSingleNotification = function() {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: 'Title here',
          text: 'Text here',
          data: {
            customProperty: 'custom value'
          }
        }).then(function(result) {
          // ...
          alert('worked');
        });
      };

      $scope.scheduleMultipleNotifications = function() {
        $cordovaLocalNotification.schedule([{
          id: 1,
          title: 'Title 1 here',
          text: 'Text 1 here',
          data: {
            customProperty: 'custom 1 value'
          }
        }, {
          id: 2,
          title: 'Title 2 here',
          text: 'Text 2 here',
          data: {
            customProperty: 'custom 2 value'
          }
        }, {
          id: 3,
          title: 'Title 3 here',
          text: 'Text 3 here',
          data: {
            customProperty: 'custom 3 value'
          }
        }]).then(function(result) {
          // ...
        });
  };

  $scope.scheduleDelayedNotification = function() {
    var now = new Date().getTime();
    var _10SecondsFromNow = new Date(now + 10 * 1000);

    $cordovaLocalNotification.schedule({
      id: 1,
      title: 'Title here',
      text: 'Text here',
      at: _10SecondsFromNow
    }).then(function(result) {
      // ...
    });
  };

  $scope.scheduleEveryMinuteNotification = function() {
    $cordovaLocalNotification.schedule({
      id: 1,
      title: 'Title here',
      text: 'Text here',
      every: 'minute'
    }).then(function(result) {
      // ...
    });
  };

  // =========/ Scheduling

  // ========== Update

  $scope.updateSingleNotification = function() {
    $cordovaLocalNotification.update({
      id: 1,
      title: 'Title - UPDATED',
      text: 'Text - UPDATED'
    }).then(function(result) {
      // ...
    });
  };

  $scope.updateMultipleNotifications = function() {
    $cordovaLocalNotification.update([{
      id: 1,
      title: 'Title 1 - UPDATED',
      text: 'Text 1 - UPDATED'
    }, {
      id: 2,
      title: 'Title 2 - UPDATED',
      text: 'Text 2 - UPDATED'
    }, {
      id: 3,
      title: 'Title 3 - UPDATED',
      text: 'Text 3 - UPDATED'
    }]).then(function(result) {
      // ...
    });
  };

  // =========/ Update

  // ========== Cancelation

  $scope.cancelSingleNotification = function() {
    $cordovaLocalNotification.cancel(1).then(function(result) {
      // ...
    });
  };

  $scope.cancelMultipleNotifications = function() {
    $cordovaLocalNotification.cancel([1, 2]).then(function(result) {
      // ...
    });
  };

  $scope.cancelAllNotifications = function() {
    $cordovaLocalNotification.cancelAll().then(function(result) {
      // ...
    });
  };


  });

  */
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
