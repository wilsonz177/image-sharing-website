//'use strict';

angular.
  module('searchBar').
  component('searchBar', {
    templateUrl: 'searchbar/search-bar.template.html',
    controller: ['$scope', '$http', '$routeParams', '$location', '$cookies', function searchBarController($scope, $http, $routeParams, $location, $cookies) {
      var self = this;
      var user = $cookies.get("username");
       // console.log("the cookies name is ", user);
       // console.log("in searchbar controller");
      var getUsersAndFollowRequests = function(){
 // console.log("in getusersandfollowrequests");
        $http({
        method: 'POST',
        url:'/usersandfollowrequests',
        data: {"user": user}
      })
      .then(function(response) {
          self.allusers = response.data.allusers;
          self.requests = response.data.requests;
          //  console.log("these are all the users", response.data.users);
          // console.log("these are all the requests", response.data.requests);
        });
      };
      
      getUsersAndFollowRequests(); //gets an array of allusers that the search bar can look through

      $scope.onSelect = function ($item, $model, $label) {
          $scope.$item = $item;
          $scope.$model = $model;
          $scope.$label = $label;
          var path = '/viewuser/' + $item;
          $location.path(path);
      };
      
      
      $scope.acceptRequest = function(request){
          // console.log("in the sccept request unction");
        $http({
        method: 'POST',
        url:'/follow',
        data: {"loggedinuser": user, "userbeingfollowedorunfollowed": request, "action": "acceptrequest"}
      })
      .then(function(response) {
            getUsersAndFollowRequests();
        });
      };

      self.logout = function(){
        $cookies.remove("username");
        $location.path('/login');
      }
      
    }]
});