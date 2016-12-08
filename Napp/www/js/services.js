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

.factory('schemaService', function(jsonService) {
  var schemaService = {};

  //Load descriptions in appropriate language
  var jsonData = jsonService.getJson();
  var d_cea = jsonData.CEA;
  var d_ceaClinic = jsonData.CEACLINIC;
  var d_coloscopy = jsonData.COLOSCOPY;
  var d_endoscopy = jsonData.ENDOSCOPY;
  var d_endosonography = jsonData.ENDOSONOGRAPHYORMRIPERLVIC;
  var d_ctAbomenPelvic = jsonData.CTABDOMENPELVIC;
  var d_ctAbdomen = jsonData.CTABDOMEN;

  // Variables for the schema generation
  var cancertype = '';
  var stagingT = '';
  var stagingN = '';
  var stagingM = '';
  var coloscopyComplete = false;
  var opDate = new Date();

  // **************The Intervalls are defined according to the aftercare schema 2014 of sggssg.ch ***************
  // Item intervalls StageOne colon
  var ceaTiterStageOne = [12, 24, 48, 60];
  var coloscopyStageOne = [12, 48];

  // Item intervalls StageTwo colon
  var ceaTiterStageTwoThree = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60];
  var coloscopyStageTwoThree = [12, 48];
  var ctThoraxAbdomenStageTwoThree = [12, 24, 36, 48, 60];

  // Item intervalls Stages rectum
  var ceaTiterRectum = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60];
  var coloscopyRectum = [12, 48];
  var endoscopyRectum = [6, 18, 24];
  var endosonographyORpelvicMRIRectum = [6, 12, 18, 24];
  var ctThoraxAbdomenPelvicRectum = [12, 24, 36, 48, 60];

  // Array for the diffrent aftercare items
  var allAftercareItems = [];


  // *************************Get function**************************
  schemaService.getAllAftercareItems = function() {
    return allAftercareItems;
  }

  schemaService.getYears = function() {
    var years = []
    for (var index in allAftercareItems) {
      if (years.indexOf(allAftercareItems[index].date.getFullYear()) < 0) {
        years.push(allAftercareItems[index].date.getFullYear());
      } else {

      }
    }
    return years;
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
  schemaService.setColoscopyComplete = function(csComplete) {
    coloscopyComplete = csComplete;
    console.log(coloscopyComplete);
  }
  schemaService.setOpDate = function(date) {
    opDate.setFullYear(date.getFullYear(), date.getMonth());
  }

  function setAfterCareItemsColoscopy(interval, opdate, booleanColoscopy, description, itemArray) {

    // If the colonscopy wasn't done completly the patient has to do one 3 months postop, therefore we add 3 months to the number array
    if (!booleanColoscopy) {
      interval.splice(0, 0, 3);
      console.log("kolonskopie hinzugefügt")
    }
    for (var i = 0; i < interval.length; i++) {
      var afterCareItem = {};
      afterCareItem.date = new Date(new Date(opdate).setMonth(opdate.getMonth() + interval[i]));
      afterCareItem.description = description;
      itemArray.push(afterCareItem);
    }
    return itemArray;
  }

  function setAfterCareItems(interval, opdate, description, itemArray) {

    console.log()
    for (var i = 0; i < interval.length; i++) {
      var afterCareItem = {};
      afterCareItem.date = new Date(new Date(opdate).setMonth(opdate.getMonth() + interval[i]));
      afterCareItem.description = description;
      itemArray.push(afterCareItem);
    }
    return itemArray;
  }
  // To generate the date plans for the diffrent aftercare items according to the cancer and it's stage
  schemaService.genSchema = function() {
    if (cancertype == 'colon') {
      // The person has stage 1
      if ((stagingT == 1 || stagingT == 2) && stagingN == 0 && stagingM == 0) {
        allAftercareItems = setAfterCareItems(ceaTiterStageOne, opDate, d_cea, allAftercareItems);

        allAftercareItems = setAfterCareItemsColoscopy(coloscopyStageOne, opDate, coloscopyComplete, d_coloscopy, allAftercareItems);
        console.log(allAftercareItems);
      }
      // The person has stage 2 or 3
      else if (((stagingT == 1 || stagingT == 2) && (stagingN > 0) && (stagingM == 0)) || ((stagingT == 3 || stagingT == 4) && stagingM == 0)) {
        allAftercareItems = setAfterCareItems(ceaTiterStageTwoThree, opDate, d_ceaClinic);

        allAftercareItems = setAfterCareItemsColoscopy(coloscopyStageTwoThree, opDate, coloscopyComplete, d_coloscopy, allAftercareItems);

        allAftercareItems = setAfterCareItems(ctThoraxAbdomenStageTwoThree, opDate, d_ctAbdomen, allAftercareItems);
        console.log(allAftercareItems);
      }
      // The person has stage 4 and is not supposed to use this app
      else {
        alert('you are not supposed to use this app');
      }
    }
    // It's rectum cancer
    else {
      if (stagingM == 0) {
        allAftercareItems = setAfterCareItems(ceaTiterStageTwoThree, opDate, d_ceaClinic, allAftercareItems);

        allAftercareItems = setAfterCareItemsColoscopy(coloscopyStageTwoThree, opDate, coloscopyComplete, d_coloscopy, allAftercareItems);

        allAftercareItems = setAfterCareItems(endoscopyRectum, opDate, d_endoscopy, allAftercareItems);

        allAftercareItems = setAfterCareItems(endosonographyORpelvicMRIRectum, opDate, d_endosonography, allAftercareItems);

        allAftercareItems = setAfterCareItems(ctThoraxAbdomenPelvicRectum, opDate, d_ctAbomenPelvic, allAftercareItems);
        console.log(allAftercareItems);
      }
      // The person has stage 4 and is not supposed to use this app
      else {
        alert('you are not supposed to use this app');
      }
    }
  }
  return schemaService;
});
