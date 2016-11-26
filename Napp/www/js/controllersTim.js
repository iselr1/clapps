angular.module('starter.controllersTim', [])


.controller('TermineCtrl', function($scope, $state) {



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
