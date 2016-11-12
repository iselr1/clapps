angular.module('starter.controllersMauro', [])

.controller('KontakteCtrl', function($scope, $ionicPopup, $location) {

$scope.openForm = function(){

var form = angular.element( document.querySelector( '#contactForm' ) );

form.removeClass('hidden');
angular.element( document.querySelector( '#minus' )).removeClass('hidden');
angular.element( document.querySelector( '#plus' )).removeClass('hidden');
angular.element( document.querySelector( '#contacts' )).addClass('hidden');


};
$scope.closeForm = function(){

var form = angular.element( document.querySelector( '#contactForm' ) );
form.addClass('hidden');
angular.element( document.querySelector( '#minus' )).addClass('hidden');
angular.element( document.querySelector( '#plus' )).addClass('hidden');
angular.element( document.querySelector( '#contacts' )).removeClass('hidden');



};



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
