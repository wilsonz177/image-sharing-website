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
      console.log("cookies user: ", $cookies.get('user'));
      console.log("normal scope: ", $scope.user);
      //detects changes to the variable key
      this.$onChanges= function (changes) {
        if (changes.key) {
          if (changes.key.currentValue == null){
            loadGlobalNewsFeed("getAll");
            console.log('get all of em');
          }else if (changes.key.currentValue.stuff == "following"){
            loadGlobalNewsFeed("getFollowing");
            console.log('get following');
          }

        }
      };
        
      

      console.log('here');

      var loadGlobalNewsFeed = function(input){
        $http.get('/globalnewsfeed/').then(function(response){
          console.log(response.data);
          var data = response.data
          console.log('length: ', data.length);
          // self.key ={};
          // self.key.stuff ="you foo";

          console.log("rootscope:", $rootScope.user);
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
          //sort my global feed
          self.globalfeed.sort(function(a, b) {
              return parseFloat(b.pic.timestamp) - parseFloat(a.pic.timestamp);
          });

        

        });
      };
      
        
      
      
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

