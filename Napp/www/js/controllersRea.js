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
show***Popup, to show a popup if the entred value for weight or pulse was not valid;
drawChart, to draw the lineChart with the pulse and weight values;
*/

.controller('KoerperCtrl', function($scope, $state, ownMidataService, $timeout, $ionicPopup, jsonService, chartService) {
  /* Load the json file with the translations and store it to the variable jsonData */
  var jsonData = jsonService.getJson();
  // To set the title for the Y Axis
  var pluginsAxisYTitle = '';
  /********************* Validation area ******************/
  /*Variables for the Validation of the inputs field with the pulse and weight data to store to midata*/
  // Min value for pulse
  var minPulse = 30;
  // Max value for pulse
  var maxPulse = 150;
  // Min value for weight
  var minWeight = 30;
  // Max value for weight
  var maxWeight = 250;
  /* Popups for the diffrent cases of validation */
  // Popup if there was no value entered
  $scope.showNoValPopup = function(vitalsign) {
      var alertPopup = $ionicPopup.alert({
        title: jsonData.NOVALUE,
        template: jsonData.PLEASEGIVE + vitalsign + jsonData.ACCORDINGFIELD
      });
    }
    // Popup if the value was not numeric
  $scope.showNotNumeric = function(vitalsign) {
      var alertPopup = $ionicPopup.alert({
        title: jsonData.INVALIDVALUE,
        template: jsonData.PLEASEGIVE + vitalsign + jsonData.ASANUMBER
      });
    }
    // Popup if the pulse value was out of the min-max range
  $scope.showNotPossiblePuls = function() {
      var alertPopup = $ionicPopup.alert({
        title: jsonData.INVALIDVALUE,
        template: jsonData.PULSMINMAX
      });
    }
    // Popup if the weight value was out of the min-max range
  $scope.showNotPossibleWeight = function() {
    var alertPopup = $ionicPopup.alert({
      title: jsonData.INVALIDVALUE,
      template: jsonData.WEIGHTMINMAX
    });
  }

  /*********************Function to save and get Data from Midata*********************/
  // Initialize the value of the ng-model
  $scope.Weight = {};

  /* Function addWeight: only working if the value is not empty or lower than minWeight or higher than maxWeight
  if the value gets trough validation we call the save function of ownMidataService and after this asynchronus call was excecuted we call the getObservation function to load the last 5 values from midata and call $scope.drawChart to reload the linechart*/
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
        console.log('Resource Created: ' + e + val);
        //HARD CODED WEIGHT
        ownMidataService.getObservation('w', {}, $scope.drawChart);
        // Set value of the input field to empty
        $scope.Weight.value = '';
        console.log($scope.Weight.value);
      });
    }
  }

  /*********************Function to save and get Data from Midata*********************/
  // Initialize the value of the ng-model
  $scope.Pulse = {};
  /* Function addPulse: only working if the value is not empty or lower than minPulse or higher than maxPulse
  if the value gets trough validation we call the save function of ownMidataService and after this asynchronus call was excecuted we call the getObservation function to load the last 5 values from midata and call $scope.drawChart to reload the linechart*/
  $scope.addPulse = function() {
    var val = $scope.Pulse.value;

    if (val == "") {
      $scope.showNoValPopup(jsonData.PULSE);
    } else if (isNaN(val)) {
      $scope.showNotNumeric(jsonData.PULSE);
    } else if ((val < minPulse) || (val > maxPulse)) {
      $scope.showNotPossiblePuls();
    } else {
      var type = 'pulse';

      ownMidataService.save(val, type).then(function(e) {
        console.log('Resource Created: ' + e);
        //HARD CODED WEIGHT
        ownMidataService.getObservation('p', {}, $scope.drawChart);
        // Set value of the input field to empty
        $scope.Pulse.value = '';
        // To set the title for the Y Axis
        pluginsAxisYTitle = jsonData.YOUR_PULSE;
      });
    }
  }



  /*********************Function to draw the lineCharts*********************/
  // In this function we check if the results array from midata contains more observation values than 5. If thats the case we take only the newest 5 entry and store the value in an array of data objects containing the date and value of the obersvation entry
  // --> result: array containing all observation objects from midata
  // --> obsType: w if they are weight observations; p if they are pulse observations
  // data.x: to store the date of the obersvation
  // data.y: to store the value of the observation
  // --> result.sort: To sort the Array with the midata data according to their entry date otherwise no line will be drawn between the points
  // --> configLine: variable with an objects array containing the data objects
  // --> chart: according to the obsType the pulse of weight linechart gets drawn
  $scope.drawChart = function(result, obsType) {
    result.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.time) - new Date(b.time);
    });

    var dataMonthlyObjects = {};
    var usedDate = new Date();

    var monthString = function getMonthString(date) {
      console.log('*** getMonthString for date', date, 'formated', date.getFullYear() + "" + (date.getMonth() + 1));
      return date.getFullYear() + "" + (date.getMonth() + 1);
    }

    for (var c = 0; c < 13; c++) {
      var date = monthString(usedDate);
      console.log('*** c', c);
      dataMonthlyObjects[date] = {};
      dataMonthlyObjects[date]["date"] = date.substring(4) + ".01" + "." + date.substring(0, 4);
      dataMonthlyObjects[date]["value"] = 0;
      dataMonthlyObjects[date]["counter"] = 0;

      // aktuelles Datum -1 Monat rechnen
      //currentDate.
      usedDate.setMonth(usedDate.getMonth() - 1);
    }

    var objectTargetLine = [];
    var objectsValues = [];
    for (var y = 0; y < result.length; y++) {
      console.log(dataMonthlyObjects);
      var d = new Date(result[y].time);
      var pos = (d.getFullYear() + "" + (d.getMonth() + 1));
      if (pos in dataMonthlyObjects) {
        var value = dataMonthlyObjects[pos]["value"];
        console.log(value);
        var counter = dataMonthlyObjects[pos]["counter"];
        console.log(result[y].value);
        dataMonthlyObjects[pos]["value"] = value + result[y].value;
        console.log(dataMonthlyObjects[pos]["value"]);
        dataMonthlyObjects[pos]["counter"] = counter + 1;
      } else {
        //do nothing
      }
      //set data for the targetline
      if (y == 0) {
        var dataStart = {};
        var dateChartStart = new Date();
        var dateDataStart = new Date(dateChartStart.setFullYear(dateChartStart.getFullYear() - 1));
        dataStart.x = dateDataStart;
        dataStart.y = result[y].value;
        objectTargetLine.push(dataStart);
        var dataEnd = {};
        var dateDataEnd = new Date();
        dataEnd.x = dateDataEnd;
        dataEnd.y = result[y].value;
        objectTargetLine.push(dataEnd);
        console.log(objectTargetLine);
      }
    }

    console.log(objectTargetLine);
    console.log(dataMonthlyObjects);

    for (var object in dataMonthlyObjects) {
      var data = {};
      var d = new Date(dataMonthlyObjects[object]["date"]);
      data.x = d;
      if (dataMonthlyObjects[object]["counter"] != 0) {
        data.y = (dataMonthlyObjects[object]["value"] / dataMonthlyObjects[object]["counter"]);
      } else {
        data.y = 0;
      }
      objectsValues.push(data);
    }
    objectsValues.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.x) - new Date(b.x);
    });


    var configLine = {
      series: [{
        name: 'series-1',
        data: objectsValues
      }, {
        name: 'series-2',
        data: objectTargetLine
      }]
    };

    chartService.setPluginAxisYTitle(obsType);

    if (obsType == 'p') {
      var chart = new Chartist.Line('.ct-chartLinePulse', configLine, chartService.getOptions(), chartService.getResponsiveOptions());
      console.log(chart);
    } else if (obsType == 'w') {
      var chart = new Chartist.Line('.ct-chartLineWeight', configLine, chartService.getOptions(), chartService.getResponsiveOptions());
      console.log(chart);
    } else {
      //other type
    }
  };

  /*************to initzialize the linecharts in the first place, before new values are saved*****************/
  ownMidataService.getObservation('p', {}, $scope.drawChart);
  ownMidataService.getObservation('w', {}, $scope.drawChart);


})

