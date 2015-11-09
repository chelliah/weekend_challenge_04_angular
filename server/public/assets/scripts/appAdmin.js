var myApp = angular.module('myApp',[]);

myApp.controller("PostController", ['$scope', '$http', function($scope,$http){
    $scope.values = {};
    $scope.valuesArray = [];

    $scope.clickButton = function(values){
        values.date = createDate();
        console.log(values);
        $http.post('admin/data', values).then(function(response){
            $scope.getData();
        });

        $scope.values = {};

    };

    $scope.clickDelete = function(post){
        console.log("does this work");
        console.log(post);
        $http.delete('admin/data' + post._id, {params: {_id: post._id}}).then(function(response){
            console.log(response);
            $scope.getData();
        })

    };

    $scope.getData = function(){
        $http.get('admin/data').then(function(response){
            console.log(response.data);
            $scope.valuesArray = response.data;
        })
    };

    $scope.getData();
}]);



function createDate(){
    var date = new Date();
    console.log(date.getMinutes()<10);
    if(date.getMinutes()<10){
        return date.getMonth() + "/" + date.getDate()  + "/" + date.getFullYear() +
            ' at ' + date.getHours() + ":0" + date.getMinutes();
    }
    return date.getMonth() + "/" + date.getDate()  + "/" + date.getFullYear() +
        ' at ' + date.getHours() + ":" + date.getMinutes();
}
