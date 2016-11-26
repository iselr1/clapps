angular.module('starter.controllersTim', [])


.controller('TermineCtrl', function($scope, $state) {


      var opDate = new Date(16,03,10);

      var schema = "stadium1";

      var history = [ ];

      if(schema = "stadium1"){

      var appointment = {Date: opDate.setMonth(opDate.getMonth() + 12)  , Description:"Koloskopie Termin 1. Und Labormessung CEA Werts Im Spitalzentrum bei Dr. Viehl"};
      history[0] = appointment;
      appointment = {Date: opDate.setMonth(opDate.getMonth() + 24) ,Description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"};
      history[1] = appointment;
      appointment = {Date: opDate.setMonth(opDate.getMonth() + 48) ,Description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"};
      history[2] = appointment;
      appointment = {Date: opDate.setMonth(opDate.getMonth() + 60) ,Description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed d"};
      history[3] = appointment;

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
  $scope.myAppointments.push({
  state:"FUTURE APPOINTMENTS",
  years:[{
    number:"2016",
    appointments:[{
      month: "Jan.",
      description: "Beschreibung des Termins"
    }]
  },{
    number:"2017",
    appointments:[{
      month: "Jan.",
      description: "Beschreibung des Termins"
  },{
    month: "Feb.",
    description: "Beschreibung des Termins"
  },{
    month: "Mrz.",
    description: "Beschreibung des Termins"
  }]

  }]
  });



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
