angular.module('starter.controllersTim', [])


.controller('TermineCtrl', function($scope,$ionicScrollDelegate, $state,$filter,ionicDatePicker, jsonService, schemaService) {

  // Get some Values from jsonService
  // Set Language List
  $scope.data = jsonService.getJson();
  var jsonData = jsonService.getJson();

  $scope.familyDoc = jsonData.FAMILIYDOC;
  $scope.oncDoc = jsonData.ONCOLOGY;
  $scope.gastDoc = jsonData.GASTROENTEROLOGIST;
  $scope.myAppointments = [];
  var details = angular.element( document.querySelector( '#details' ));
  var allAppointments = angular.element( document.querySelector( '#allAppointments' ));


  // Check if Schema is already generated
  // If not create the Schema
  if(localStorage.getItem('appointmentStatus') == null){
    var done = schemaService.getDomStructure();
    var future =  schemaService.getAllAftercareItems();
    for (i = 0; i < done.years.length; i++) {done.years[i].status = "hidden";}
    localStorage.setItem('future', JSON.stringify(future));
    localStorage.setItem('done', JSON.stringify(done));
    localStorage.setItem('appointmentStatus', "done");
  }

  // Load the Schema from the LocalStorage into the DOM
  var doneAppointments = JSON.parse(localStorage.getItem('done'));
  var actSchema = JSON.parse(localStorage.getItem('future'));
  $scope.myAppointments.push(doneAppointments);
  $scope.myAppointments.push(actSchema);
  console.log(actSchema);
  // Show the Details of the Appointment
  $scope.showAppointmentDetails = function(status, parent, desc, month){
     $ionicScrollDelegate.getScrollPosition().top;



    // First of all Check if its a done Appointment or a future Appointment
    if(status == 1)
      {
        // This is an Appointment from the future Appointments
        $scope.saveAppointment.toggle = false;
        var  fromAppointments = actSchema;
      }
      else
      {
        // This is an Appointment from the doneAppointments
        $scope.saveAppointment.toggle = true;
        var  fromAppointments = doneAppointments;
      }
      // Get the Index of the actual appointment
      // and load the information into the detail View!
      var tempIndex = this.$index;
      var terminatedItem = fromAppointments.years[parent].appointments[tempIndex];
      $scope.saveAppointment.results = terminatedItem.results;
      $scope.saveAppointment.date = terminatedItem.date;
      $scope.saveAppointment.time = terminatedItem.time;
      $scope.data = terminatedItem.data;
      document.getElementById('repeatSelect').value = '0';
      var docs = document.getElementById('repeatSelect');
      $scope.saveAppointment.year = terminatedItem.oldDate.substring(0, 4);
      // Add and remove some css hidden class to fade in and out
      details.removeClass('hidden');
      allAppointments.addClass("hidden");

      $scope.descDetail = desc;
      $scope.descMonth = month;
      $scope.status=status;
      $scope.parent=parent;
      $scope.index=tempIndex;

      //CHeck if local Storage is EMPTYdsc
      //IF not empty --> Load LocalStorage into the DOM one contact by one
      if(localStorage.getItem('contacts')!= null){
        var parsedLocalStorage = JSON.parse(localStorage.getItem('contacts'));
        var data = {};
        data.model = null;
        var options = [];
        data['availableOptions'] = options;
        for (i = 0; i < parsedLocalStorage.length; i++) {
            var contact = parsedLocalStorage[i];
            var tempDoc = {};
              tempDoc.id = i;
              tempDoc.name = jsonData[contact.func]+": " +contact.name;
              tempDoc.realName = contact.name;
              tempDoc.phone = contact.phone;
              options.push(tempDoc);
            }
            console.log(options);
      }
      $scope.data = data;

  }
  $scope.changeCall = function(data){
    $scope.docFunc = data.availableOptions[data.model].name;
    $scope.docPhone = data.availableOptions[data.model].phone;
  }

  // When Save appointment button is pressed
  // The Actual Switch from the list into the other list.
  $scope.saveAppointment = function(status, parent, index){

    // Check if its from the done Appointment List or from the Future appointment List
    // This is from the actual Schema into the Done Appointments
    if(status == 1){
    var  fromAppointments = actSchema;
    var  toAppointments = doneAppointments;
    var toggleState = true;
    }
    // This is from the doneAppointments back into the Schema
    else{
    var  fromAppointments = doneAppointments;
    var  toAppointments = actSchema;
    var  toggleState = false;
    }
    // Save the Data into the DOM Tree and JSON Object
    var tempAppoint = fromAppointments.years[parent].appointments[index];
    tempAppoint.results = $scope.saveAppointment.results;
    tempAppoint.time = $scope.saveAppointment.time;
    tempAppoint.data = $scope.data;
    // Check if Date is undefined
      if($scope.saveAppointment.date !== undefined ){
        tempAppoint.date = $scope.saveAppointment.date;
        $scope.saveAppointment.date = undefined;
      }
      // Check the toggleState to do the activate the switchAppointmentStatus function
      if($scope.saveAppointment.toggle==toggleState){
      $scope.switchAppointmentStatus(fromAppointments, toAppointments, parent, index);
      }
      // Reset the toggle
      // Reset the results
      $scope.saveAppointment.toggle = false;
      $scope.saveAppointment.results = "";
      // Use the CancelAppointment Function to close the detail View
      $scope.cancelAppointment();
      // Save the Data into the localStorage
      saveData();
  }

  //Switch the Status of the Appointment, from Future to done or vice versa.
  $scope.switchAppointmentStatus = function(fromAppointments, toAppointments, parent, index){

      // get the actual Appointment
      var tempIndex = index;
      var terminatedItem = fromAppointments.years[parent].appointments[tempIndex];

      // Splitt it from the Appointment List into the other list.

      fromAppointments.years[parent].appointments.splice(tempIndex, 1);
      toAppointments.years[parent].appointments.push(terminatedItem);

      // Check if Appointment List is Empty!
      // If Appointmentlist is not empty remove hidden Class
      if(toAppointments.years[parent].appointments.length > 0){
        toAppointments.years[parent].status = "";
      }
      // Check if Appointment List is Empty!
      // If Appointmentlist it is empty, hide it
      if(fromAppointments.years[parent].appointments.length == 0){
        fromAppointments.years[parent].status = "hidden";
      }
      // Save the Data into the localStorage
      saveData();
    }

  //Cancel the AppointentDetail view
  $scope.cancelAppointment = function(){
    // remove the hidden class from the appointemntLists
    // add the hiddenClass to the detailView
    details.addClass("hidden");
    allAppointments.removeClass("hidden");
  }

  // fold the List function
  $scope.closeContent = function($index){
    // Select the object and check if it has the class hidden
    // remove it or add it
    if(angular.element(document.querySelector('.content'+$index)).hasClass('hidden'))
    {angular.element(document.querySelector('.content'+$index)).removeClass('hidden');}
    else{angular.element(document.querySelector('.content'+$index)).addClass('hidden');}
  }

  // Save the Data into the localStorage
  saveData = function(){
    localStorage.setItem('future', JSON.stringify(actSchema));
    localStorage.setItem('done', JSON.stringify(doneAppointments));
    }

  // DatePicker
    var ipObj1 = {
      callback: function(val) { //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        schemaService.setOpDate(new Date(val));
        var dateAsString = $filter('date')(val, "dd.MM.yyyy");
        console.log('Return value from the datepicker popup is formatted : ' + dateAsString);
        $scope.saveAppointment.date = dateAsString;
      }
    };

    $scope.openDatePicker = function() {
      ionicDatePicker.openDatePicker(ipObj1);
    };
})

.controller('ExportCtrl', function($scope, $state) {

})
