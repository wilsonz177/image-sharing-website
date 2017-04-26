'use strict';

angular.
  module('viewProfile').
  component('viewProfile', {
    templateUrl: 'viewprofile/view-profile.template.html',
    controller: ['$scope', '$http', '$routeParams', '$rootScope', '$cookies', '$location', function viewProfileController($scope, $http, $routeParams, $rootScope, $cookies, $location) {
    	var self = this;
    	self.viewUsername = $routeParams.username;
      self.viewUser;
      self.username = $cookies.get('username');
      console.log('got here first');
    	$http.get('/getProfile/' + self.viewUsername, {
        transformRequest: angular.identity,
        // headers: { 'Content-Type': undefined },
        // params: {viewUser: self.viewUser}
      }).then(function(data){
        console.log('got data: ', data.data);
        self.viewUser = data.data;
      });


      self.key = {} 

      //"following" for loading the current user's newsfeed
      //"individual" for loading viewing all the posts made by a user
      self.key.stuff = "individual";
      self.key.who = self.viewUsername;
      console.log('my key:', self.key);
      console.log('end of viewprofile component');
      
      self.follow = function(){
        console.log("in the follow function");
        var u = $cookies.get('username');
        $http({
        method: 'POST',
        url:'/follow',
        data: {"loggedinuser": u, "userbeingfollowed": self.viewUser.username}
      })
      .then(function(response) {
            var path = '/viewuser/' + response.data.username;
            $location.path(path);
        });
      };
      
      self.unfollow = function(){
        
      };
    }]
   });