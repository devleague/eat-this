(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, eatTitle, geolocation, googleMaps) {
     $scope.title = eatTitle;

    $rootScope.userLocation
      .then(function (position){
        $scope.position = position;
        $scope.location = position.coords.latitude;
      }, function(reason){
        $scope.message = reason.message;
        $scope.place = null;
      }), function(reason){
          $scope.message = "Could not be determined";
      };
  }
})();
