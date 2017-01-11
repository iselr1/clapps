/*

Documentname      controllersMauro.js
Created:          09.11.2016
Created by:       tschm2
Version Nr.:       1.0

Function: All controllers for the views "Kontakte" "Infos",
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

  .controller('KontakteCtrl', function($scope, $location, jsonService, $ionicPopup) {
    $scope.myContacts = [];


    // SET private variables
    var jsonData = jsonService.getJson();
    var minus =  angular.element( document.querySelector( '#minus' ));
    var plus =  angular.element( document.querySelector( '#plus' ));
    var addDoc =  angular.element( document.querySelector( '#addDoc' ));
    var contactList =  angular.element( document.querySelector( '#contactList' ));
    var form = angular.element( document.querySelector( '#contactForm' ) );
    $scope.familyDoc = jsonData.FAMILIYDOC;
    $scope.oncDoc = jsonData.ONCOLOGY;
    $scope.gastDoc = jsonData.GASTROENTEROLOGIST;

    //CHeck if local Storage is EMPTY
    //IF not empty --> Load LocalStorage into the DOM one contact by one
    if(localStorage.getItem('contacts')!= null){
      var parsedLocalStorage = JSON.parse(localStorage.getItem('contacts'));
        for (i = 0; i < parsedLocalStorage.length; i++) {
          var contact = parsedLocalStorage[i];
          $scope.myContacts.push(contact);
        }
    }
    else{
      var contact =
        {
            "func": "FAMILIYDOC",
            "name": "Heinz Knöpfli",
            "street":"Eichenweg 15",
            "location":"3000 Bern",
            "phone":"+41313002839",
            "mail":"heinz.knöpfli@bluemail.ch"
        };
        $scope.myContacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify($scope.myContacts));
    }

    // Adding the Data from the Contact Formular addContact to the Dom
    // Save the Contact in the LocalStorage

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
        $scope.myContacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify($scope.myContacts));
    }

    // Removing a Contact from the DOM
    // Getting the ID of the Contact
    // Delete the Contact from the localStorage
    $scope.removeContact = function(event){
      var tempIndex = this.$index
        var confirmPopup = $ionicPopup.confirm({
          title: jsonData.DELETEDOC,
          template: jsonData.DELETDOCTEXT,
          cancelText: jsonData.CANCEL,
          cancelType: 'button-assertive'


        });
        console.log(confirmPopup);
        confirmPopup.then(function(res) {
          if(res) {
            console.log(tempIndex);
            $scope.myContacts.splice(tempIndex, 1);
            localStorage.setItem('contacts', JSON.stringify($scope.myContacts));
          }
        });
      };

    // Removing or Adding CSS Class to display the Contact Form
    $scope.openForm = function(){
      form.removeClass('hidden');
      minus.removeClass('hidden');
      plus.removeClass('hidden');
      contactList.addClass('hidden');
      addDoc.addClass('hidden');
    };

    // Removing or Adding CSS Class to display the Contact Form
    $scope.closeForm = function(){
      var form = angular.element( document.querySelector( '#contactForm' ) );
      form.addClass('hidden');
      minus.addClass('hidden');
      plus.addClass('hidden');
      contactList.removeClass('hidden');
      addDoc.removeClass('hidden');
    };
  })

  //--------------------------------------------------------//
  //----------------CONTROLLER Infos------------------------//
  //--------------------------------------------------------//

  /* Controller INFOS
  You'll find the following functions in it:

  */
  .controller('InfosCtrl', function($scope, $location,jsonService) {
    var data = jsonService.getJson();
    $scope.data = jsonService.getJson();
    var infos = data.INFORMATION;

    console.log(infos[0].TITLE);

    $scope.myInfos = [];

    for (i = 0; i < infos.length; i++) {
      $scope.myInfos.push({
      h2:infos[i].TITLE,
      content:infos[i].CONTENT,
      link:infos[i].LINK});
    }

      // Showing only One Element!
      $scope.showContent = function($index){
        angular.element(document.getElementsByClassName('shown')).addClass('hidden');
        angular.element(document.querySelector('#infoContent'+$index)).removeClass('hidden');
        angular.element(document.querySelector('#infoContent'+$index)).addClass('shown');
      }
  })
