/*

Documentname      services.js
Created:          09.11.2016
Created by:       iselr1

Function: contains functions and variables which are used and altered in several controllers
*/
angular.module('starter.services', [])
  //--------------------------------------------------------//
  //---------------Factory jsonService-----------------------//
  //--------------------------------------------------------//
  /* factory jsonService
  You'll find the following functions in it:
  loadJson, to load a json file;
  getJson, to get the data of the json file;
  */
  .factory('jsonService', function($rootScope, $http, $translate) {
    var jsonService = {};
    var prefix = 'js/locale-';
    var suffix = '.json';
    var key = '';
    jsonService.data = {};

    // initialize the json file with the currentLanguage
    if (localStorage.getItem('language') != null) {
      key = localStorage.getItem('language').slice(1, 3);
      console.log(key);
    } else {
      key = ($translate.proposedLanguage() || $translate.use());
    }
    console.log($http.get(prefix + key + suffix));
    $http.get(prefix + key + suffix)
      .success(function(data) {
        $translate.use(key);
        //Array leeren
        jsonService.data.json = {};
        //Array mit neuen Werten befüllen
        jsonService.data.json = data;

        console.log(key);
        console.log('Json data is initialized');
      });

    //Gets the new json file if the language is changed
    jsonService.loadJson = function(key) {
      $http.get(prefix + key + suffix)
        .success(function(data) {
          $translate.use(key);
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


//--------------------------------------------------------//
//---------------Factory schemaService-----------------------//
//--------------------------------------------------------//

/* factory schemaService
You'll find the following functions in it:
getYears, to get the years of the calculated appointments of the schema
getDomStructure, to get the schema in the dom structure used in the appointments controller
getAllAftercareItems, to get all items for the schema;
setCancertype, to set the type of the cancer;
setStagingT, to set the t stage;
setStagingN, to set the N stage;
setStagingM, to set the M stage;
setColoscopyComplete, boolean to set if the coloscopy was complete or not;
setOpDate, to set the date of the cancer operation;
setAfterCareItemsColoscopy, to set the items for the coloscopy appointments;
setAfterCareItems, to set all other items;
genSchema, to generate the schema according to the cancertype, staging, coloscopyComplete(or not) and the op date;
*/

.factory('schemaService', function(jsonService) {
    var schemaService = {};

    //Load descriptions in appropriate language
    var jsonData = jsonService.getJson();
    var d_cea = "CEA";
    var d_ceaClinic = "CEACLINIC";
    var d_coloscopy = "COLOSCOPY";
    var d_endoscopy = "ENDOSCOPY";
    var d_endosonography = "ENDOSONOGRAPHYORMRIPERLVIC";
    var d_ctAbomenPelvic = "CTABDOMENPELVIC";
    var d_ctAbdomen = "CTABDOMEN";


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
    schemaService.getYears = function() {
      var years = []
      var itemArray = allAftercareItems;

      //Sort the appointmentsArray according to the dates
      itemArray.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      });

      for (var index in itemArray) {
        if (years.indexOf(itemArray[index].date.getFullYear()) < 0) {
          years.push(itemArray[index].date.getFullYear());
        }
      }
      return years;
    }
    schemaService.getDomStructure = function() {
      var years = schemaService.getYears();
      var doneAppointments = {}
      doneAppointments.state = "DONE APPOINTMENTS";
      var yearsArray = [];
      doneAppointments['years'] = yearsArray;

      for (var j = 0; j < years.length; j++) {
        var yearObject = {};
        yearObject.fullYear = years[j];
        var appointmentsArray = [];
        yearObject['appointments'] = appointmentsArray;
        yearsArray.push(yearObject);
      }
      return doneAppointments;
    }
    schemaService.getAllAftercareItems = function() {
      var itemArray = allAftercareItems;
      var years = schemaService.getYears();
      var statusObject = {};
      // Status of the appointments if done or not
      statusObject.state = "FUTURE APPOINTMENTS";
      // the years array gets added to the status object
      var yearsArray = [];
      statusObject['years'] = yearsArray;

      for (var j = 0; j < years.length; j++) {
        var yearObject = {};
        yearObject.fullYear = years[j];
        var appointmentsArray = [];
        yearObject['appointments'] = appointmentsArray;
        yearsArray.push(yearObject);
        console.log(itemArray);
        for (var k = 0; k < itemArray.length; k++) {
          if (itemArray[k].date instanceof Date) {
            if (years[j] == itemArray[k].date.getFullYear()) {
              itemArray[k].oldDate = itemArray[k].date;
              itemArray[k].month = "MONTHS." + itemArray[k].date.getMonth() + ".LABEL";
              itemArray[k].fullMonth = "MONTHS." + itemArray[k].date.getMonth() + ".FULL";
              itemArray[k].date = "MONTHS." + itemArray[k].date.getMonth() + ".LABEL";

              appointmentsArray.push(itemArray[k]);
            }
          }
        }

        console.log(appointmentsArray);
      }
      console.log(statusObject);


      return statusObject;
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
          allAftercareItems = setAfterCareItems(ceaTiterStageTwoThree, opDate, d_ceaClinic, allAftercareItems);

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
  })
  //--------------------------------------------------------//
  //---------------Factory jsonService-----------------------//
  //--------------------------------------------------------//
  /* factory jsonService
  You'll find the following functions in it:
  loadJson, to load a json file;
  getJson, to get the data of the json file;
  */
  .factory('chartService', function($rootScope, $http, $translate, jsonService) {
    var jsonData = jsonService.getJson();
    var chartService = {};
    var pluginsAxisYTitle = '';
    var options = '';

    chartService.setPluginAxisYTitle = function(vitalsign) {
      if (vitalsign == 'w') {
        pluginsAxisYTitle = jsonData.YOUR_WEIGHT_KG;
      } else if (vitalsign == 'p') {
        pluginsAxisYTitle = jsonData.YOUR_PULSE;
      }
      /* Variables with an array containing the settings for drawing the lineChart of the chartist library */
      // --> axisX: array containing the options to define the horizontal labels
      // --> divisor: the time labels of the xAxis are calulated by divising the timespan of the first and last value in the chart by the number of the divisor
      // --> labelInterpolationFnc: function to set the labels to the time value with the entered format
      // --> axisY: array containing the options to define the vertical labels
      // --> onlyInteger: if true, the numbers are integers, therefore no decimal numbers
      // --> offset: define the offset from the left border of the page
      // for further documentation visit: https://gionkunz.github.io/chartist-js/api-documentation.html
      options = {
        axisX: {
          offset: 30,
          type: Chartist.FixedScaleAxis,
          divisor: 12,
          labelInterpolationFnc: function(value) {
            return moment(value).format('MMM');
          }
        },
        axisY: {
          onlyInteger: true,
          offset: 50
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
        plugins: [
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: jsonData.DURINGLASTTWELVEMONTHS,
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 35
              },
              textAnchor: 'middle'
            },
            axisY: {
              axisTitle: pluginsAxisYTitle,
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: -10
              },
              flipTitle: false,
              textAnchor: 'middle',
            }
          })
        ]
      };
    }

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

    //////////////////////// Getter for the chart options and responsiveOptions //////////////////////////
    chartService.getOptions = function() {
      return options;
    }
    chartService.getResponsiveOptions = function() {
      return responsiveOptions;
    }

    return chartService;
  });
