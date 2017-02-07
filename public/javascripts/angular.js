var app = angular.module("myApp", ['ngRoute','ngStorage']);

app.config(['$routeProvider', '$locationProvider',
 function ($routeProvider, $locationProvider) {

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
   when('/misiones/:id_gymkhana', {
      templateUrl: 'misiones.html',
      controller : 'misionesCtrl'
   }).
   when('/configuracion', {
      templateUrl: 'preferencias.html',
      controller : 'confCtrl'
   }).
   otherwise({
      redirectTo: '/login'
   });

   $locationProvider.html5Mode({
   enabled: true,
   requireBase: false
 });

}]);
//======================= SERVICIOS =======================
//------------------------- AUTENTIFICACION -------------------------
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
        nombre : payload.nombre,
        apellidos: payload.apellidos,
        email:payload.email
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
//------------------------- MAPA GOOGLE -------------------------
app.service('Map', ['$window',function($window) {
  var infowindow
  var map
  var position
  var setPos = function (e) {
    posicion = e.latLng;
  };

  this.getPos = function () {
    return posicion;
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
          position: misiones[misiones.length-1].geo,
          animation: google.maps.Animation.DROP,
          title: 'Misión ' + misiones.length,
          info: '<div><div class="text-center"><h6>Misión '+misiones.length+'<h6></div>'+
          '<div class="text-center"><h8>Pregunta: '+misiones[misiones.length-1].pregunta+'<h8><hr></div>'+
          '<div>'+
          '<center><button type="button" class="btn btn-primary btn-circle" ng-click="modificar('+misiones.length+');"><i class="glyphicon glyphicon-pencil"></i></button>'+
          '<button  class="btn btn-danger btn-circle" ng-click="markRemove('+misiones.length+');"><i class="glyphicon glyphicon-remove"></i></button>'+
          '</center></div></div>'
        });

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
////======================= EN TIEMPO DE EJECUCION =======================
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
////======================= CONTROALDORES =======================
//------------------------- PERFIL -------------------------
app.controller('profileCtrl', ['$scope','$http','$window','$routeParams','authentication','$location',
 function( $scope,$http,$window,$routeParams,authentication,$location) {
   $scope.show=true;
   $scope.user=$routeParams.alias;
   if(authentication.isLoggedIn() && authentication.currentUser().alias==$scope.user){
     $scope.show=true;
   }else{
     $scope.show=false;
   }
   $scope.configuracion=function(){
     $location.path('/configuracion')
   }
   google.charts.load("current", {packages:["corechart"]});
   google.charts.setOnLoadCallback(drawChart);
   function drawChart() {
     var data = google.visualization.arrayToDataTable([
       ['Task', 'Estadísticas'],
       ['Completadas',     3],
       ['Abandonadas',      1]
     ]);

     var options = {
       title: 'Estadistícas',
       pieHole: 0.4,
     };

     var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
     chart.draw(data, options);
   }

}]);
//------------------------- USUARIO -------------------------
app.controller('userCtrl', ['$rootScope', '$scope', '$localStorage','$http','$window', 'authentication',
function($rootScope, $scope, $localStorage,$http,$window,authentication) {


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
//------------------------- MISIONES -------------------------
app.controller('misionesCtrl', ['$scope','Map','$compile','authentication', '$location', '$http','$routeParams',
function($scope, Map,$compile,authentication, $location, $http,$routeParams) {
  Map.init()
  var misiones=[]
  var markers=[]
  var index
  $scope.gymkhana={}
  $scope.mision={pregunta:'',respuesta1:'',respuesta2:'',respuesta3:'',respuesta4:'',correcta:1,geo:""}
  $scope.showMisiones=false
  $scope.showGymkhana=true
  if(typeof $routeParams.id_gymkhana != "undefined"){
    var gymk={'id_gymkhana':$routeParams.id_gymkhana}
    $http({
      method: 'POST',
      url: '/api/misiones',
      data: gymk,
      headers: {
        'Authorization': 'Bearer '+ authentication.getToken()
      }
    }).success(function(data) {


          $scope.gymkhana.nombre=data.gymkhana.nombre_gymk
          $scope.gymkhana.fechaIni=new Date(data.gymkhana.fecha_ini)
          $scope.gymkhana.fechaFin=new Date(data.gymkhana.fecha_fin)
          var m=data.misiones
          for(var mision in m){
          var mi={pregunta:m[mision].pregunta,respuesta1:m[mision].respuesta1,respuesta2:m[mision].respuesta2,respuesta3:m[mision].respuesta3,
              respuesta4:m[mision].respuesta4,correcta:m[mision].respuesta_correcta,geo:{lat:m[mision].latitud,lng:m[mision].longitud}}

              misiones.push(mi);
                Map.addMarker(markers,misiones)
                markers[markers.length-1].addListener('click',function(){
                var html = $compile(this.info)($scope);

                Map.info().setContent(html[0]);
                Map.info().open(Map.map,this);
              })

          }
          //$location.path("/gymkhanas")
    }).error(function(data) {
        alert(JSON.stringify(data))
    });

  }
  $scope.guardar=function(){
    if($('#guardar').text()=='Guardar'){

      misiones.push($scope.mision);
      misiones[misiones.length-1].geo  =Map.getPos();

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
    var gymkhana
    if(typeof $routeParams.id_gymkhana != "undefined")
      gymkhana={nombre:$scope.gymkhana.nombre,fechaIni:$scope.gymkhana.fechaIni,fechaFin:$scope.gymkhana.fechaFin,misiones:misiones, id:$routeParams.id_gymkhana}
    else
      gymkhana={nombre:$scope.gymkhana.nombre,fechaIni:$scope.gymkhana.fechaIni,fechaFin:$scope.gymkhana.fechaFin,misiones:misiones}


    $http({
      method: 'POST',
      url: '/api/gymkhana',
      data: gymkhana,
      headers: {
        'Authorization': 'Bearer '+ authentication.getToken()
      }
    }).success(function(data) {

        $location.path("/gymkhanas")
    }).error(function(data) {
        alert(JSON.stringify(data))
    });

  }

  $scope.mostrarMap=function(){

    if(typeof $scope.gymkhana.nombre=="undefined" || typeof $scope.gymkhana.fechaIni=="undefined" || typeof $scope.gymkhana.fechaFin=="undefined" || $scope.gymkhana.nombre=="" || $scope.gymkhana.fechaIni==null || $scope.gymkhana.fechaFin==null){
      if(typeof $scope.gymkhana.nombre=="undefined" || $scope.gymkhana.nombre==""){
        $scope.colorNombre="red"
      }else {
          $scope.colorNombre="undefined"
      }
      if(typeof $scope.gymkhana.fechaIni=="undefined" || $scope.gymkhana.fechaIni==null){
          $scope.colorIni="red"
      }else {
          $scope.colorIni="undefined"
      }
      if(typeof $scope.gymkhana.fechaFin=="undefined" || $scope.gymkhana.fechaFin==null){
          $scope.colorFin="red"
      }else {
          $scope.colorFin="undefined"
      }
      $scope.errorDate="Algunos de los campos estan vacíos"
    }else if($scope.gymkhana.fechaIni>$scope.gymkhana.fechaFin){
      $scope.errorDate="La fecha de inicio debe ser anterior a la fecha de fin"
    }else{
      $scope.showGymkhana=false
      $scope.showMisiones=true


    }
  }

}]);
//------------------------- GYMKHANAS -------------------------
app.controller('gymkhanasCtrl', ['$scope','$location','$http','authentication',function($scope,$location,$http,authentication) {
  $scope.show=function(){

    $location.path("/misiones")
  }
  $scope.gymkhanas=[]
  $http({
    method: 'GET',
    url: '/api/gymkhana',
    headers: {
      'Authorization': 'Bearer '+ authentication.getToken()
    }
  }).success(function(data) {

      $scope.gymkhanas=data.data
  }).error(function(data) {
      alert(JSON.stringify(data))
  });
  $scope.currentPage=0;
  $scope.editar=function(data){
      $location.path("/misiones/"+data)
  }

}]);
//------------------------- NAVEGADOR -------------------------
app.controller('navCtrl', ['$scope','$location','authentication',function($scope,$location,authentication) {

  $scope.logout=function(){
    authentication.logout();
    $location.path("/")
  }

}]);
//------------------------- CONFIGURACION -------------------------
app.controller('confCtrl', ['$scope','$location','authentication',function($scope,$location,authentication) {

  $scope.user=authentication.currentUser()

}]);
