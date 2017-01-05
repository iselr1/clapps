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

.controller('KoerperCtrl', function($scope, $state, ownMidataService, $timeout, $ionicPopup, jsonService) {
  /* Load the json file with the translations and store it to the variable jsonData */
  var jsonData = jsonService.getJson();

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
    /*
    // Triggered on a button click, or some other target
  $scope.showPopupEnterWeight = function() {
    $scope.Weight = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="number" ng-model="Weight.value">',
      title: 'Geben Sie ihr Gewicht in kg ein',
      scope: $scope,
      buttons: [{
        text: 'Abbrechen'
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.Weight.value) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.Weight.value;
          }
        }
      }]
    });

    myPopup.then(function(res) {
      console.log(res);
      var val = $scope.Weight.value;
      if (res == "") {
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
    });

    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
  };*/

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

      });
    }
  }

  /* Variables with an array containing the settings for drawing the lineChart of the chartist library */
  // --> axisX: array containing the options to define the horizontal labels
  // --> divisor: the time labels of the xAxis are calulated by divising the timespan of the first and last value in the chart by the number of the divisor
  // --> labelInterpolationFnc: function to set the labels to the time value with the entered format
  // --> axisY: array containing the options to define the vertical labels
  // --> onlyInteger: if true, the numbers are integers, therefore no decimal numbers
  // --> offset: define the offset from the left border of the page
  // for further documentation visit: https://gionkunz.github.io/chartist-js/api-documentation.html
  var options = {
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 12,
      labelInterpolationFnc: function(value) {
        return moment(value).format('MMM YY ');
      }
    },
    axisY: {
      onlyInteger: true,
      offset: 20
    },
    series: {
      'series-1': {
        lineSmooth: Chartist.Interpolation.simple({
          fillHoles: true,
          showPoint: true
        })
      },
      'series-2': {
        showPoint: false
      }
    },
  };
  // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
  var responsiveOptions = {
    fullWidth: true,
    // Within the series options you can use the series names
    // to specify configuration that will only be used for the
    // specific series.

    chartPadding: {
      right: 20
    },
    low: 0
  };

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

    var dataMonthlyArray = {};
    var months = [
      "20161",
      "20162",
      "20163",
      "20164",
      "20165",
      "20166",
      "20167",
      "20168",
      "20169",
      "201610",
      "201611",
      "201612",
      "20171"
    ];
    for (var i = 0; i < months.length; i++) {
      dataMonthlyArray[months[i]] = {};
      dataMonthlyArray[months[i]]["date"] = months[i].substring(4) + ".01" + "." + months[i].substring(0, 4);
      dataMonthlyArray[months[i]]["value"] = 0;
      dataMonthlyArray[months[i]]["counter"] = 0;
    }
    var objectTargetLine = [];
    var objectsValues = [];
    for (var y = 0; y < result.length; y++) {
      console.log(dataMonthlyArray);
      var d = new Date(result[y].time);
      var pos = (d.getFullYear() + "" + (d.getMonth() + 1));
      var value = dataMonthlyArray[pos]["value"];
      console.log(value);
      var counter = dataMonthlyArray[pos]["counter"];
      console.log(result[y].value);
      dataMonthlyArray[pos]["value"] = value + result[y].value;
      console.log(dataMonthlyArray[pos]["value"]);
      dataMonthlyArray[pos]["counter"] = counter + 1;

      //set data for the targetline
      if (y == 0) {
        var dataStart = {};
        var dateDataStart = new Date(result[y].time);
        dataStart.x = dateDataStart;
        dataStart.y = result[y].value;
        objectTargetLine.push(dataStart);
        var dataEnd = {};
        var dateDataEnd = new Date(result[result.length - 1].time)
        dataEnd.x = dateDataEnd;
        dataEnd.y = result[y].value;
        objectTargetLine.push(dataEnd);
        console.log(objectTargetLine);
      }
    }
    console.log(objectTargetLine);
    console.log(dataMonthlyArray);

    for (var object in dataMonthlyArray) {
      var data = {};
      var d = new Date(dataMonthlyArray[object]["date"]);
      data.x = d;
      if (dataMonthlyArray[object]["counter"] != 0) {
        data.y = (dataMonthlyArray[object]["value"] / dataMonthlyArray[object]["counter"]);
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
    if (obsType == 'p') {
      var chart = new Chartist.Line('.ct-chartLinePulse', configLine, options, responsiveOptions);
      console.log(chart);
    } else if (obsType == 'w') {
      var chart = new Chartist.Line('.ct-chartLineWeight', configLine, options, responsiveOptions);
      console.log(chart);
    } else {
      //other type
    }
  };

  /*************to initzialize the linecharts in the first place, before new values are saved*****************/
  //ownMidataService.getObservation('p', {}, $scope.drawChart);
  //ownMidataService.getObservation('w', {}, $scope.drawChart);
  //To test the function without login first
  var hanaolalsad = ownMidataService.loggedIn();
  if (!hanaolalsad) {
    ownMidataService.login('lena@midata.coop', 'Lena123456', 'member');
  }
  var timer = $timeout(function refresh() {
    if (ownMidataService.loggedIn()) {
      ownMidataService.getObservation('p', {}, $scope.drawChart);
      ownMidataService.getObservation('w', {}, $scope.drawChart);
    } else {
      timer = $timeout(refresh, 1000);
    }
  }, 1000);

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
.controller('EinstellungenCtrl', function($scope, $cordovaLocalNotification, $cordovaMedia, $translate, jsonService, $ionicPopup, $state, $ionicLoading) {
  // variable containing the inital notification sound path
  var notificationSound = "file://sounds/DespicableMeNotification.mp3";

  /*********************Array with the diffrent notification sounds for the select list*********************/
  // -->id: id of the sound
  // --> name: label of the sound displayed in the selectoption
  // --> soundj: path to the notification sound
  $scope.soundList = [{
    id: 1,
    name: 'Ton 1',
    sound: 'file://sounds/DespicableMeNotification.mp3'
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
      text: 'Instant Notification',
      title: 'Instant'
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
      text: 'Notification After 5 Seconds Has Been Triggered',
      title: 'After 5 Seconds',
      sound: notificationSound
    }).then(function() {
      alert("Notification After 5 seconds set");
    });
  };

  /*********************Function called to reset the app*********************/
  // the localStorage gets cleared, we get redirected to the welcome page and the schema has to be generated newly
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
  function currentLanguage() {
    if (localStorage.getItem('language') != null) {
      if (localStorage.getItem('language').slice(1, 3) == "fr") {
        return '2';
      } else {
        return '1';
      }
    } else {
      return '1';
      if (($translate.proposedLanguage() || $translate.use()) == "fr") {
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
    jsonService.loadJson(key.token);
    localStorage.setItem('language', JSON.stringify(key.token));
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
