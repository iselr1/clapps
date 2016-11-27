/*

Dokumentenname      controllersMauro.js
Erstellt am:        16.11.2016
Erstellt durch:     tschm2
Verson Nr.:         1.0

Funktion: All Controllers for the different views "Infos", "Kontakte"

*/
angular.module('starter.controllersMauro', [])


  //--------------------------------------------------------//
  //---------------CONTROLLER Konakte-----------------------//
  //--------------------------------------------------------//

  /* Controller Kontakte
  You'll find the following functions in it:
  addContact, to add a new Contacts;
  remoceContact, to delete an existing Contact;
  openForm & closeForm, to Open and Close the ContactForm;
  */

  .controller('KontakteCtrl', ['$scope', function($scope, $location) {

    $scope.myContacts = [];
    /*---------------Generating Dummy-Data START----------------*/
    localStorage.setItem("contact", null);
    if(angular.isDefined(localStorage.getItem("contact").func)){
    $scope.myContacts.push( localStorage.getItem("contact"));
    }
    $scope.myContacts.push({
    func:"Hausarzt",
    name:"Stefan Knöpfli",
    street:"Bielstrasse 25",
    location:"2051 Biel",
    phone:"+4131312321223",
    mail:"stefan.knöpfli@szb.ch"});


    /*---------------Generating Dummy-Data END----------------*/

    // Adding the Data from the Contact Formular addContact to the Dom
    //
    $scope.addContact = {};
    $scope.addContact = function(){
      var contact =
        {
            "func": $scope.addContact.func,
            "name": $scope.addContact.nm,
            "street":$scope.addContact.street,
            "location":$scope.addContact.loc,
            "phone":$scope.addContact.phone,
            "mail":$scope.addContact.mail
        };
        localStorage.setItem("contact", contact);
        $scope.myContacts.push(contact);
      }

    // Removing a Contact from the DOM
    // Getting the ID of the Contact from the Button

    $scope.removeContact = function(event){
    angular.element( document.querySelector('#contact'+event.target.id)).addClass('hidden');
    }


    // Removing or Adding CSS Class to display the Contact Form
    $scope.openForm = function(){
      var form = angular.element( document.querySelector( '#contactForm' ) );
      form.removeClass('hidden');
      angular.element( document.querySelector( '#minus' )).removeClass('hidden');
      angular.element( document.querySelector( '#plus' )).removeClass('hidden');
      angular.element( document.querySelector( '#contacts' )).addClass('hidden');
      angular.element( document.getElementsByClassName( 'contacts' )).addClass('hidden');
    };

    // Removing or Adding CSS Class to display the Contact Form
    $scope.closeForm = function(){
      var form = angular.element( document.querySelector( '#contactForm' ) );
      form.addClass('hidden');
      angular.element( document.querySelector( '#minus' )).addClass('hidden');
      angular.element( document.querySelector( '#plus' )).addClass('hidden');
      angular.element( document.querySelector( '#contacts' )).removeClass('hidden');
      angular.element( document.getElementsByClassName( 'contacts' )).removeClass('hidden');
    };
  }])

  //--------------------------------------------------------//
  //----------------CONTROLLER Infos------------------------//
  //--------------------------------------------------------//

  /* Controller INFOS
  You'll find the following functions in it:

  */
  .controller('InfosCtrl', function($scope, $location) {

        $scope.myInfos = [];
        /*---------------Generating Dummy-Data START----------------*/
        $scope.myInfos.push({
        h2:"NUTRITION",
        content:"NUTRITIONCONTENT",
        link: "https://www.krebsliga.ch/krebs-vorbeugen/gesunder-lebensstil/gesunde-ernaehrung/"});

        $scope.myInfos.push({
        h2:"SPORT",
        content:"SPORTCONTENT",
        link: "https://www.krebsliga.ch/krebs-vorbeugen/gesunder-lebensstil/viel-bewegung/"});

        $scope.myInfos.push({
        h2:"REHA",
        content:"REHACONTENT",
        link: "https://www.krebsliga.ch/ueber-krebs/rehabilitation/"});

        /*---------------Generating Dummy-Data END----------------*/


        // Showing only One Element!
        $scope.showContent = function($index){
        angular.element(document.getElementsByClassName('shown')).addClass('hidden');
        angular.element(document.querySelector('#infoContent'+$index)).removeClass('hidden');
        angular.element(document.querySelector('#infoContent'+$index)).addClass('shown');
        }



  })
