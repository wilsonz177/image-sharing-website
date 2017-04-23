// angular.module('uploadFileService', [])

// .service('uploadFile', function($http){
// 	this.upload = function(file){
// 		console.log('uploadFile');
// 		var fd = newFormData();
// 		fd.append('myfile', file.upload);
// 		return $http.post('/upload', fd, {
// 			transformRequest: angular.identity,
// 			headers: {'Content-Type': undefined}
// 		});
// 	};
// });



angular.module('uploadFileService', [])

.factory('uploadFile', function($http) {
    this.upload = function(file) {
    	console.log("hey they asked me to upload");
        var fd = new FormData();
        fd.append('myfile', file.upload);
        return $http.post('/upload/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };

});

console.log('upload file services loaded');