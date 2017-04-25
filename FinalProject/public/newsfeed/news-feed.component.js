'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('newsFeed').
  component('newsFeed', {
    templateUrl: 'newsfeed/news-feed.template.html',
    controller: ['$http','$rootScope', '$scope', '$cookies', function NewsFeedController($http, $rootScope, $scope, $cookies) {
      var self = this;
/////////////////////////////////////////////////////////////////////////////////
      self.globalfeed = [];
      console.log('before errthang', self.key);
      console.log("cookies user: ", $cookies.get('username'));
      self.username = $cookies.get('username');
      //detects changes to the variable key
      this.$onChanges= function (changes) {
        if (changes.key) {
          if (changes.key.currentValue == null){
            console.log('get all of em');
            $http.get('/globalnewsfeed/?get=all').then(function(response){
              callback(response);
            });
          }else if (changes.key.currentValue.stuff == "following"){
            console.log('get following');
            $http.get('/globalnewsfeed/?get=following&username='+ self.username).then(function(response){
              callback(response);
            });
           
          }else if(changes.key.currentValue.stuff =="individual"){
            console.log('get and indivduals posts');
            $http.get('/globalnewsfeed/?get=individual&username='+ self.username + '&who=' + changes.key.currentValue.who).then(function(response){
              callback(response);
            });
          }

        }
      };
        
      

      console.log('here');

      // var loadGlobalNewsFeed = function(input, individual){
      //   $http.get('/globalnewsfeed/').then(function(response){
      //     callback(response);
      //   });
      // };

      var callback = function(response){
          console.log(response.data);
          var data = response.data.globalfeed
          console.log('length: ', data.length);
          // self.key ={};
          // self.key.stuff ="you foo";
          if(response.data.success == null){
          
            //put everything into global feed but unordered
            for(var i=0; i<data.length; i++){
              for(var j=0; j<data[i].pics.length; j++){
                var temp = {}
                temp.name = data[i].username;
                temp.pic = data[i].pics[j];
                self.globalfeed.push(temp);
              }
              // totalpics += response.data[i].pics.length;
              // userPicCount.push(0);
              // userPics.push(response.data[i].pics.length-1);
            }
            console.log(self.globalfeed);
			self.allusers = response.data.allusers;
            //sort my global feed
            self.globalfeed.sort(function(a, b) {
                return parseFloat(b.pic.timestamp) - parseFloat(a.pic.timestamp);
            });
          }else if(response.data.success == "false"){
            console.log("failure response: ",response.data.message);
            $scope.message = true;
            $scope.alert = 'alert alert-danger';
            self.message = response.data.message;
          }

        

      }
      
        
      
      
      console.log("hey");
      console.log("dont make a foo outta yourself: ", self.foo);

      // var loadnewsfeed = function() {
      //   $http({
      //   method: 'POST',
      //   url:'/loadnewsfeed',
      //   data: {"user": $rootScope.user}
      // })
      // .then(function(response) {
      //   self.contactList = response.data;
      //   });
      // };
      
     // loadnewsfeed();
/////////////////////////////////////////////////////////////////////////////////
    

    }],
    bindings: {
      key: '<'
    }
  });

