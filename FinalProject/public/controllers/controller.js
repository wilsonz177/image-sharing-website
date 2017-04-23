var myApp = angular.module('MyApp',['ngRoute']);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
/////////////////////////////////////////////////////////////////////////////////
var refresh = function() {
  $http({
    method: 'GET',
    url:'/contactlist' //contactlist is the route we'll create to get our data from
  })
  .then(function(response) {
    console.log("I got the data I requested");
    $scope.contactList = response.data;
  });
};
refresh();

/////////////////////////////////////////////////////////////////////////////////

  $scope.addContact = function() {
    $http({
        method: 'POST',
        url:'/contactlist', //contactlist is the route we'll create to get our data from
        data: $scope.contact 
    })
    .then(function(response) {
            console.log("I got the new data after posting");
            console.log(response.data);
            refresh();
        }); 
    };
    
/////////////////////////////////////////////////////////////////////////////////

  $scope.remove = function(id) {
    $http({
        method: 'DELETE',
        url: '/contactlist/' + id
    })
    .then(function(response) {
            refresh();
        });     
    };

/////////////////////////////////////////////////////////////////////////////////



}]);