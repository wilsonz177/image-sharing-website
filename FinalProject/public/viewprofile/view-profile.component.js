//'use strict';

angular.
  module('viewProfile').
  component('viewProfile', {
    templateUrl: 'viewprofile/view-profile.template.html',
    controller: ['$scope', '$http', '$routeParams', '$rootScope', '$cookies', '$location', function viewProfileController($scope, $http, $routeParams, $rootScope, $cookies, $location) {
    	var self = this;
    	self.viewUsername = $routeParams.username;
      self.username = $cookies.get('username');

      
      var loadProfile = function(){
        console.log("in LOADPROFILE");
      document.getElementById('requestsent').style.visibility = 'hidden';
      document.getElementById('unfollow').style.visibility = 'hidden';
      document.getElementById('follow').style.visibility = 'visible';
    	$http.get('/getProfile/' + self.viewUsername, {
        transformRequest: angular.identity,
        // headers: { 'Content-Type': undefined },
        // params: {viewUser: self.viewUser}
      }).then(function(data){
        console.log("in the response of LOADPROFILE");
        console.log('got data: ', data.data);
        self.viewUser = data.data;
        var followers = data.data.followers;
        var requests = data.data.followRequests;
        console.log("these are the follow requests in LOADPROFIEL ", requests);
        console.log("this is self.viewusername ", self.viewUsername);
        if (self.username == self.viewUser.username){
          document.getElementById('unfollow').style.visibility = 'hidden';
          document.getElementById('follow').style.visibility = 'hidden';
        }
        
         for(var i = 0; i<followers.length; i++){
              if (followers[i] == self.username){
                document.getElementById('follow').style.visibility = 'hidden';
                document.getElementById('unfollow').style.visibility = 'visible';
              }
            }
            
            for(var j = 0; j<requests.length; j++){
              if (requests[j] == self.username){
                console.log("I should be showing the request sent bar");
                document.getElementById('requestsent').style.visibility = 'visible';
                document.getElementById('follow').style.visibility = 'hidden';
              }
            }
        
      });
      };
      
      loadProfile();

      self.key = {};

      //"following" for loading the current user's newsfeed
      //"individual" for loading viewing all the posts made by a user
      self.key.stuff = "individual";
      self.key.who = self.viewUsername;
      console.log('my key:', self.key);
      console.log('end of viewprofile component');
      
      self.send = function(message){
        var username = $cookies.get('username');
        var m = username + ": " + message;
        
        console.log("sending this DM from client: ", m);
        
        $http({
        method: 'POST',
        url:'/dm',
        data: {"firstuser": username, "seconduser": self.viewUsername, "message": m}
      })
      .then(function(response) {

        });
      };
      
      self.follow = function(){
        var username = $cookies.get('username');
        $http({
        method: 'POST',
        url:'/follow',
        data: {"loggedinuser": username, "userbeingfollowedorunfollowed": self.viewUser.username, "action": "follow"}
      })
      .then(function(response) {
        console.log("i just followed a user");
            loadProfile();
        });
      };
      
      self.unfollow = function(){
        var username = $cookies.get('username');
        console.log("im in the unfllow function");
        $http({
        method: 'POST',
        url:'/follow',
        data: {"loggedinuser": username, "userbeingfollowedorunfollowed": self.viewUser.username, "action": "unfollow"}
      })
      .then(function(response) {
        console.log("im in the response unfllow function");
          loadProfile();
        });
      };
      
    }]
   });