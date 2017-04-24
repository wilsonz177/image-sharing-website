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
          template: '<add-post></add-post>'
        }).
        //  when('/newsfeed', {
        //    template: '<news-feed></news-feed>'
        // }).
        //  when('/details/:id', {
        //    template: '<detailed-view></detailed-view>'
        // }).
         when('/addcomment', {
            template: '<add-comment></add-comment>'
         }).
         when('/viewuser/:username', {
            template: '<view-profile></view-profile>'
         }).
        otherwise('/login');
    }
  ]);