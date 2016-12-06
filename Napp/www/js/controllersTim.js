angular.module('starter.controllersTim', [])


.controller('TermineCtrl', function($scope, $state, jsonService) {
  $scope.data = jsonService.getJson();
  var jsonData = jsonService.getJson();
  var month= jsonData.MONTHS;
  $scope.familyDoc = jsonData.FAMILIYDOC;
  $scope.oncDoc = jsonData.ONCOLOGY;
  $scope.gastDoc = jsonData.GASTROENTEROLOGIST;

  $scope.myAppointments = [];

  var details = angular.element( document.querySelector( '#details' ));
  var allAppointments = angular.element( document.querySelector( '#allAppointments' ));

  var d = new Date();
  var doneAppointments = {
  "state":"DONE APPOINTMENTS",
  "years":[{
    "fullYear":d.getFullYear()+1,
    "appointments":[{}]
  },{
    "fullYear":d.getFullYear()+2,
    "appointments":[{}]
  },{
    "fullYear":d.getFullYear()+3,
    "appointments":[{}]
  },{
    "fullYear":d.getFullYear()+4,
    "appointments":[{}]
  }]
  }
  $scope.myAppointments.push(doneAppointments);

  for (i = 0; i < 4; i++) {
    doneAppointments.years[i].appointments.splice(0,1);
    doneAppointments.years[i].status = "hidden";
  }

var d = new Date();
var T1T2N0 = {
    "state":"FUTURE APPOINTMENTS",
    "years":[{
      "fullYear":d.getFullYear()+1,
      "appointments":[{
        "month": month[d.getMonth()].LABEL,
        "description": "CEA-Titer",
        "results":""
    },{
      "month": month[d.getMonth()].LABEL,
      "description": "Koloskopie",
      "results":""
    }]
  },{
    "fullYear":d.getFullYear()+2,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer",
      "results":""
    }]
  },{
    "fullYear":d.getFullYear()+3,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer",
      "results":""
  },{
    "month": month[d.getMonth()].LABEL,
      "description": "Koloskopie",
    "results":""}]
  },{
    "fullYear":d.getFullYear()+4,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer",
      "results":""
    }]
  }]
}
$scope.myAppointments.push(T1T2N0);

  $scope.showAppointmentDetails = function(status, parent, desc){

    if(status == 1){
      $scope.saveAppointment.toggle = false;
      var  fromAppointments = T1T2N0;

    }
    else{
      $scope.saveAppointment.toggle = true;
      var  fromAppointments = doneAppointments;
    }

      var tempIndex = this.$index;
      var terminatedItem = fromAppointments.years[parent].appointments[tempIndex];
      $scope.saveAppointment.results = terminatedItem.results;

      details.removeClass('hidden');
      allAppointments.addClass("hidden");

      $scope.descDetail = desc;
      $scope.status=status;
      $scope.parent=parent;
      $scope.index=tempIndex;
  }
  $scope.switchAppointmentStatus = function(fromAppointments, toAppointments, parent, index){

      var tempIndex = index;
      var terminatedItem = fromAppointments.years[parent].appointments[tempIndex];

      fromAppointments.years[parent].appointments.splice(tempIndex, tempIndex+1);
      toAppointments.years[parent].appointments.push(terminatedItem);

      if(toAppointments.years[parent].appointments.length > 0){
        toAppointments.years[parent].status = "";
      }

      if(fromAppointments.years[parent].appointments.length == 0){
        fromAppointments.years[parent].status = "hidden";
      }
    }

  $scope.saveAppointment = function(status, parent, index){
    if(status == 1){
    var  fromAppointments = T1T2N0;
    var  toAppointments = doneAppointments;
    var toggleState = true;
    }
    else{
    var  fromAppointments = doneAppointments;
    var  toAppointments = T1T2N0;
    var  toggleState = false;
    }
      var tempAppoint = fromAppointments.years[parent].appointments[index];
      tempAppoint.results = $scope.saveAppointment.results;
      if($scope.saveAppointment.date !== undefined ){
        tempAppoint.month = $scope.saveAppointment.date;
        $scope.saveAppointment.date = undefined;
      }
      if($scope.saveAppointment.toggle==toggleState){
      $scope.switchAppointmentStatus(fromAppointments, toAppointments, parent, index);
      }
      $scope.saveAppointment.toggle = false;
      $scope.saveAppointment.results = "";
      $scope.cancelAppointment();

  }


  $scope.cancelAppointment = function(){
    details.addClass("hidden");
    allAppointments.removeClass("hidden");
  }

  $scope.closeContent = function($index){
    if(angular.element(document.querySelector('.content'+$index)).hasClass('hidden'))
    {angular.element(document.querySelector('.content'+$index)).removeClass('hidden');}
    else{angular.element(document.querySelector('.content'+$index)).addClass('hidden');}
  }
})

.controller('ExportCtrl', function($scope, $state) {

})
