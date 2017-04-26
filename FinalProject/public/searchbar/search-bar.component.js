//'use strict';

angular.
  module('searchBar').
  component('searchBar', {
    templateUrl: 'searchbar/search-bar.template.html',
    controller: ['$scope', '$http', '$routeParams', '$location', '$cookies', function searchBarController($scope, $http, $routeParams, $location, $cookies) {
      var self = this;
      var user = $cookies.get("username");
      
/////////////////////////////////////////////////////////////////////////////////
      
      var getUsersAndFollowRequests = function(){

        $http({
        method: 'POST',
        url:'/usersandfollowrequests',
        data: {"user": user}
      })
      .then(function(response) {
          self.allusers = response.data.allusers;
          self.requests = response.data.requests;
          console.log("these are the requests: ", self.requests);
          self.people = response.data.dmpeople;
        });
      };
      
      getUsersAndFollowRequests(); //gets an array of allusers that the search bar can look through

/////////////////////////////////////////////////////////////////////////////////

      $scope.openPrivateMessages = function(person){
          $cookies.put("seconduserfromnavbar", person);
          var path = '/privatemessages/' + person;
          $location.path(path);
      };

///////////////////////////////////////////////////////////////////////////////// 
      
      $scope.onSelect = function ($item, $model, $label) {
          $scope.$item = $item;
          $scope.$model = $model;
          $scope.$label = $label;
          var path = '/viewuser/' + $item;
          $location.path(path);
      };
      
/////////////////////////////////////////////////////////////////////////////////
      
      $scope.acceptRequest = function(request){
        $http({
        method: 'POST',
        url:'/follow',
        data: {"loggedinuser": user, "userbeingfollowedorunfollowed": request, "action": "acceptrequest"}
      })
      .then(function(response) {
            getUsersAndFollowRequests();
        });
      };

/////////////////////////////////////////////////////////////////////////////////  
      
      self.logout = function(){
        $cookies.remove("username");
        $cookies.remove("seconduserfromnavbar");
        $cookies.remove("seconduser");
        $location.path('/login');
      };
      
    }]
});