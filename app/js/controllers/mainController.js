(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'Geolocator',
         mainController
      ]);

  function mainController ($rootScope, $scope, eatTitle, geolocation) {
    $scope.title = eatTitle;

    $rootScope.userLocation
        .then(function (position){
          console.log(position.coords);
          $scope.location = position.coords.latitude + ',' + position.coords.longitude;
        });
  }
})();