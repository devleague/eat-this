(function (){
  angular.module('eatApp')
    .controller('locationModalController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicModal',
         locationModal
      ]);

  function locationModal ($rootScope, $scope, $state, $ionicModal) {


    $scope.submit = function() {
      if($scope.locationModal.setLocation) {
        $rootScope.selectedLocation = {
          address_components: $scope.locationModal.setLocation.address_components,
          coords: {
            latitude: $scope.locationModal.setLocation.geometry.location.J,
            longitude: $scope.locationModal.setLocation.geometry.location.M
          }
        };
        // console.log($scope.locationModal.setLocation);
        $scope.locationModal.setLocation = null;
        $scope.modal.hide();
      } else {
        console.log('no location');
      }
    };

    $ionicModal
      .fromTemplateUrl('templates/set-location.html', {
        scope: $scope,
        anmiation: 'slide-in-up'
      })
      .then(function (modal){
        $scope.modal = modal;
      });

      $scope.openModal = function (){
        $scope.modal.show();
      };

      $scope.closeModal = function (){
        $scope.modal.hide();
      };

      $scope.$on('showModal', function (){
        $scope.modal.show();
      });

  }
})();
