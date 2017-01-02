var app = angular.module("myApp", ['ngRoute','ngStorage']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.
   when('/login', {
      templateUrl: 'login.html',
        controller : 'userCtrl'
   }).

   when('/', {
      templateUrl: 'carrousel.html'
   }).
 	when('/profile/:alias', {
      templateUrl: 'profile.html',
		controller : 'profileCtrl'
   }).
   when('/gymkhanas', {
      templateUrl: 'gymkhanas.html',
      controller : 'gymkhanasCtrl'
   }).
   when('/misiones', {
      templateUrl: 'misiones.html',
      controller : 'misionesCtrl'
   }).
   otherwise({
      redirectTo: 'login.html',
        controller : 'userCtrl'
   });
   // use the HTML5 History API
      $locationProvider.html5Mode(true);

}]);

app.service('authentication',['$http', '$window',function ($http, $window) {
  var saveToken = function (token) {
    $window.localStorage['mean-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['mean-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){

      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        alias : payload.alias,
        nombre : payload.nombre
      };
    }
  };


  logout = function() {
    $window.localStorage.removeItem('mean-token');
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    logout : logout
  };

}])
app.service('Map', ['$window',function($window) {
  var infowindow
  var map
  var setPos = function (e) {
    this.posicion = e.latLng;
  };

  var getPos = function () {
    return this.posicion;
  };
  this.info=function(){
    return infowindow
  }
  this.map=function(){
    return map;

  }

    this.init = function() {
        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15,
          panControl: true,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          overviewMapControl: true,
          rotateControl: true
       });

    map.addListener('rightclick', function(e) {
      setPos(e)
      $('#myForm').trigger("reset");
      $('#guardar').text("Guardar")
      $('#tituloModal').text("Crear misión")
      $('#myModal').modal('show')


    });
    // Obtener la geolocalización del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
      });
    }
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
   var searchBox = new google.maps.places.SearchBox(input);
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   // Bias the SearchBox results towards current map's viewport.
   map.addListener('bounds_changed', function() {
     searchBox.setBounds(map.getBounds());
   });
  searchBox.addListener('places_changed', function() {
    var places =searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }



    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    var place=places[0]



      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

    map.fitBounds(bounds);
  });

  }
  this.addMarker = function(markers,misiones) {

          var marker = new google.maps.Marker({
              map: this.map(),
              position: getPos(),
              animation: google.maps.Animation.DROP,
              title: 'Misión ' + misiones.length,
              info: '<div><div class="text-center"><h6>Misión '+misiones.length+'<h6></div>'+
              '<div class="text-center"><h8>Pregunta: '+misiones[misiones.length-1].pregunta+'<h8><hr></div>'+
              '<div>'+
              '<center><button type="button" class="btn btn-primary btn-circle" ng-click="modificar('+misiones.length+');"><i class="glyphicon glyphicon-pencil"></i></button>'+
              '<button  class="btn btn-danger btn-circle" ng-click="markRemove('+misiones.length+');"><i class="glyphicon glyphicon-remove"></i></button>'+
              '</center></div></div>'
            });

            misiones[misiones.length-1].geo=getPos();
            markers.push(marker)

      }
      this.modiMarker=function(marker,index,mision){
        marker.info= '<div><div class="text-center"><h6>Misión '+(index+1)+'<h6></div>'+
        '<div class="text-center"><h8>Pregunta: '+mision.pregunta+'<h8><hr></div>'+
        '<div">'+
        '<center><button type="button" class="btn btn-primary btn-circle" ng-click="modificar('+(index+1)+');"><i class="glyphicon glyphicon-pencil"></i></button>'+
        '<button  class="btn btn-danger btn-circle" ng-click="markRemove('+(index+1)+');"><i class="glyphicon glyphicon-remove"></i></button>'+
        '</center></div></div>'
        infowindow.close();
      }


}]);
app.run(['$rootScope', '$location', 'authentication',function ($rootScope, $location, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if(authentication.isLoggedIn()){
        $rootScope.mostrarUsu=true;
    }else {
        $rootScope.mostrarUsu=false;
    }
    if (($location.path() == '/' || $location.path() == '/login' ) && authentication.isLoggedIn()) {
      $location.path('/profile/'+authentication.currentUser().alias);

    }else if (($location.path() != '/' && $location.path() != '/login' && $location.path() != '/profile/:alias') && !authentication.isLoggedIn()) {
        $location.path('/login');
    }
  });
}])
app.controller('profileCtrl', ['$rootScope', '$scope', '$localStorage','$http','$window', 'authentication', function($rootScope, $scope, $localStorage,$http,$window, authentication) {

  if(authentication.isLoggedIn()){
      $scope.show=true;
      $scope.user=authentication.currentUser();

  }else{
      $scope.show=false;
  }


}]);

