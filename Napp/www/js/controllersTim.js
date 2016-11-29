angular.module('starter.controllersTim', [])


.controller('TermineCtrl', function($scope, $state,jsonService) {
var jsonData = jsonService.getJson();
      var month= jsonData.MONTHS;
      $scope.myAppointments = [];

      /*---------------Generating Dummy-Data START----------------*/
var d = new Date();
var doneAppointemnts = {
"state":"DONE APPOINTMENTS",
"years":[{
  "fullYear":d.getFullYear()+1,
  "appointments":[{

  }]
},{
  "fullYear":d.getFullYear()+2,
  "appointments":[{

  }]
},{
  "fullYear":d.getFullYear()+3,
  "appointments":[{

  }]
},{
  "fullYear":d.getFullYear()+4,
  "appointments":[{
  }]
}]
}

  $scope.myAppointments.push(doneAppointemnts);

for (i = 0; i < 4; i++) {

  doneAppointemnts.years[i].appointments.splice(0,1);

  doneAppointemnts.years[i].status = "hidden";
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
    "description": "Kolonskopie"
  }]

  },{
    "fullYear":d.getFullYear()+4,
    "appointments":[{
      "month": month[d.getMonth()].LABEL,
      "description": "CEA-Titer"
    }]
  }]
}


$scope.myAppointments.push(T1T2N0);

$scope.appointmentTerminated = function($status, $parent){

if($status == 1){
console.log(this);
  var tempIndex = this.$index;

var terminatedItem = T1T2N0.years[$parent].appointments[tempIndex];


T1T2N0.years[$parent].appointments.splice(tempIndex, tempIndex+1);


doneAppointemnts.years[$parent].appointments.push(terminatedItem);

if(doneAppointemnts.years[$parent].appointments.length > 0){

doneAppointemnts.years[$parent].status = "";
}

if(T1T2N0.years[$parent].appointments.length == 0){
T1T2N0.years[$parent].status = "hidden";
}

}
}



  $scope.closeContent = function($index){

  if(angular.element(document.querySelector('.content'+$index)).hasClass('hidden'))
  {
      angular.element(document.querySelector('.content'+$index)).removeClass('hidden');
  }
  else{
    angular.element(document.querySelector('.content'+$index)).addClass('hidden');
  }
  }

})

.controller('ExportCtrl', function($scope, $state) {

})
