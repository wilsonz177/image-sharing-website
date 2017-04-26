'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('newsFeed').
  component('newsFeed', {
    templateUrl: 'newsfeed/news-feed.template.html',
    controller: ['$http','$rootScope', '$scope', '$cookies', '$location', function NewsFeedController($http, $rootScope, $scope, $cookies, $location) {
      var self = this;
/////////////////////////////////////////////////////////////////////////////////
     
      self.globalfeed = [];
    
      console.log("cookies user: ", $cookies.get('username'));
      self.username = $cookies.get('username');

      var location = $location.path().split("/");
      

      var loadFeed = function(){
        self.globalfeed = [];
        if(location[1] == "home"){
          console.log("you're at home");
          $http.get('/globalnewsfeed/?get=following&username='+ self.username).then(function(response){
              callback(response);
          });
        }
        if(location[1] == "viewuser"){
          console.log("youre at view user: ", location[2]);
          $http.get('/globalnewsfeed/?get=individual&username='+ self.username + '&who=' + location[2]).then(function(response){
                callback(response);
          });
        }
        if(location[1] == "newsfeed"){
          console.log("you're at newfeed");
          $http.get('/globalnewsfeed/?get=all').then(function(response){
                callback(response);
          });
        }
      }
      loadFeed();



      // //detects changes to the variable key
      // this.$onChanges= function (changes) {
      //   if (changes.key) {
      //     if (changes.key.currentValue == null){
      //       console.log('get all of em');
      //       $http.get('/globalnewsfeed/?get=all').then(function(response){
      //         callback(response);
      //       });
      //     }else if (changes.key.currentValue.stuff == "following"){
      //       console.log('get following');
      //       $http.get('/globalnewsfeed/?get=following&username='+ self.username).then(function(response){
      //         callback(response);
      //       });
          
      //     }else if(changes.key.currentValue.stuff =="individual"){
      //       console.log('get and individuals posts');
      //       $http.get('/globalnewsfeed/?get=individual&username='+ self.username + '&who=' + changes.key.currentValue.who).then(function(response){
      //         callback(response);
      //       });
      //     }

      //   }
      // };
        
    $scope.onSelect = function ($item, $model, $label) {
      $scope.$item = $item;
      $scope.$model = $model;
      $scope.$label = $label;
      var path = '/viewuser/' + $item;
      $location.path(path);
};

      


      var callback = function(response){
          console.log(response.data);
          var data = response.data
          // console.log('length: ', data.length);
          
          if(response.data.success == null){
          
            //put everything into global feed but unordered
            for(var i=0; i<data.length; i++){
              for(var j=0; j<data[i].pics.length; j++){
                var temp = {}
                temp.name = data[i].username;
                temp.pic = data[i].pics[j];
                // console.log("temp pic: ", temp.pic);
                self.globalfeed.push(temp);
              }
              
            }
            console.log(self.globalfeed);
            //sort my global feed
            self.globalfeed.sort(function(a, b) {
                return parseFloat(b.pic.timestamp) - parseFloat(a.pic.timestamp);
            });

            //for counting
            for(var i=0; i<self.globalfeed.length; i++){
              self.globalfeed[i].num  = i;
              self.globalfeed[i].addComment = false;
              if(self.globalfeed[i].name == self.username){
                self.globalfeed[i].owner = true;
              }else{
                self.globalfeed[i].owner = false;
              }
            }
            

          }else if(response.data.success == "false"){
            console.log("failure response: ",response.data.message);
            $scope.message = true;
            $scope.alert = 'alert alert-danger';
            self.message = response.data.message;
          }
      }


      self.showCommentInput = function(number){
        self.globalfeed[number].addComment = !(self.globalfeed[number].addComment);
      };


      self.submitComment = function(number){
        console.log("comment to be submitted: ", self.globalfeed[number].commentToSubmit);
        var temp = new Object();
        temp.content = self.globalfeed[number].commentToSubmit;
        temp.username = self.username;
        temp.who = self.globalfeed[number].name;
        temp.timestamp = self.globalfeed[number].pic.timestamp;
        var jsonString = JSON.stringify(temp);
        console.log('myjson string: ', jsonString);
        $http.post('/submitComment', jsonString, {
              transformRequest: angular.identity,
              headers: { 'Content-Type': 'application/json' }
          }).then(function(response){
            if(response.data.success == "true"){

              loadFeed();
            }else{
              if(response.data.success == "false"){
                console.log("failed to submit comment");
              }
            }
        });
      }

      self.like = function(number) {
        var temp = new Object();
        temp.who = self.globalfeed[number].name;
        temp.timestamp = self.globalfeed[number].pic.timestamp;
        temp.likes = self.globalfeed[number].pic.likes;
        var jsonString = JSON.stringify(temp);
        $http.post('/like', jsonString, {
              transformRequest: angular.identity,
              headers: { 'Content-Type': 'application/json' }
          }).then(function(response){
            if(response.data.success == "true"){
              self.globalfeed[number].pic.likes = response.data.likes;
            }else{
              if(response.data.success == "false"){
                console.log("failed to like");
              }
            }
        });
      }

      self.deletePost = function (number){
        if(self.username == self.globalfeed[number].name){
          var temp = new Object();
          temp.who = self.globalfeed[number].name;
          temp.timestamp = self.globalfeed[number].pic.timestamp;
          var jsonString = JSON.stringify(temp);

          $http.post('/deletePost', jsonString, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': 'application/json' }
            }).then(function(response){
              if(response.data.success == "true"){
                loadFeed();
              }else{
                if(response.data.success == "false"){
                  console.log("failed to delete");
                }
              }
          });
        }
      }
        
      
      
      

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

