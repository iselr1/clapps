angular.module('starter.ownServices', [])

/*----------------------------------------------------------------------------*/
/* MidataService for the use of x3a (^.^)
/* isels1
/* The comments should show "how to use it"
/*----------------------------------------------------------------------------*/
// Use this service like all others:
// --> Add reference to your index.html (<script src="js/midataServices.js"></script>)
// --> Add module to the app.js service list ('starter.ownServices')
// --> Add service to the controller params (ownMidataService)
// --> Now it should work
.service('ownMidataService', [function() {
  // Set your own appname and appscr. Not in the app.js anymore
  //var appname = 'SINA';
  //var appsecr = 'S9I35N28A';
  var appname = 'SINA';
  var appsecr = 'S9I35N28A';

  var authToken = '';
  var refreshToken = '';

  // Creating the object to handle midata-requests
  var md = new midata.Midata(
    'https://test.midata.coop:9000', appname, appsecr);

  // Login function (call it with ownMidataService.login(un, pw, role))
  // Sets the authToken and refreshToken (not really used anywhere)
  // -->  un:   Unsername
  // -->  pw:   Passwort
  // -->  role: User-role
  //            The user Role can be 'member', 'provider', 'developer' or 'research'
  function login(un, pw, role) {
    md.login(un,
        pw,
        role)
      .then(function() {
        console.log('Logged in!');
        authToken = md.authToken;
        refreshToken = md.refreshToken;
      });
  }

  // Check if logged in (call it with ownMidataService.loggedIn())
  // returns true if logged in and false if not
  function loggedIn() {
    return md.loggedIn;
  }

  // Logout function (call it with ownMidataService.logout())
  function logout() {
    md.logout();
    console.log(md.authToken);
  }

  // Search function (call it with ownMidataService.search(Resource, {}))
  // Searches for a resrouce with a defined type
  // If the params are defined, it will look up for the resource with the given params
  // --> resourceTyoe:  Can be any 'fhir' resource as a string. Example: "Patient" or "Person"
  // --> params:        A JSON object with the given params. Can also be empty "{}"
  //                    Look up for the possible params at http://build.fhir.org/search.html and the specific resource doc
  // IMPORTANT:         This is an asynchronus call. You have to use the '.then(function (response) {})' notation.
  // EXAMPLE:
  //                    ownMidataService.search("Person", {}).then(function(personList) {
  //                      console.log(personList);
  //                    });
  function search(resourceType, params) {
    return md.search(resourceType, params);
  }

  // Save function (call it with ownMidataService.save(val, type))
  // Saves the given value as the type in midata
  // If no type is given, it will do nothing
  // --> val:           The value to save in midata
  // --> type:          The type of the value to save. Possible types are "weight", "pulse", "bp" (blood pressure) or "comm" (communication)
  // IMPORTANT:         If the type is bp (blood pressure), the "val" variable must be an array. First elemen (val[0]) is the Systolic and
  //                    the second element (val[1]) is the Diastolic blood pressure.
  // EXAMPLE:
  //                    ownMidataService.save(75, 'weight').then(function() {
  //                      console.log(Saved);
  //                    });
  function save(val, type) {
    var dateTime = new Date();
    var data = {};

    // Creates FHIR JSON for weight
    if (type === 'weight') {
      data = {
        resourceType: 'Observation',
        code: {
          coding: [{
            system: 'http://loinc.org',
            code: '3141-9',
            display: 'Weight Measured'
          }]
        },
        effectiveDateTime: dateTime,
        valueQuantity: {
          value: val,
          unit: 'kg',
          system: 'http://unitsofmeasure.org'
        }
      };
    }
    // Creates FHIR JSON for pulse
    else if (type === 'pulse') {
      data = {
        resourceType: "Observation",
        status: "preliminary",
        code: {
          text: "Herzfrequenz",
          coding: [{
            system: "http://loinc.org",
            display: "Herzfrequenz",
            code: "8867-4"
          }]
        },
        effectiveDateTime: dateTime,
        category: {
          coding: [{
            system: "http://hl7.org/fhir/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }],
          text: "Vital Signs"
        },
        valueQuantity: {
          unit: "{beats}/min",
          value: val
        }
      }
    }
    // Creates FHIR JSON for blood pressure
    // val[0]: Systolic
    // val[1]: Diastolic
    else if (type === 'bp') {
      data = {
        resourceType: "Observation",
        status: "preliminary",
        code: {
          text: "Blood Pressure",
          coding: [{
            system: "http://loinc.org",
            display: "Blood Pressure",
            code: "55417-0"
          }]
        },
        effectiveDateTime: dateTime,
        category: {
          coding: [{
            system: "http://hl7.org/fhir/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }],
          text: "Vital Signs"
        },
        component: [{
          code: {
            text: "Systolic blood pressure",
            coding: [{
              system: "http://loinc.org",
              display: "Systolic blood pressure",
              code: "8480-6"
            }]
          },
          valueQuantity: {
            unit: "mm[Hg]",
            value: val[0]
          }
        }, {
          code: {
            text: "Diastolic blood pressure",
            coding: [{
              system: "http://loinc.org",
              display: "Diastolic blood pressure",
              code: "8462-4"
            }]
          },
          valueQuantity: {
            unit: "mm[Hg]",
            value: val[1]
          }
        }]
      }
    }

    return md.save(data);
  }

  // TO BE CONTINUED... (/-.-)/ |__|

  return {
    login: login,
    loggedIn: loggedIn,
    logout: logout,
    search: search,
    save: save
  }
}]);
