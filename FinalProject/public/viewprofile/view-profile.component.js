'use strict';

angular.
  module('viewProfile').
  component('viewProfile', {
    templateUrl: 'viewprofile/view-profile.template.html',
    controller: ['$scope', '$http', '$routeParams', '$rootScope', function viewProfileController($scope, $http, $routeParams, $rootScope) {
    	var self = this;
    	self.username = $routeParams.username;
      self.user;
      console.log('got here first');
    	$http.get('/getProfile/' + self.username, {
        transformRequest: angular.identity,
        // headers: { 'Content-Type': undefined },
        // params: {username: self.username}
      }).then(function(data){
        console.log('got data: ', data.data);
        self.user = data.data;
      });


      self.key = {}
      self.key.stuff = "following";
      console.log('end of viewprofile component');
    }]
   });