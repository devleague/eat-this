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

    console.log($rootScope.userLocation);

    $scope.setLocation = "blah";

    $scope.place = null;

    $scope.message = "this is location modal controller";

    $scope.submit = function() {
      if($scope.locationModal.setLocation) {
        var country = $scope.locationModal.setLocation.formatted_address.split(",");
        country = country[country.length - 1];
        $rootScope.selectedLocation = {
          address_components: $scope.locationModal.setLocation.address_components,
          country: country,
          coords: {
            latitude: $scope.locationModal.setLocation.geometry.location.H,
            longitude: $scope.locationModal.setLocation.geometry.location.L,
          }
        };
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
