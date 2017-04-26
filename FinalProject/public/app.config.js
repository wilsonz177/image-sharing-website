'use strict';

angular.
  module('instaBam').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/login', {
          template: '<log-in></log-in>'
        }).
        when('/addpost', {
          template: '<search-bar></search-bar><add-post></add-post>'
        }).
         when('/newsfeed', {
           template: '<search-bar></search-bar><news-feed></news-feed>'
        }).
        //  when('/details/:id', {
        //    template: '<detailed-view></detailed-view>'
        // }).
         when('/addcomment', {
            template: '<search-bar></search-bar><add-comment></add-comment>'
         }).
         when('/viewuser/:username', {
            template: '<search-bar></search-bar><view-profile></view-profile>'
         }).
         when('/home', {
          template: '<search-bar></search-bar><news-feed key="$ctrl.key"></news-feed>',
          controller: ['$scope', function homeCtrl($scope){
            this.key = {}
            this.key.stuff = "folllowing";
          }]
         }).
          when('/privatemessages/:username', {
            template: '<search-bar></search-bar><private-messages></private-messages>'
         }).
          when('/accountsettings', {
            template: '<search-bar></search-bar><account-settings></account-settings>'
         }).
        otherwise('/login');
    }
  ]);

// angular.
//   module('instaBam').
//   controller('appCtrl', function($scope){
//     $scope.key = {}
//     $scope.key.stuff = "folllowing";
//   })
