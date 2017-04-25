//'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('newsFeed').
  component('newsFeed', {
    templateUrl: 'newsfeed/news-feed.template.html',
    controller: ['$http','$rootScope', function NewsFeedController($http, $rootScope) {
      var self = this;
/////////////////////////////////////////////////////////////////////////////////
      self.globalfeed = [];

      var loadGlobalNewsFeed = function(){
        $http.get('/globalnewsfeed/').then(function(response){
          var data = response.data.globalfeed;

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
          
          //self.selected = undefined;
          self.allusers = response.data.allusers;
          //sort my global feed
          self.globalfeed.sort(function(a, b) {
              return parseFloat(b.pic.timestamp) - parseFloat(a.pic.timestamp);
          });

        });
      };

      loadGlobalNewsFeed();

/////////////////////////////////////////////////////////////////////////////////
    

    }]
  });