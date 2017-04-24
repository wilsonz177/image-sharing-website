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
      self.default = "http://www.bofep.org/wpbofep/wp-content/uploads/2013/05/Insert-Photo-Here.jpg";
      $scope.username = "Tom"
      self.myCaption = '';

      self.Submit = function(){
        //shows the progress bar and stuff
        $scope.uploading = true;
        $scope.message = true;
        // console.log("my file: ", $scope.file);
        var fd = new FormData();
        if($scope.file === undefined){
          console.log('hey im undefined');
          self.message = "Please attach a file";
        }else{
          $scope.file.upload.username = "tom";
          fd.append('myfile', $scope.file.upload);
          // fd.append('username', $scope.username);
          // fd.append('mycaption', self.myCaption);
          console.log("ctrl.thatfile: ", $scope.file.upload);
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
               postCaption();
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
        if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg|JPG|PNG|JPEG)$/)) {
            $scope.uploading = true;
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function() {
                    self.thumbnail = {};
                    self.thumbnail.dataUrl = e.target.result;
                    $scope.uploading = false;
                    $scope.message = false;
                });
            };
        } else {
            self.thumbnail = {};
            console.log('not the file we wanted');
            $scope.message = false;
        }
    };



      var postCaption = function(){
        console.log("attempt to post caption");
        var temp = new Object();
        temp.caption = self.myCaption;
        // console.log("url Path: ", )
        // temp.urlPath = 
        var jsonString = JSON.stringify(temp);
        console.log('myjson string: ', jsonString);
        $http.post('/uploadCaption', jsonString, {
              transformRequest: angular.identity,
              headers: { 'Content-Type': 'application/json' }
          }).then(function(response){
          console.log("post response: ", response);
        });
      }
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

 
