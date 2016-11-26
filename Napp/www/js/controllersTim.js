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



      $scope.myAppointments.push({
      state:"DONE APPOINTMENTS",
      years:[{
        number:"2014",
        appointments:[{
          month: "Jan.",
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"
        }]
      },{
        number:"2015",
        appointments:[{
          month: "Feb.",
          description: "Beschreibung des Termins"
      }]

    }]
  });
  var d = new Date();
  var T1T2N0 = {
    "state":"FUTURE APPOINTMENTS",
    "years":[{
      "number":d.getFullYear()+1,
      "appointments":[{
        "month": month[d.getMonth()],
        "description": "CEA-Titer"
    },{
      "month": month[d.getMonth()],
      "description": "Kolonsokpie"
    }]

  },{
    "number":d.getFullYear()+2,
    "appointments":[{
      "month": month[d.getMonth()],
      "description": "CEA-Titer"
    }]
  },{
    "number":d.getFullYear()+3,
    "appointments":[{
      "month": month[d.getMonth()],
      "description": "CEA-Titer"
  },{
    "month": month[d.getMonth()],
    "description": "Kolonskopie"
  }]

  },{
    "number":d.getFullYear()+4,
    "appointments":[{
      "month": month[d.getMonth()],
      "description": "CEA-Titer"
    }]
  }]
  }



  $scope.myAppointments.push(T1T2N0);

  T1T2N0.years[3].number = "LOOOL";


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
