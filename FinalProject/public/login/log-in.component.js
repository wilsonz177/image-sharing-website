//'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('logIn').
  component('logIn', {
    templateUrl: 'login/log-in.template.html',
    controller: ['$http', '$scope', function LoginController($http, $scope) {
      var self = this;

/////////////////////////////////////////////////////////////////////////////////

    $scope.login = function() {
        var o = new Object();
        o.username = $scope.user.username;
        o.password = $scope.user.password;
        var jsonString = JSON.stringify(o);
        console.log("in the login function");
        console.log(o);
        console.log('jsonstring: ', jsonString);
        $http.post('/checkuser', jsonString, {
            //transformRequest: angular.identity,
            headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
            //route to the newsfeed view
        });
      };
    
/////////////////////////////////////////////////////////////////////////////////
    
    $scope.adduser = function() {
        console.log("in the adduser function");
        $http({
        method: 'POST',
        url:'/adduser',
        data: $scope.newuser
      })
      .then(function(response) {
            //route to the newsfeed view
        });
      };
    
    
    }]
  });