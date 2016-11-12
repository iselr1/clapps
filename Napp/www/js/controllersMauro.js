angular.module('starter.controllersMauro', [])

.controller('KontakteCtrl', ['$scope', function($scope, $location) {

$scope.myContacts = [];

$scope.myContacts.push({
func:"Hausarzt",
name:"Stefan Knöpfli",
street:"Bielstrasse 25",
location:"2051 Biel",
phone:"+4131312321223",
mail:"stefan.knöpfli@szb.ch"});

$scope.myContacts.push({
func:"Hausarzt",
name:"Meier Max",
street:"Bielstrasse 25",
location:"2051 Biel",
phone:"+4131312321223",
mail:"stefan.knöpfli@szb.ch"});

$scope.myContacts.push({
func:"Hausarzt",
name:"Hans Peter",
street:"Bielstrasse 25",
location:"2051 Biel",
phone:"+4131312321223",
mail:"stefan.knöpfli@szb.ch"});

$scope.addContact = {};
$scope.addContact = function(){

    $scope.myContacts.push({
    func:$scope.addContact.func,
    name:$scope.addContact.nm,
    street:$scope.addContact.street,
    location:$scope.addContact.loc,
    phone:$scope.addContact.phone,
    mail:$scope.addContact.mail});
    /*  var contact = [{
        func:$scope.addContact.func,
        name:$scope.addContact.nm,
        street:$scope.addContact.street,
        location:$scope.addContact.loc,
        phone:$scope.addContact.phone,
        mail:$scope.addContact.mail}];

      $scope.myContacts.push(contact);*/
}

$scope.removeContact = function(event){
angular.element( document.querySelector('#contact'+event.target.id)).addClass('hidden');
}


$scope.openForm = function(){

var form = angular.element( document.querySelector( '#contactForm' ) );
form.removeClass('hidden');
angular.element( document.querySelector( '#minus' )).removeClass('hidden');
angular.element( document.querySelector( '#plus' )).removeClass('hidden');
angular.element( document.querySelector( '#contacts' )).addClass('hidden');
angular.element( document.getElementsByClassName( 'contacts' )).addClass('hidden');


};
$scope.closeForm = function(){

var form = angular.element( document.querySelector( '#contactForm' ) );
form.addClass('hidden');
angular.element( document.querySelector( '#minus' )).addClass('hidden');
angular.element( document.querySelector( '#plus' )).addClass('hidden');
angular.element( document.querySelector( '#contacts' )).removeClass('hidden');
angular.element( document.getElementsByClassName( 'contacts' )).removeClass('hidden');
};
  }])
  .controller('InfosCtrl', function($scope, $location) {


  })
