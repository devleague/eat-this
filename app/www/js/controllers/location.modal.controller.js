(function (){
  angular.module('eatApp')
    .controller('locationModalController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicPopup',
        '$ionicModal',
        'VenueService',
         locationModal
      ]);

  function locationModal ($rootScope, $scope, $state, $ionicPopup, $ionicModal, VenueService) {
    $scope.submit = function() {
      if($scope.locationModal.setLocation) {
        $rootScope.selectedLocation = {
          address_components: $scope.locationModal.setLocation.address_components,
          coords: {
            latitude: $scope.locationModal.setLocation.geometry.location.J,
            longitude: $scope.locationModal.setLocation.geometry.location.M
          }
        };
        loadVenues($rootScope.selectedLocation);
        console.log($scope.locationModal.setLocation);
        $scope.locationModal.setLocation = null;
        $scope.modal.hide();
      } else {
        console.log('no location');
      }
    };

    function loadVenues(position) {
      $scope.position = true;
      VenueService
        .getVenues(position.coords.latitude, position.coords.longitude)
        .then(function(venues){
          if(venues.length !== 0){
            googleMaps
            .then(function(maps){
              var geocoder = new maps.Geocoder();
              var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
              geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                    $rootScope.userLocation.country = results[results.length - 1].formatted_address;
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
              });
            });
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
        template: 'Sorry. Our app does not work in your location yet.',
      });
      myPopup.then(function(res){
        console.log('You clicked Set Location!');
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
