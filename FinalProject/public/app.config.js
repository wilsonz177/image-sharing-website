'use strict';

angular.
  module('instaBam').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      console.log('HEYLLO');
      $routeProvider.
        when('/login', {
          template: '<log-in></log-in>'
        }).
        when('/addpost', {
          template: '<add-post></add-post>'
        }).
        // when('/newsfeed', {
        //   template: '<news-feed></news-feed>'
        // }).
        // when('/details/:id', {
        //   template: '<detailed-view></detailed-view>'
        // }).
        otherwise('/login');
    }
  ]);