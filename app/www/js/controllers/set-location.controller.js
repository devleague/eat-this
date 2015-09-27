(function (){
  angular.module('eatApp')
    .controller('setLocationController', [
        '$rootScope',
        '$scope',
        '$state',
         setLocationController
      ]);

  function setLocationController ($rootScope, $scope, $state) {
    console.log($rootScope.userLocation);
    $scope.place = null;

    $scope.submit = function() {
      if($scope.setLocation.place) {
        $rootScope.selectedLocation = {
          address_components: $scope.setLocation.place.address_components,
          coords: {
            latitude: $scope.setLocation.place.geometry.location.H,
            longitude: $scope.setLocation.place.geometry.location.L
          }
        }
        $state.go('app');
      } else {
        console.log('no location');
      }
    }
  }
})();
