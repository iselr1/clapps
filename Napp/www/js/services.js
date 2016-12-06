angular.module('starter.services', [])

.factory('jsonService', function($rootScope, $http, $translate) {
  var jsonService = {};
  var prefix = 'js/locale-';
  var suffix = '.json';

  jsonService.data = {};

  // initialize the json file with the currentLanguage
  var key = ($translate.proposedLanguage() || $translate.use());
  $http.get(prefix + key + suffix)
    .success(function(data) {
      jsonService.data.json = data;
      console.log('Json data is initialized');
    });

  //Gets the new json file if the language is changed
  jsonService.loadJson = function(key) {
    $http.get(prefix + key + suffix)
      .success(function(data) {
        //Array leeren
        jsonService.data.json = {};
        //Array mit neuen Werten befüllen
        jsonService.data.json = data;
        console.log('Json data is loaded');
      });
  };
  jsonService.getJson = function() {
    return jsonService.data.json;
  };

  return jsonService;
})

.factory('schemaService', function() {
  var schemaService = {};

  // Variables for the schema generation
  var cancertype = '';
  var stagingT = '';
  var stagingN = '';
  var stagingM = '';
  var colonoscopyComplete = false;
  var opDate = new Date();

  // **************The Intervalls are defined according to the aftercare schema 2014 of sggssg.ch ***************
  // Item intervalls StageOne colon
  var ceaTiterStageOne = [12, 24, 48, 60];
  var colonoscopyStageOne = [12, 48];

  // Item intervalls StageTwo colon
  var ceaTiterStageTwoThree = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60];
  var colonoscopyStageTwoThree = [12, 48];
  var ctThoraxAbdomenStageTwoThree = [12, 24, 36, 48, 60];

  // Item intervalls Stages rectum
  var ceaTiterRectum = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60];
  var colonoscopyRectum = [12, 48];
  var endoscopyRectum = [6, 18, 24];
  var endosonographyORpelvicMRIRectum = [6, 12, 18, 24];
  var ctThoraxAbdomenPelvicRectum = [12, 24, 36, 48, 60];

  // Variables for the diffrent aftercare items
  var ceaTiter = [];
  var colonoscopy = [];
  var ctThoraxAbdomen = [];
  var endoscopy = [];
  var endosonographyORpelvicMRI = [];
  var ctThoraxAbdomenPelvic = [];
  // *************************Get functions**************************
  schemaService.getCeaTiter = function() {
    return ceaTiter;
  }
  schemaService.getColonoscopy = function() {
    return colonoscopy;
  }
  schemaService.getCtThoraxAbdomen = function() {
    return ctThoraxAbdomen;
  }
  schemaService.getEndoscopy = function() {
    return endoscopy;
  }
  schemaService.getEndosonographyORpelvicMRI = function() {
    return endosonographyORpelvicMRI;
  }
  schemaService.getCtThoraxAbdomenPelvic = function() {
      return ctThoraxAbdomenPelvic;
    }
    // *************************** Set functions **********************
  schemaService.setCancertype = function(type) {
    cancertype = type;
  }
  schemaService.setStagingT = function(t) {
    stagingT = t;
  }
  schemaService.setStagingN = function(n) {
    stagingN = n;
  }
  schemaService.setStagingM = function(m) {
    stagingM = m;
  }
  schemaService.setColonoscopyComplete = function(csComplete) {
    colonoscopyComplete = csComplete;
    console.log(colonoscopyComplete);
  }
  schemaService.setOpDate = function(date) {
    opDate.setFullYear(date.getFullYear(), date.getMonth());
  }

  function setDatesColonscopy(interval, opdate, booleanColonscopy) {
    var dateArray = [];
    // If the colonscopy wasn't done completly the patient has to do one 3 months postop, therefore we add 3 months to the number array
    if (!booleanColonscopy) {
      interval.splice(0, 0, 3);
      console.log("kolonskopie hinzugefügt")
    }
    for (var i = 0; i < interval.length; i++) {
      var date = new Date(new Date(opdate).setMonth(opdate.getMonth() + interval[i]));
      dateArray.push(date);
    }
    return dateArray;
  }

  function setDates(interval, opdate, booleanColonscopy) {
    var dateArray = [];
    console.log()
    for (var i = 0; i < interval.length; i++) {
      var date = new Date(new Date(opdate).setMonth(opdate.getMonth() + interval[i]));
      dateArray.push(date);
    }
    return dateArray;
  }
  // To generate the date plans for the diffrent aftercare items according to the cancer and it's stage
  schemaService.genSchema = function() {
    if (cancertype == 'colon') {
      // The person has stage 1
      if ((stagingT == 1 || stagingT == 2) && stagingN == 0 && stagingM == 0) {
        ceaTiter = setDates(ceaTiterStageOne, opDate);
        console.log(ceaTiter);
        colonoscopy = setDatesColonscopy(colonoscopyStageOne, opDate, colonoscopyComplete);
        console.log(colonoscopy);
      }
      // The person has stage 2 or 3
      else if (((stagingT == 1 || stagingT == 2) && (stagingN > 0) && (stagingM == 0)) || ((stagingT == 3 || stagingT == 4) && stagingM == 0)) {
        ceaTiter = setDates(ceaTiterStageTwoThree, opDate);
        console.log(ceaTiter);
        colonoscopy = setDatesColonscopy(colonoscopyStageTwoThree, opDate, colonoscopyComplete);
        console.log(colonoscopy);
        ctThoraxAbdomen = setDates(ctThoraxAbdomenStageTwoThree, opDate);
        console.log(ctThoraxAbdomen);
      }
      // The person has stage 4 and is not supposed to use this app
      else {
        alert('you are not supposed to use this app');
      }
    }
    // It's rectum cancer
    else {
      if (stagingM == 0) {
        ceaTiter = setDates(ceaTiterStageTwoThree, opDate);
        console.log(ceaTiter);
        colonoscopy = setDatesColonscopy(colonoscopyStageTwoThree, opDate, colonoscopyComplete);
        console.log(colonoscopy);
        endoscopy = setDates(endoscopyRectum, opDate);
        console.log(endoscopy);
        endosonographyORpelvicMRI = setDates(endosonographyORpelvicMRIRectum, opDate);
        console.log(endosonographyORpelvicMRI);
        ctThoraxAbdomenPelvic = setDates(ctThoraxAbdomenPelvicRectum, opDate);
        console.log(ctThoraxAbdomenPelvic);
      }
      // The person has stage 4 and is not supposed to use this app
      else {
        alert('you are not supposed to use this app');
      }
    }
  }
  return schemaService;
});
