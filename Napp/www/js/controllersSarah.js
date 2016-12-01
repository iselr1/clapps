/*

Dokumentenname      controllerSarah.js
Erstellt am:        16.11.2016
Erstellt durch:     meles1
Verson Nr.:         1.0

Funktion: Alle Controller für die Views "Welcome", "TNM-Staging", "Operation"
*/

angular.module('starter.controllersSarah', [])

/* -- Controller für Welcome View -- */
.controller('WelcomeCtrl', function($scope, $location, $state, $translate) {

  // Weiterleitung nach TNM Staging
  $scope.goTNM = function() {
    $state.go('tnm');
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
  };

})

/* -- Controller für TNM Staging View -- */
.controller('TNMCtrl', function($scope, $location, $state) {

  // Weiterleitung nach Operationen
  $scope.goOP = function() {
    $state.go('op');
  };


/*  mobiscrollfunction = function (x, y, cx, cy, radius) {
    console.log(x);
    console.log(y);
    console.log(cx);
    console.log(cy);
    console.log(radius);
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
  };

  (function ($) {

    function init() {

        mobiscroll.scroller('#test', {
            theme: theme,
            display: display,
            lang: lang,
            wheels: [
                [{
                    label: 'First wheel',
                    data: ['0', '1', '2', '3', '4', '5', '6', '7']
                }, {
                    label: 'Second wheel',
                    data: [{
                        value: 0,
                        display: 'a'
                    }, {
                        value: 1,
                        display: 'b'
                    }, {
                        value: 2,
                        display: 'c'
                    }, {
                        value: 3,
                        display: 'd'
                    }]
                }]
            ]
        });
    }

})(mobiscroll.$);*/

})

/* -- Controller für Operationen View -- */
.controller('OPCtrl', function($scope, $location, $state) {

    // Weiterleitung nach Home Screen
    $scope.goHome = function() {
    $state.go('home');
  };


  /*     var now = new Date(),
           max = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate());

       $scope.settings = {
           theme: 'mobiscroll',
           display: 'bottom',
           max: max
       };*/

/*.module('demoApp', ['mobiscroll-datetime'])
.controller('demoController', ['$scope', function ($scope) {}]);*/

/*  var now = new Date(),
  max = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate());

  var instance = mobiscroll.date('#demo', {
    theme: 'mobiscroll',
    display: 'bottom',
    max: max
});*/

})
;
