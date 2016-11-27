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
});