app.controller('userCtrl', ['$rootScope', '$scope', '$localStorage','$http','$window', 'authentication',function($rootScope, $scope, $localStorage,$http,$window,authentication) {


  $scope.load=function(){
    $scope.error=false;
    $scope.user=null;

  }

  $scope.error=false;
  $scope.login=function(){

      $http.post('/api/login',$scope.user)
             .success(function(data) {
               $scope.error=false;
               authentication.saveToken(data.token);
               window.location="/#/profile/"+authentication.currentUser().alias;


             })
             .error(function(data) {
                 $scope.error=data.message;
             });

    }
    $scope.registrar=function(){
        
        $http.post('/api/usuario',$scope.user)
               .success(function(data) {
                 $scope.error=false;
                 authentication.saveToken(data.token);
                 window.location="/#/profile/"+authentication.currentUser().alias;
               })
               .error(function(data) {
                   $scope.error=data.mensaje;
               });
      }

}]);
app.controller('misionesCtrl', ['$scope','Map','$compile','authentication',function($scope, Map,$compile,authentication) {

  var misiones=[]
  var markers=[]
  var index
        $scope.mision={pregunta:'',respuesta1:'',respuesta2:'',respuesta3:'',respuesta4:'',correcta:1,geo:""}

  $scope.guardar=function(){
    if($('#guardar').text()=='Guardar'){

      misiones.push($scope.mision);

      Map.addMarker(markers,misiones)
      markers[markers.length-1].addListener('click',function(){
        var html = $compile(this.info)($scope);

        Map.info().setContent(html[0]);
        Map.info().open(Map.map,this);
      })


    }else{
      misiones[index]=$scope.mision;
      Map.modiMarker(markers[index],index,$scope.mision);
    }
      $('#myModal').modal('hide')
      $scope.mision={pregunta:'',respuesta1:'',respuesta2:'',respuesta3:'',respuesta4:'',correcta:1,geo:""}
  }
  $scope.modificar=function(num){
    index=num-1;
    $scope.mision=misiones[index]
    $('#myForm').trigger("reset");
    $('#guardar').text("Modificar")
    $('#tituloModal').text("Modificar misión")
    $('#myModal').modal('show')
  }
  $scope.markRemove=function (num){

     index=num-1;
     markers[index].setMap(null);
     misiones.splice(index,1)
     markers.splice(index,1)
     ordenar(index)

   };
   function ordenar(num){

     for ( i=num;i<markers.length;i++){
       markers[i].info= '<div><div class="text-center"><h6>Misión '+(i+1)+'<h6></div>'+
       '<div class="text-center"><h8>Pregunta: '+misiones[i].pregunta+'<h8><hr></div>'+
       '<div">'+
       '<center><button type="button" class="btn btn-primary btn-circle" ng-click="modificar('+(i+1)+');"><i class="glyphicon glyphicon-pencil"></i></button>'+
       '<button  class="btn btn-danger btn-circle" ng-click="markRemove('+(i+1)+');"><i class="glyphicon glyphicon-remove"></i></button>'+
       '</center></div></div>';
       markers[i].title= 'Misión ' + (i+1);

     }

   }
  $scope.terminar=function(){
    var gymkhana={nombre:$scope.gymkhana.nombre,fechaIni:$scope.gymkhana.fechaIni,fechaFin:$scope.gymkhana.fechaFin,misiones:misiones}
    alert(JSON.stringify(gymkhana))
  }
  $scope.mostrarMap=function(){
    $scope.showMisiones=true
    Map.init()
  }
}]);
app.controller('gymkhanasCtrl', ['$scope','$location',function($scope,$location) {
  $scope.show=function(){
    $location.path("/misiones")
  }

}]);
app.controller('navCtrl', ['$scope','$location','authentication',function($scope,$location,authentication) {
  $scope.logout=function(){
    authentication.logout();
    $location.path("/")
  }

}]);
