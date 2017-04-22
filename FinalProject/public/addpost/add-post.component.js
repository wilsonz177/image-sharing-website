'use strict';

// Register `logIn` component, along with its associated controller and template
angular.
  module('addPost').
  component('addPost', {
    templateUrl: 'addpost/add-post.template.html',
    controller: ['$scope', '$http', '$timeout', function AddPostController($scope, $http, $timeout) {
      var self = this;
      $scope.message = false;
      $scope.alert = '';
      $scope.file ={};
      self.message = "hello";
    

      // var doUpload = function(){
      //   $http.post('/upload/', fd, {
      //       transformRequest: angular.identity,
      //       headers: { 'Content-Type': undefined }
      //   });
      // };

      self.Submit = function(){
        //shows the progress bar and stuff
        $scope.uploading = true;
        $scope.message = true;
        var fd = new FormData();
        if($scope.file === undefined){
          console.log('hey im undefined');
          self.message = "Please attach a file";
        }else{
          fd.append('myfile', $scope.file.upload);

          $http.post('/upload/', fd, {
              transformRequest: angular.identity,
              headers: { 'Content-Type': undefined }
          }).
          then(function(data){
            if(data.data.success){
              $scope.uploading = false;
              $scope.alert = 'alert alert-success';
              console.log('success');
              self.message = data.data.message;
              $scope.file = {};
            }else{
              $scope.uploading = false;
              $scope.alert = 'alert alert-danger';
              console.log("message: ", data.data.message);
              $scope.file = {};
              self.message = data.data.message;
              console.log('failure');
            }
          });
        }
      }


      $scope.photoChanged = function(files) {
        if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
            $scope.uploading = true;
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function() {
                    $scope.thumbnail = {};
                    $scope.thumbnail.dataUrl = e.target.result;
                    $scope.uploading = false;
                    $scope.message = false;
                });
            };
        } else {
            $scope.thumbnail = {};
            $scope.message = false;
        }
    };
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

 
