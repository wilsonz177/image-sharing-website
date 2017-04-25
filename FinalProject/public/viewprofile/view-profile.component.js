'use strict';

angular.
  module('viewProfile').
  component('viewProfile', {
    templateUrl: 'viewprofile/view-profile.template.html',
    controller: ['$scope', '$http', '$routeParams', '$rootScope', '$cookies', function viewProfileController($scope, $http, $routeParams, $rootScope, $cookies) {
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
      console.log('end of viewprofile component');
    }]
   });