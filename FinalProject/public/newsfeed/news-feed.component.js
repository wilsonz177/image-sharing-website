'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('newsFeed').
  component('newsFeed', {
    templateUrl: 'newsfeed/news-feed.template.html',
    controller: ['$http', function NewsFeedController($http) {
      var self = this;

/////////////////////////////////////////////////////////////////////////////////

      //self.login = function() {
      //  $http({
      //  method: 'GET',
      //  url:'/checkuser' //contactlist is the route we'll create to get our data from
      //})
      //.then(function(response) {
      //  self.contactList = response.data;
      //  });
      //};
    
/////////////////////////////////////////////////////////////////////////////////
    

    }]
  });