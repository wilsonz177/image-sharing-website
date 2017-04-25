//'use strict';

angular.
  module('searchBar').
  component('searchBar', {
    templateUrl: 'searchbar/search-bar.template.html',
    controller: ['$scope', '$http', '$routeParams', '$location', function searchBarController($scope, $http, $routeParams, $location) {
      var self = this;

      
      var getUsers = function(){

        $http({
        method: 'GET',
        url:'/allusers',
      })
      .then(function(response) {
          self.allusers = response.data.allusers;
        });
      };
      
      getUsers(); //gets an array of allusers that the search bar can look through
  
      $scope.onSelect = function ($item, $model, $label) {
          $scope.$item = $item;
          $scope.$model = $model;
          $scope.$label = $label;
          var path = '/viewuser/' + $item;
          $location.path(path);
      };
    }]
});