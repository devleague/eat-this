(function (){
  angular.module('eatApp')
    .controller('locationModalController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicPopup',
        '$ionicModal',
        'MarkerService',
        'VenueService',
        'uiGmapGoogleMapApi',
         locationModal
      ]);

  function locationModal ($rootScope, $scope, $state, $ionicPopup, $ionicModal, MarkerService, VenueService, googleMaps) {

    $scope.submit = function() {
      if($scope.locationModal.setLocation) {
        $rootScope.selectedLocation = {
          address_components: $scope.locationModal.setLocation.address_components,
          coords: {
            latitude: $scope.locationModal.setLocation.geometry.location.lat(),
            longitude: $scope.locationModal.setLocation.geometry.location.lng()
          }
        };
        loadVenues($rootScope.selectedLocation);
        $scope.locationModal.setLocation = null;
        $scope.modal.hide();
      } else {
        console.log('no location');
      }
    };

    function loadVenues(position) {
      MarkerService.deleteMarkers();
      $scope.position = true;
      VenueService
        .getVenues(position.coords.latitude, position.coords.longitude)
        .then(function(venues){
          if(venues.length !== 0){
            for (var i = 0; i < venues.length; i++){
              MarkerService.createMarkers(venues[i].location.coordinate.latitude, venues[i].location.coordinate.longitude, i+1);
            }
          } else {
            showAlert();
          }
        })
        .catch(function(error){
          showAlert();
        });
    }

    function showAlert (){
      var myPopup = $ionicPopup.alert({
        title: '<b>UH OH!</b>',
        template: 'Sorry. Our app does not work the selected location yet. Please select another location.',
      });
      myPopup.then(function(res){
        myPopup.close();
        return $rootScope.$emit('openModal');
      });
    }

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
