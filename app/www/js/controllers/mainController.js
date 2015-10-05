(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        '$state',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, $state, geolocation, googleMaps) {
    $scope.title = eatTitle;

    $scope.place = null;

    $scope.openModal = function (){
      $rootScope.$emit('openModal');
    };

    $rootScope.userLocation
      .then(function (position){
        $scope.position = position;

        googleMaps
        .then(function(maps){
          console.log(maps);
          var geocoder = new maps.Geocoder();
          var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
          geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                $rootScope.userLocation.country = results[results.length - 1].formatted_address;
                console.log($rootScope.userLocationCountry);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        });
      })
      .catch(function(error){
        console.log(error);
        $rootScope.$emit('openModal');
      });
  }
})();