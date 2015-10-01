(function (){
  angular.module('eatApp')
    .controller('setLocationController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicModal',
         setLocationController
      ]);

  function setLocationController ($rootScope, $scope, $state, $ionicModal) {
    console.log($rootScope.userLocation);
    $scope.place = null;

    $ionicModal
      .fromTemplateUrl('templates/set-location.html', {
        scope: $scope,
        anmiation: 'slide-in-up'
      })
      .then(function (modal){
        $scope.modal = modal;
      });

    $scope.closeModal = function (){
      console.log('clicking close');
      $scope.modal.close();
    };

    $scope.submit = function() {
      if($scope.setLocation.place) {
        $rootScope.selectedLocation = {
          address_components: $scope.setLocation.place.address_components,
          coords: {
            latitude: $scope.setLocation.place.geometry.location.H,
            longitude: $scope.setLocation.place.geometry.location.L
          }
        };
        $scope.modal.close();
        // $state.go('app');
      } else {
        console.log('no location');
      }
    };

  }
})();
