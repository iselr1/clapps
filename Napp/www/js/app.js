// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ionic-datepicker', 'ionic-timepicker', 'formlyIonic', 'nvd3', 'i4mi', 'starter.controllers', 'starter.controllersRea', 'starter.controllersSarah', 'starter.controllersTim', 'starter.controllersMauro', 'starter.services', 'jsonFormatter', 'pascalprecht.translate', ])
  .constant('APPNAME', 'SINA')
  .constant('APPSECRET', 'S9I35N28A')
  .run(function($ionicPlatform, $cordovaLocalNotification) {

    $ionicPlatform.ready(function() {
      if (window.navigator && window.navigator.splashscreen) {
        window.plugins.orientationLock.unlock();
      }
      // Check for permissions to show local notifications - iOS 8 NEEDS permission to run!
      $cordovaLocalNotification.hasPermission().then(function(granted) {
        $cordovaLocalNotification.cancelAll();
        if (!granted) {
          $cordovaLocalNotification.promptForPermission();
        };
      });

      document.addEventListener("deviceReady", function() {
        // Event handling for Local Notifications
        window.plugin.notification.local.onclick = function(id, state, json) {
          $rootScope.$broadcast('onNotificationClick', id, state, json);
        };
        // You can add more here for oncancel, ontrigger etc.
      });


      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

.config(function($stateProvider, $urlRouterProvider, $translateProvider, ionicDatePickerProvider) {

  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Select a Date',
    setLabel: 'Set',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);


  // path to laod the language files
  $translateProvider.useStaticFilesLoader({
    prefix: 'js/locale-',
    suffix: '.json'
  });
  $translateProvider
  //register the supported languages, if the languages is other than the supported set it to the german file
    .registerAvailableLanguageKeys(['fr', 'de'], {
      'fr_*': 'fr',
      'de_*': 'de',
      '*': 'de'
    })
    //determine the system language
    .determinePreferredLanguage()
    //if the system language can't be determined set it to german
    .fallbackLanguage('de');
  $translateProvider.useSanitizeValueStrategy('sanitize');

  //to check if the device is able to sent emails
  document.addEventListener('deviceready', function() {
    // cordova.plugins.email is now available
    // cordova.plugins.notification.local is now available
    alert("email und notification available");
  }, false);

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome.html',
      controller: 'WelcomeCtrl'
    })

  .state('tnm', {
      url: '/tnm',
      templateUrl: 'templates/tnm.html',
      controller: 'TNMCtrl'
    })
    .state('op', {
      url: '/op',
      templateUrl: 'templates/operation.html',
      controller: 'OPCtrl'
    })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('infos', {
    url: '/infos',
    templateUrl: 'templates/infos.html',
    controller: 'InfosCtrl'
  })

  .state('export', {
    url: '/export',
    templateUrl: 'templates/export.html',
    controller: 'ExportCtrl'
  })

  .state('koerper', {
    url: '/koerper',
    templateUrl: 'templates/koerper.html',
    controller: 'KoerperCtrl'
  })

  .state('termine', {
    url: '/termine',
    templateUrl: 'templates/termine.html',
    controller: 'TermineCtrl'
  })

  .state('ueber', {
      url: '/ueber',
      templateUrl: 'templates/ueber.html',
      controller: 'UeberCtrl'
    })
    .state('impressum', {
      url: '/impressum',
      templateUrl: 'templates/impressum.html',
      controller: 'ImpressumCtrl'
    })
    .state('einstellungen', {
      url: '/einstellungen',
      templateUrl: 'templates/einstellungen.html',
      controller: 'EinstellungenCtrl'
    })
    .state('datenschutz', {
      url: '/datenschutz',
      templateUrl: 'templates/datenschutz.html',
      controller: 'DatenschutzCtrl'
    })

  .state('kontakte', {
    url: '/kontakte',
    templateUrl: 'templates/kontakte.html',
    controller: 'KontakteCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
});
