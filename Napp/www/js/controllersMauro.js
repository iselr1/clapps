angular.module('starter.controllersMauro', [])

.controller('KontakteCtrl', ['$scope', function($scope, $location) {
$scope.myContacts = [];
$scope.addContact = {};
$scope.addContact = function(){

  /*  var contact = [{
      func:$scope.addContact.func,
      name:$scope.addContact.nm,
      street:$scope.addContact.street,
      location:$scope.addContact.loc,
      phone:$scope.addContact.phone,
      mail:$scope.addContact.mail}];

    $scope.myContacts.push(contact);*/
    $scope.myContacts.push({
    func:$scope.addContact.func,
    name:$scope.addContact.nm,
    street:$scope.addContact.street,
    location:$scope.addContact.loc,
    phone:$scope.addContact.phone,
    mail:$scope.addContact.mail});
}


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
  }])
  .controller('InfosCtrl', function($scope, $location) {



  })
