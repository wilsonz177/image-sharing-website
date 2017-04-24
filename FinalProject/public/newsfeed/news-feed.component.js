'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('newsFeed').
  component('newsFeed', {
    templateUrl: 'newsfeed/news-feed.template.html',
    controller: ['$http','$rootScope', function NewsFeedController($http, $rootScope) {
      var self = this;
/////////////////////////////////////////////////////////////////////////////////
      
      var loadnewsfeed = function() {
        $http({
        method: 'POST',
        url:'/loadnewsfeed',
        data: {"user": $rootScope.user}
      })
      .then(function(response) {
        self.contactList = response.data;
        });
      };
      
     loadnewsfeed();
/////////////////////////////////////////////////////////////////////////////////
    

    }]
  });