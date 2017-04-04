/*
Change the name of myApp to your angular app.
Make sure to change the same on index.html page
*/ 
var myApp= angular.module('myApp',['ngFileUpload']);

myApp.controller('mainCtrl', ["$scope","$http","$timeout","Upload", function($scope,$http,$timeout,Upload){

    $scope.picFile="";
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: '/testPost',
      method:'POST',
      data: { file: file},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      if (file.progress===100){
        //alert("File uploaded successfully!")
        $scope.picFile="";
      }
    });
    }


//ctrl ends
}]);