//--------------------------------------------------------//
//---------------CONTROLLER Über-----------------------//
//--------------------------------------------------------//

.controller('UeberCtrl', function($scope, $state) {
  /**** contains only ng-click functions to navigate to the indicated views *****/
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
/* Controller Einstellungen
You'll find the following functions in it:
onchangeSound, to alter the reminder sound;
onchangeLanguage, to alter the app language;
currentLanguage, to detect the current language;
scheduleInstantNotification, to schedule an notification;
scheduleNotificationFiveSecondsFromNow, to schedule a notification at a specific dateTime;
resetApp, to clear the localStorage and reset everything to the intial status;
*/
.controller('EinstellungenCtrl', function($scope, $ionicHistory, $cordovaLocalNotification, $cordovaMedia, $translate, jsonService, $ionicPopup, $state, $ionicLoading) {
  /* Load the json file with the translations and store it to the variable jsonData */
  var jsonData = jsonService.getJson();

  // variable containing the inital notification sound path
  var notificationSound = "file://sounds/HTCOneLimeNotification.mp3";

  /*********************Array with the diffrent notification sounds for the select list*********************/
  // -->id: id of the sound
  // --> name: label of the sound displayed in the selectoption
  // --> soundj: path to the notification sound
  $scope.soundList = [{
    id: 1,
    name: 'Ton 1',
    sound: 'file://sounds/Bamboo.mp3'
  }, {
    id: 2,
    name: 'Ton 2',
    sound: 'file://sounds/HTCOneLimeNotification.mp3'
  }, {
    id: 3,
    name: 'Ton 3',
    sound: 'file://sounds/iphoneOriginal.mp3'
  }];
  // Initialize the select with an id of the select list
  $scope.soundSelected = 1;

  /*********************function called if another sound in the select list was selected*********************/
  // overrites the variable notificationSound with the selected
  // --> mediaStatusCallback: callback function showing ionicLoading spinner if the new media call has the status 1
  // --> getMediaURL: to set the path of the sound to the according one in the android build if the platform is android
  $scope.onchangeSound = function(soundList) {
    notificationSound = soundList.sound;
    // Initialize var src with the path of the selected sound
    var src = soundList.sound;

    // set the path for the notificationSound, in this case the part with file:// is skipped
    var mp3URL = getMediaURL(src.slice(7));
    console.log(mp3URL);
    // media object to play the sound of the according url
    var media = new Media(mp3URL, null, null, mediaStatusCallback);
    // play the media object
    media.play();

    var mediaStatusCallback = function(status) {
      if (status == 1) {
        $ionicLoading.show({
          template: 'Loading...'
        });
      } else {
        $ionicLoading.hide();
      }
    }

    function getMediaURL(s) {
      var isAndroid = ionic.Platform.isAndroid();
      if (isAndroid) return "/android_asset/www/" + s;
      return s;
    }
  };

  /*********************Function called to schedule an instant notification*********************/
  // --> id: id of the notification
  // --> text: notification text
  // --> title: notification title
  $scope.scheduleInstantNotification = function() {
    $cordovaLocalNotification.schedule({
      id: 1,
      text: jsonData.NOTIFICATIONTEXT,
      title: jsonData.NOTIFICATIONTITLE,
      sound: notificationSound
    }).then(function() {
      alert("Instant Notification set");
    });
  };

  /*********************Function called to schedule an notification at a defined date*********************/
  // --> id: id of the notification
  // --> date: the date object for calling the notification
  // --> text: notification text
  // --> title: notification title
  // --> sound: the sound to play when the notification pops - value of the notificationSound
  $scope.scheduleNotificationFiveSecondsFromNow = function() {
    // schedule notification 5 seconds from now
    var now = new Date().getTime();
    var _5SecondsFromNow = new Date(now + 5000);

    $cordovaLocalNotification.schedule({
      id: 2,
      date: _5SecondsFromNow,
      text: jsonData.NOTIFICATIONTEXT,
      title: jsonData.NOTIFICATIONTITLE,
      sound: notificationSound
    }).then(function() {
      alert("Notification After 5 seconds set");
    });
  };

  /*********************Function called to reset the app*********************/
  // the localStorage gets cleared, we get redirected to the welcome page and the schema has to be generated newly
  $scope.resetApp = function() {
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

  /*********************Array with the diffrent languagesfor the select list*********************/
  // -->id: id of the language
  // --> name: for the label of the language displayed in the selectoption
  // --> token: abbrebviation of the language for getting the json language file
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
  /*********************function to get the currentLanguage*********************/
  // Either the current language is diffrent from the system language and therefore restored from the localStorage or we detect the system language
  // return: the id of the currentLanguage to set the languageSelected to this id
  // Get current language
  function currentLanguage() {
    console.log("currentLanguage");
    if (localStorage.getItem('language') != null) {
      console.log("storage");
      if (localStorage.getItem('language').slice(1, 3) == "fr") {
        return '2';
      } else {
        return '1';
      }
    } else {
      if (($translate.proposedLanguage() || $translate.use()) == "fr") {
        console.log("system");
        return '2';
      } else {
        return '1';
      }
    }
  };

  /*********************function called if another language in the select list was selected*********************/
  /* defines that the translate plugin has to use the choosen language and Therefore calls the jsonService to load the json file with the according language abbrebviation. lastly stores the abbrebviation in the localStorage that the same language is loaded when opening the app the next time */
  $scope.onchangeLanguage = function(key) {
    console.log(key.token);
    $translate.use(key.token);
    jsonService.loadJson(key.token).then(function() {
      jsonData = jsonService.getJson();
      localStorage.setItem('language', JSON.stringify(key.token));
      $ionicHistory.clearCache();
    });
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
