'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('newsFeed').
  component('newsFeed', {
    templateUrl: 'newsfeed/news-feed.template.html',
    controller: ['$http', function NewsFeedController($http, $rootScope) {
      var self = this;
      loadnewsfeed();
/////////////////////////////////////////////////////////////////////////////////
      
      var loadnewsfeed = function() {
        $http({
        method: 'POST',
        url:'/loadnewsfeed',
        data: $rootScope.user
      })
      .then(function(response) {
        self.contactList = response.data;
        });
      };
    
/////////////////////////////////////////////////////////////////////////////////
    

    }]
  });