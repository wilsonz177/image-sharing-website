'use strict';

angular.
  module('searchBar').
  component('searchBar', {
    templateUrl: 'searchbar/search-bar.template.html',
    controller: ['$scope', '$http', '$routeParams', function searchBarController($scope, $http, $routeParams) {
      var self = this;
      self.searchbar = "search bar goes here";


      
      
      


    }]
   });