'use strict';

angular.
  module('viewProfile').
  component('viewProfile', {
    templateUrl: 'viewprofile/view-profile.template.html',
    controller: ['$scope', '$http', '$routeParams', function viewProfileController($scope, $http, $routeParams) {
    	var self = this;
    	self.username = $routeParams.username;
      self.user;
    	$http.get('/getProfile/' + self.username, {
        transformRequest: angular.identity,
        // headers: { 'Content-Type': undefined },
        // params: {username: self.username}
      }).then(function(data){
        console.log('got data: ', data.data);
        self.user = data.data;
      });


    }]
   });