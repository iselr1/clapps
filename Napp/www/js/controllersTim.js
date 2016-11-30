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
        "description": "CEA-Titer"
    },{
      "month": month[d.getMonth()].LABEL,
      "description": "Kolonsokpie"
    }]
  },{
    "fullYear":d.getFullYear()+2,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer"
    }]
  },{
    "fullYear":d.getFullYear()+3,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer"
  },{
    "month": month[d.getMonth()].LABEL,
    "description": "Kolonskopie"}]
  },{
    "fullYear":d.getFullYear()+4,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer"
    }]
  }]
}
$scope.myAppointments.push(T1T2N0);

  $scope.showAppointmentDetails = function(status, parent, desc){

      var tempIndex = this.$index;
      var terminatedItem = T1T2N0.years[parent].appointments[tempIndex];

      details.removeClass('hidden');
      allAppointments.addClass("hidden");

      $scope.descDetail = desc;
      $scope.status=status;
      $scope.parent=parent;
      $scope.index=tempIndex;
  }
  $scope.appointmentTerminated = function(status, parent, index){
    if(status == 1){
      var tempIndex = index;
      var terminatedItem = T1T2N0.years[parent].appointments[tempIndex];

      T1T2N0.years[parent].appointments.splice(tempIndex, tempIndex+1);
      doneAppointments.years[parent].appointments.push(terminatedItem);

      if(doneAppointments.years[parent].appointments.length > 0){
        doneAppointments.years[parent].status = "";
      }

      if(T1T2N0.years[parent].appointments.length == 0){
        T1T2N0.years[parent].status = "hidden";
      }

    }
  }
  $scope.saveAppointment = function(status, parent, index){
    if(status == 1){

      var tempAppoint = T1T2N0.years[parent].appointments[index];
      if($scope.saveAppointment.date !== undefined){
        tempAppoint.month = $scope.saveAppointment.date;
      }
      if($scope.saveAppointment.toggle==true){
      $scope.appointmentTerminated(status, parent, index);
      }
      $scope.saveAppointment.toggle = false;
      $scope.cancelAppointment();
    }
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
