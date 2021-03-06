'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('logIn').
  component('logIn', {
    templateUrl: 'login/log-in.template.html',
    controller: ['$http', '$scope', '$location', '$rootScope', '$cookies', function LoginController($http, $scope, $location, $rootScope, $cookies) {
      var self = this;

/////////////////////////////////////////////////////////////////////////////////
    
    self.login = function() {
        var o = new Object();
        o.username = self.user.username;
        o.password = self.user.password;
        var jsonString = JSON.stringify(o);
        
        $http.post('/checkuser', jsonString, {
            //transformRequest: angular.identity,
            headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
          if(response.data.success == "false"){
            console.log("failed to find user");
          }else if (response.data.success == "true"){
            console.log("success login");
            $rootScope.user = response.data.username;
            $rootScope._id = response.data._id;
            $cookies.put("username", response.data.username);
            $cookies.put("id", response.data._id);
            var path = '/newsfeed';
            $location.path(path);
          }
        });
      };
    
/////////////////////////////////////////////////////////////////////////////////
    
    self.adduser = function() {
        $http({
        method: 'POST',
        url:'/adduser',
        data: self.newuser
      })
      .then(function(response) {
            $rootScope.user = response.data.username;
            $rootScope._id = response.data._id;
            $cookies.put("username", response.data.username);
            $cookies.put("id", response.data._id);
            $location.path('/newsfeed');
        });
      };
    
/////////////////////////////////////////////////////////////////////////////////    

    }]
  });