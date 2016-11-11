angular.module('starter.controllersMauro', [])

.controller('KontakteCtrl', function($scope, $ionicPopup, $location) {

  $scope.showPrompt = function() {
 var promptPopup = $ionicPopup.prompt({
    title: translate="APPOINTMENTS",
    template: 'This is prompt popup'
 });
 promptPopup.then(function(res) {
    if (res) {
       console.log('Your input is ', res);
    } else {
       console.log('Please enter input');
    }
 });

};
  })
  .controller('InfosCtrl', function($scope, $location) {



  })
