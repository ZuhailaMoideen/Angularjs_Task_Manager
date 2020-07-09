var app = angular.module('myApp', []);

app.controller('myController', function($scope, $http) {
  getTask(); // Load all available tasks 
  function getTask(){  
  $http.post("api/getTask.php").success(function(data){
        $scope.tasks = data;
       });
  };
  $scope.addTask = function () {
    $http.post("api/addTask.php",{
      'task':$scope.task,
    }).then(function(data){
        getTask();
        $scope.task = "";
      });
  };
  


  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("api/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("api/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };

});