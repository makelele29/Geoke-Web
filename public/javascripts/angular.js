var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.

   when('/login', {
      templateUrl: 'login.html',
        controller : 'userCtrl'
   }).

   when('/', {
      templateUrl: 'carrousel.html'
   }).

   otherwise({
      redirectTo: 'login.html',
        controller : 'userCtrl'
   });

}]);

app.controller('userCtrl', function($scope, $http) {
/*  $scope.load=function(){
    $http.get("/api/usuario").then(function (response) {
        $scope.mydata = response.data;
    });

  }*/
  $scope.load=function(){
    $scope.error=false;
    $scope.user=null;

  }
  $scope.error=false;
  $scope.login=function(){
      $http.post('/api/login',$scope.user)
             .success(function(data) {
               $scope.error=false;
               alert("Logeado con existo")


             })
             .error(function(data) {
                 $scope.error=data.mensaje;
             });
    }
    $scope.registrar=function(){
        $http.post('/api/usuario',$scope.user)
               .success(function(data) {
                 $scope.error=false;
                 alert("se registro")

               })
               .error(function(data) {
                   $scope.error=data.mensaje;
               });
      }


});
