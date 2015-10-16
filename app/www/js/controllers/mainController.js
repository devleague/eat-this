(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicPopup',
        'VenueService',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, $state, $ionicPopup, VenueService, geolocation, googleMaps) {
    $scope.place = null;
    $rootScope.userLocation
      .then(function(position){
        loadVenues(position);
      })
      .catch(function(error){
        $rootScope.$emit('openModal');
      });

    $scope.openModal = function (){
      $rootScope.$emit('openModal');
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

    function showAlert(){
      var myPopup = $ionicPopup.alert({
        title: '<b>UH OH!</b>',
        template: 'Sorry. Our app does not work in your current location yet. Please select another location.',
      });
      myPopup.then(function(res){
        myPopup.close();
        return $rootScope.$emit('openModal');
      });
    }

  }
})();