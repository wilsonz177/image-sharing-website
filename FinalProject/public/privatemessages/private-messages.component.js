//'use strict';

angular.
  module('privateMessages').
  component('privateMessages', {
    templateUrl: 'privatemessages/private-messages.template.html',
    controller: ['$scope', '$http', '$routeParams', '$location', '$cookies', function privateMessagesController($scope, $http, $routeParams, $location, $cookies) {
      var self = this;
      var user = $cookies.get("username");
      var seconduser = $cookies.get("seconduser");
      
      console.log("getting dms of the follwoing 2 users:");
      console.log(user);
      console.log(seconduser);
      var getdms = function(){
        console.log("in getdms");
        $http({
        method: 'POST',
        url:'/getdms',
        data: {"firstuser": user, "seconduser": seconduser}
      })
      .then(function(response) {
          self.convo = response.data.messages;
        });
      };
      
      getdms();
      
      
      $scope.senddm = function(message){
        var m = user + ": " + message;
        $http({
        method: 'POST',
        url:'/dm',
        data: {"firstuser": user, "seconduser": seconduser, "message": m}
      })
      .then(function(response) {
            getdms();
        });
      };
      
    }]
});