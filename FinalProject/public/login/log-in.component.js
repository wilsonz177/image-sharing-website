'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('logIn').
  component('logIn', {
    templateUrl: 'login/log-in.template.html',
    controller: ['$http', function LoginController($http) {
      var self = this;

/////////////////////////////////////////////////////////////////////////////////

      self.login = function() {
        $http({
        method: 'GET',
        url:'/checkuser' //contactlist is the route we'll create to get our data from
      })
      .then(function(response) {
        self.contactList = response.data;
        });
      };
    
/////////////////////////////////////////////////////////////////////////////////
    

    }]
  });