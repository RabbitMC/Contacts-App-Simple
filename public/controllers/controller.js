var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller.js");
    
    // refresh page by getting data from db
    var refresh = function() {
            $http.get('/contactlist').success(function(response) {
                console.log("I got the data I requested");
        
                $scope.contactlist = response;
                $scope.contact = '';
        });
    };
    
    
    // Add Contact
    $scope.addContact = function() {
        console.log("I got the data I post");
        
        $http.post('/contactlist', $scope.contact).success(function(response){
            console.log(response);
            
            refresh();
        });
    };
    
    $scope.removeContact = function(id) {
        console.log("ID " + id);
        
        $http.delete('/contactlist/' + id).success(function(response){
            refresh();
        });
    };
    
    $scope.editContact = function(id) {
        console.log("ID " + id);
        
        $http.get('/contactlist/' + id).success(function(response){
            $scope.contact = response;
        });
    };
    
    $scope.updateContact = function() {
        console.log("updateContact" + $scope.contact._id);
        
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        })
    };
    
    refresh();
}]);