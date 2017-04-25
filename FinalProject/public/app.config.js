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
        otherwise('/login');
    }
  ]);


