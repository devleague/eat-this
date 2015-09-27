(function (){
  angular.module('eatApp')
    .controller('setLocationController', [
        '$rootScope',
        '$scope',
         setLocationController
      ]);

  function setLocationController ($rootScope, $scope) {
    console.log($rootScope.userLocation);
    $scope.place = null;

    $scope.submit = function() {
      if($scope.setLocation.place) {
        $rootScope.userLocation = {
          address_components: $scope.setLocation.place.address_components,
          coords: {
            latitude: $scope.setLocation.place.geometry.location.H,
            longitude: $scope.setLocation.place.geometry.location.L
          }
        }
      } else {
        console.log('no location');
      }
      console.log($rootScope.userLocation);
    }
  }
})();
