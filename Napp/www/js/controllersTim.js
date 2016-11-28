angular.module('starter.controllersTim', [])


.controller('TermineCtrl', function($scope, $state) {

      var month= ["JAN","FEB","MRZ","APR","MAI","JUN","JUL","AUG","SEP","OKT","NOV","DEZ"];
      var opDate = new Date(16,03,10);

      var schema = "stadium1";

      var history = [ ];

      if(schema = "stadium1"){
      var actDate = opDate.getMonth();

      var appointment = {Date: opDate.setMonth(actDate + 12)  , Description:"Koloskopie Termin 1. Und Labormessung CEA Werts Im Spitalzentrum bei Dr. Viehl"};
      history[0] = appointment;
      appointment = {Date: opDate.setMonth(actDate + 24) ,Description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"};
      history[1] = appointment;
      appointment = {Date: opDate.setMonth(actDate + 48) ,Description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"};
      history[2] = appointment;
      appointment = {Date: opDate.setMonth(actDate + 60) ,Description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"};
      history[3] = appointment;

      var mauroTestKolonT1T2N0 = {

      }
      }
      else if (schema = "stadium2+3"){


      }
      else if (schema = "AlleStadien"){


      }

      $scope.myAppointments = [];

      /*---------------Generating Dummy-Data START----------------*/
var d = new Date();
var doneAppointemnts = {
"state":"DONE APPOINTMENTS",
"years":[{
  "fullYear":d.getFullYear()+1,
  "appointments":[{
    "month": "",
    "description": ""
  }]
},{
  "fullYear":d.getFullYear()+2,
  "appointments":[{
    "month": "",
    "description": ""
  }]
},{
  "fullYear":d.getFullYear()+3,
  "appointments":[{
    "month": "",
    "description": ""
  }]
},{
  "fullYear":d.getFullYear()+4,
  "appointments":[{
    "month": "",
    "description": ""
  }]
}]
}

      $scope.myAppointments.push(doneAppointemnts);
  var d = new Date();
  var T1T2N0 = {
    "state":"FUTURE APPOINTMENTS",
    "years":[{
      "fullYear":d.getFullYear()+1,
      "appointments":[{
        "month": month[d.getMonth()],
        "description": "CEA-Titer"
    },{
      "month": month[d.getMonth()],
      "description": "Kolonsokpie"
    }]

  },{
    "fullYear":d.getFullYear()+2,
    "appointments":[{
      "month": month[d.getMonth()],
      "description": "CEA-Titer"
    }]
  },{
    "fullYear":d.getFullYear()+3,
    "appointments":[{
      "month": month[d.getMonth()],
      "description": "CEA-Titer"
  },{
    "month": month[d.getMonth()],
    "description": "Kolonskopie"
  }]

  },{
    "fullYear":d.getFullYear()+4,
    "appointments":[{
      "month": month[d.getMonth()],
      "description": "CEA-Titer"
    }]
  }]
}


$scope.myAppointments.push(T1T2N0);

$scope.appointmentTerminated = function($status, $parent, $index){
if($status == 1){
var year = T1T2N0.years[$parent].fullYear;
var item = T1T2N0.years[$parent].appointments[$index];
var test = delete T1T2N0.years[$parent].appointments[$index];
alert(T1T2N0.years[$parent].appointments.length);
doneAppointemnts.years[$parent].appointments.append(item);
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
